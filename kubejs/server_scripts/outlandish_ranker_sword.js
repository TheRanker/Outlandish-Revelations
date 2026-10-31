// Outlandish Revelations: ranker sword.
(function(){

  var state={ready:false,damage:25,range:15,cooldownTicks:200,chargeTicks:10,clicksReceived:0,shots:0,resolved:0,lastShot:null,errors:[]};
  var LivingEntity=Java.loadClass('net.minecraft.world.entity.LivingEntity');

  function error(failure){var message=String(failure);state.errors.push(message);console.error('[Outlandish Ranker sword] '+message);}
  function sound(event,user,id,pitch){event.server.runCommandSilent('execute in '+event.level.dimension+' positioned '+user.x+' '+user.y+' '+user.z+' run playsound minecraft:entity.warden.'+id+' player @a ~ ~ ~ 3 '+pitch);}
  if(!Item.exists('kubejs:rankers_sword'))return;
  function use(event,interaction){
    var user=event.player;
    state.clicksReceived++;state.lastShot={status:'received',interaction:interaction};
    try{
      if(user.cooldowns.isOnCooldown(event.item.item)){state.lastShot.status='cooldown';return false;}
      var target=interaction==='entity'?event.target:user.rayTrace(15,true).entity;
      if(!(target instanceof LivingEntity)||!target.isAlive()){state.lastShot.status='no_living_target';return false;}
      var origin=user.getEyePosition(),difference=target.getEyePosition().subtract(origin),direction=difference.normalize();
      var dimension=String(event.level.dimension);
      user.addItemCooldown('kubejs:rankers_sword',200);sound(event,user,'sonic_charge',2);
      for(var i=1;i<Math.floor(difference.length())+2;i++){
        var point=origin.add(direction.scale(i));
        event.level.spawnParticles('minecraft:sonic_boom',false,point.x(),point.y(),point.z(),0,0,0,1,0);
      }
      state.shots++;state.lastShot={target:String(target.type),status:'charging'};
      event.server.scheduleInTicks(10,function(){
        try{
          if(!user.isAlive()||!target.isAlive()||String(user.level.dimension)!==dimension||String(target.level.dimension)!==dimension){state.lastShot={status:'target_unavailable'};return;}
          var resistance=1.0-target.getAttributeValue('minecraft:generic.knockback_resistance');
          sound(event,user,'sonic_boom',1);

          var hit=target.attack(event.level.damageSources().sonicBoom(user),25);
          target.addMotion(direction.x()*(2.5*resistance),direction.y()*(0.5*resistance),direction.z()*(2.5*resistance));
          target.hurtMarked=true;
          state.resolved++;state.lastShot={target:String(target.type),status:'resolved',damageAccepted:!!hit};
        }catch(failure){error(failure);}
      });
      return true;
    }catch(failure){error(failure);return false;}
  }
  ItemEvents.rightClicked('kubejs:rankers_sword',function(event){use(event,'air');});
  ItemEvents.entityInteracted('kubejs:rankers_sword',function(event){
    var fired=use(event,'entity');

    if(fired)event.cancel();
  });
  BlockEvents.rightClicked(function(event){
    if(String(event.item.id)!=='kubejs:rankers_sword')return;
    var fired=use(event,'block');
    if(fired)event.cancel();
  });
  state.ready=true;
})();
