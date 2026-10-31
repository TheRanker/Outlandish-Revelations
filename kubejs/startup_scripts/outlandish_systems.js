// Outlandish Revelations: systems.
(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/systems_progression.json')));
 StartupEvents.registry('item',function(event){data.items.forEach(function(row){event.create(row.id).displayName(row.name).texture(row.texture);});});
})();
