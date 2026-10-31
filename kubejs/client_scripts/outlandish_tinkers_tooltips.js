// Outlandish Revelations: tinkers tooltips.
(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/tinkers_progression.json')));
 ItemEvents.tooltip(function(event){
  data.materials.forEach(function(row){event.add(row.billet,row.tier.toUpperCase()+' Assembler + reusable tooling die. '+(row.cast?'Melt and cast into tool parts.':'Use in the Part Builder.')+' Also used for repairs.');});
  data.upgrades.forEach(function(row){event.add(row.id,'Prepared in a '+row.tier.toUpperCase()+'-capable Assembler. Native modifier costs and slots still apply.');});
  ['lv','mv','hv','ev'].forEach(function(tier){event.add('kubejs:'+tier+'_tooling_die','Reusable assembler ingredient: not consumed.');});
  data.equipmentBlocked.forEach(function(id){event.add(id,'Retired ordinary tool: use the Tinkers Workshop. Existing items are retained.');});
  event.add('tconstruct:smeltery_controller','Create-gated casting workshop. Fixed raw-ore yields; industrial alloy gates apply.');
  event.add('tconstruct:foundry_controller','MV workshop. Raw ores have no bonus foundry byproducts.');
 });
})();
