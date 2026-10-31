// Outlandish Revelations: vanilla wood.
ServerEvents.recipes(function (event) {
  var groups=JSON.parse(String(JsonIO.readString('kubejs/outlandish/vanilla_wood.json')));
  var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var ResourceLocation=Java.loadClass('net.minecraft.resources.ResourceLocation');
  var state={added:0,groups:{},errors:[]};
  function checkItem(spec) {
    var id=spec.replace(/^\d+x /,'');
    if (id.charAt(0)==='#') {
      if (!Ingredient.of(id).itemIds.size()) throw Error('Empty tag: '+id);
    } else if (!Item.exists(id)) throw Error('Missing item: '+id);
  }
  Object.keys(groups).forEach(function (name) {
    var group=groups[name];var errors=[];
    group.recipes.forEach(function (row) {
      try {
        row.outputs.forEach(checkItem);
        if (row.key) Object.keys(row.key).forEach(function (k) {checkItem(row.key[k]);});
        (row.inputs || []).forEach(checkItem);
        (row.fluids || []).forEach(function (spec) {
          if (!Registries.FLUIDS.containsKey(new ResourceLocation(spec.fluid))) throw Error('Missing fluid: '+spec.fluid);
        });
      } catch (error) {errors.push(row.id+': '+error);}
    });
    if (errors.length) {
      state.groups[name]={applied:false,errors:errors};
      errors.forEach(function (e) {state.errors.push(e);console.error('[Outlandish vanilla wood] '+e);});return;
    }

    group.removedOutputs.forEach(function (id) {event.remove({output:id});});
    group.recipes.forEach(function (row) {
      if (row.type==='shaped') event.shaped(row.outputs[0],row.pattern,row.key).id(row.id);
      else if (row.type==='shapeless') event.shapeless(row.outputs[0],row.inputs).id(row.id);
      else {
        var recipe=event.recipes.gtceu[row.type](row.id).duration(row.duration).EUt(row.EUt);
        recipe.itemInputs(row.inputs).itemOutputs(row.outputs);
        if (row.fluids.length) recipe.inputFluids(row.fluids.map(function (spec) {return Fluid.of(spec.fluid,spec.amount);}));
        if (row.circuit!==undefined) recipe.circuit(row.circuit);
      }
    });
    state.groups[name]={applied:true,added:group.recipes.length,removedOutputFilters:group.removedOutputs.length};
    state.added+=group.recipes.length;
  });

  console.info('[Outlandish vanilla wood] Added '+state.added+' recipes; '+state.errors.length+' failed references.');
  if (state.errors.length) throw Error('[Outlandish vanilla wood] '+JSON.stringify(state.errors));
});
