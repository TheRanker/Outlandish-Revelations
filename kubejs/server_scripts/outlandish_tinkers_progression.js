// Outlandish Revelations: tinkers progression.
// priority: -100

(function(){
 var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/tinkers_progression.json')));
 function existsIngredient(i){return i.tag?Ingredient.of('#'+i.tag).itemIds.size()>0:i.item?Item.exists(i.item):false;}
 ServerEvents.recipes(function(event){
  if(!Platform.isLoaded('tconstruct'))throw Error('[Outlandish Tinkers] Required Tinkers Construct is missing');
  var state={complete:false,added:[],removed:[],normalizedOres:[],inactiveMaterials:[],equipmentRemoved:[],componentExceptions:[],errors:[]};

  function add(id,json){event.custom(json).id(id);state.added.push({id:id,type:json.type,section:'tinkers_progression',requires:['tconstruct'],tinkersJson:json});}
  function remove(id){event.remove({id:id});if(state.removed.indexOf(id)<0)state.removed.push(id);}

  ['tconstruct:seared_brick','tconstruct:scorched_brick','tconstruct:seared_melter','tconstruct:smeltery_controller','tconstruct:scorched_alloyer','tconstruct:tinkers_anvil','tconstruct:scorched_anvil','tconstruct:foundry_controller','tconstruct:seared_bricks','tconstruct:scorched_bricks','create:andesite_alloy','create:precision_mechanism','gtceu:mv_machine_hull','kubejs:stabilised_blood_reagent'].forEach(function(id){if(!Item.exists(id))throw Error('[Outlandish Tinkers] Missing '+id);});
  data.removeIds.forEach(remove);
  // Glass has no compatible cast parts; ordinary glass melting stays available.
  remove('tconstruct:tools/materials/melting/glass');
  data.removeOutputs.forEach(function(id){event.forEachRecipe({output:id},function(recipe){remove(String(recipe.getId()));});});

  data.overrides.forEach(function(row){var active=false;event.forEachRecipe({id:row.id},function(){active=true;});if(active){remove(row.id);add(row.id,row.recipe);if(row.recipe.type==='tconstruct:melting'&&row.reason.indexOf('ore yield')>=0)state.normalizedOres.push(row.id);}});

  var extraOres=[];event.forEachRecipe({type:'tconstruct:ore_melting'},function(recipe){extraOres.push({id:String(recipe.getId()),json:JSON.parse(String(recipe.json))});});
  extraOres.forEach(function(row){if(row.json.rate==='metal'&&JSON.stringify(row.json.ingredient).indexOf('forge:ores/')>=0)row.json.result.amount=Math.max(1,Math.floor(row.json.result.amount/2));row.json.type='tconstruct:melting';delete row.json.rate;delete row.json.byproducts;remove(row.id);add(row.id,row.json);state.normalizedOres.push(row.id);});
  data.crafting.forEach(function(row){add(row.id,row.recipe);});
  var available={};
  data.materials.forEach(function(row){
   if(!existsIngredient(row.ingredient)){state.inactiveMaterials.push(row.material);return;}
   available[row.key]=true;
   add('otg:tinkers/material/'+row.key,{type:'tconstruct:material',ingredient:{item:row.billet},material:row.material,needed:1,value:1});
   if(row.cast){
    add('otg:tinkers/melt/'+row.key,{type:'tconstruct:melting',ingredient:{item:row.billet},result:{fluid:row.fluid,amount:90},temperature:row.temperature,time:60});
    add('otg:tinkers/cast/'+row.key,{type:'tconstruct:material_fluid',fluid:{fluid:row.fluid,amount:90},output:row.material,temperature:row.temperature});
    // Quartz has arrow-head stats but no compatible cast parts to recycle.
    if(row.material!=='tconstruct:quartz') add('otg:tinkers/recycle/'+row.key,{type:'tconstruct:material_melting',input:row.material,result:{fluid:row.fluid,amount:90},temperature:row.temperature});
    add('otg:tinkers/recover/'+row.key,{type:'tconstruct:casting_table',cast:{tag:'tconstruct:casts/multi_use/ingot'},fluid:{fluid:row.fluid,amount:90},result:row.billet,cooling_time:60});
   }
  });
  data.gt.forEach(function(row){
   if(row.optionalIngredient&&!existsIngredient(row.optionalIngredient))return;
   row.inputs.concat(row.outputs).concat(row.catalysts||[]).forEach(function(spec){var id=spec.replace(/^\d+x /,'');if(id.charAt(0)==='#'){if(!Ingredient.of(id).itemIds.size())throw Error('[Outlandish Tinkers] Empty '+id);}else if(!Item.exists(id))throw Error('[Outlandish Tinkers] Missing '+id);});
   var r=event.recipes.gtceu[row.machine](row.id).itemInputs(row.inputs).itemOutputs(row.outputs).duration(row.duration).EUt(row.EUt);
   (row.catalysts||[]).forEach(function(id){r.notConsumable(id);});
   var ref=JSON.parse(JSON.stringify(row));ref.type='gtceu:'+row.machine;ref.section='tinkers_progression';ref.requires=['gtceu','tconstruct'];state.added.push(ref);
  });

  var blocked=data.equipmentBlocked.slice(),Registry=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  Registry.ITEMS.getKeys().forEach(function(key){var id=String(key);if(/^gtceu:.*_sword$/.test(id))blocked.push(id);});
  blocked.forEach(function(id){if(!Item.exists(id))return;
   event.forEachRecipe({output:id},function(recipe){remove(String(recipe.getId()));});state.equipmentRemoved.push(id);
  });

  var added={};state.added.forEach(function(row){added[row.id]=true;});state.removed=state.removed.filter(function(id){return !added[id];});
  state.complete=true;
 });

 if(Platform.isLoaded('lootjs'))LootJS.modifiers(function(event){

  var blocked=data.equipmentBlocked.slice(),Registry=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  Registry.ITEMS.getKeys().forEach(function(key){var id=String(key);if(/^gtceu:.*_sword$/.test(id))blocked.push(id);});
  blocked.forEach(function(id){if(Item.exists(id))event.addLootTableModifier(/.*/).removeLoot(id);});
 });
})();
