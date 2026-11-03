// Common bridge references only server-safe Forge classes until the explicit side guard.
(function () {
  // KubeJS ForgeEvents uses receiveCanceled=false. Quest Giver cancels a handled
  // conversation, so observe at LOWEST with receiveCanceled=true without replacing it.
  var Forge=Java.loadClass('net.minecraftforge.common.MinecraftForge');
  var Priority=Java.loadClass('net.minecraftforge.eventbus.api.EventPriority');
  var Class=Java.loadClass('java.lang.Class');
  if (global.ORWorldRemembersListenerInstalled) return;
  Forge.EVENT_BUS.addListener(Priority.LOWEST,true,
    Class.forName('net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteractSpecific'),function(event) {
      if(global.ORWorldRemembersConversation)global.ORWorldRemembersConversation(event);
    });
  global.ORWorldRemembersListenerInstalled=true;
})();
(function () {
  var Environment = Java.loadClass('net.minecraftforge.fml.loading.FMLEnvironment');
  if (!Environment.dist.isClient()) return;
  ForgeEvents.onEvent('net.minecraftforge.client.event.RenderLevelStageEvent', function (event) {
    if (global.ORWorldRemembersRender) global.ORWorldRemembersRender(event);
  });
})();
