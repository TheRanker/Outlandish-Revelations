"""Run the built bridge bytecode in a JVM against tiny API fixtures (not Minecraft)."""
from pathlib import Path
import subprocess,zipfile,argparse,os
ROOT=Path(__file__).resolve().parents[1]
FIXTURES={
'net/minecraft/resources/ResourceLocation.java':'package net.minecraft.resources; public record ResourceLocation(String id) { public String toString(){return id;} }',
'net/minecraft/world/item/Item.java':'package net.minecraft.world.item; public record Item(String id) {}',
'net/minecraft/world/item/ItemStack.java':'package net.minecraft.world.item; public record ItemStack(Item item) {public Item m_41720_(){return item;}}',
'net/minecraft/core/NonNullList.java':'package net.minecraft.core; public class NonNullList<T> extends java.util.ArrayList<T> {}',
'net/minecraft/world/entity/Entity.java':'package net.minecraft.world.entity; public class Entity { public java.util.UUID id=java.util.UUID.randomUUID(); public java.util.UUID m_20148_(){return id;} }',
'com/mojang/authlib/GameProfile.java':'package com.mojang.authlib; public record GameProfile(String name){public String getName(){return name;}}',
'net/minecraft/world/entity/player/Inventory.java':'package net.minecraft.world.entity.player; import net.minecraft.core.NonNullList; import net.minecraft.world.item.ItemStack; public class Inventory {public NonNullList<ItemStack> f_35974_=new NonNullList<>(),f_35975_=new NonNullList<>(),f_35976_=new NonNullList<>();}',
'net/minecraft/server/level/ServerPlayer.java':'package net.minecraft.server.level; public class ServerPlayer extends net.minecraft.world.entity.Entity {public String name="Original"; public net.minecraft.world.entity.player.Inventory inventory=new net.minecraft.world.entity.player.Inventory(); public com.mojang.authlib.GameProfile m_36316_(){return new com.mojang.authlib.GameProfile(name);} public net.minecraft.world.entity.player.Inventory m_150109_(){return inventory;}}',
'net/minecraftforge/registries/IForgeRegistry.java':'package net.minecraftforge.registries; public interface IForgeRegistry<T> { net.minecraft.resources.ResourceLocation getKey(T value); }',
'net/minecraftforge/registries/ForgeRegistries.java':'package net.minecraftforge.registries; public class ForgeRegistries { public static final IForgeRegistry<net.minecraft.world.item.Item> ITEMS=item->new net.minecraft.resources.ResourceLocation(item.id()); }',
'net/minecraftforge/api/distmarker/Dist.java':'package net.minecraftforge.api.distmarker; public enum Dist {CLIENT,DEDICATED_SERVER;public boolean isClient(){return this==CLIENT;}}',
'net/minecraftforge/fml/loading/FMLEnvironment.java':'package net.minecraftforge.fml.loading; public class FMLEnvironment {public static net.minecraftforge.api.distmarker.Dist dist=net.minecraftforge.api.distmarker.Dist.DEDICATED_SERVER;}',
'net/minecraftforge/eventbus/api/EventPriority.java':'package net.minecraftforge.eventbus.api; public enum EventPriority {LOWEST}',
'net/minecraftforge/eventbus/api/IEventBus.java':"""package net.minecraftforge.eventbus.api; import java.util.function.Consumer; public interface IEventBus {<T> void addListener(EventPriority p,boolean canceled,Class<T> type,Consumer<T> callback); <T> void addListener(Consumer<T> callback);}""",
'net/minecraftforge/common/MinecraftForge.java':"""package net.minecraftforge.common; import java.util.function.Consumer; import net.minecraftforge.eventbus.api.*; public class MinecraftForge { public static final IEventBus EVENT_BUS=new Bus(); public static class Bus implements IEventBus {public int interactions,renders;public boolean receivesCanceled;public EventPriority priority;public Consumer<Object> conversation,renderer; @SuppressWarnings("unchecked") public <T> void addListener(EventPriority p,boolean c,Class<T> t,Consumer<T> cb){interactions++;priority=p;receivesCanceled=c;conversation=(Consumer<Object>)cb;} @SuppressWarnings("unchecked") public <T> void addListener(Consumer<T> cb){renders++;renderer=(Consumer<Object>)cb;} } }""",
'net/minecraftforge/event/entity/player/PlayerInteractEvent.java':'package net.minecraftforge.event.entity.player; public class PlayerInteractEvent {public static class EntityInteractSpecific {}}',
'net/minecraftforge/client/event/RenderLevelStageEvent.java':'package net.minecraftforge.client.event; public record RenderLevelStageEvent(Stage stage) {public enum Stage {AFTER_TRANSLUCENT_BLOCKS,OTHER} public Stage getStage(){return stage;}}',
'BridgeTest.java':"""import com.theranker.creativeguard.WorldRemembersBridge; import net.minecraft.server.level.ServerPlayer; import net.minecraft.world.item.*; import net.minecraftforge.common.MinecraftForge; import net.minecraftforge.client.event.RenderLevelStageEvent; import net.minecraftforge.event.entity.player.PlayerInteractEvent; import net.minecraftforge.fml.loading.FMLEnvironment; import net.minecraftforge.api.distmarker.Dist;
public class BridgeTest {static int checks;static void check(boolean ok){if(!ok)throw new AssertionError("check "+checks);checks++;} public static void main(String[] args){ServerPlayer p=new ServerPlayer();String id=WorldRemembersBridge.uuid(p);p.name="Renamed";check(WorldRemembersBridge.uuid(p).equals(id));check(WorldRemembersBridge.username(p).equals("Renamed"));check(!WorldRemembersBridge.hasSword(p));ItemStack sword=new ItemStack(new Item("kubejs:rankers_sword"));p.inventory.f_35975_.add(sword);check(!WorldRemembersBridge.hasSword(p));p.inventory.f_35974_.add(sword);check(WorldRemembersBridge.hasSword(p));p.inventory.f_35974_.clear();p.inventory.f_35976_.add(sword);check(WorldRemembersBridge.hasSword(p));p.inventory.f_35976_.clear();check(!WorldRemembersBridge.hasSword(p));int[] calls={0,0};WorldRemembersBridge.installConversation(e->calls[0]++);WorldRemembersBridge.installConversation(e->calls[1]++);MinecraftForge.Bus bus=(MinecraftForge.Bus)MinecraftForge.EVENT_BUS;check(bus.interactions==1 && bus.receivesCanceled && bus.priority==net.minecraftforge.eventbus.api.EventPriority.LOWEST);bus.conversation.accept(new PlayerInteractEvent.EntityInteractSpecific());check(calls[0]==0 && calls[1]==1);WorldRemembersBridge.installRenderer(e->calls[0]++);check(bus.renders==0);FMLEnvironment.dist=Dist.CLIENT;WorldRemembersBridge.installRenderer(e->calls[0]++);WorldRemembersBridge.installRenderer(e->calls[1]++);check(bus.renders==1);bus.renderer.accept(new RenderLevelStageEvent(RenderLevelStageEvent.Stage.OTHER));check(calls[1]==1);bus.renderer.accept(new RenderLevelStageEvent(RenderLevelStageEvent.Stage.AFTER_TRANSLUCENT_BLOCKS));check(calls[1]==2 && calls[0]==0);System.out.println(checks+" native bridge fixture checks passed (not Minecraft).");}}
""",
'ServerIsolationTest.java':'import com.theranker.creativeguard.WorldRemembersBridge;public class ServerIsolationTest {public static void main(String[] a){WorldRemembersBridge.installRenderer(e->{throw new AssertionError();});WorldRemembersBridge.installConversation(e->{});System.out.println("Dedicated-side JVM loaded bridge with client bridge/event classes absent.");}}'
}
def test(java,compiler,jar=None):
    build=ROOT/'build/native-bridge/test';src=build/'src';classes=build/'classes';classes.mkdir(parents=True,exist_ok=True)
    for name,code in FIXTURES.items():
        p=src/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(code,encoding='utf-8')
    jar=jar or ROOT/'build/native-bridge/outlandish-compatibility-fixes-1.2.7.jar'
    args=['-source','17','-target','17','-encoding','UTF-8','-proc:none','-classpath',str(jar),'-d',str(classes)]+[str(p) for p in src.rglob('*.java')]
    argfile=build/'test.args';argfile.write_text('\n'.join('"'+a.replace('\\','/')+'"' for a in args),encoding='utf-8')
    subprocess.run([str(java),'-jar',str(compiler),'@'+str(argfile)],check=True)
    subprocess.run([str(java),'-Xverify:all','-cp',str(classes)+os.pathsep+str(jar),'BridgeTest'],check=True)
    isolated=build/'server-only.jar'
    with zipfile.ZipFile(isolated,'w') as z:
        for p in classes.rglob('*.class'):
            n=p.relative_to(classes).as_posix()
            if not n.startswith('net/minecraftforge/client/') and n!='BridgeTest.class':z.write(p,n)
        with zipfile.ZipFile(jar) as original:z.writestr('com/theranker/creativeguard/WorldRemembersBridge.class',original.read('com/theranker/creativeguard/WorldRemembersBridge.class'))
    subprocess.run([str(java),'-Xverify:all','-cp',str(isolated),'ServerIsolationTest'],check=True)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--java',type=Path,required=True);p.add_argument('--compiler',type=Path,required=True);p.add_argument('--jar',type=Path);a=p.parse_args();test(a.java,a.compiler,a.jar)
