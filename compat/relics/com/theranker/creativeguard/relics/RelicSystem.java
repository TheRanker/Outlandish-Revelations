package com.theranker.creativeguard.relics;

import com.google.gson.*;
import com.mojang.brigadier.CommandDispatcher;
import java.nio.file.*;
import java.time.Instant;
import java.util.*;
import java.util.function.Consumer;
import net.minecraft.commands.*;
import net.minecraft.core.*;
import net.minecraft.core.registries.Registries;
import net.minecraft.network.chat.*;
import net.minecraft.resources.*;
import net.minecraft.server.*;
import net.minecraft.server.level.*;
import net.minecraft.world.entity.item.ItemEntity;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.*;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.*;
import net.minecraft.world.level.storage.LevelResource;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.*;
import net.minecraftforge.event.entity.living.*;
import net.minecraftforge.event.entity.player.*;
import net.minecraftforge.event.level.ChunkWatchEvent;
import net.minecraftforge.event.server.*;
import net.minecraftforge.eventbus.api.*;
import net.minecraftforge.fml.loading.FMLPaths;
import net.minecraftforge.registries.ForgeRegistries;
import wayoftime.bloodmagic.common.tile.TileAltar;
import wayoftime.bloodmagic.event.SacrificeKnifeUsedEvent;

/** Server authority and durable personal ritual. No public grant command or client completion packet. */
public final class RelicSystem {
    static final RelicSystem INSTANCE=new RelicSystem();
    static Config config=new Config();
    static MinecraftServer server;
    static RelicStore store;
    static Consumer<ServerPlayer> completed;
    private static boolean installed;
    static final Map<UUID,Memorial> visiting=new HashMap<>();
    static final Map<String,UUID> locks=new HashMap<>();
    static final Map<String,Long> lockUntil=new HashMap<>();
    private static final Map<UUID,KnifeAttempt> knives=new HashMap<>();
    private static final ThreadLocal<UUID> knifeActor=new ThreadLocal<>();
    private static final Map<UUID,String> knifeRecipients=new HashMap<>();
    record KnifeAttempt(Memorial memorial,int blood,float health,long tick){}
    public static final class Config {
        public boolean enabled=false;
        public String skinTexture="outlandish:textures/entity/the_ranker.png";
        public boolean slimSkin=false;
        public Map<String,String> npcAdvancements=new LinkedHashMap<>();
    }
    private RelicSystem(){}
    public static synchronized void install(){
        if(installed)return;installed=true;RelicNetwork.install();
        MinecraftForge.EVENT_BUS.register(INSTANCE);MinecraftForge.EVENT_BUS.register(new RelicCombat());
        RelicNetwork.installClient();
    }
    public static void setCompletionCallback(Consumer<ServerPlayer> callback){completed=callback;}
    static long now(){return server.overworld().getGameTime();}
    static RelicStore.Progress record(ServerPlayer p){return store.get(p.getUUID());}
    static void say(ServerPlayer p,String text){p.sendSystemMessage(Component.literal(text));}
    static void failure(ServerPlayer p,Exception e){System.err.println("[Outlandish relics] "+e);say(p,"Relic action stopped safely: "+e.getMessage());}
    @SubscribeEvent public void start(ServerStartedEvent e){
        server=e.getServer();store=null;visiting.clear();locks.clear();lockUntil.clear();knives.clear();knifeRecipients.clear();knifeActor.remove();RelicCombat.reset();
        try{reload();store=new RelicStore(server.getWorldPath(LevelResource.ROOT));System.out.println("[Outlandish relics] Native relic system loaded; enabled="+config.enabled);}
        catch(Exception x){config.enabled=false;System.err.println("[Outlandish relics] Disabled after load failure: "+x);}
    }
    static void reload()throws Exception{
        Path file=FMLPaths.GAMEDIR.get().resolve("kubejs/outlandish/legendary_relics.json");
        Config value=RelicStore.JSON.fromJson(Files.readString(file),Config.class);
        if(value==null||value.npcAdvancements.size()!=12||new HashSet<>(value.npcAdvancements.values()).size()!=12)throw new IllegalStateException("Expected twelve personal advancement links");
        config=value;
    }
    @SubscribeEvent public void stop(ServerStoppedEvent e){server=null;store=null;visiting.clear();locks.clear();lockUntil.clear();knives.clear();knifeRecipients.clear();knifeActor.remove();RelicCombat.reset();}
    @SubscribeEvent public void commands(RegisterCommandsEvent e){
        CommandDispatcher<CommandSourceStack> d=e.getDispatcher();
        d.register(Commands.literal("orritual").executes(c->status(c.getSource().getPlayerOrException()))
            .then(Commands.literal("offer").executes(c->{offer(c.getSource().getPlayerOrException());return 1;})));
        d.register(Commands.literal("orrelics").executes(c->status(c.getSource().getPlayerOrException()))
            .then(Commands.literal("reload").requires(s->s.hasPermission(2)).executes(c->{try{reload();if(!config.enabled)RelicCombat.reset();for(ServerPlayer p:c.getSource().getServer().getPlayerList().getPlayers()){RelicCombat.equipment(p);if(!config.enabled)RelicNetwork.clear(p);}c.getSource().sendSuccess(()->Component.literal("Relic configuration reloaded."),false);return 1;}catch(Exception x){throw new RuntimeException(x);}})));
    }
    static int status(ServerPlayer p){
        if(!config.enabled||store==null){say(p,"The native relic system is disabled in this development build.");return 0;}
        try{var r=record(p);say(p,r.complete()?"The Promise Fulfilled — "+r.completedAtUtc:"Personal offerings: "+r.stages+"/3 ("+r.lpConsumed+"/30,000 LP). Remaining stories: "+missingStories(p).size());RelicNetwork.sync(p);return 1;}catch(Exception x){failure(p,x);return 0;}
    }
    static List<String> missingStories(ServerPlayer p){
        List<String> missing=new ArrayList<>();
        config.npcAdvancements.forEach((id,name)->{var a=p.server.getAdvancements().getAdvancement(new ResourceLocation(name));if(a==null||!p.getAdvancements().getOrStartProgress(a).isDone())missing.add(id);});return missing;
    }
    static void eligible(ServerPlayer p){
        if(p.isCreative()||p.isSpectator()||!p.isAlive())throw new IllegalStateException("A living Survival player must make the personal offering");
        if(p.server.getAdvancements().getAdvancement(new ResourceLocation("outlandish:the_promise_fulfilled"))==null)throw new IllegalStateException("Personal advancement resource is missing");
        if(!missingStories(p).isEmpty())throw new IllegalStateException("Finish your own twelve NPC storylines first");
        ItemStack sword=RelicItems.sword(p),ring=RelicItems.ring(p);
        if(sword.isEmpty()||ring.isEmpty())throw new IllegalStateException("Bring Tears for Fears and the Ring of Ranker");
        if(RelicItems.count(p,RelicRules.SWORD)!=1||RelicItems.count(p,RelicRules.RING)!=1)throw new IllegalStateException("Carry only the one sword and one ring you want to awaken; store spare copies first");
        if(!RelicItems.bindable(sword,p.getUUID())||!RelicItems.bindable(ring,p.getUUID()))throw new IllegalStateException("A relic belongs to another player");
    }
    @SubscribeEvent(priority=EventPriority.HIGHEST) public void plaque(PlayerInteractEvent.RightClickBlock e){
        if(!config.enabled||store==null||!(e.getEntity() instanceof ServerPlayer p)||e.getHand()!=net.minecraft.world.InteractionHand.MAIN_HAND)return;
        try{Memorial m=Memorial.atPlaque(p.serverLevel(),e.getPos());if(m==null)return;e.setCanceled(true);
            visiting.put(p.getUUID(),m);recoverAt(m);RelicNetwork.memorial(p,m);status(p);
            if(record(p).complete())return;
            say(p,"Refill the main altar basin for each offering. The last stage also requires your own Sacrificial Knife use here.");
            p.sendSystemMessage(Component.literal("[Offer 10,000 LP]").withStyle(s->s.withColor(net.minecraft.ChatFormatting.GOLD).withClickEvent(new ClickEvent(ClickEvent.Action.RUN_COMMAND,"/orritual offer"))));
            if(record(p).stages==2){eligible(p);lock(m,p);say(p,"Final stage prepared. Refill the basin, make your own knife sacrifice at this altar, then offer the final 10,000 LP.");}
        }catch(Exception x){failure(p,x);}
    }
    static Memorial nearby(ServerPlayer p){
        Memorial m=visiting.get(p.getUUID());if(m==null||m.level()!=p.serverLevel()||p.distanceToSqr(m.plaque().getX()+.5,m.plaque().getY()+.5,m.plaque().getZ()+.5)>64||Memorial.anchor(m.level(),m.anchor())==null)throw new IllegalStateException("Use the plaque at a valid memorial first");return m;
    }
    static void lock(Memorial m,ServerPlayer p){
        UUID holder=locks.get(m.id());if(holder!=null&&!holder.equals(p.getUUID())){
            ServerPlayer other=server.getPlayerList().getPlayer(holder);if(now()<lockUntil.getOrDefault(m.id(),0L)&&other!=null&&other.serverLevel()==m.level()&&other.distanceToSqr(m.altar().getCenter())<100)throw new IllegalStateException("Another player's ceremony is active here");locks.remove(m.id());
        }
        for(var r:store.all())if(r.pending!=null&&r.pending.key().equals(altarKey(m))&&!r.owner.equals(p.getUUID().toString()))throw new IllegalStateException("A pending altar payment must recover before another offering");
        locks.put(m.id(),p.getUUID());lockUntil.put(m.id(),now()+600);
    }
    static String altarKey(Memorial m){BlockPos a=m.altar();return m.level().dimension().location()+":"+a.getX()+","+a.getY()+","+a.getZ();}
    static void offer(ServerPlayer p){
        if(!config.enabled||store==null){status(p);return;}
        Memorial m=null;
        try{
            var r=record(p);recover(r);if(r.complete()){status(p);return;}eligible(p);m=nearby(p);recoverAt(m);lock(m,p);
            if(r.stages==3){finish(p,r);return;}
            TileAltar altar=AltarAccess.get(m.level(),m.altar());AltarAccess.ready(altar);
            if(r.stages==2&&!m.id().equals(r.knifeMemorial))throw new IllegalStateException("Make your own Sacrificial Knife offering during this final stage here");
            RelicStore.Payment tx=new RelicStore.Payment();tx.id=UUID.randomUUID().toString();tx.dimension=m.level().dimension().location().toString();
            tx.x=m.altar().getX();tx.y=m.altar().getY();tx.z=m.altar().getZ();tx.stage=r.stages+1;tx.personalKnife=r.stages==2;
            if(altar.getCurrentBlood()!=10000)throw new IllegalStateException("The main basin must contain 10,000 LP");
            r.pending=tx;store.save(r);
            AltarAccess.debit(m.level(),altar,tx.id,r.owner);commit(r);
            say(p,"Offering "+r.stages+"/3 accepted: "+r.lpConsumed+" LP consumed.");
            if(r.stages==3)finish(p,r);else if(r.stages==2)say(p,"Refill the altar and make your own knife offering for the final stage.");
            RelicNetwork.sync(p);
        }catch(Exception x){failure(p,x);}finally{if(m!=null)locks.remove(m.id(),p.getUUID());}
    }
    static void commit(RelicStore.Progress r)throws Exception{
        var tx=r.pending;if(tx==null)return;store.confirmPayment(r,tx.id);
    }
    static void recover(RelicStore.Progress r)throws Exception{
        if(r.pending==null)return;var tx=r.pending;
        ServerLevel level=server.getLevel(ResourceKey.create(Registries.DIMENSION,new ResourceLocation(tx.dimension)));
        if(level==null)throw new IllegalStateException("Pending altar dimension is unavailable");
        BlockPos pos=new BlockPos(tx.x,tx.y,tx.z);level.getChunkAt(pos);
        TileAltar altar=AltarAccess.get(level,pos);
        if(altar!=null&&AltarAccess.tags(altar).getString("outlandishLastPayment").equals(tx.id)&&AltarAccess.tags(altar).getString("outlandishPaymentOwner").equals(r.owner)){AltarAccess.persist(level,altar);commit(r);return;}
        // No durable matching debit: do not credit this stage. Already committed stages remain intact.
        r.pending=null;store.save(r);
    }
    static void recoverAt(Memorial m)throws Exception{for(var r:store.all())if(r.pending!=null&&r.pending.key().equals(altarKey(m)))recover(r);}
    static void finish(ServerPlayer p,RelicStore.Progress r)throws Exception{
        eligible(p);if(r.stages!=3||r.lpConsumed!=30000||!r.finalKnife)throw new IllegalStateException("The personal three-offering ritual is unfinished");
        ItemStack sword=RelicItems.sword(p),ring=RelicItems.ring(p);
        var old=RelicItems.data(sword);String transaction=old.getString("transaction"),date=old.getString("completedAtUtc");
        if(!RelicItems.owned(sword,p.getUUID())||transaction.isEmpty()||!transaction.equals(RelicItems.data(ring).getString("transaction"))){transaction=UUID.randomUUID().toString();date=Instant.now().toString();}
        RelicItems.bind(sword,p,transaction,date);RelicItems.bind(ring,p,transaction,date);RelicItems.notifyEquippedRing(p,ring);
        AltarAccess.savePlayer(p,transaction);String oldId=r.awakeningId,oldDate=r.completedAtUtc;r.awakeningId=transaction;r.completedAtUtc=date;
        try{store.save(r);}catch(Exception x){r.awakeningId=oldId;r.completedAtUtc=oldDate;throw x;}
        var achievement=p.server.getAdvancements().getAdvancement(new ResourceLocation("outlandish:the_promise_fulfilled"));
        if(achievement==null)throw new IllegalStateException("Personal advancement is missing");p.getAdvancements().award(achievement,"awakening_completed");
        if(completed!=null)completed.accept(p);RelicCombat.equipment(p);RelicNetwork.ascension(p,nearby(p));say(p,"The Promise Fulfilled.");
    }
    @SubscribeEvent(priority=EventPriority.LOWEST) public void knife(SacrificeKnifeUsedEvent e){
        if(!config.enabled||store==null||e.isCanceled()||!e.shouldDrainHealth||!e.shouldFillAltar||e.lpAdded<=0||!(e.player instanceof ServerPlayer p))return;
        knifeActor.remove();knifeRecipients.remove(p.getUUID());knives.remove(p.getUUID());
        try{if(record(p).stages!=2)return;eligible(p);Memorial m=nearby(p);lock(m,p);TileAltar altar=AltarAccess.get(m.level(),m.altar());AltarAccess.ready(altar);
            knives.put(p.getUUID(),new KnifeAttempt(m,altar.getCurrentBlood(),p.getHealth(),now()));knifeActor.set(p.getUUID());
        }catch(Exception x){failure(p,x);}
    }
    /** Post-call observer of the altar actually selected by Blood Magic, including a full basin. */
    public static void knifeAltarReached(TileAltar altar,int requestedLp,boolean mobSacrifice){
        // Blood Magic passes false for the player's self-sacrifice; true is mob sacrifice.
        if(!config.enabled||store==null||mobSacrifice||requestedLp<=0)return;UUID actor=knifeActor.get();if(actor==null)return;
        KnifeAttempt attempt=knives.get(actor);if(attempt==null||attempt.tick!=now())return;
        boolean matches=altar.getLevel()==attempt.memorial.level()&&altar.getBlockPos().equals(attempt.memorial.altar());
        knifeRecipients.put(actor,matches?attempt.memorial.id():"wrong_altar");
    }
    /** Called by a narrow coremod hook at the original knife method's return, after all native work. */
    public static void knifeFinished(Player actor){
        if(!config.enabled||store==null||!(actor instanceof ServerPlayer p))return;
        KnifeAttempt attempt=knives.remove(p.getUUID());String recipient=knifeRecipients.remove(p.getUUID());knifeActor.remove();if(attempt==null)return;
        try{TileAltar altar=AltarAccess.get(attempt.memorial.level(),attempt.memorial.altar());
            if(now()!=attempt.tick||!p.isAlive()||p.serverLevel()!=attempt.memorial.level()||p.getHealth()>=attempt.health||altar==null||!attempt.memorial.id().equals(recipient))return;
            eligible(p);var r=record(p);if(r.stages!=2)return;String old=r.knifeMemorial;r.knifeMemorial=attempt.memorial.id();
            try{store.save(r);}catch(Exception x){r.knifeMemorial=old;throw x;}say(p,"Your personal final sacrifice was witnessed. Fill the basin and make the last offering at the plaque.");
        }catch(Exception x){failure(p,x);}finally{locks.remove(attempt.memorial.id(),p.getUUID());}
    }
    @SubscribeEvent public void login(PlayerEvent.PlayerLoggedInEvent e){if(server!=null&&e.getEntity() instanceof ServerPlayer p)try{RelicCombat.restoreLanding(p);if(config.enabled&&store!=null){recover(record(p));if(record(p).complete()&&completed!=null)completed.accept(p);RelicCombat.equipment(p);RelicNetwork.sync(p);}}catch(Exception x){failure(p,x);}}
    @SubscribeEvent public void respawn(PlayerEvent.PlayerRespawnEvent e){if(config.enabled&&store!=null&&e.getEntity() instanceof ServerPlayer p){RelicCombat.equipment(p);RelicNetwork.sync(p);}}
    @SubscribeEvent public void dimension(PlayerEvent.PlayerChangedDimensionEvent e){if(config.enabled&&store!=null&&e.getEntity() instanceof ServerPlayer p){visiting.remove(p.getUUID());RelicCombat.equipment(p);RelicNetwork.sync(p);}}
    @SubscribeEvent public void logout(PlayerEvent.PlayerLoggedOutEvent e){UUID id=e.getEntity().getUUID();visiting.remove(id);knives.remove(id);knifeRecipients.remove(id);locks.values().removeIf(id::equals);RelicCombat.logout(id);}
    @SubscribeEvent(priority=EventPriority.LOWEST) public void drops(LivingDropsEvent e){
        if(!config.enabled||store==null||e.isCanceled()||e.getEntity().getType()!=net.minecraft.world.entity.EntityType.WARDEN||!(e.getSource().getEntity() instanceof ServerPlayer))return;
        Item ring=ForgeRegistries.ITEMS.getValue(new ResourceLocation(RelicRules.RING));if(ring!=null)e.getDrops().add(new ItemEntity(e.getEntity().level(),e.getEntity().getX(),e.getEntity().getY(),e.getEntity().getZ(),new ItemStack(ring)));
    }
    @SubscribeEvent public void watch(ChunkWatchEvent.Watch e){
        if(!config.enabled||store==null||e.getLevel().dimension()!=Level.OVERWORLD)return;
        try{for(var tile:e.getLevel().getChunk(e.getPos().x,e.getPos().z).getBlockEntities().values()){
            if(!(tile instanceof BarrelBlockEntity))continue;Memorial m=Memorial.anchor(e.getLevel(),tile.getBlockPos());if(m!=null){recoverAt(m);RelicNetwork.memorial(e.getPlayer(),m);}
        }}catch(Exception x){System.err.println("[Outlandish relics] Memorial watch: "+x);}
    }
    public static String completedPlaqueRecord(ServerPlayer p){
        if(!config.enabled||store==null)return "";var r=record(p);if(!r.complete())return "";
        JsonObject data=new JsonObject();data.addProperty("version",2);data.addProperty("playerUuid",p.getUUID().toString());data.addProperty("usernameAtCompletion",p.getGameProfile().getName());
        data.addProperty("completedAtUtc",r.completedAtUtc);data.addProperty("ceremonyId","outlandish:tier1_three_offerings");data.addProperty("transactionId",r.awakeningId);data.addProperty("relicId",RelicRules.SWORD);
        data.addProperty("lpConsumed",30000);data.add("lpCharges",RelicStore.JSON.toJsonTree(new int[]{10000,10000,10000}));data.addProperty("jointAwakening",true);data.addProperty("personalKnifeVerified",true);return data.toString();
    }
}
