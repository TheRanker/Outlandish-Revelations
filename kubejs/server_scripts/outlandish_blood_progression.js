// Outlandish Revelations: blood progression.
// priority: -50
ServerEvents.recipes(function(event){
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/blood_progression.json')));
  ['bloodmagic','kubejsbloodmagic','gtceu','create'].forEach(function(mod){if(!Platform.isLoaded(mod))throw Error('[Outlandish blood] Missing required mod '+mod);});
  var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var Location=Java.loadClass('net.minecraft.resources.ResourceLocation');
  data.requiredItems.forEach(function(id){if(!Item.exists(id))throw Error('[Outlandish blood] Missing item '+id);});
  data.requiredTags.forEach(function(id){if(!Ingredient.of('#'+id).itemIds.size())throw Error('[Outlandish blood] Empty tag '+id);});
  data.requiredFluids.forEach(function(id){if(!Registries.FLUIDS.containsKey(new Location(id)))throw Error('[Outlandish blood] Missing fluid '+id);});
  data.removeOutputs.forEach(function(id){event.remove({output:id});});
  data.gt.forEach(function(row){
    var recipe=event.recipes.gtceu[row.machine](row.id).itemInputs(row.inputs).itemOutputs(row.outputs).duration(row.duration).EUt(row.EUt);
    if(row.circuit!==undefined)recipe.circuit(row.circuit);
    if(row.fluidInputs.length)recipe.inputFluids(row.fluidInputs.map(function(f){return Fluid.of(f.fluid,f.amount);}));
  });
  data.altar.forEach(function(row){
    event.recipes.bloodmagic.altar(row.output,row.input).upgradeLevel(row.upgradeLevel)
      .altarSyphon(row.altarSyphon).consumptionRate(row.consumptionRate).drainRate(row.drainRate).id(row.id);
  });
  data.crafting.forEach(function(row){event.custom(row.recipe).id(row.id);});
});
