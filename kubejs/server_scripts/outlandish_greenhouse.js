// Outlandish Revelations: greenhouse.
ServerEvents.recipes(function (event) {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/greenhouse.json')));
  var state={added:0,controllerApplied:false,plants:{},errors:[]};
  var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var ResourceLocation=Java.loadClass('net.minecraft.resources.ResourceLocation');
  function checkItem(spec) {
    var id=spec.replace(/^\d+x /,'');
    if (id.charAt(0)==='#') {
      if (!Ingredient.of(id).itemIds.size()) throw Error('Empty tag: '+id);
    } else if (!Item.exists(id)) throw Error('Missing item: '+id);
  }

  var GTRecipeTypes=Java.loadClass('com.gregtechceu.gtceu.common.data.GTRecipeTypes');
  if (!Item.exists('gtceu:greenhouse') || !GTRecipeTypes.get('greenhouse')) {
    state.errors.push('Greenhouse controller or recipe type failed startup registration.');

    throw Error('[Outlandish greenhouse] Greenhouse startup registration missing.');
  }
  try {
    checkItem(data.controller.output);
    Object.keys(data.controller.key).forEach(function (k) {checkItem(data.controller.key[k]);});
    event.shaped(data.controller.output,data.controller.pattern,data.controller.key).id('otg:restored/greenhouse/controller');
    state.controllerApplied=true;state.added++;
  } catch (error) {state.errors.push('Controller recipe: '+error);}
  data.recipes.forEach(function (row) {
    try {
      row.inputs.forEach(checkItem);row.outputs.forEach(checkItem);row.catalysts.forEach(checkItem);
      row.fluids.forEach(function (spec) {
        if (!Registries.FLUIDS.containsKey(new ResourceLocation(spec.fluid))) throw Error('Missing fluid: '+spec.fluid);
      });
    } catch (error) {
      state.plants[row.id]={applied:false,error:String(error)};state.errors.push(row.id+': '+error);return;
    }
    var recipe=event.recipes.gtceu.greenhouse(row.id).duration(row.duration).EUt(row.EUt).circuit(row.circuit);
    row.catalysts.forEach(function (spec) {recipe.notConsumable(spec);});
    if (row.inputs.length) recipe.itemInputs(row.inputs);
    recipe.itemOutputs(row.outputs);
    recipe.inputFluids(row.fluids.map(function (spec) {return Fluid.of(spec.fluid,spec.amount);}));
    state.plants[row.id]={applied:true};state.added++;
  });

  console.info('[Outlandish greenhouse] Added '+state.added+' recipes; '+state.errors.length+' failed references.');
  if (state.errors.length) throw Error('[Outlandish greenhouse] Recipe setup failed: '+state.errors.join('; '));
});
