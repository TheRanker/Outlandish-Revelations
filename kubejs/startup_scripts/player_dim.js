ForgeEvents.onEvent("net.minecraftforge.event.entity.EntityTravelToDimensionEvent", (event) => {
    global.dimChangeEvent(event);
});