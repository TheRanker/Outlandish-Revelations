// Outlandish Revelations: remaining removals.
(function () {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/remaining_removals.json')));
  function bedKitExists() {return Platform.isLoaded('multibeds') && Item.exists('multibeds:bed_kit');}
  ServerEvents.tags('item',function (event) {
    var state={candidates:data.hiddenItems.length,hidden:0,byNamespace:{},skippedMissingItems:[],heldBedItems:[],errors:[]};
    var bedsAvailable=bedKitExists();
    data.hiddenItems.forEach(function (id) {
      if (data.beds.indexOf(id)>=0 && !bedsAvailable) {state.heldBedItems.push(id);return;}
      if (!Item.exists(id)) {state.skippedMissingItems.push(id);return;}
      event.add('c:hidden_from_recipe_viewers',id);
      state.hidden++;
      var mod=id.split(':')[0];state.byNamespace[mod]=(state.byNamespace[mod]||0)+1;
    });

    console.info('[Outlandish recipe viewer] Added '+state.hidden+' existing items; skipped '+state.skippedMissingItems.length+' obsolete/absent items');
  });
  ServerEvents.recipes(function (event) {
    var state={added:0,issuedRemovalFilters:0,matchedRecipes:0,groups:{},warnings:[],errors:[]};
    var bedRecipes=bedKitExists()?event.countRecipes({output:'multibeds:bed_kit'}):0;
    if (bedRecipes>0) {
      var beds={applied:true,outputFilters:data.beds.length,matchedRecipes:0,bedKitRecipes:bedRecipes,whiteBedPreserved:true};
      data.beds.forEach(function (id) {
        beds.matchedRecipes+=event.countRecipes({output:id});
        event.remove({output:id});state.issuedRemovalFilters++;
      });
      state.groups.coloured_beds=beds;state.matchedRecipes+=beds.matchedRecipes;
    } else {
      state.groups.coloured_beds={applied:false,skipped:true,reason:'MultiBeds bed kit or its recipe is unavailable; vanilla bed recipes preserved'};
      state.warnings.push('Coloured bed removals held: no available bed-kit recipe');
    }
    data.recipeIds.forEach(function (id) {
      var count=event.countRecipes({id:id});
      if (count>0) {event.remove({id:id});state.issuedRemovalFilters++;state.matchedRecipes+=count;}
      state.groups[id]={applied:count>0,matchedRecipes:count,status:count>0?'removed':'already_absent'};
    });

    console.info('[Outlandish remaining removals] Matched '+state.matchedRecipes+' recipes across '+state.issuedRemovalFilters+' removal filters');
  });
})();
