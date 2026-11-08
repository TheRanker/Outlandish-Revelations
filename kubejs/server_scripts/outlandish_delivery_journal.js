// Read Quest Giver's personal quest state on demand. Only NPC visit locations are saved here.
(function () {
  if (!Platform.isLoaded('quest_giver')) return;

  var scroll = 'quest_giver:quest_scroll';
  var QuestData = Java.loadClass('com.saphienyako.quest_giver.quest.data.QuestData');
  var QuestLinks = Java.loadClass('com.saphienyako.quest_giver.quest.QuestLinkManager');
  var Gift = Java.loadClass('com.saphienyako.quest_giver.quest.task.GiftTask').INSTANCE;
  var Stack = Java.loadClass('com.saphienyako.quest_giver.quest.task.ItemStackTask').INSTANCE;
  var Location = Java.loadClass('net.minecraft.resources.ResourceLocation');
  var ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer');
  var Native = Java.loadClass('com.theranker.creativeguard.WorldRemembersBridge');
  var npcs = JSON.parse(String(JsonIO.readString('kubejs/outlandish/world_remembers.json'))).npcs;
  var npcIds = npcs.map(function (npc) { return npc.id; });

  function holdsScroll(player) {
    return String(player.getMainHandItem().id) === scroll;
  }

  function visitKey(player, id) {
    return 'or_delivery_visit_v1_' + Native.uuid(player) + '_' + id;
  }

  function visit(player, id) {
    var saved = String(player.server.persistentData.getString(visitKey(player, id)));
    return saved ? JSON.parse(saved) : null;
  }

  global.ORRecordDeliveryVisit = function (event) {
    try {
      var player = event.getEntity();
      if (!(player instanceof ServerPlayer) || String(event.getHand()) !== 'MAIN_HAND' || !holdsScroll(player)) return;
      var target = event.getTarget();
      var link = QuestLinks.getMatchingLink(target);
      if (!link || String(link.interactionItem) !== scroll || npcIds.indexOf(String(link.questLineId)) === -1) return;
      var pos = target.blockPosition();
      var saved = JSON.stringify({dimension: String(player.level.dimension), x: pos.getX(), y: pos.getY(), z: pos.getZ()});
      var data = player.server.persistentData;
      var key = visitKey(player, String(link.questLineId));
      if (String(data.getString(key)) !== saved) data.putString(key, saved);
    } catch (failure) {
      console.error('[My Deliveries] Save NPC visit: ' + failure);
    }
  };

  function describe(quest, progress) {
    var entry = {title: String(quest.start.title.getString()), pending: progress === null, supplies: []};
    if (entry.pending) return entry;
    for (var i = 0; i < quest.tasks.size(); i++) {
      var task = quest.tasks.get(i);
      var gift = task.getQuestValueFor(Gift).isPresent();
      var stack = task.getQuestValueFor(Stack);
      if (!gift && !stack.isPresent()) continue;
      var icon = task.icon();
      if (!icon) continue;
      var total = gift ? Number(task.times) : Number(stack.get().count());
      var delivered = gift ? Math.max(0, Math.min(total, progress.getInt(String(i)))) : 0;
      entry.supplies.push({item: String(icon.getDescriptionId()), total: total, delivered: delivered, gift: gift});
    }
    return entry;
  }

  function entries(line) {
    if (!line || line.isFinished()) return [];
    var definition = line.getQuestLine();
    if (!definition) return [];
    // Quest Giver 1.5.3 writes task counts by index under Active and keeps completed hand-ins in Pending.
    var state = line.write();
    var active = state.getCompound('Active');
    var pending = state.getList('Pending', 8);
    var result = [];
    for (var i = 0; i < pending.size(); i++) {
      var quest = definition.getQuest(new Location(String(pending.getString(i))));
      if (quest) result.push(describe(quest, null));
    }
    var keys = line.getActiveQuestIds().iterator();
    while (keys.hasNext()) {
      var id = keys.next();
      var current = definition.getQuest(id);
      if (current) result.push(describe(current, active.getCompound(String(id))));
    }
    return result;
  }

  ItemEvents.rightClicked(scroll, function (event) {
    var player = event.player;
    if (!(player instanceof ServerPlayer) || String(event.hand) !== 'MAIN_HAND' || !player.isCrouching()) return;
    if (String(event.target.type) !== 'MISS') return;
    try {
      var lines = QuestData.get(player).getQuestLines();
      var rows = [];
      npcs.forEach(function (npc) {
        var current = entries(lines.get(npc.id));
        if (current.length) rows.push({id: npc.id, name: npc.displayName, visit: visit(player, npc.id), entries: current});
      });
      player.sendData('or_delivery_journal', {payload: JSON.stringify(rows)});
    } catch (failure) {
      console.error('[My Deliveries] Read progress: ' + failure);
      player.tell('My Deliveries could not read your quest progress.');
    }
    event.cancel();
  });

  ServerEvents.commandRegistry(function (event) {
    var commands = event.commands;
    var root = commands.literal('or_delivery_waypoint').requires(function (source) {
      return source.getEntity() instanceof ServerPlayer;
    });
    npcs.forEach(function (npc) {
      root.then(commands.literal(npc.id).executes(function (context) {
        var player = context.source.player;
        if (!holdsScroll(player)) return 0;
        var line = QuestData.get(player).getQuestLines().get(npc.id);
        var saved = visit(player, npc.id);
        if (!saved || !entries(line).length) {
          player.tell('Reopen My Deliveries for your current NPC locations.');
          return 0;
        }
        player.sendData('or_delivery_waypoint', {payload: JSON.stringify({name: npc.displayName, visit: saved})});
        return 1;
      }));
    });
    event.register(root);
  });
})();
