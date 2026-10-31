// Outlandish Revelations: systems progression.
// priority: -120

(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/systems_progression.json')));
 function ingredient(i){
  if(Array.isArray(i)){i.forEach(ingredient);return;}
  if(typeof i==='string'){i=i.replace(/^\d+x /,'');i=i.charAt(0)==='#'?{tag:i.substring(1)}:{item:i};}
  if(i.item){if(!Item.exists(i.item))throw Error('[Outlandish Systems] Missing item '+i.item);}
  else if(i.tag){if(!Ingredient.of('#'+i.tag).itemIds.size())throw Error('[Outlandish Systems] Empty tag '+i.tag);}
  else throw Error('[Outlandish Systems] Unsupported ingredient '+JSON.stringify(i));
 }
 ServerEvents.recipes(function(event){
  var state={complete:false,added:[],removed:[]};
  ['botania','mffs','artifacts','aquaculture','tconstruct','gtceu','create'].forEach(function(id){if(!Platform.isLoaded(id))throw Error('[Outlandish Systems] Missing required mod '+id);});
  data.overrides.forEach(function(row){var j=row.recipe;
   if(j.key)Object.keys(j.key).forEach(function(k){ingredient(j.key[k]);});
   (j.ingredients||[]).forEach(ingredient);if(j.input)ingredient(j.input);if(j.reagent)ingredient(j.reagent);
   if(j.result)ingredient(j.result);if(j.output)ingredient(j.output);(j.results||[]).forEach(ingredient);
  });
  data.gt.forEach(function(row){row.inputs.concat(row.outputs).concat(row.catalysts||[]).forEach(ingredient);});
  var preserved={};data.preservedIds.forEach(function(id){preserved[id]=true;});
  function remove(id){event.remove({id:id});if(state.removed.indexOf(id)<0)state.removed.push(id);}
  data.removeIds.forEach(remove);
  data.blockedOutputs.concat(data.gatedOutputs).forEach(function(output){var ids=[];event.forEachRecipe({output:output},function(recipe){var id=String(recipe.getId());if(!preserved[id])ids.push(id);});ids.forEach(remove);});
  data.overrides.forEach(function(row){event.custom(row.recipe).id(row.id);state.added.push({id:row.id,type:row.recipe.type,section:'systems_progression',requires:['botania','mffs','artifacts'],systemsJson:row.recipe});});
  data.gt.forEach(function(row){var recipe=event.recipes.gtceu[row.machine](row.id).itemInputs(row.inputs).itemOutputs(row.outputs).duration(row.duration).EUt(row.EUt);
   if(row.circuit!==undefined)recipe.circuit(row.circuit);
   (row.catalysts||[]).forEach(function(id){recipe.notConsumable(id);});var ref=JSON.parse(JSON.stringify(row));ref.section='systems_progression';ref.requires=['gtceu'];state.added.push(ref);
  });
  var added={};state.added.forEach(function(row){added[row.id]=true;});state.removed=state.removed.filter(function(id){return !added[id];});state.complete=true;
 });

 ServerEvents.loaded(function(){
  var c=Java.loadClass('dev.su5ed.mffs.MFFSConfig').COMMON;
  c.enableElectricity.set(true);c.coercionDriverFePerFortron.set(10);c.coercionDriverFortronToFeLoss.set(1);
 });
 if(Platform.isLoaded('lootjs'))LootJS.modifiers(function(event){
  var tables=event.addLootTableModifier(/^[^:]+:(?!blocks\/).*/);
  data.lootReplacements.forEach(function(row){tables.replaceLoot(row.from,row.to,true);});
  tables.removeLoot('botania:mana_fluxfield');tables.removeLoot('mffs:steel_compound');tables.removeLoot('mffs:steel_ingot');
 });
})();
