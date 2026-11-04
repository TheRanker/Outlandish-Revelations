package com.theranker.creativeguard.relics;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import net.minecraft.core.BlockPos;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.server.players.PlayerList;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.chunk.storage.ChunkSerializer;
import net.minecraftforge.fluids.FluidStack;
import net.minecraftforge.common.extensions.IForgeBlockEntity;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.Tag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.NbtIo;
import net.minecraft.world.level.storage.LevelResource;
import java.nio.channels.FileChannel;
import java.nio.file.StandardOpenOption;
import wayoftime.bloodmagic.altar.BloodAltar;
import wayoftime.bloodmagic.common.tile.TileAltar;

final class AltarAccess {
    private static final class MissingMarker extends IllegalStateException {private static final long serialVersionUID=1L;MissingMarker(){super("The altar did not serialize its debit and payment marker; no LP offering was committed");}}
    static CompoundTag tags(BlockEntity tile){return ((IForgeBlockEntity)(Object)tile).getPersistentData();}
    private static final Field ALTAR;
    static {try{ALTAR=TileAltar.class.getDeclaredField("bloodAltar");ALTAR.setAccessible(true);}catch(Exception e){throw new ExceptionInInitializerError(e);}}
    static TileAltar get(ServerLevel level,BlockPos pos){BlockEntity tile=level.getBlockEntity(pos);return tile instanceof TileAltar a?a:null;}
    static void ready(TileAltar tile){
        if(tile==null)throw new IllegalStateException("Memorial altar is missing");tile.checkTier();
        if(tile.getTier()!=1||tile.getCapacity()!=10000)throw new IllegalStateException("Use the memorial's ordinary Tier 1 altar");
        if(!tile.getItem(0).isEmpty()||tile.getProgress()!=0)throw new IllegalStateException("Remove ordinary crafting items and let the altar finish its current cycle");
    }
    static void debit(ServerLevel level,TileAltar tile,String transaction,String owner)throws Exception{
        ready(tile);if(tile.getCurrentBlood()!=10000)throw new IllegalStateException("Fill the main basin to 10,000 LP first");
        BloodAltar altar=(BloodAltar)ALTAR.get(tile);FluidStack before=altar.getFluid().copy();
        if(before.getAmount()!=10000||before.getFluid()!=wayoftime.bloodmagic.common.fluid.BloodMagicFluids.LIFE_ESSENCE_FLUID.get())throw new IllegalStateException("Unexpected main basin fluid");
        // setMainFluid addresses the main basin. The ordinary fluid capability drains only the output buffer.
        FluidStack after=before.copy();after.setAmount(0);altar.setMainFluid(after);
        if(tile.getCurrentBlood()!=0)throw new IllegalStateException("Main-basin debit did not apply");
        String oldTransaction=tags(tile).getString("outlandishLastPayment"),oldOwner=tags(tile).getString("outlandishPaymentOwner");
        tags(tile).putString("outlandishLastPayment",transaction);tags(tile).putString("outlandishPaymentOwner",owner);
        // Durably save only this chunk before committing personal progress; no whole-world save or scan.
        try{persist(level,tile,true);}catch(MissingMarker e){altar.setMainFluid(before);tags(tile).putString("outlandishLastPayment",oldTransaction);tags(tile).putString("outlandishPaymentOwner",oldOwner);tile.setChanged();throw e;}
        tile.setChanged();level.sendBlockUpdated(tile.getBlockPos(),tile.getBlockState(),tile.getBlockState(),3);
    }
    static void persist(ServerLevel level,TileAltar tile){persist(level,tile,false);}
    @SuppressWarnings("resource") private static void persist(ServerLevel level,TileAltar tile,boolean requireEmpty){
        var chunk=level.getChunkAt(tile.getBlockPos());var map=level.getChunkSource().chunkMap;
        String transaction=tags(tile).getString("outlandishLastPayment"),owner=tags(tile).getString("outlandishPaymentOwner");
        CompoundTag snapshot=ChunkSerializer.write(level,chunk);
        if(transaction.isEmpty()||!containsPayment(snapshot,tile.getBlockPos(),transaction,owner,requireEmpty,0))throw new MissingMarker();
        map.write(chunk.getPos(),snapshot);map.flushWorker();
        var stored=map.read(chunk.getPos()).join();
        if(stored.isEmpty()||!containsPayment(stored.get(),tile.getBlockPos(),transaction,owner,requireEmpty,0))throw new IllegalStateException("Durable altar payment could not be confirmed; progress is pending recovery");
    }
    private static boolean containsPayment(Tag root,BlockPos pos,String transaction,String owner,boolean requireEmpty,int depth){
        if(depth>64)return false;
        if(root instanceof CompoundTag tag){
            var forge=tag.getCompound("ForgeData");
            if(tag.getInt("x")==pos.getX()&&tag.getInt("y")==pos.getY()&&tag.getInt("z")==pos.getZ()&&transaction.equals(forge.getString("outlandishLastPayment"))&&owner.equals(forge.getString("outlandishPaymentOwner"))){
                CompoundTag basin=tag.getCompound("bloodAltar");
                return !requireEmpty||(basin.contains("Amount",3)&&basin.getInt("Amount")==0);
            }
            for(String key:tag.getAllKeys())if(containsPayment(tag.get(key),pos,transaction,owner,requireEmpty,depth+1))return true;
        }else if(root instanceof ListTag list){for(Tag child:list)if(containsPayment(child,pos,transaction,owner,requireEmpty,depth+1))return true;}
        return false;
    }
    static void savePlayer(ServerPlayer player,String transaction)throws Exception{
        Method save=null;
        for(Method method:PlayerList.class.getDeclaredMethods())if((method.getName().equals("save")||method.getName().equals("m_6765_"))&&java.util.Arrays.equals(method.getParameterTypes(),new Class<?>[]{ServerPlayer.class})){save=method;break;}
        if(save==null)throw new IllegalStateException("Player save API unavailable");save.setAccessible(true);save.invoke(player.server.getPlayerList(),player);
        var file=player.server.getWorldPath(LevelResource.PLAYER_DATA_DIR).resolve(player.getUUID()+".dat");
        CompoundTag saved=NbtIo.readCompressed(file.toFile());
        java.util.Set<String> found=new java.util.HashSet<>();findBound(saved,player.getUUID(),transaction,0,found);
        if(!found.contains(RelicRules.SWORD)||!found.contains(RelicRules.RING))throw new IllegalStateException("Both original relic bindings were not confirmed in the player save; your paid stages remain recoverable");
        try(FileChannel data=FileChannel.open(file,StandardOpenOption.WRITE)){data.force(true);}
    }
    private static void findBound(Tag tag,java.util.UUID owner,String transaction,int depth,java.util.Set<String> found){
        if(depth>64)return;
        if(tag instanceof CompoundTag compound){
            String item=compound.getString("id");CompoundTag data=compound.getCompound("tag").getCompound(RelicRules.TAG);
            if((item.equals(RelicRules.SWORD)||item.equals(RelicRules.RING))&&data.getBoolean("awakened")&&data.hasUUID("owner")&&data.getUUID("owner").equals(owner)&&transaction.equals(data.getString("transaction")))found.add(item);
            for(String key:compound.getAllKeys())findBound(compound.get(key),owner,transaction,depth+1,found);
        }else if(tag instanceof ListTag list){for(Tag child:list)findBound(child,owner,transaction,depth+1,found);}
    }
}
