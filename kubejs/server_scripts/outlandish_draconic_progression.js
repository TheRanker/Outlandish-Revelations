// Outlandish Revelations: draconic progression.
// priority: -110

(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/draconic_progression.json')));
 function preflight(i){
  if(Array.isArray(i)){i.forEach(preflight);return;}
  if(i.ingredient){preflight(i.ingredient);return;}
  if(i.items){i.items.forEach(preflight);return;}
  if(i.item){if(!Item.exists(i.item))throw Error('[Outlandish Draconic] Missing item '+i.item);return;}
  if(i.tag){if(!Ingredient.of('#'+i.tag).itemIds.size())throw Error('[Outlandish Draconic] Empty tag '+i.tag);return;}
  throw Error('[Outlandish Draconic] Unsupported ingredient '+JSON.stringify(i));
 }
 ServerEvents.recipes(function(event){
  var state={complete:false,added:[],removed:[]};

  ['gtceu','tconstruct','draconicevolution','draconicadditions'].forEach(function(id){if(!Platform.isLoaded(id))throw Error('[Outlandish Draconic] Required mod missing: '+id);});

  data.overrides.forEach(function(row){preflight(row.recipe.catalyst);row.recipe.ingredients.forEach(preflight);preflight(row.recipe.result);});
  data.gt.forEach(function(row){row.inputs.concat(row.outputs).forEach(function(spec){var id=spec.replace(/^\d+x /,'');preflight(id.charAt(0)==='#'?{tag:id.substring(1)}:{item:id});});});
  var preserve={};data.preservedIds.forEach(function(id){preserve[id]=true;});
  function remove(id){event.remove({id:id});if(state.removed.indexOf(id)<0)state.removed.push(id);}
  data.removeIds.forEach(remove);
  data.gatedOutputs.forEach(function(output){var ids=[];event.forEachRecipe({output:output},function(r){var id=String(r.getId());if(!preserve[id])ids.push(id);});ids.forEach(remove);});
  data.overrides.forEach(function(row){event.custom(row.recipe).id(row.id);state.added.push({id:row.id,type:row.recipe.type,section:'draconic_progression',requires:['draconicevolution','draconicadditions'],fusionJson:row.recipe});});
  data.gt.forEach(function(row){var recipe=event.recipes.gtceu[row.machine](row.id).itemInputs(row.inputs).itemOutputs(row.outputs).duration(row.duration).EUt(row.EUt);if(row.circuit!==undefined)recipe.circuit(row.circuit);var ref=JSON.parse(JSON.stringify(row));ref.type='gtceu:'+row.machine;ref.section='draconic_progression';ref.requires=['gtceu','draconicevolution'];state.added.push(ref);});
  var added={};state.added.forEach(function(row){added[row.id]=true;});state.removed=state.removed.filter(function(id){return !added[id];});state.complete=true;
 });
 if(Platform.isLoaded('lootjs'))LootJS.modifiers(function(event){

  var tables=event.addLootTableModifier(/^[^:]+:(?!blocks\/).*/);
  data.gatedOutputs.forEach(function(id){tables.removeLoot(id);});
 });
})();
