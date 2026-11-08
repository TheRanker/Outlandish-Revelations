// Quest Giver opens scroll-gated dialogue on EntityInteractSpecific. A remote
// client can also send the ordinary EntityInteract, which would open trades.
(function () {
  if (!Platform.isLoaded('quest_giver')) return;

  var QuestLinks = Java.loadClass('com.saphienyako.quest_giver.quest.QuestLinkManager');
  var scroll = 'quest_giver:quest_scroll';

  ItemEvents.entityInteracted(function (event) {
    if (String(event.player.getMainHandItem().id) !== scroll) return;
    if (String(event.target.type) !== 'minecraft:villager') return;

    var link = QuestLinks.getMatchingLink(event.target);
    if (link && String(link.interactionItem) === scroll) event.cancel();
  });
})();
