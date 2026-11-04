// Native Forge registration avoids Rhino class filters and keeps one listener per JVM.
(function () {
  var Native = Java.loadClass('com.theranker.creativeguard.WorldRemembersBridge');
  Native.installConversation(function(event) {
    if (global.ORWorldRemembersConversation) global.ORWorldRemembersConversation(event);
  });
  // Native code checks physical side before resolving the separate client-only bridge.
  Native.installRenderer(function(event) {
    if (global.ORWorldRemembersRender) global.ORWorldRemembersRender(event);
  });
})();
