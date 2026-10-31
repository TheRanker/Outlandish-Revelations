// Outlandish Revelations: radiation.
(function(){

  var state={damageTypeReady:false,messageId:'radiationKill',amountFormula:'amplifier + 0.8',attempts:0,accepted:0,lastApplication:null,errors:[]};

  function error(failure){var message=String(failure);if(state.errors.indexOf(message)<0){state.errors.push(message);console.error('[Outlandish radiation] '+message);}}

  var Key=Java.loadClass('net.minecraft.resources.ResourceKey');
  var Location=Java.loadClass('net.minecraft.resources.ResourceLocation');
  var Source=Java.loadClass('net.minecraft.world.damagesource.DamageSource');
  var registryKey=Key.createRegistryKey(new Location('minecraft:damage_type'));
  var typeKey=Key.create(registryKey,new Location('kubejs:radiation'));
  function source(level){return new Source(level.registryAccess().registryOrThrow(registryKey).getHolderOrThrow(typeKey));}
  function preflight(level){try{source(level);state.damageTypeReady=true;}catch(failure){state.damageTypeReady=false;error(failure);}}
  ServerEvents.loaded(function(event){preflight(event.server.getLevel('minecraft:overworld'));});
  PlayerEvents.loggedIn(function(event){if(!state.damageTypeReady)preflight(event.player.level);});
  global.radiationEffect=function(entity,amplifier){
    if(entity.level.clientSide)return;
    try{
      var damage=Number(amplifier)+0.8;
      var accepted=entity.attack(source(entity.level),damage);
      state.attempts++;if(accepted)state.accepted++;
      state.lastApplication={entity:String(entity.type),amplifier:Number(amplifier),amount:damage,accepted:!!accepted};

      if(state.attempts===1||state.attempts%20===0){}
    }catch(failure){error(failure);}
  };
  EntityEvents.hurt(function(event){
    if(Number(event.entity.age)%10===0&&String(event.source.getType())==='radiationKill')event.entity.invulnerableTime=1;
  });
})();
