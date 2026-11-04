package com.theranker.creativeguard.relics;

import java.util.*;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.items.IItemHandlerModifiable;
import top.theillusivec4.curios.api.CuriosApi;

final class RelicItems {
    static String id(ItemStack item){return String.valueOf(ForgeRegistries.ITEMS.getKey(item.getItem()));}
    static CompoundTag data(ItemStack stack){CompoundTag root=stack.getTag();return root==null?new CompoundTag():root.getCompound(RelicRules.TAG);}
    static boolean owned(ItemStack stack,UUID player){CompoundTag tag=data(stack);return tag.getBoolean("awakened")&&tag.hasUUID("owner")&&tag.getUUID("owner").equals(player);}
    static boolean bindable(ItemStack stack,UUID player){CompoundTag tag=data(stack);return !tag.hasUUID("owner")||tag.getUUID("owner").equals(player);}
    static ItemStack sword(ServerPlayer player){
        for(ItemStack s:player.getInventory().items)if(id(s).equals(RelicRules.SWORD))return s;
        for(ItemStack s:player.getInventory().offhand)if(id(s).equals(RelicRules.SWORD))return s;
        return ItemStack.EMPTY;
    }
    static ItemStack equippedRing(ServerPlayer player){
        var capability=CuriosApi.getCuriosInventory(player).resolve();if(capability.isEmpty())return ItemStack.EMPTY;
        var items=capability.get().getEquippedCurios();ItemStack first=ItemStack.EMPTY;
        for(int i=0;i<items.getSlots();i++){ItemStack s=items.getStackInSlot(i);if(id(s).equals(RelicRules.RING)){if(owned(s,player.getUUID()))return s;if(first.isEmpty())first=s;}}
        return first;
    }
    static int count(ServerPlayer p,String type){
        int count=0;for(ItemStack s:p.getInventory().items)if(id(s).equals(type))count+=s.getCount();for(ItemStack s:p.getInventory().offhand)if(id(s).equals(type))count+=s.getCount();
        var cap=CuriosApi.getCuriosInventory(p).resolve();if(cap.isPresent()){var inv=cap.get().getEquippedCurios();for(int i=0;i<inv.getSlots();i++)if(id(inv.getStackInSlot(i)).equals(type))count+=inv.getStackInSlot(i).getCount();}
        return count;
    }
    static ItemStack ring(ServerPlayer player){
        ItemStack equipped=equippedRing(player);if(!equipped.isEmpty())return equipped;
        for(ItemStack s:player.getInventory().items)if(id(s).equals(RelicRules.RING))return s;
        for(ItemStack s:player.getInventory().offhand)if(id(s).equals(RelicRules.RING))return s;
        return ItemStack.EMPTY;
    }
    static void bind(ItemStack stack,ServerPlayer player,String transaction,String date){
        if(!bindable(stack,player.getUUID()))throw new IllegalStateException("Relic belongs to another player");
        // Mutate only our nested tag on this original stack. Never create a replacement or touch enchantments/affixes.
        CompoundTag data=stack.getOrCreateTag().getCompound(RelicRules.TAG);
        data.putInt("version",1);data.putBoolean("awakened",true);data.putUUID("owner",player.getUUID());
        data.putString("ownerName",player.getGameProfile().getName());data.putString("transaction",transaction);data.putString("completedAtUtc",date);
        stack.getOrCreateTag().put(RelicRules.TAG,data);
    }
    static void notifyEquippedRing(ServerPlayer player,ItemStack ring){
        CuriosApi.getCuriosInventory(player).ifPresent(c->{IItemHandlerModifiable inv=c.getEquippedCurios();for(int i=0;i<inv.getSlots();i++)if(id(inv.getStackInSlot(i)).equals(RelicRules.RING)){inv.setStackInSlot(i,ring);break;}});
    }
}
