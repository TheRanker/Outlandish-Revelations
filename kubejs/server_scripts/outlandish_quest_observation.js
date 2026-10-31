// Outlandish Revelations: quest observation.
(function(){

  var state={registered:0,checks:0,completed:0,rules:{},lastCompletion:null,errors:[]};

  function error(failure){var message=String(failure);if(state.errors.indexOf(message)<0){state.errors.push(message);console.error('[Outlandish quest observation] '+message);}}

  if(!Platform.isLoaded('gtceu')||!Platform.isLoaded('ftbquests')||!Platform.isLoaded('ftbxmodcompat'))return;
  var MetaMachine=Java.loadClass('com.gregtechceu.gtceu.api.machine.MetaMachine');
  var Controller=Java.loadClass('com.gregtechceu.gtceu.api.machine.feature.multiblock.IMultiController');
  var payload=JSON.parse(String(JsonIO.readString('kubejs/outlandish/quest_observation_rules.json')));
  var rules={};
  payload.observeRules.forEach(function(rule){rules[rule.task]=rule;state.rules[rule.controller]={quest:rule.quest,task:rule.task,status:'awaiting_task_load'};});
  FTBQuestsEvents.customTask(function(event){
    var task=event.task,id=String(task.getCodeString()).toUpperCase(),rule=rules[id];
    if(!rule)return;
    try{
      if(String(task.getQuest().getCodeString()).toUpperCase()!==rule.quest){state.rules[rule.controller].status='parent_quest_mismatch';return;}
      if(!Item.exists(rule.controller)){state.rules[rule.controller].status='controller_not_registered';return;}
      event.setCheckTimer(10);event.setMaxProgress(1);event.setEnableButton(false);
      event.setCheck(function(data,player){
        try{

          var team=data.teamData();
          if(!team.canStartTasks(task.getQuest())||team.isCompleted(task)||!player.isAlive()||player.isSpectator())return;
          state.checks++;if(state.checks===1||state.checks%100===0){}
          var block=player.rayTrace(5,false).block;
          if(!block||String(block.id)!==rule.controller)return;
          var machine=MetaMachine.getMachine(player.level,block.pos);
          if(!(machine instanceof Controller)||!machine.isFormed()||String(machine.getDefinition().getId())!==rule.controller)return;
          data.addProgress(1);
          state.completed++;state.lastCompletion={player:String(player.username),controller:rule.controller,task:rule.task};
        }catch(failure){error(failure);}
      });
      if(state.rules[rule.controller].status!=='registered')state.registered++;
      state.rules[rule.controller].status='registered';
    }catch(failure){error(failure);}
  });
})();
