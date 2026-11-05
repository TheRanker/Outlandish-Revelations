// Outlandish Revelations: item tooltips.
(function () {

  var state={addedLines:0,items:[],missingItems:[],errors:[]};

  function awakened(stack){
    var nbt=stack.nbt;
    return nbt&&nbt.getCompound('outlandish_relic').getBoolean('awakened');
  }

  function control(lines,before,key,after){
    lines.add(Text.of(before).append(Text.keybind(key)).append(Text.of(after)).gray());
  }

  ItemEvents.tooltip(function(event){
    state.addedLines=0;state.items=[];state.missingItems=[];state.errors=[];
    function add(id,line,color){
      if(!Item.exists(id)){state.missingItems.push(id);return;}
      try{event.add(id,Text.of(line)[color]());state.addedLines++;state.items.push(id);}
      catch(failure){var message=id+': '+failure;state.errors.push(message);console.error('[Outlandish item tooltips] '+message);}
    }
    ['magic','early','mid','late','end','food'].forEach(function(family){
      [['common','Common','white'],['rare','Rare','aqua'],['epic','Epic','lightPurple']].forEach(function(rarity){add('kubejs:'+family+'_bag_'+rarity[0],rarity[1],rarity[2]);});
    });
    add('kubejs:lockpick','Use to unlock chests in wild, has 50 uses','yellow');
    add('kubejs:rankers_sword','A Sword wielded by TheRanker, Owner, Operator, Creator of things Minecraft','yellow');
    add('kubejs:rankers_sword','Right Click to Shout, Shout, Let it all Out!','yellow');

    event.addAdvanced('kubejs:rankers_sword',function(stack,advanced,lines){
      if(!Client.isShiftDown()){
        lines.add(Text.of('Hold Shift for sword abilities.').gray());
        return;
      }
      control(lines,'Warden Shout — Aim at a mob and press ','key.use','.');
      if(!awakened(stack)){
        lines.add(Text.of('Awaken the blade at The Ranker\'s Memorial for its other abilities.').gray());
        return;
      }
      control(lines,'Resonant Fracture — Shout, then ','key.attack',' the same mob within 3 seconds.');
      lines.add(Text.of('Echo of the Fallen — Charged hit. Default cost is 45 Resonance.').gray());
      control(lines,'Skybreaker — ','key.jump',' and land a charged hit in midair.');
      lines.add(Text.of('Skybreaker requires the awakened ring. Default cost is 75 Resonance.').gray());
      lines.add(Text.of('Let the attack meter refill between swings.').gray());
      lines.add(Text.of('See Relic Abilities and Controls in the Player Handbook.').gray());
    });

    event.addAdvanced('kubejs:rankers_ring',function(stack,advanced,lines){
      var awake=awakened(stack);
      lines.add(Text.of('Equip in an Accessories ring slot.').gray());
      if(awake)control(lines,'Flight — Double-tap ','key.jump',' to fly if enabled.');
      if(!Client.isShiftDown()){
        lines.add(Text.of('Hold Shift for ring abilities.').gray());
        return;
      }
      lines.add(Text.of('Guardian\'s Protection — Automatically softens a heavy hit.').gray());
      if(awake){
        lines.add(Text.of('Guardian\'s Last Stand — Automatically catches a fatal hit when ready.').gray());
        lines.add(Text.of('With awakened Tears for Fears, the ring enables Skybreaker.').gray());
      }else{
        lines.add(Text.of('Awaken the ring at The Ranker\'s Memorial for flight and Last Stand.').gray());
      }
      lines.add(Text.of('See Relic Abilities and Controls in the Player Handbook.').gray());
    });

  });
})();
