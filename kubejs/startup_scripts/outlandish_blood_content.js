// Outlandish Revelations: blood content.
StartupEvents.registry('item',function(event){
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/blood_progression.json')));
  data.items.forEach(function(row){event.create(row.id).displayName(row.name).texture(row.texture);});
});
