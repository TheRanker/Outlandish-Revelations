// A temporary book screen gives the scroll pages and clickable links without creating an item.
(function () {
  if (!Platform.isLoaded('quest_giver')) return;

  var BookScreen = Java.loadClass('net.minecraft.client.gui.screens.inventory.BookViewScreen');
  var WrittenPages = Java.loadClass('net.minecraft.client.gui.screens.inventory.BookViewScreen$WrittenBookAccess');
  var chunks = Platform.isLoaded('ftbchunks') ? Java.loadClass('dev.ftb.mods.ftbchunks.api.FTBChunksAPI') : null;
  var realms = {
    'minecraft:overworld': 'Overworld',
    'minecraft:the_nether': 'Nether',
    'minecraft:the_end': 'Outer End',
    'twilightforest:twilight_forest': 'Twilight Forest'
  };

  function link(label, action, value) {
    return {text: label, color: 'dark_aqua', underlined: true, clickEvent: {action: action, value: String(value)}};
  }

  function detail(row, entry) {
    var page = [{text: row.name + '\n', bold: true}, {text: entry.title + '\n\n', color: 'dark_gray'}];
    if (entry.pending) {
      page.push({text: 'Supplies delivered.\nSpeak to the NPC.\n'});
    } else {
      if (!entry.supplies.length) page.push({text: 'Ask the NPC for details.\n'});
      entry.supplies.forEach(function (supply) {
        var prefix = supply.gift ? (supply.total - supply.delivered) + ' left: ' : 'Bring ' + supply.total + ': ';
        page.push({text: prefix}, {translate: supply.item});
        if (supply.gift) page.push({text: '\nHanded in ' + supply.delivered + '/' + supply.total});
        page.push({text: '\n'});
      });
    }
    var pos = row.visit;
    if (pos) {
      page.push({text: '\n' + (realms[pos.dimension] || pos.dimension) + ' · Last visit\n', color: 'dark_gray'});
      page.push({text: 'X ' + pos.x + ' Y ' + pos.y + ' Z ' + pos.z + '\n'});
      if (chunks) page.push(link('[Waypoint]', 'run_command', '/or_delivery_waypoint ' + row.id), {text: '  '});
    } else {
      page.push({text: '\nVisit this NPC with your scroll to save a location.\n', color: 'dark_gray'});
    }
    page.push(link('[Index]', 'change_page', 1));
    return page;
  }

  function bookPages(rows) {
    var perPage = 5;
    var indexCount = Math.max(1, Math.ceil(rows.length / perPage));
    var pages = [];
    for (var i = 0; i < indexCount; i++) {
      pages.push([{text: 'My Deliveries\n', bold: true, color: 'dark_aqua'}, {text: rows.length + ' active NPCs\n\n', color: 'dark_gray'}]);
    }
    if (!rows.length) pages[0].push({text: 'No active deliveries. Use the scroll on a story NPC and accept their request.'});
    rows.forEach(function (row, index) {
      pages[Math.floor(index / perPage)].push(link(row.name, 'change_page', pages.length + 1), {text: '\n'});
      row.entries.forEach(function (entry) { pages.push(detail(row, entry)); });
    });
    return pages.map(function (page) { return JSON.stringify(page); });
  }

  NetworkEvents.dataReceived('or_delivery_journal', function (event) {
    Client.execute(function () {
      if (!Client.player) return;
      try {
        var rows = JSON.parse(String(event.data.getString('payload')));
        var book = Item.of('minecraft:written_book', JSON.stringify({title: 'My Deliveries', author: 'Brass Concord', pages: bookPages(rows)}));
        Client.setScreen(new BookScreen(new WrittenPages(book)));
      } catch (failure) {
        console.error('[My Deliveries] Open journal: ' + failure);
      }
    });
  });

  if (chunks) {
    var Location = Java.loadClass('net.minecraft.resources.ResourceLocation');
    var ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
    var Registries = Java.loadClass('net.minecraft.core.registries.Registries');
    var BlockPos = Java.loadClass('net.minecraft.core.BlockPos');
    NetworkEvents.dataReceived('or_delivery_waypoint', function (event) {
      Client.execute(function () {
        if (!Client.player) return;
        try {
          var data = JSON.parse(String(event.data.getString('payload')));
          var visit = data.visit;
          var dimension = ResourceKey.create(Registries.DIMENSION, new Location(visit.dimension));
          var api = chunks.clientApi();
          var found = api.getWaypointManager(dimension);
          if (!found.isPresent()) {
            Client.player.displayClientMessage(Text.of('FTB Chunks is still loading your map. Try again shortly.'), false);
            return;
          }
          var manager = found.get();
          var name = 'Delivery: ' + data.name;
          var pos = new BlockPos(visit.x, visit.y, visit.z);
          var waypoints = manager.getAllWaypoints().iterator();
          while (waypoints.hasNext()) {
            var waypoint = waypoints.next();
            if (String(waypoint.getName()) === name && waypoint.getPos().equals(pos)) {
              Client.player.displayClientMessage(Text.of('Waypoint already saved for ' + data.name + '.'), false);
              return;
            }
          }
          manager.addWaypointAt(pos, name);
          api.requestMinimapIconRefresh();
          Client.player.displayClientMessage(Text.of('Waypoint saved for ' + data.name + '.'), false);
        } catch (failure) {
          console.error('[My Deliveries] Add waypoint: ' + failure);
        }
      });
    });
  }

  ItemEvents.tooltip(function (event) {
    event.add('quest_giver:quest_scroll', Text.of('Sneak + right-click in air to open My Deliveries.').gray());
  });
})();
