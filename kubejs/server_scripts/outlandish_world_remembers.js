// UUID-owned world record; no FTB Teams, item mutations, ceremony simulation or ticks.
(function () {
  var Core = global.ORWorldRemembersCore;
  var Native = Java.loadClass('com.theranker.creativeguard.WorldRemembersBridge');
  var Instant = Java.loadClass('java.time.Instant');
  var UUID = Java.loadClass('java.util.UUID');
  var Location = Java.loadClass('net.minecraft.resources.ResourceLocation');
  var ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer');
  var BlockPos = Java.loadClass('net.minecraft.core.BlockPos');
  var Registries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var QuestNetwork = Java.loadClass('com.saphienyako.quest_giver.network.QuestGiverNetwork');
  var DisplayMessage = Java.loadClass('com.saphienyako.quest_giver.network.OpenQuestDisplayMessage');
  var QuestDisplay = Java.loadClass('com.saphienyako.quest_giver.quest.QuestDisplay');
  var QuestLinks = Java.loadClass('com.saphienyako.quest_giver.quest.QuestLinkManager');
  var config, contexts = {}, lastErrors = {};
  function error(failure) { var message=String(failure); if (!lastErrors[message]) { lastErrors[message]=true; console.error('[The World Remembers] '+message); } }
  function reload() { config=Core.validateConfig(JSON.parse(String(JsonIO.readString('kubejs/outlandish/world_remembers.json')))); }
  reload();
  function id(player) { return Core.uuid(Native.uuid(player)); }
  function name(player) { return String(Native.username(player)); }
  function read(player) {
    var raw=String(player.server.persistentData.getString('or_world_remembers_v1_'+id(player)));
    if (!raw) return null;
    var record=JSON.parse(raw);
    if (!Core.validRecord(record,id(player))) throw Error('Invalid personal memorial record for '+id(player));
    return record;
  }
  // Native checks only hotbar, storage and offhand when an interaction/hook needs it.
  function hasSword(player) { return Native.hasSword(player); }
  function award(player) {
    var advancement=player.server.getAdvancements().getAdvancement(new Location('outlandish:the_promise_fulfilled'));
    if (!advancement) throw Error('Personal achievement resource missing');
    player.getAdvancements().award(advancement,'awakening_completed');
  }
  function sync(player) {
    var record=read(player);
    player.sendData('outlandish_world_remembers_state',{payload:JSON.stringify({version:1,playerUuid:id(player),
      completedAtUtc:record?record.completedAtUtc:null,lines:Core.inscription(record,name(player),config.originalInscription),memorials:config.memorials})});
  }
  function completeAwakening(player, receipt) {
    if (!(player instanceof ServerPlayer)) return {ok:false,reason:'server_player_required'};
    var reason=Core.validateReceipt(id(player),receipt,config.ceremonyIntegrationEnabled);
    if (reason) return {ok:false,reason:reason};
    var previous=read(player);
    if (previous) { award(player); sync(player); return {ok:true,alreadyComplete:true,completedAtUtc:previous.completedAtUtc}; }
    if (!hasSword(player)) return {ok:false,reason:'sword_not_in_normal_inventory'};
    // The trusted ceremony caller MUST already have consumed its three offerings,
    // verified a Tier 1 altar, and applied individual soulbinding before calling.
    // Disabled in the distributed config until that real integration exists.
    var record=Core.makeRecord(id(player),name(player),receipt,Instant.now().toString());
    player.server.persistentData.putString('or_world_remembers_v1_'+id(player),JSON.stringify(record));
    award(player); sync(player);
    return {ok:true,alreadyComplete:false,completedAtUtc:record.completedAtUtc};
  }
  // Server-script integration only. No command or client packet can call this.
  global.ORWorldRemembers={completeAwakening:completeAwakening,getPersonalRecord:read};
  function npcById(npcId) { return config.npcs.filter(function (npc) { return npc.id===npcId; })[0]; }
  function linkId(target) { var link=QuestLinks.getMatchingLink(target); return link?String(link.questLineId):null; }
  function flags(player) {
    var raw=String(player.server.persistentData.getString('or_world_remembers_greetings_v1_'+id(player)));
    return raw?JSON.parse(raw):{};
  }
  global.ORWorldRemembersConversation=function(event) {
    try {
      var player=event.getEntity();
      if (!(player instanceof ServerPlayer) || String(event.getHand())!=='MAIN_HAND') return;
      if (String(player.getItemInHand(event.getHand()).id)!=='quest_giver:quest_scroll') return;
      var target=event.getTarget(),npc=npcById(linkId(target));
      if (!npc || !hasSword(player) || player.distanceToSqr(target)>64) return;
      var personal=flags(player);
      contexts[id(player)+':'+npc.id]={entityUuid:String(Native.uuid(target)),dimension:String(player.level.dimension)};
      if (personal[npc.id]) return;
      player.tell(Text.of(npc.displayName+' recognizes Tears for Fears. ').append(
        Text.of('[Listen]').gold().clickRunCommand('/orremembers greet '+npc.id)));
      personal[npc.id]=true;
      player.server.persistentData.putString('or_world_remembers_greetings_v1_'+id(player),JSON.stringify(personal));
      // Do not cancel the event or replace Quest Giver's ordinary conversation.
    } catch(failure) { error(failure); }
  };
  function greet(player,npc) {
    if (!hasSword(player)) { player.tell('Carry Tears for Fears in your normal inventory to hear this recognition.');return 0; }
    var context=contexts[id(player)+':'+npc.id];
    if (!context || context.dimension!==String(player.level.dimension)) { player.tell('Speak to this NPC with a Quest Scroll first.');return 0; }
    var target=player.level.getEntity(UUID.fromString(context.entityUuid));
    if (!target || !target.isAlive() || player.distanceToSqr(target)>64 || linkId(target)!==npc.id) { player.tell('Stay near the NPC you spoke with.');return 0; }
    var message=npc.carrying;
    if (read(player)) message+=' '+npc.fulfilled;
    // Verified display-only API: no initialize, accept, complete or reward calls.
    QuestNetwork.sendToPlayer(new DisplayMessage(new QuestDisplay(Text.of(npc.displayName),Text.of(message),null),false,target.getId(),npc.id,'quest_giver',false,1.0),player);
    return 1;
  }
  function dimension(player) { return String(player.level.dimension); }
  function closeEnough(player,m) {
    var dx=player.x-(m.interaction.x+0.5),dy=player.y-m.interaction.y,dz=player.z-(m.interaction.z+0.5);
    if(dimension(player)!==m.dimension || dx*dx+dy*dy+dz*dz>64)return false;
    if(m.anchor.requiredBlockId){
      var block=player.level.getBlockState(new BlockPos(m.anchor.x,m.anchor.y,m.anchor.z)).getBlock();
      if(String(Registries.BLOCKS.getKey(block))!==m.anchor.requiredBlockId)return false;
    }
    return true;
  }
  function showPlaque(player,m) {
    if (!closeEnough(player,m)) { player.tell('Move closer to the memorial plaque.');return 0; }
    var record=read(player);
    Core.inscription(record,name(player),config.originalInscription).forEach(function(line) {
      var text=Text.of(line.text); if(line.gold)text=text.gold(); if(line.bold)text=text.bold(); if(line.italic)text=text.italic();player.tell(text);
    });
    if(record)player.tell('Personal completion: '+record.completedAtUtc+' (UTC)');
    sync(player);return 1;
  }
  BlockEvents.rightClicked(function(event) {
    try {
      if (String(event.hand)!=='MAIN_HAND') return;
      var block=event.block;
      var memorial=config.memorials.filter(function(m) { return dimension(event.player)===m.dimension && block.x===m.interaction.x && block.y===m.interaction.y && block.z===m.interaction.z; })[0];
      if (memorial && closeEnough(event.player,memorial)) { showPlaque(event.player,memorial);event.cancel(); }
    } catch(failure) {error(failure);}
  });
  PlayerEvents.loggedIn(function(event) { try { if(read(event.player))award(event.player);sync(event.player); }catch(failure){error(failure);} });
  ServerEvents.commandRegistry(function(event) {
    var commands=event.commands;
    var root=commands.literal('orremembers').executes(function(ctx) {
      var player=ctx.source.player,record=read(player);
      player.tell(record?'The Promise Fulfilled — '+record.completedAtUtc+' (UTC)':'The Promise Fulfilled has not been earned by this player.');sync(player);return 1;
    });
    var greetings=commands.literal('greet');
    config.npcs.forEach(function(npc) { greetings.then(commands.literal(npc.id).executes(function(ctx){return greet(ctx.source.player,npc);})); });
    root.then(greetings);
    root.then(commands.literal('plaque').executes(function(ctx) {
      var player=ctx.source.player,near=config.memorials.filter(function(m){return closeEnough(player,m);});
      if(!near.length){player.tell('No configured memorial plaque is nearby.');return 0;}return showPlaque(player,near[0]);
    }));
    root.then(commands.literal('reload').requires(function(source){return source.hasPermission(2);}).executes(function(ctx){
      reload();ctx.source.server.players.forEach(sync);ctx.source.sendSystemMessage(Text.of('World Remembers configuration reloaded.'));return 1;
    }));
    event.register(root);
  });
})();
