// Outlandish Revelations: effects.
(function(){

  var state={registered:[],errors:[]};
  StartupEvents.registry('mob_effect',function(event){
    state.registered=[];
    try{
      event.create('rankers_power').modifyAttribute('minecraft:generic.attack_damage','e0f4e796-3d3d-11ee-be56-0242ac120002',1,'multiply_base').color(Color.GREEN);
      state.registered.push('kubejs:rankers_power');
      event.create('radiation').displayName('Radiation').effectTick(function(entity,amplifier){if(global.radiationEffect)global.radiationEffect(entity,amplifier);}).color(Color.GREEN).harmful();
      state.registered.push('kubejs:radiation');
    }catch(failure){state.errors.push(String(failure));console.error('[Outlandish effects] '+failure);}

  });
})();
