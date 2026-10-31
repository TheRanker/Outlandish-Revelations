// Outlandish Revelations: draconic.
(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/draconic_progression.json')));
 StartupEvents.registry('item',function(event){data.items.forEach(function(row){event.create(row.id).displayName(row.name).texture(row.texture);});});
})();
