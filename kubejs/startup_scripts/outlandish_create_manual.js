// Outlandish Revelations: create manual.
if (Platform.isLoaded('create')) {
  StartupEvents.registry('item', function (event) {
    event.create('create:create_manual').displayName('Create Manual').rarity('rare').texture('create:item/create_manual');
  });
  if (Platform.isClientEnvironment()) {
    ForgeEvents.onEvent('net.minecraftforge.client.event.InputEvent$MouseScrollingEvent', function (event) {
      if (global.otgPortManualScroll) global.otgPortManualScroll(event);
    });
  }
}
