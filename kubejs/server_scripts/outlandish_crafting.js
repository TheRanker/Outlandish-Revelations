// Outlandish Revelations: crafting.
(function () {
  var rows=JSON.parse(String(JsonIO.readString('kubejs/outlandish/crafting_progression.json')));
  var lockpickReady=false;
  ServerEvents.recipes(function (event) {
    var state={added:0,groups:{},errors:[],lockpickingEnabled:false};
    lockpickReady=false;
    function checkIngredient(id) {
      var plain=id.replace(/^\d+x /,'');
      if (plain.charAt(0)==='#') {
        if (!Ingredient.of(plain).itemIds.size()) throw Error('Empty ingredient tag: '+plain);
      } else if (!Item.exists(plain)) throw Error('Missing item: '+plain);
    }
    ['hay','raft','lockpick','fishing','coke_clay'].forEach(function (group) {
      if (group==='fishing' && !Platform.isLoaded('aquaculture')) {
        state.groups[group]={applied:false,skipped:true};return;
      }
      var selected=rows.filter(function (r) {return r.group===group;});
      var errors=[];
      selected.forEach(function (row) {
        try {
          checkIngredient(row.output);
          if (row.type==='shaped') Object.keys(row.key).forEach(function (k) {checkIngredient(row.key[k]);});
          else row.inputs.forEach(checkIngredient);
          if (row.keepIngredient) checkIngredient(row.keepIngredient);
        } catch (error) {errors.push(row.id+': '+error);}
      });
      if (errors.length) {
        state.groups[group]={applied:false,errors:errors};
        errors.forEach(function (e) {state.errors.push(e);console.error('[Outlandish crafting] '+e);});return;
      }
      selected.forEach(function (row) {
        (row.removeIds || []).forEach(function (id) {event.remove({id:id});});
        if (row.removeOutput) event.remove({output:row.removeOutput});
        var recipe=row.type==='shaped'?event.shaped(row.output,row.pattern,row.key):event.shapeless(row.output,row.inputs);
        recipe.id(row.id);
        if (row.keepIngredient) recipe.keepIngredient(row.keepIngredient);
      });
      state.groups[group]={applied:true,added:selected.length};state.added+=selected.length;
      if (group==='lockpick') lockpickReady=true;
    });
    state.lockpickingEnabled=lockpickReady;

    console.info('[Outlandish crafting] Added '+state.added+' recipes; lockpicking enabled: '+lockpickReady);
    if (state.errors.length) throw Error('[Outlandish crafting] '+JSON.stringify(state.errors));
  });
  BlockEvents.rightClicked(function (event) {
    if (!lockpickReady) return;
    var data=event.block.entityData;

    if (!data || !data.contains('LootTable',8) || !data.getString('LootTable')) return;
    var entity=event.block.getEntity();
    if (!entity) return;
    var persistent=entity.persistentData;
    var lock=persistent.getInt('Lock');
    if (!lock) {
      lock=Math.floor(Math.random()*20+1);
      persistent.putInt('Lock',lock);entity.setChanged();
    }
    if (lock===1) return;
    var pick=event.player.getMainHandItem();
    if (String(pick.id)!=='kubejs:lockpick') {
      event.player.tell('This is locked. You need a lockpick to open it.');event.cancel();return;
    }
    var roll=Math.floor(Math.random()*20+1);
    if (lock-roll<=1) {
      persistent.putInt('Lock',1);entity.setChanged();
      event.player.tell('Success!');event.player.damageHeldItem('main_hand',1);
    } else {
      persistent.putInt('Lock',lock-roll);entity.setChanged();
      event.player.tell('Failed.');event.player.damageHeldItem('main_hand',1);event.cancel();
    }
  });
})();
