// Outlandish Revelations: create progression.
ServerEvents.recipes(function (event) {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/create_progression.json')));
  var state={added:0,groups:{},errors:[]};
  function requireItem(id) {if (!Item.exists(id)) throw Error('Missing item: '+id);return id;}
  function ingredient(id) {
    if (id.charAt(0)==='#') {
      if (!Ingredient.of(id).itemIds.size()) throw Error('Empty ingredient: '+id);
      return {tag:id.substring(1)};
    }
    return {item:requireItem(id)};
  }
  if (!Platform.isLoaded('create')) {
    state.groups.create={applied:false,skipped:true,reason:'Create is not loaded'};
    return;
  }
  var crushing=[];
  try {
    data.crushing.forEach(function (row) {
      crushing.push({type:'create:crushing',ingredients:[ingredient(row.input)],
        results:[{item:requireItem(row.output)}],processingTime:row.processingTime});
    });
  } catch (error) {
    state.groups.raw_crushing={applied:false,error:String(error)};
    state.errors.push('Raw crushing: '+error);
  }
  if (!state.groups.raw_crushing) {

    data.removedOutputs.forEach(function (id) {event.remove({output:id,not:{id:data.assembly.id}});});
    crushing.forEach(function (recipe,index) {
      event.custom(recipe).id('otg:restored/create/crushing/'+data.crushing[index].input.split('/').pop());
    });
    state.groups.raw_crushing={applied:true,added:crushing.length,removedOutputFilters:data.removedOutputs.length};
    state.added+=crushing.length;
  }
  var assembly;
  try {
    var GTMaterials=Java.loadClass('com.gregtechceu.gtceu.common.data.GTMaterials');
    var TagPrefix=Java.loadClass('com.gregtechceu.gtceu.api.data.tag.TagPrefix');
    var ChemicalHelper=Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.ChemicalHelper');
    var results=data.assembly.results.map(function (spec) {
      var id=spec.item;
      if (id==='#forge:plates/gold') {

        id=String(Item.of(ChemicalHelper.get(TagPrefix.plate,GTMaterials.get('gold'),1)).id);
        if (id==='minecraft:air') throw Error('Missing unified gold plate');
      }
      return {item:requireItem(id),chance:spec.chance};
    });
    assembly={type:'create:sequenced_assembly',ingredient:ingredient(data.assembly.ingredient),
      transitionalItem:{item:requireItem(data.assembly.transitionalItem)},loops:data.assembly.loops,
      results:results,sequence:data.assembly.sequence.map(function (step) {
        return {type:step.type,ingredients:step.inputs.map(ingredient),results:[{item:requireItem(step.output)}]};
      })};
  } catch (error) {
    state.groups.precision_mechanism={applied:false,error:String(error)};
    state.errors.push('Precision mechanism: '+error);
  }
  if (assembly) {
    event.custom(assembly).id(data.assembly.id);
    state.groups.precision_mechanism={applied:true,added:1,loops:assembly.loops};state.added++;
  }

  console.info('[Outlandish Create] Added '+state.added+' recipes; '+state.errors.length+' groups failed preflight.');
  if (state.errors.length) throw Error('[Outlandish Create] '+state.errors.join('; '));
});
