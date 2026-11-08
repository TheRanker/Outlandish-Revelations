// Forge screen events are registered on the physical client only.
if (Platform.isClientEnvironment() && Platform.isLoaded('quest_giver')) {
  ForgeEvents.onEvent('net.minecraftforge.client.event.ScreenEvent$Init$Post', function (event) {
    if (global.ORQuestGiverLayout) global.ORQuestGiverLayout.init(event);
  });
  ForgeEvents.onEvent('net.minecraftforge.client.event.ScreenEvent$Render$Pre', function (event) {
    if (global.ORQuestGiverLayout) global.ORQuestGiverLayout.render(event);
  });
  ForgeEvents.onEvent('net.minecraftforge.client.event.ScreenEvent$BackgroundRendered', function (event) {
    if (global.ORQuestGiverLayout) global.ORQuestGiverLayout.background(event);
  });
  ForgeEvents.onEvent('net.minecraftforge.client.event.ScreenEvent$MouseButtonPressed$Pre', function (event) {
    if (global.ORQuestGiverLayout) global.ORQuestGiverLayout.button(event, true);
  });
  ForgeEvents.onEvent('net.minecraftforge.client.event.ScreenEvent$MouseButtonReleased$Pre', function (event) {
    if (global.ORQuestGiverLayout) global.ORQuestGiverLayout.button(event, false);
  });
}
