// Outlandish Revelations: storage.
ServerEvents.recipes(function (event) {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/storage.json')));
  var state={added:0,applied:false,woodFamilies:data.woods.length,removedOutputFilters:0,protectedStorageInputs:true,errors:[]};
  if (!Platform.isLoaded('sophisticatedstorage')) {
    state.skipped=true;state.reason='Sophisticated Storage is not loaded';
    return;
  }
  function check(spec) {
    var id=typeof spec==='string'?spec:spec.item;
    if (id.charAt(0)==='#') {
      if (!Ingredient.of(id).itemIds.size()) throw Error('Empty tag: '+id);
    } else if (!Item.exists(id)) throw Error('Missing item: '+id);
  }
  data.recipes.forEach(function (r) {
    try {
      check(r.output);
      if (r.type==='shaped') Object.keys(r.key).forEach(function (k) {check(r.key[k]);});
      else r.inputs.forEach(check);
    } catch (error) {state.errors.push(r.id+': '+error);}
  });
  if (state.errors.length) {

    throw Error('[Outlandish storage] '+JSON.stringify(state.errors));
  }

  var safeVariants=[Item.of('sophisticatedstorage:chest').strongNBT()];
  data.woods.forEach(function (wood) {safeVariants.push(Item.of('sophisticatedstorage:chest',{woodType:wood}).strongNBT());});
  var safeChest=Ingredient.of(safeVariants);
  var prepared=[];
  data.recipes.forEach(function (r) {
    var out=typeof r.output==='string'?r.output:Item.of(r.output.item,r.output.nbt);
    var inputs;
    if (r.type==='shaped') {
      inputs={};Object.keys(r.key).forEach(function (k) {inputs[k]=r.key[k]==='sophisticatedstorage:chest'?safeChest:r.key[k];});
    } else {
      inputs=r.inputs.map(function (i) {return typeof i==='object' && i.item==='sophisticatedstorage:chest'?safeChest:i;});
    }
    prepared.push({row:r,output:out,inputs:inputs});
  });

  data.removals.forEach(function (filter) {event.remove(filter);state.removedOutputFilters++;});
  prepared.forEach(function (p) {
    var r=p.row;
    (r.type==='shaped'?event.shaped(p.output,r.pattern,p.inputs):event.shapeless(p.output,p.inputs)).id(r.id);
    state.added++;
  });
  state.applied=true;

  console.info('[Outlandish storage] Added '+state.added+' recipes; packed/upgraded chests excluded from destructive crafting');
});
