// Outlandish Revelations: dimension gate.
ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityTravelToDimensionEvent',function(event){
    if(global.otgPortDimensionGate){global.otgPortDimensionGate(event);return;}

    var destination=String(event.getDimension().location());
    if(event.getEntity().player && (destination==='minecraft:the_nether'||destination==='minecraft:the_end'||destination==='twilightforest:twilight_forest'))event.setCanceled(true);
});
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDeathEvent',function(event){
    if(global.otgTeamBossDeath)global.otgTeamBossDeath(event);
});
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent',function(event){
    if(global.otgTeamDimensionArrived)global.otgTeamDimensionArrived(event);
});
