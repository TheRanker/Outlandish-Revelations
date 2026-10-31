// Outlandish Revelations: blood tooltips.
ItemEvents.tooltip(function(event){
  ['lv','mv','hv','ev'].forEach(function(tier){
    event.add('kubejs:'+tier+'_prepared_slate','Assembler: programmed circuit setting 2.');
    event.add('kubejs:'+tier+'_blood_circuit_substrate','Assembler: programmed circuit setting 1.');
  });
  event.add('bloodmagic:slate_ampoule','Single-use: supplies up to 500 LP to a nearby altar.');
  event.add('bloodmagic:slate_ampoule','Use with at least 500 LP free space; the ampoule is consumed.');
});
