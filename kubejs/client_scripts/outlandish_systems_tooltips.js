// Outlandish Revelations: systems tooltips.
ItemEvents.tooltip(function(event){
 event.add('kubejs:dormant_pickaxe_heater','Restore in an MV Assembler with a Cupronickel Coil Block and reusable MV tooling die.');
 event.add('kubejs:mechanical_botanical_seed','Press Andesite Alloy; use with white petals to create a Pure Daisy.');
 event.add('kubejs:prepared_manasteel_feedstock','LV-prepared steel: infuse with 3000 mana per ingot.');
 event.add('botania:mana_fluxfield','Crafting disabled: electrical generation follows GregTech.');
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/systems_progression.json')));
 Object.keys(data.stageTargets).forEach(function(id){event.add(id,'Manufacturing unlock: '+data.stageTargets[id].toUpperCase()+'. Check the prepared ingredient recipe.');});
});
