// Outlandish Revelations: world interactions.
(function(){

  var state={ready:false,tagsAdded:0,bossHooks:0,harvests:0,replants:0,noSeedBreaks:0,bossNotifications:0,lastHarvest:null,lastBoss:null,unsupportedCrops:[],errors:[]};
  var CropBlock=Java.loadClass('net.minecraft.world.level.block.CropBlock');

  function error(scope,failure){var message=scope+': '+failure;if(state.errors.indexOf(message)<0)state.errors.push(message);console.error('[Outlandish world interactions] '+message);}

  ServerEvents.tags('item',function(event){
    state.tagsAdded=0;
    [['curios:ring','kubejs:rankers_ring'],['curios:magic_book','eccentrictome:tome']].forEach(function(rule){
      if(Item.exists(rule[1])){event.add(rule[0],rule[1]);state.tagsAdded++;}
    });
  });
  BlockEvents.rightClicked(function(event){
    var block=event.block,player=event.player;
    if(!block.hasTag('minecraft:crops'))return;
    var state=block.blockState,crop=state.block;
    if(!(crop instanceof CropBlock))return;
    try{
      if(!crop.isMaxAge(state)||player.isSpectator()||!event.level.mayInteract(player,block.pos))return;
      var current=block.properties;
      if(current.age==null){var unsupported=String(block.id);if(state.unsupportedCrops.indexOf(unsupported)<0){state.unsupportedCrops.push(unsupported);}return;}
      var cropId=String(block.id),seed=String(block.item.id),drops=block.getDrops(player,player.mainHandItem),replant=false;

      var outputs=[];
      for(var i=0;i<drops.size();i++){
        var stack=drops.get(i).copy();
        if(!replant&&String(stack.id)===seed&&Number(stack.count)>0){stack.count--;replant=true;}
        if(!stack.isEmpty())outputs.push(stack);
      }
      var properties={};
      for(var key in current)properties[key]=String(current[key]);
      properties.age='0';

      if(replant)block.set(block.id,properties);
      else block.set('minecraft:air');
      outputs.forEach(function(stack){block.popItem(stack);});
      if(replant)event.server.runCommandSilent('playsound minecraft:block.crop.break block @a '+block.x+' '+block.y+' '+block.z);
      player.swing();state.harvests++;if(replant)state.replants++;else state.noSeedBreaks++;
      state.lastHarvest={crop:cropId,seed:seed,replanted:replant,spawnedStacks:outputs.length};
    }catch(failure){error('Harvest '+block.id,failure);return;}

    event.cancel();
  });
  [
    {id:'minecraft:ender_dragon',icon:'minecraft:dragon_head',title:'darkPurple',background:0xd9e4ac,border:0x5d1d96},
    {id:'minecraft:wither',icon:'minecraft:wither_skeleton_skull',title:0xd81e3d,background:0x372027,border:0x1d1316},
    {id:'minecraft:warden',icon:'minecraft:reinforced_deepslate',title:'darkAqua',background:0x525255,border:0x0c1116},
    {id:'minecraft:elder_guardian',icon:'minecraft:sponge',title:'darkBlue',background:0x67ada8,border:0x243a34}
  ].forEach(function(boss){
    EntityEvents.death(boss.id,function(event){
      var killer=event.source.player;if(!killer)return;
      try{
        var parts=boss.id.split(':');
        var notification=Notification.make(function(n){
          n.setItemIcon(Item.of(boss.icon));n.backgroundColor=boss.background;n.borderColor=boss.border;n.outlineColor=boss.border;n.textShadow=false;
          n.text=Text.of('World Notify - Boss Has Been Killed！\n').color(boss.title).bold()
            .append(Text.translate('entity.'+parts[0]+'.'+parts[1]).green())
            .append(Text.of(' has been killed by ')).append(Text.of(killer.displayName).gold());
        });
        var sent=0;event.server.players.forEach(function(player){player.notify(notification);sent++;});
        state.bossNotifications++;state.lastBoss={boss:boss.id,killer:String(killer.username),recipients:sent};
      }catch(failure){error('Boss '+boss.id,failure);}
    });state.bossHooks++;
  });
  state.ready=true;
})();
