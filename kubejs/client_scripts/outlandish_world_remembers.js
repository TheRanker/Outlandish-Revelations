// Client-only text rendering. The server supplies only this viewer's inscription.
(function () {
  var Native=Java.loadClass('com.theranker.creativeguard.WorldRemembersBridge');
  var Minecraft=Java.loadClass('net.minecraft.client.Minecraft');
  var Stage=Java.loadClass('net.minecraftforge.client.event.RenderLevelStageEvent$Stage');
  var DisplayMode=Java.loadClass('net.minecraft.client.gui.Font$DisplayMode');
  var Axis=Java.loadClass('com.mojang.math.Axis');
  var BlockPos=Java.loadClass('net.minecraft.core.BlockPos');
  var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var state=null,loggedError=false;
  NetworkEvents.dataReceived('outlandish_world_remembers_state',function(event) {
    try {
      var packet=JSON.parse(String(event.data.payload));
      if(packet.version!==1 || !Array.isArray(packet.lines) || packet.lines.length>8 || !Array.isArray(packet.memorials) || packet.memorials.length>16)throw Error('Invalid plaque state');
      state=packet;
    }catch(failure){state=null;console.error('[The World Remembers client] '+failure);}
  });
  ClientEvents.loggedOut(function(){state=null;});
  global.ORWorldRemembersRender=function(event) {
    if(event.getStage()!==Stage.AFTER_TRANSLUCENT_BLOCKS || !state)return;
    var mc=Minecraft.getInstance();
    if(!mc.player || !mc.level || String(Native.uuid(mc.player))!==state.playerUuid)return;
    // Use the same KubeJS dimension property as the pack's existing level code.
    var dimension=String(mc.level.dimension),camera=event.getCamera().getPosition();
    var pose=event.getPoseStack(),buffer=mc.renderBuffers().bufferSource(),drew=false;
    try {
      state.memorials.forEach(function(m) {
        if(m.dimension!==dimension)return;
        var p=m.plaque,dx=p.x-camera.x(),dy=p.y-camera.y(),dz=p.z-camera.z();
        if(dx*dx+dy*dy+dz*dz>24*24)return;
        if(m.anchor.requiredBlockId && String(Registries.BLOCKS.getKey(mc.level.getBlockState(new BlockPos(m.anchor.x,m.anchor.y,m.anchor.z)).getBlock()))!==m.anchor.requiredBlockId)return;
        pose.pushPose();
        try {
          pose.translate(dx,dy,dz);pose.mulPose(Axis.YP.rotationDegrees(p.yaw));pose.scale(-p.scale,-p.scale,p.scale);
          state.lines.forEach(function(line,index) {
            var text=Text.of(String(line.text));if(line.bold)text=text.bold();if(line.italic)text=text.italic();
            // Java expects a signed ARGB int; avoid Rhino overflowing unsigned hex values.
            mc.font.drawInBatch(text,-mc.font.width(text)/2,index*12,(line.gold?0xFFFFD080:0xFFFFFFFF)|0,false,
              pose.last().pose(),buffer,DisplayMode.NORMAL,0,15728880);
          });drew=true;
        } finally {pose.popPose();}
      });
      if(drew)buffer.endBatch();
    }catch(failure){if(!loggedError){loggedError=true;console.error('[The World Remembers renderer] '+failure);}}
  };
})();
