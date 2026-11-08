// Keep Quest Giver's native layout and apply the same transform to drawing and mouse input.
(function () {
  if (!Platform.isLoaded('quest_giver')) return;

  var Dialogue = Java.loadClass('com.saphienyako.quest_giver.screen.DisplayQuestScreen');
  var Selection = Java.loadClass('com.saphienyako.quest_giver.screen.SelectQuestScreen');
  var Choice = Java.loadClass('com.saphienyako.quest_giver.screen.widgets.SelectQuestWidget');
  var FancyButton = Java.loadClass('com.saphienyako.quest_giver.screen.widgets.FancyButton');
  var active = null;

  function fit(screen) {
    var width = 414; // The 350px dialogue panel and the 64px NPC model.
    var height = 145;
    if (screen instanceof Selection) {
      var widgets = screen.children();
      var rows = 0;
      for (var i = 0; i < widgets.size(); i++) {
        if (widgets.get(i) instanceof Choice) rows++;
      }
      width = 298;
      height = Math.max(64, rows * 67) + 20; // Space for the heading above the first row.
    } else if (!(screen instanceof Dialogue)) {
      return null;
    }
    return {
      scale: Math.min(0.86, Math.max(1, screen.width - 24) / width, Math.max(1, screen.height - 24) / height),
      x: screen.width / 2,
      y: screen.height / 2
    };
  }

  function inverse(value, center, scale) {
    return center + (value - center) / scale;
  }

  function renderPointer(value, center, scale) {
    // Forge uses Integer.MAX_VALUE for the pointer on a covered screen.
    var outside = Math.max(-1, Math.min(center * 2 + 1, value));
    return Math.floor(inverse(outside, center, scale));
  }

  global.ORQuestGiverLayout = {
    init: function (event) {
      var screen = event.getScreen();
      // Quest Giver allows Escape only on displays that have no Accept or Decline buttons.
      if (!(screen instanceof Dialogue) || !screen.shouldCloseOnEsc()) return;
      var panelLeft = Math.floor(screen.width / 2) - 207 + 64;
      var panelTop = Math.floor(screen.height / 2) - 72;
      event.addListener(FancyButton.makeLarge('quest_giver', panelLeft + 130, panelTop + 123,
        Text.of('Close'), function () { screen.onClose(); }));
    },
    render: function (event) {
      var screen = event.getScreen();
      var layout = fit(screen);
      if (!layout) return;
      // Forge still posts Render.Post after a cancelled Render.Pre. Draw once with the translated pointer.
      event.setCanceled(true);
      active = {screen: screen, layout: layout};
      try {
        screen.renderWithTooltip(event.getGuiGraphics(),
          renderPointer(event.getMouseX(), layout.x, layout.scale),
          renderPointer(event.getMouseY(), layout.y, layout.scale), event.getPartialTick());
      } finally {
        active = null;
      }
    },
    background: function (event) {
      if (!active || !active.screen.equals(event.getScreen())) return;
      // The screen has drawn its full-window dimmer and already pushed its own pose.
      var layout = active.layout;
      var pose = event.getGuiGraphics().pose();
      pose.translate(layout.x * (1 - layout.scale), layout.y * (1 - layout.scale), 0);
      pose.scale(layout.scale, layout.scale, 1);
    },
    button: function (event, pressed) {
      var screen = event.getScreen();
      var layout = fit(screen);
      if (!layout) return;
      var x = inverse(event.getMouseX(), layout.x, layout.scale);
      var y = inverse(event.getMouseY(), layout.y, layout.scale);
      var button = event.getButton();
      event.setCanceled(true);
      if (pressed) screen.mouseClicked(x, y, button);
      else screen.mouseReleased(x, y, button);
    }
  };
})();
