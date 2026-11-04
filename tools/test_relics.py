"""Run production native rule/journal, in-place binding fixtures and the real knife coremod offline."""
from pathlib import Path
import os,subprocess,uuid,zipfile
from relic_build_env import *

FIXTURES={
'net/minecraft/nbt/Tag.java': 'package net.minecraft.nbt;public class Tag {}',
'net/minecraft/nbt/CompoundTag.java': '''package net.minecraft.nbt;
import java.util.*;public class CompoundTag extends Tag {public final Map<String,Object> values=new HashMap<>();
public CompoundTag m_128469_(String k){Object v=values.get(k);return v instanceof CompoundTag c?c:new CompoundTag();}
public boolean m_128471_(String k){return Boolean.TRUE.equals(values.get(k));}
public boolean m_128403_(String k){return values.get(k) instanceof UUID;}
public UUID m_128342_(String k){return (UUID)values.get(k);}
public String m_128461_(String k){return String.valueOf(values.getOrDefault(k,""));}
public void m_128405_(String k,int v){values.put(k,v);}public void m_128379_(String k,boolean v){values.put(k,v);}
public void m_128362_(String k,UUID v){values.put(k,v);}public void m_128359_(String k,String v){values.put(k,v);}
public Tag m_128365_(String k,Tag v){return (Tag)values.put(k,v);}}
''',
'net/minecraft/world/entity/Entity.java':'package net.minecraft.world.entity;public class Entity {public java.util.UUID id=java.util.UUID.randomUUID();public java.util.UUID m_20148_(){return id;}}',
'net/minecraft/world/entity/LivingEntity.java':'package net.minecraft.world.entity;public class LivingEntity extends Entity {}',
'net/minecraft/world/entity/player/Player.java':'package net.minecraft.world.entity.player;public class Player extends net.minecraft.world.entity.LivingEntity {}',
'com/mojang/authlib/GameProfile.java':'package com.mojang.authlib;public record GameProfile(String name){public String getName(){return name;}}',
'net/minecraft/server/level/ServerPlayer.java':'package net.minecraft.server.level;public class ServerPlayer extends net.minecraft.world.entity.player.Player {public String name="Owner";public com.mojang.authlib.GameProfile m_36316_(){return new com.mojang.authlib.GameProfile(name);}}',
'net/minecraft/world/item/ItemStack.java':'package net.minecraft.world.item;public class ItemStack {public static int created;public final net.minecraft.nbt.CompoundTag root=new net.minecraft.nbt.CompoundTag();public ItemStack(){created++;}public net.minecraft.nbt.CompoundTag m_41783_(){return root;}public net.minecraft.nbt.CompoundTag m_41784_(){return root;}}',
'com/theranker/creativeguard/relics/RelicBindingTest.java':'''package com.theranker.creativeguard.relics;
import net.minecraft.world.item.ItemStack;import net.minecraft.server.level.ServerPlayer;import java.util.*;
public class RelicBindingTest {static int checks;static void check(boolean b,String s){checks++;if(!b)throw new AssertionError(s);}
public static void main(String[] args){ServerPlayer owner=new ServerPlayer(),other=new ServerPlayer();ItemStack sword=new ItemStack(),ring=new ItemStack();
Object enchants=new ArrayList<>(List.of("player-enchantment")),affixes=new HashMap<>(Map.of("socket","player-gem"));
sword.root.values.put("Enchantments",enchants);sword.root.values.put("apotheosis",affixes);sword.root.values.put("Damage",0);sword.root.values.put("display","Original name");
var original=sword.root;int count=ItemStack.created;
RelicItems.bind(sword,owner,"00000000-0000-4000-8000-000000000001","2026-11-04T12:00:00Z");RelicItems.bind(ring,owner,"00000000-0000-4000-8000-000000000001","2026-11-04T12:00:00Z");
check(ItemStack.created==count,"Awakening must not create replacement stacks");check(sword.root==original,"Original NBT compound retained");
check(sword.root.values.get("Enchantments")==enchants,"Exact player enchantment data retained");check(sword.root.values.get("apotheosis")==affixes,"Exact affix/socket data retained");
check(sword.root.values.get("display").equals("Original name")&&sword.root.values.get("Damage").equals(0),"Name and durability data retained");
check(sword.root.values.size()==5,"Only our namespaced compound was added");check(RelicItems.owned(sword,owner.id)&&RelicItems.owned(ring,owner.id),"Both relics bound to the same UUID");
check(!RelicItems.owned(sword,other.id)&&!RelicItems.bindable(sword,other.id),"Unauthorized bearer cannot use or overwrite awakened ownership");
owner.name="Renamed";check(RelicItems.owned(sword,owner.id),"Username change preserves ownership");
boolean rejected=false;try{RelicItems.bind(sword,other,"replacement","wrong");}catch(IllegalStateException e){rejected=true;}check(rejected,"Foreign rebinding rejected");
check(RelicItems.data(sword).m_128342_("owner").equals(owner.id),"Rejected rebinding never mutates owner");
System.out.println(checks+" production binding-bytecode fixture checks passed (not Minecraft).");}}
'''
}

def test(jar=None):
    jar=jar or BUILD/'outlandish-compatibility-fixes-1.2.8.jar'
    prepare();gson=INSTALL/'libraries/com/google/code/gson/gson/2.10/gson-2.10.jar'
    output=BUILD/'test';output.mkdir(parents=True,exist_ok=True)
    classes=output/'rules';compile_java([ROOT/'tools/java/RelicRulesTest.java'],classes,[gson,jar])
    world=output/('journal-'+uuid.uuid4().hex)
    subprocess.run([str(JAVA),'-Xverify:all','-cp',os.pathsep.join(map(str,[classes,gson,jar])),'RelicRulesTest',str(world)],check=True)
    src=output/'src'
    for name,code in FIXTURES.items():p=src/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(code,encoding='utf-8')
    fixtures=output/'binding';compile_java(list(src.rglob('*.java')),fixtures,[jar])
    api=[MC,FORGE,INSTANCE/'mods/curios-forge-5.14.1+1.20.1.jar']
    subprocess.run([str(JAVA),'-Xverify:all','-cp',os.pathsep.join(map(str,[fixtures,gson,jar]+api)),'com.theranker.creativeguard.relics.RelicBindingTest'],check=True)
    asm=[INSTALL/f'libraries/org/ow2/asm/{name}/9.7.1/{name}-9.7.1.jar' for name in ['asm','asm-commons','asm-tree','asm-util','asm-analysis']]
    nashorn=INSTALL/'libraries/org/openjdk/nashorn/nashorn-core/15.4/nashorn-core-15.4.jar'
    hook=output/'hook';compile_java([ROOT/'tools/java/RelicKnifeHookTest.java'],hook,asm+[nashorn])
    subprocess.run([str(JAVA),'-Xverify:all','-cp',os.pathsep.join(map(str,[hook]+asm+[nashorn])),'RelicKnifeHookTest',str(INSTANCE/'mods/BloodMagic-1.18-1.20.1-3.3.8-50.jar'),str(ROOT/'compat/relics-resources/coremods/legendary_knife.js')],check=True)

if __name__=='__main__':test()
