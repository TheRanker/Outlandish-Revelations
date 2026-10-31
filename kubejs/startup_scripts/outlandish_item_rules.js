// Outlandish Revelations: item rules.
(function () {

  var state={packNameApplied:false,regexRules:9,directRules:8,setterCalls:0,items:[],rules:[],errors:[]};

  function error(message){state.errors.push(String(message));console.error('[Outlandish item rules] '+message);}
  try{Platform.setModName('kubejs','Outlandish Revelations');state.packNameApplied=true;}
  catch(failure){error('Pack name: '+failure);}

  ItemEvents.modification(function(event){
    state.setterCalls=0;state.items=[];state.rules=[];
    function apply(filter,size,label){
      var entry={filter:label,maxStackSize:size,matched:0,applied:0,errors:[]};state.rules.push(entry);
      try{
        event.modify(filter,function(item){
          entry.matched++;
          try{item.setMaxStackSize(size);entry.applied++;state.setterCalls++;state.items.push({id:String(item.id),maxStackSize:size});}
          catch(failure){var message=String(item.id)+': '+failure;entry.errors.push(message);error(message);}
        });
      }catch(failure){var message=label+': '+failure;entry.errors.push(message);error(message);}
    }
    [/.*_sword$/,/.*_shovel$/,/.*_pickaxe$/,/.*_axe$/,/.*_hoe$/,/.*_helmet$/,/.*_chestplate$/,/.*_leggings$/,/.*_boots$/].forEach(function(filter){apply(filter,16,String(filter));});
    [['minecraft:bow',16],['minecraft:potion',16],['minecraft:oak_boat',16],['minecraft:enchanted_book',16],['create:wrench',16],['minecraft:fishing_rod',16],['minecraft:cake',64],['minecraft:shulker_box',8]].forEach(function(rule){apply(rule[0],rule[1],rule[0]);});

  });
})();
