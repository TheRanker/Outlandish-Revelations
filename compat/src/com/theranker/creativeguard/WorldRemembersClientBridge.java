package com.theranker.creativeguard;

import java.util.function.Consumer;
import net.minecraftforge.client.event.RenderLevelStageEvent;
import net.minecraftforge.common.MinecraftForge;

/** Loaded only on the physical client. No inventory polling or server-side rendering types. */
final class WorldRemembersClientBridge {
    private static volatile Consumer<Object> renderer;
    private static boolean installed;
    private WorldRemembersClientBridge() {}
    static synchronized void install(Consumer<Object> callback) {
        renderer = callback;
        if (installed) return;
        MinecraftForge.EVENT_BUS.addListener(WorldRemembersClientBridge::render);
        installed = true;
    }
    private static void render(RenderLevelStageEvent event) {
        if (event.getStage() != RenderLevelStageEvent.Stage.AFTER_TRANSLUCENT_BLOCKS) return;
        Consumer<Object> listener = renderer;
        if (listener != null) listener.accept(event);
    }
}
