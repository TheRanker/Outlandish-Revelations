package com.theranker.creativeguard.relics;

import com.google.gson.*;
import com.mojang.brigadier.arguments.*;
import com.mojang.blaze3d.vertex.PoseStack;
import com.mojang.blaze3d.vertex.VertexConsumer;
import com.mojang.math.Axis;
import java.nio.file.*;
import java.util.*;
import net.minecraft.client.*;
import net.minecraft.client.model.PlayerModel;
import net.minecraft.client.model.geom.ModelLayers;
import net.minecraft.client.renderer.*;
import net.minecraft.client.renderer.texture.OverlayTexture;
import net.minecraft.commands.Commands;
import net.minecraft.core.*;
import net.minecraft.core.particles.*;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.sounds.*;
import net.minecraft.world.level.block.Blocks;
import net.minecraftforge.client.event.*;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.entity.player.ItemTooltipEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.loading.FMLPaths;
import org.joml.Vector3f;

/** Physically isolated display code. No combat, item mutations, real lightning, or server grants. */
public final class RelicClient {
    private static final RelicClient INSTANCE=new RelicClient();
    private static JsonObject state,cinematic;
    private static long stateClientTick,cinematicStart;
    private static boolean installed,thunder;
    private static final List<String> pending=new ArrayList<>();
    private static final LinkedHashMap<String,JsonObject> memorials=new LinkedHashMap<>();
    private static PlayerModel<net.minecraft.world.entity.player.Player> model;
    private static final DustParticleOptions GOLD=new DustParticleOptions(new Vector3f(1,.8f,.25f),1);
    static final class Preferences {boolean visible=true;int x=8,y=-78;double scale=.75;}
    private static Preferences prefs=new Preferences();
    static Path file(){return FMLPaths.CONFIGDIR.get().resolve("outlandish-relic-hud.json");}
    static void install(){if(installed)return;installed=true;try{if(Files.exists(file()))prefs=RelicStore.JSON.fromJson(Files.readString(file()),Preferences.class);if(prefs==null||!Double.isFinite(prefs.scale)||prefs.scale<.5||prefs.scale>2)prefs=new Preferences();}catch(Exception e){prefs=new Preferences();}MinecraftForge.EVENT_BUS.register(INSTANCE);}
    static boolean viewer(JsonObject j){var p=Minecraft.getInstance().player;return p!=null&&j.has("playerUuid")&&j.get("playerUuid").getAsString().equals(p.getUUID().toString());}
    static void receive(String text){
        if(text.length()>32767)return;
        try{JsonObject j=JsonParser.parseString(text).getAsJsonObject();var mc=Minecraft.getInstance();
            if(mc.player==null||mc.level==null){if(pending.size()<128)pending.add(text);return;}if(!viewer(j))return;
            switch(j.get("kind").getAsString()){
                case "clear" -> {state=null;cinematic=null;memorials.clear();}
                case "state" -> {state=j;stateClientTick=mc.level.getGameTime();}
                case "memorial" -> {memorials.put(j.get("id").getAsString(),j);while(memorials.size()>64)memorials.remove(memorials.keySet().iterator().next());}
                case "ascension" -> {cinematic=j;cinematicStart=mc.level.getGameTime();thunder=false;model=null;}
            }
        }catch(Exception e){System.err.println("[Outlandish relic HUD] Rejected display message: "+e);}
    }
    @SubscribeEvent public void logout(ClientPlayerNetworkEvent.LoggingOut e){state=null;cinematic=null;memorials.clear();pending.clear();model=null;}
    static long tick(){var level=Minecraft.getInstance().level;return state==null||level==null?0:state.get("serverTick").getAsLong()+level.getGameTime()-stateClientTick;}
    static boolean flag(String name){return state!=null&&state.has(name)&&state.get(name).getAsBoolean();}
    static String cooldown(String name){long left=state.get(name).getAsLong()-tick();return left<=0?"Ready":((left+19)/20)+"s";}
    @SubscribeEvent public void hud(RenderGuiEvent.Post e){
        var mc=Minecraft.getInstance();if(mc.player==null||mc.level==null)return;var g=e.getGuiGraphics();
        if(prefs.visible&&state!=null&&(flag("swordEquipped")||flag("ringEquipped"))){
            PoseStack pose=g.pose();pose.pushPose();try{pose.scale((float)prefs.scale,(float)prefs.scale,1);int x=(int)(prefs.x/prefs.scale),y=(int)((prefs.y<0?mc.getWindow().getGuiScaledHeight()+prefs.y:prefs.y)/prefs.scale);int line=0;
                if(flag("swordEquipped")){
                    g.drawString(mc.font,flag("swordOwned")?"Tears for Fears — Awakened":"Tears for Fears — Dormant",x,y+line++*11,0xFFD080);
                    if(flag("swordOwned")){g.drawString(mc.font,"Resonance "+state.get("resonance").getAsInt()+" / 100",x,y+line++*11,0xFFFFFF);g.drawString(mc.font,"Fracture Ready | Echo "+cooldown("echoReadyAt")+" | Skybreaker "+(flag("ringOwned")?cooldown("skyReadyAt"):"Ring required"),x,y+line++*11,0xDDDDDD);}
                }
                if(flag("ringEquipped")){g.drawString(mc.font,"Guardian's Protection "+cooldown("protectionReadyAt"),x,y+line++*11,0xBBDFFF);if(flag("ringOwned"))g.drawString(mc.font,"Last Stand "+cooldown("lastStandReadyAt"),x,y+line++*11,0xBBDFFF);}
            }finally{pose.popPose();}
        }
        if(cinematic!=null){long age=mc.level.getGameTime()-cinematicStart;int width=mc.getWindow().getGuiScaledWidth(),height=mc.getWindow().getGuiScaledHeight();
            if(age>=90&&age<170)g.drawCenteredString(mc.font,"And when the world grows dark again...",width/2,height/2+60,0xFFFFFF);
            if(age>=175&&age<290)g.drawCenteredString(mc.font,Component.literal("Be the reason someone still believes in tomorrow.").withStyle(net.minecraft.ChatFormatting.BOLD),width/2,height/2+60,0xFFD080);
            if(age>=285&&age<295){int alpha=(int)(220*(1-Math.abs(age-290)/5.0));g.fill(0,0,width,height,(Math.max(0,alpha)<<24)|0xFFFFFF);}
        }
    }
    @SubscribeEvent public void tooltip(ItemTooltipEvent e){
        String id=RelicItems.id(e.getItemStack());if(!id.equals(RelicRules.SWORD)&&!id.equals(RelicRules.RING))return;
        var tag=RelicItems.data(e.getItemStack());boolean awake=tag.getBoolean("awakened");e.getToolTip().add(Component.literal(awake?"Awakened — The Ranker's Legacy":"Dormant relic").withStyle(net.minecraft.ChatFormatting.GOLD));
        if(tag.hasUUID("owner")){String owner=tag.getString("ownerName");var viewer=e.getEntity();if(viewer!=null&&viewer.getUUID().equals(tag.getUUID("owner")))owner=viewer.getName().getString();e.getToolTip().add(Component.literal("Soulbound to "+owner+" ["+tag.getUUID("owner")+"]").withStyle(net.minecraft.ChatFormatting.GRAY));}
    }
    @SubscribeEvent public void commands(RegisterClientCommandsEvent e){
        e.getDispatcher().register(Commands.literal("orrelichud")
            .then(Commands.literal("show").executes(c->{prefs.visible=true;save();return 1;}))
            .then(Commands.literal("hide").executes(c->{prefs.visible=false;save();return 1;}))
            .then(Commands.literal("scale").then(Commands.argument("scale",DoubleArgumentType.doubleArg(.5,2)).executes(c->{prefs.scale=DoubleArgumentType.getDouble(c,"scale");save();return 1;})))
            .then(Commands.literal("position").then(Commands.argument("x",IntegerArgumentType.integer(0,4000)).then(Commands.argument("y",IntegerArgumentType.integer(-2000,4000)).executes(c->{prefs.x=IntegerArgumentType.getInteger(c,"x");prefs.y=IntegerArgumentType.getInteger(c,"y");save();return 1;})))));
    }
    static void save(){try{Files.writeString(file(),RelicStore.JSON.toJson(prefs));}catch(Exception e){System.err.println("[Outlandish relic HUD] Could not save layout: "+e);}}
    @SubscribeEvent public void clientTick(TickEvent.ClientTickEvent e){
        if(e.phase!=TickEvent.Phase.END)return;var mc=Minecraft.getInstance();
        if(mc.player!=null&&mc.level!=null&&!pending.isEmpty()){var queued=List.copyOf(pending);pending.clear();for(String message:queued)receive(message);}
        if(cinematic==null)return;
        if(mc.level==null||mc.player==null||!mc.level.dimension().location().toString().equals(cinematic.get("dimension").getAsString())){cinematic=null;return;}
        long age=mc.level.getGameTime()-cinematicStart;if(age>300){cinematic=null;return;}
        double x=cinematic.get("x").getAsDouble(),y=cinematic.get("y").getAsDouble()+Math.min(2,age/140.0),z=cinematic.get("z").getAsDouble();
        if(age%2==0){for(int i=0;i<4;i++){double angle=age*.13+i*Math.PI/2;mc.level.addParticle(i%2==0?ParticleTypes.END_ROD:GOLD,x+Math.cos(angle)*.7,y+Math.random()*2,z+Math.sin(angle)*.7,0,.025,0);}}
        if(age>=290&&!thunder){thunder=true;mc.level.playLocalSound(x,y,z,SoundEvents.LIGHTNING_BOLT_THUNDER,SoundSource.AMBIENT,1,.9f,false);for(int i=0;i<30;i++)mc.level.addParticle(ParticleTypes.ELECTRIC_SPARK,x,y+Math.random()*2,z,(Math.random()-.5)*.2,.1,(Math.random()-.5)*.2);}
    }
    @SuppressWarnings("deprecation") @SubscribeEvent public void world(RenderLevelStageEvent e){
        if(e.getStage()!=RenderLevelStageEvent.Stage.AFTER_TRANSLUCENT_BLOCKS)return;var mc=Minecraft.getInstance();if(mc.player==null||mc.level==null)return;
        var camera=e.getCamera().getPosition();PoseStack pose=e.getPoseStack();var buffers=mc.renderBuffers().bufferSource();boolean drew=false;
        if(state!=null)for(JsonObject m:memorials.values()){
            if(!mc.level.dimension().location().toString().equals(m.get("dimension").getAsString()))continue;
            BlockPos anchor=new BlockPos(m.get("x").getAsInt(),m.get("y").getAsInt(),m.get("z").getAsInt());
            if(!mc.level.hasChunkAt(anchor)||!mc.level.getBlockState(anchor).is(Blocks.BARREL))continue;
            Direction facing=Direction.byName(m.get("facing").getAsString());if(facing==null)continue;BlockPos plaque=anchor.relative(facing.getOpposite(),7).above(3);
            double x=plaque.getX()+.5+facing.getStepX()*.51,y=plaque.getY()+1,z=plaque.getZ()+.5+facing.getStepZ()*.51;
            if(mc.player.distanceToSqr(x,y,z)>576)continue;
            List<String> lines=flag("complete")?List.of("THE RANKER'S MEMORIAL","The Promise Fulfilled",state.get("username").getAsString(),"Bearer of Tears for Fears","A promise once broken, now fulfilled."):List.of("THE RANKER'S MEMORIAL","The Unfinished Promise","A promise once broken, waiting to be fulfilled.");
            pose.pushPose();try{pose.translate(x-camera.x,y-camera.y,z-camera.z);pose.mulPose(Axis.YP.rotationDegrees(switch(facing){case EAST->90;case SOUTH->180;case WEST->270;default->0;}));pose.scale(-.012f,-.012f,.012f);
                for(int i=0;i<lines.size();i++){String line=lines.get(i);mc.font.drawInBatch(line,-mc.font.width(line)/2f,i*12,i<2?0xFFFFD080:0xFFFFFFFF,false,pose.last().pose(),buffers,net.minecraft.client.gui.Font.DisplayMode.NORMAL,0,LightTexture.FULL_BRIGHT);}
                drew=true;
            }finally{pose.popPose();}
        }
        if(cinematic!=null&&mc.level.dimension().location().toString().equals(cinematic.get("dimension").getAsString())){
            double age=mc.level.getGameTime()-cinematicStart+e.getPartialTick();
            if(age>=285&&age<295){bolt(pose,buffers.getBuffer(RenderType.lightning()),(float)(cinematic.get("x").getAsDouble()-camera.x),(float)(cinematic.get("y").getAsDouble()+2-camera.y),(float)(cinematic.get("z").getAsDouble()-camera.z));drew=true;}
            ResourceLocation skin=ResourceLocation.tryParse(cinematic.get("skin").getAsString());
            if(age<290&&skin!=null&&mc.getResourceManager().getResource(skin).isPresent()){
                if(model==null)model=new PlayerModel<>(mc.getEntityModels().bakeLayer(cinematic.get("slim").getAsBoolean()?ModelLayers.PLAYER_SLIM:ModelLayers.PLAYER),cinematic.get("slim").getAsBoolean());
                pose.pushPose();try{double rise=Math.min(2,age/140.0);pose.translate(cinematic.get("x").getAsDouble()-camera.x,cinematic.get("y").getAsDouble()+1.5+rise-camera.y,cinematic.get("z").getAsDouble()-camera.z);pose.scale(1,-1,-1);
                    float opening=(float)Math.min(1,Math.max(0,(age-30)/90));model.head.xRot=-.35f*opening;model.leftArm.zRot=(float)Math.PI/2*opening;model.rightArm.zRot=-(float)Math.PI/2*opening;
                    model.hat.copyFrom(model.head);model.leftSleeve.copyFrom(model.leftArm);model.rightSleeve.copyFrom(model.rightArm);
                    model.renderToBuffer(pose,buffers.getBuffer(RenderType.entityTranslucent(skin)),LightTexture.FULL_BRIGHT,OverlayTexture.NO_OVERLAY,1,1,1,.65f);drew=true;
                }finally{pose.popPose();}
            }
        }
        if(drew)buffers.endBatch();
    }
    static void bolt(PoseStack pose,VertexConsumer vertices,float x,float y,float z){
        Random random=new Random(cinematicStart);float lastX=x,lastY=y+9,lastZ=z;
        for(int i=1;i<=8;i++){
            float nextX=i==8?x:x+(random.nextFloat()-.5f)*.8f,nextZ=i==8?z:z+(random.nextFloat()-.5f)*.8f,nextY=y+9-i*9f/8;
            float t=.045f;
            vertices.vertex(pose.last().pose(),lastX-t,lastY,lastZ).color(1,1,.9f,.95f).endVertex();vertices.vertex(pose.last().pose(),lastX+t,lastY,lastZ).color(1,1,.9f,.95f).endVertex();vertices.vertex(pose.last().pose(),nextX+t,nextY,nextZ).color(1,1,.9f,.95f).endVertex();vertices.vertex(pose.last().pose(),nextX-t,nextY,nextZ).color(1,1,.9f,.95f).endVertex();
            vertices.vertex(pose.last().pose(),lastX,lastY,lastZ-t).color(1,1,.9f,.95f).endVertex();vertices.vertex(pose.last().pose(),lastX,lastY,lastZ+t).color(1,1,.9f,.95f).endVertex();vertices.vertex(pose.last().pose(),nextX,nextY,nextZ+t).color(1,1,.9f,.95f).endVertex();vertices.vertex(pose.last().pose(),nextX,nextY,nextZ-t).color(1,1,.9f,.95f).endVertex();
            lastX=nextX;lastY=nextY;lastZ=nextZ;
        }
    }
}
