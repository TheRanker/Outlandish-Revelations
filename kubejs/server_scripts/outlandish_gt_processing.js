// Outlandish Revelations: gt processing.
ServerEvents.recipes(function (event) {
  var rows=JSON.parse(String(JsonIO.readString('kubejs/outlandish/gt_processing.json')));
  var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var ResourceLocation=Java.loadClass('net.minecraft.resources.ResourceLocation');
  var state={added:0,groups:{},errors:[]};
  function checkItem(spec) {
    var id=spec.replace(/^\d+x /,'');
    if (id.charAt(0)==='#') {
      if (!Ingredient.of(id).itemIds.size()) throw Error('Empty tag: '+id);
    } else if (!Item.exists(id)) throw Error('Missing item: '+id);
  }
  function checkFluid(spec) {
    if (!Registries.FLUIDS.containsKey(new ResourceLocation(spec.fluid))) throw Error('Missing fluid: '+spec.fluid);
  }
  function fluid(spec) {return Fluid.of(spec.fluid,spec.amount);}
  ['resonant_ender','chemistry','custom_fuels','menril'].forEach(function (group) {
    if (group==='menril' && !Platform.isLoaded('integrateddynamics')) {
      state.groups[group]={applied:false,skipped:true};return;
    }
    var selected=rows.filter(function (r) {return r.group===group;});
    var errors=[];
    selected.forEach(function (row) {
      try {
        row.inputs.forEach(checkItem);row.outputs.forEach(checkItem);
        row.inputFluids.forEach(checkFluid);row.outputFluids.forEach(checkFluid);
      } catch (error) {errors.push(row.id+': '+error);}
    });
    if (errors.length) {
      state.groups[group]={applied:false,errors:errors};
      errors.forEach(function (e) {state.errors.push(e);console.error('[Outlandish GT processing] '+e);});return;
    }
    selected.forEach(function (row) {
      var recipe=event.recipes.gtceu[row.type](row.id).duration(row.duration).EUt(row.EUt);
      if (row.inputs.length) recipe.itemInputs(row.inputs);
      if (row.outputs.length) recipe.itemOutputs(row.outputs);
      if (row.inputFluids.length) recipe.inputFluids(row.inputFluids.map(fluid));
      if (row.outputFluids.length) recipe.outputFluids(row.outputFluids.map(fluid));
    });
    state.groups[group]={applied:true,added:selected.length};state.added+=selected.length;
  });

  console.info('[Outlandish GT processing] Added '+state.added+' recipes; '+state.errors.length+' failed references.');
  if (state.errors.length) throw Error('[Outlandish GT processing] '+JSON.stringify(state.errors));
});
