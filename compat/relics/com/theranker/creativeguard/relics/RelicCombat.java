package com.theranker.creativeguard.relics;

import java.util.*;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.damagesource.*;
import net.minecraft.world.entity.*;
import net.minecraft.world.entity.ai.attributes.*;
import net.minecraft.world.entity.monster.Enemy;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.phys.*;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.entity.living.*;
import net.minecraftforge.event.entity.player.AttackEntityEvent;
import net.minecraftforge.eventbus.api.*;
import top.theillusivec4.caelus.api.CaelusApi;
import top.theillusivec4.curios.api.event.CurioChangeEvent;

/** Combat uses actual events; delayed effects cannot feed themselves or grant resonance. */
public final class RelicCombat {
    static final UUID FLIGHT=UUID.fromString("cf65a4b4-71fc-4db7-bdc9-ef1a5b85ce23");
    static final String LANDING="outlandishRelicLandingUntil";
    static final Map<UUID,Combat> active=new HashMap<>();
    static final Map<UUID,Intent> intents=new HashMap<>();
    static final Map<UUID,Map<UUID,Long>> marks=new HashMap<>();
    static final Map<UUID,Long> safeLanding=new HashMap<>();
    static final PriorityQueue<Echo> echoes=new PriorityQueue<>(Comparator.comparingLong(Echo::due));
    static final ThreadLocal<Boolean> secondary=ThreadLocal.withInitial(()->false);
    static final class Combat {int resonance;long meleeAt=-1,sonicAt=-1,combatAt,decayAt;}
    record Intent(UUID target,long tick,boolean charged,boolean aerial){}
    record Echo(long due,UUID player,UUID target,net.minecraft.resources.ResourceKey<net.minecraft.world.level.Level> dimension,float damage){}
    static void reset(){active.clear();intents.clear();marks.clear();safeLanding.clear();echoes.clear();}
    static void logout(UUID id){active.remove(id);intents.remove(id);safeLanding.remove(id);marks.remove(id);for(var map:marks.values())map.remove(id);echoes.removeIf(e->e.player.equals(id));}
    static boolean live(){return RelicSystem.config.enabled&&RelicSystem.store!=null&&RelicSystem.server!=null;}
    static net.minecraft.nbt.CompoundTag landingData(ServerPlayer p){return ((net.minecraftforge.common.extensions.IForgeEntity)(Object)p).getPersistentData();}
    static void restoreLanding(ServerPlayer p){long until=landingData(p).getLong(LANDING);if(until>RelicSystem.now())safeLanding.put(p.getUUID(),until);else landingData(p).remove(LANDING);}
    static boolean awakened(ServerPlayer p,ItemStack stack,String type){return RelicItems.id(stack).equals(type)&&RelicItems.owned(stack,p.getUUID())&&RelicSystem.record(p).complete();}
    static boolean hostile(ServerPlayer p,LivingEntity target){
        if(!target.isAlive()||!(target instanceof Enemy)||target instanceof Player||target instanceof OwnableEntity||p.isAlliedTo(target)||target.isAlliedTo(p))return false;
        if(target instanceof NeutralMob neutral&&!neutral.isAngryAt(p))return false;
        if(target instanceof net.minecraft.world.entity.monster.piglin.Piglin piglin&&piglin.getTarget()!=p)return false;
        return true;
    }
    static Combat combat(ServerPlayer p){return active.computeIfAbsent(p.getUUID(),id->new Combat());}
    @SubscribeEvent(priority=EventPriority.HIGHEST) public void attack(AttackEntityEvent e){
        if(!live()||!(e.getEntity() instanceof ServerPlayer p))return;
        try{if(awakened(p,p.getMainHandItem(),RelicRules.SWORD))intents.put(p.getUUID(),new Intent(e.getTarget().getUUID(),RelicSystem.now(),p.getAttackStrengthScale(.5f)>=.9f,!p.onGround()&&!p.isInWater()&&!p.isPassenger()));}
        catch(Exception x){System.err.println("[Outlandish relics] Attack handler failed closed: "+x);}
    }
    @SubscribeEvent(priority=EventPriority.LOWEST) public void damage(LivingDamageEvent e){
        if(!live()||e.isCanceled()||!Float.isFinite(e.getAmount())||e.getAmount()<=0)return;
        try{
            if(e.getEntity() instanceof ServerPlayer p){protection(p,e);Combat defending=active.get(p.getUUID());if(defending!=null&&e.getSource().getEntity() instanceof LivingEntity attacker&&hostile(p,attacker))defending.combatAt=RelicSystem.now();}
            if(secondary.get())return;
            if(!(e.getSource().getEntity() instanceof ServerPlayer p)||!hostile(p,e.getEntity()))return;
            if(!awakened(p,p.getMainHandItem(),RelicRules.SWORD))return;
            long now=RelicSystem.now();Combat c=combat(p);c.combatAt=now;c.decayAt=now;
            if(e.getSource().is(DamageTypes.SONIC_BOOM)){
                var own=marks.computeIfAbsent(p.getUUID(),id->new HashMap<>());own.values().removeIf(expiry->expiry<=now);
                if(own.size()<256||own.containsKey(e.getEntity().getUUID()))own.put(e.getEntity().getUUID(),now+RelicRules.FRACTURE_TICKS);
                // The preserved original sonic attack hits once and has a 200-tick activation cooldown.
                if(c.sonicAt<0||now-c.sonicAt>=200){c.sonicAt=now;c.resonance=RelicRules.resonance(c.resonance,15);}
                RelicNetwork.sync(p);return;
            }
            if(!e.getSource().is(DamageTypes.PLAYER_ATTACK))return;
            float original=e.getAmount();var own=marks.get(p.getUUID());Long expiry=own==null?null:own.remove(e.getEntity().getUUID());
            if(expiry!=null&&expiry>now)e.setAmount(original+(float)RelicRules.fracture(original));
            Intent intent=intents.remove(p.getUUID());if(intent==null||!intent.target.equals(e.getEntity().getUUID())||intent.tick!=now||!intent.charged)return;
            if(c.meleeAt<0||now-c.meleeAt>=RelicRules.MELEE_GAIN_INTERVAL){c.meleeAt=now;c.resonance=RelicRules.resonance(c.resonance,8);}
            var r=RelicSystem.record(p);ItemStack ring=RelicItems.equippedRing(p);
            if(intent.aerial&&awakened(p,ring,RelicRules.RING)&&c.resonance>=RelicRules.SKY_COST&&now>=r.skyReadyAt){
                long old=r.skyReadyAt;r.skyReadyAt=now+RelicRules.SKY_COOLDOWN;
                try{RelicSystem.store.save(r);}catch(Exception x){r.skyReadyAt=old;throw x;}
                c.resonance-=RelicRules.SKY_COST;shockwave(p,e.getEntity().position(),RelicRules.SKY_RADIUS,RelicRules.SKY_DAMAGE,false);
            }else if(c.resonance>=RelicRules.ECHO_COST&&now>=r.echoReadyAt){
                long old=r.echoReadyAt;r.echoReadyAt=now+RelicRules.ECHO_COOLDOWN;
                try{RelicSystem.store.save(r);}catch(Exception x){r.echoReadyAt=old;throw x;}
                c.resonance-=RelicRules.ECHO_COST;echoes.add(new Echo(now+RelicRules.ECHO_DELAY,p.getUUID(),e.getEntity().getUUID(),p.serverLevel().dimension(),(float)RelicRules.echo(original)));
            }
            RelicNetwork.sync(p);
        }catch(Exception x){System.err.println("[Outlandish relics] Damage handler failed closed: "+x);}
    }
    static void protection(ServerPlayer p,LivingDamageEvent e)throws Exception{
        if(p.isCreative()||p.isSpectator()||RelicItems.equippedRing(p).isEmpty()||e.getSource().is(DamageTypes.GENERIC_KILL)||e.getSource().getMsgId().toLowerCase().contains("sacrifice"))return;
        var r=RelicSystem.record(p);long now=RelicSystem.now();
        if(now>=r.protectionReadyAt&&RelicRules.dangerous(e.getAmount(),p.getMaxHealth())){
            long old=r.protectionReadyAt;r.protectionReadyAt=now+RelicRules.PROTECTION_COOLDOWN;
            try{RelicSystem.store.save(r);}catch(Exception x){r.protectionReadyAt=old;throw x;}
            e.setAmount((float)RelicRules.protectedDamage(e.getAmount()));RelicNetwork.sync(p);
        }
    }
    @SubscribeEvent(priority=EventPriority.LOWEST) public void death(LivingDeathEvent e){
        if(!live()||e.isCanceled()||!(e.getEntity() instanceof ServerPlayer p)||p.isCreative()||p.isSpectator()||e.getSource().is(DamageTypes.GENERIC_KILL))return;
        try{
            if(!awakened(p,RelicItems.equippedRing(p),RelicRules.RING))return;
            var r=RelicSystem.record(p);long now=RelicSystem.now();if(now<r.lastStandReadyAt)return;
            float restored=RelicRules.restoredHealth(p.getMaxHealth());if(restored<=0)return;
            long old=r.lastStandReadyAt;r.lastStandReadyAt=now+RelicRules.LAST_STAND_COOLDOWN;
            try{RelicSystem.store.save(r);}catch(Exception x){r.lastStandReadyAt=old;throw x;}
            // Vanilla Totems are checked before LivingDeathEvent. Earlier mod cancellations are respected.
            e.setCanceled(true);p.setHealth(restored);p.invulnerableTime=Math.max(p.invulnerableTime,20);
            shockwave(p,p.position(),RelicRules.PULSE_RADIUS,0,true);RelicNetwork.sync(p);
        }catch(Exception x){RelicSystem.failure(p,x);}
    }
    static void shockwave(ServerPlayer p,Vec3 center,double radius,float damage,boolean knockback){
        secondary.set(true);
        try{
            for(LivingEntity target:p.serverLevel().getEntitiesOfClass(LivingEntity.class,new AABB(center,center).inflate(radius),e->hostile(p,e))){
                if(target.distanceToSqr(center)>radius*radius)continue;
                if(knockback){Vec3 v=target.position().subtract(center);if(v.horizontalDistanceSqr()>.001){v=new Vec3(v.x,0,v.z).normalize();target.knockback(.9,-v.x,-v.z);target.hurtMarked=true;}}
                else target.hurt(p.damageSources().playerAttack(p),Math.min(12,damage));
            }
            p.serverLevel().sendParticles(net.minecraft.core.particles.ParticleTypes.SONIC_BOOM,center.x,center.y+.5,center.z,1,0,0,0,0);
        }finally{secondary.set(false);}
    }
    @SubscribeEvent public void equipmentChanged(CurioChangeEvent e){
        if(!live()||!(e.getEntity() instanceof ServerPlayer p))return;
        if(RelicItems.id(e.getFrom()).equals(RelicRules.RING)||RelicItems.id(e.getTo()).equals(RelicRules.RING))equipment(p);
    }
    @SubscribeEvent public void handChanged(LivingEquipmentChangeEvent e){if(live()&&e.getEntity() instanceof ServerPlayer p&&(RelicItems.id(e.getFrom()).equals(RelicRules.SWORD)||RelicItems.id(e.getTo()).equals(RelicRules.SWORD)))RelicNetwork.sync(p);}
    static void equipment(ServerPlayer p){
        try{
            var attribute=p.getAttribute(CaelusApi.getInstance().getFlightAttribute());if(attribute==null)return;
            boolean allow=live()&&awakened(p,RelicItems.equippedRing(p),RelicRules.RING),present=attribute.getModifier(FLIGHT)!=null;
            if(allow&&!present)attribute.addTransientModifier(new AttributeModifier(FLIGHT,"Outlandish awakened ring flight",1,AttributeModifier.Operation.ADDITION));
            if(!allow&&present){
                boolean airborne=p.getAbilities().flying&&!p.onGround();attribute.removeModifier(FLIGHT);
                if(airborne&&!p.isCreative()&&attribute.getValue()<=0){long until=RelicSystem.now()+1200;safeLanding.put(p.getUUID(),until);landingData(p).putLong(LANDING,until);p.fallDistance=0;}
            }
            if(live())RelicNetwork.sync(p);
        }catch(Exception x){System.err.println("[Outlandish relics] Equipment update: "+x);}
    }
    @SubscribeEvent public void fall(LivingFallEvent e){
        if(RelicSystem.server==null||!(e.getEntity() instanceof ServerPlayer p))return;
        Long cached=safeLanding.remove(p.getUUID());long until=Math.max(cached==null?0:cached,landingData(p).getLong(LANDING));landingData(p).remove(LANDING);
        if(until>RelicSystem.now())e.setDamageMultiplier(0);
    }
    @SubscribeEvent public void tick(TickEvent.ServerTickEvent e){
        if(e.phase!=TickEvent.Phase.END||!live())return;long now=RelicSystem.now();
        while(!echoes.isEmpty()&&echoes.peek().due<=now){Echo hit=echoes.poll();try{ServerPlayer p=RelicSystem.server.getPlayerList().getPlayer(hit.player);if(p==null||!p.isAlive()||p.serverLevel().dimension()!=hit.dimension)continue;
            Entity target=p.serverLevel().getEntity(hit.target);if(!(target instanceof LivingEntity living)||!hostile(p,living)||p.distanceToSqr(target)>1024)continue;
            if(!awakened(p,p.getMainHandItem(),RelicRules.SWORD))continue;
            var key=net.minecraft.resources.ResourceKey.create(net.minecraft.core.registries.Registries.DAMAGE_TYPE,new net.minecraft.resources.ResourceLocation("outlandish:relic_echo"));
            var type=p.serverLevel().registryAccess().registryOrThrow(net.minecraft.core.registries.Registries.DAMAGE_TYPE).getHolderOrThrow(key);
            secondary.set(true);try{living.hurt(new DamageSource(type,p),hit.damage);}finally{secondary.set(false);}
            }catch(Exception x){System.err.println("[Outlandish relics] Delayed hit failed closed: "+x);}
        }
        if(now%20!=0)return;
        var iterator=active.entrySet().iterator();while(iterator.hasNext()){
            var entry=iterator.next();ServerPlayer p=RelicSystem.server.getPlayerList().getPlayer(entry.getKey());if(p==null){iterator.remove();continue;}
            Combat c=entry.getValue();if(c.resonance>0&&now-c.combatAt>=RelicRules.COMBAT_IDLE&&now-c.decayAt>=20){c.resonance--;c.decayAt=now;RelicNetwork.sync(p);}
        }
        safeLanding.entrySet().removeIf(entry->{ServerPlayer p=RelicSystem.server.getPlayerList().getPlayer(entry.getKey());if(p==null)return true;if(p.onGround()||now>entry.getValue()){landingData(p).remove(LANDING);return true;}p.fallDistance=0;return false;});
    }
}
