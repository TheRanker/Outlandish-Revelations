// Outlandish Revelations: tinkers content.
(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/tinkers_progression.json')));
 StartupEvents.registry('item',function(event){
  data.materials.forEach(function(row){event.create(row.billet).displayName(row.name+' Tool Material ('+row.tier.toUpperCase()+')').texture('minecraft:item/iron_ingot');});
  data.upgrades.forEach(function(row){event.create(row.id).displayName(row.name+' ('+row.tier.toUpperCase()+')').texture('minecraft:item/diamond');});
  ['lv','mv','hv','ev'].forEach(function(tier){event.create(tier+'_tooling_die').displayName(tier.toUpperCase()+' Tooling Die').texture('minecraft:item/iron_nugget');});
 });
 StartupEvents.registry('fluid',function(event){
  data.materials.forEach(function(row){if(row.cast)event.create(row.fluid).displayName('Molten Prepared '+row.name).thickTexture({lv:0x929ca0,mv:0x70aaa0,hv:0xac80c0,ev:0xd7b478}[row.tier]).bucketColor(0x929ca0).noBlock();});
 });
})();
