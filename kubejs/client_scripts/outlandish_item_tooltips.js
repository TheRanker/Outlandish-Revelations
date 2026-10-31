// Outlandish Revelations: item tooltips.
(function () {

  var state={addedLines:0,items:[],missingItems:[],errors:[]};

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

  });
})();
