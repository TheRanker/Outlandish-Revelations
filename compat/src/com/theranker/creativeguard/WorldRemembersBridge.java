package com.theranker.creativeguard;

import java.util.function.Consumer;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.entity.player.PlayerInteractEvent;
import net.minecraftforge.eventbus.api.EventPriority;
import net.minecraftforge.fml.loading.FMLEnvironment;
import net.minecraftforge.registries.ForgeRegistries;

/** Stable native boundary for data-driven story scripts. No tick handlers or record changes. */
public final class WorldRemembersBridge {
    private static final String SWORD = "kubejs:rankers_sword";
    private static volatile Consumer<Object> conversation;
    private static boolean conversationInstalled;
    private WorldRemembersBridge() {}

    public static synchronized void installConversation(Consumer<Object> callback) {
        conversation = callback;
        if (conversationInstalled) return;
        // Quest Giver cancels handled interactions. Observe without canceling/replacing them.
        MinecraftForge.EVENT_BUS.addListener(EventPriority.LOWEST, true,
            PlayerInteractEvent.EntityInteractSpecific.class,
            event -> { Consumer<Object> listener = conversation; if (listener != null) listener.accept(event); });
        conversationInstalled = true;
    }

    public static void installRenderer(Consumer<Object> callback) {
        // Client types live in a separate class that a dedicated server never loads.
        if (FMLEnvironment.dist.isClient()) WorldRemembersClientBridge.install(callback);
    }

    // These are production SRG names for Forge 1.20.1, checked against the installed client JAR.
    public static String uuid(Entity entity) { return entity.m_20148_().toString(); }
    public static String username(ServerPlayer player) { return player.m_36316_().getName(); }
    public static boolean hasSword(ServerPlayer player) {
        Inventory inventory = player.m_150109_();
        return containsSword(inventory.f_35974_) || containsSword(inventory.f_35976_);
    }
    private static boolean containsSword(Iterable<ItemStack> items) {
        for (ItemStack stack : items) {
            if (SWORD.equals(String.valueOf(ForgeRegistries.ITEMS.getKey(stack.m_41720_())))) return true;
        }
        return false;
    }
}
