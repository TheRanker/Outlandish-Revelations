package com.theranker.creativeguard.relics;

import com.google.gson.*;
import java.util.Optional;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerPlayer;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.fml.loading.FMLEnvironment;
import net.minecraftforge.network.*;
import net.minecraftforge.network.simple.SimpleChannel;

/** Display-only clientbound messages. There is deliberately no serverbound relic action packet. */
final class RelicNetwork {
    private static SimpleChannel channel;
    record Message(String json){}
    static void install(){
        channel=NetworkRegistry.newSimpleChannel(new ResourceLocation("outlandish","legendary_relics"),()->"1","1"::equals,"1"::equals);
        channel.registerMessage(0,Message.class,(m,b)->b.writeUtf(m.json,32767),b->new Message(b.readUtf(32767)),(m,c)->{
            var context=c.get();context.enqueueWork(()->{if(FMLEnvironment.dist==Dist.CLIENT)RelicClient.receive(m.json);});context.setPacketHandled(true);
        },Optional.of(NetworkDirection.PLAY_TO_CLIENT));
    }
    static void installClient(){if(FMLEnvironment.dist==Dist.CLIENT)RelicClient.install();}
    static JsonObject packet(ServerPlayer p,String kind){JsonObject j=new JsonObject();j.addProperty("kind",kind);j.addProperty("playerUuid",p.getUUID().toString());return j;}
    static void send(ServerPlayer p,JsonObject j){if(channel!=null)channel.send(PacketDistributor.PLAYER.with(()->p),new Message(j.toString()));}
    static void clear(ServerPlayer p){send(p,packet(p,"clear"));}
    static void sync(ServerPlayer p){
        if(!RelicSystem.config.enabled||RelicSystem.store==null)return;
        try{
        var r=RelicSystem.record(p);var c=RelicCombat.active.get(p.getUUID());JsonObject j=packet(p,"state");
        j.addProperty("serverTick",RelicSystem.now());j.addProperty("complete",r.complete());j.addProperty("stages",r.stages);
        j.addProperty("completedAtUtc",r.completedAtUtc==null?"":r.completedAtUtc);j.addProperty("username",p.getGameProfile().getName());
        j.addProperty("resonance",c==null?0:c.resonance);j.addProperty("echoReadyAt",r.echoReadyAt);j.addProperty("skyReadyAt",r.skyReadyAt);
        j.addProperty("protectionReadyAt",r.protectionReadyAt);j.addProperty("lastStandReadyAt",r.lastStandReadyAt);
        var sword=p.getMainHandItem();var ring=RelicItems.equippedRing(p);
        j.addProperty("swordEquipped",RelicItems.id(sword).equals(RelicRules.SWORD));j.addProperty("ringEquipped",!ring.isEmpty());
        j.addProperty("swordOwned",RelicCombat.awakened(p,sword,RelicRules.SWORD));j.addProperty("ringOwned",RelicCombat.awakened(p,ring,RelicRules.RING));send(p,j);
        }catch(Exception x){System.err.println("[Outlandish relics] Display state failed closed: "+x);}
    }
    static void memorial(ServerPlayer p,Memorial m){JsonObject j=packet(p,"memorial");j.addProperty("id",m.id());j.addProperty("dimension",m.level().dimension().location().toString());
        j.addProperty("x",m.anchor().getX());j.addProperty("y",m.anchor().getY());j.addProperty("z",m.anchor().getZ());j.addProperty("facing",m.facing().getName());send(p,j);}
    static void ascension(ServerPlayer p,Memorial m){JsonObject j=packet(p,"ascension");j.addProperty("dimension",m.level().dimension().location().toString());
        j.addProperty("x",m.altar().getX()+.5);j.addProperty("y",m.altar().getY()+.5);j.addProperty("z",m.altar().getZ()+.5);j.addProperty("skin",RelicSystem.config.skinTexture);j.addProperty("slim",RelicSystem.config.slimSkin);send(p,j);sync(p);}
}
