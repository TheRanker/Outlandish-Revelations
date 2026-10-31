// Outlandish Revelations: community.
(function () {
  var initialized=false;
  var state={phase:'registered',initialized:false,gameRules:{},attempts:[],welcomeMessageRegistered:true,joinLeaveAnnouncementsRegistered:true,starterKitEnabled:true,errors:[]};

  function initialize(server,trigger) {
    var attempt={trigger:trigger,commandResults:{},errors:[]};
    state.phase='initializing';state.initialized=false;state.gameRules={};
    state.attempts.push(attempt);
    try {
      attempt.commandResults.setKeepInventory=Number(server.runCommandSilent('gamerule keepInventory true'));
      attempt.commandResults.setSleepingPercentage=Number(server.runCommandSilent('gamerule playersSleepingPercentage 45'));
      var keepInventory=Number(server.runCommandSilent('gamerule keepInventory'));
      var sleeping=Number(server.runCommandSilent('gamerule playersSleepingPercentage'));
      attempt.commandResults.queryKeepInventory=keepInventory;
      attempt.commandResults.querySleepingPercentage=sleeping;
      state.gameRules.keepInventory=keepInventory===1;
      state.gameRules.playersSleepingPercentage=sleeping;
      if (keepInventory!==1 || sleeping!==45) attempt.errors.push('Game rule query did not match keepInventory=true and sleeping=45');
    } catch (error) {attempt.errors.push(String(error));}
    initialized=attempt.errors.length===0;
    state.initialized=initialized;state.errors=attempt.errors;
    state.phase=initialized?'verified':'failed';
    if (initialized) console.info('[Outlandish community] Applied pack rules through server commands ('+trigger+'):keepInventory=true,playersSleepingPercentage=45');
    else console.error('[Outlandish community] Rule initialization failed ('+trigger+'): '+attempt.errors.join('; '));
  }
  ServerEvents.loaded(function (event) {initialize(event.server,'server_loaded');});
  ServerEvents.unloaded(function () {initialized=false;});
  function logPlayer(player,action) {
    console.info('Outlandish Revelations: Player '+player.username+' logged '+action+'('+player.level.dimension+'). '+Math.floor(player.x)+' '+Math.floor(player.y)+' '+Math.floor(player.z)+'!');
  }
  PlayerEvents.loggedIn(function (event) {
    if (!initialized) initialize(event.server,'player_login_fallback');
    var player=event.player;var name=String(player.username);
    logPlayer(player,'in');
    player.tell(Text.of('Hello, ').green().bold()
      .append(Text.of(name+' ').yellow())
      .append(Text.of('and welcome to Outlandish Revelations! Please open JEI and allow it a few minutes to populate. You can continue to play as it loads').green()));
    event.server.tell(Text.of(name+' ').green().bold().append(Text.of('just joined the Party!').green()));
  });
  PlayerEvents.loggedOut(function (event) {
    logPlayer(event.player,'out');
    event.server.tell(Text.of(String(event.player.username)+' ').green().bold().append(Text.of('just left.').green()));
  });
})();
