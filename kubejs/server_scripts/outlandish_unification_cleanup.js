// Outlandish Revelations: unification cleanup.
(function () {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/unification_cleanup.json')));
  ServerEvents.tags('item',function (event) {
    var state={removedMemberships:[],clearedTags:[],addedTagLinks:[],skippedMissingItems:[],alreadyAbsent:[],held:[],errors:[]};
    data.tags.removals.forEach(function (r) {
      if (!Item.exists(r.item)) {state.skippedMissingItems.push(r.item);return;}
      var ids=event.get(r.tag).getObjectIds().toArray();var found=false,alternates=0;
      for (var i=0;i<ids.length;i++) {if (String(ids[i])===r.item) found=true;else alternates++;}
      if (!found) {state.alreadyAbsent.push(r);return;}
      if (!alternates) {state.held.push({tag:r.tag,item:r.item,reason:'Would empty the ingredient tag'});return;}
      event.remove(r.tag,r.item);state.removedMemberships.push(r);
    });

    data.tags.clears.forEach(function (tag) {event.removeAll(tag);state.clearedTags.push(tag);});
    data.tags.additions.forEach(function (r) {
      var source=r.item.substring(1);
      if (!event.get(source).getObjectIds().size()) {state.held.push({tag:r.tag,item:r.item,reason:'Source knife tag is empty'});return;}
      event.add(r.tag,r.item);state.addedTagLinks.push(r);
    });

    console.info('[Outlandish tag cleanup] Removed '+state.removedMemberships.length+' memberships; cleared '+state.clearedTags.length+' tags; held '+state.held.length);
  });
  ServerEvents.recipes(function (event) {
    var state={added:0,appliedSubstitutions:0,modifiedRecipes:0,modifiedRecipeOperations:0,removedOutputFilters:0,supersededSubstitutions:data.recipes.supersededSubstitutions||[],substitutions:[],standaloneRemovals:[],skippedMissingItems:[],held:[],errors:[]};
    var modifiedIds={};
    data.recipes.substitutions.forEach(function (r) {
      if (!Item.exists(r.from)) {state.skippedMissingItems.push(r.from);return;}
      var ids=Ingredient.of(r.to).itemIds.toArray();var alternatives=[];
      for (var i=0;i<ids.length;i++) {var id=String(ids[i]);if (id!==r.from && Item.exists(id)) alternatives.push(id);}
      if (!alternatives.length) {state.held.push({from:r.from,to:r.to,reason:'No registered alternative in replacement tag; original recipes preserved'});return;}
      var result={from:r.from,to:r.to,alternatives:alternatives,matchedInputs:0,modifiedRecipes:0,unchangedInputRecipes:0,matchedOutputs:0,errors:[]};
      event.forEachRecipe({input:r.from},function (recipe) {
        result.matchedInputs++;
        try {
          if (recipe.replaceInput(r.from,r.to)) {
            result.modifiedRecipes++;state.modifiedRecipeOperations++;modifiedIds[String(recipe.getId())]=true;
          }
          else result.unchangedInputRecipes++;
        } catch (error) {result.errors.push(String(error));}
      });
      if (result.errors.length) {
        state.errors.push('Incomplete substitution for '+r.from+'; original output recipes preserved');
        state.substitutions.push(result);return;
      }
      result.matchedOutputs=event.countRecipes({output:r.from});
      event.remove({output:r.from});state.removedOutputFilters++;
      state.appliedSubstitutions++;state.substitutions.push(result);
    });
    data.recipes.standaloneRemovals.forEach(function (id) {
      if (!Item.exists(id)) {state.skippedMissingItems.push(id);return;}
      var count=event.countRecipes({output:id});
      event.remove({output:id});state.removedOutputFilters++;
      state.standaloneRemovals.push({item:id,matchedRecipes:count});
    });
    state.modifiedRecipes=Object.keys(modifiedIds).length;

    console.info('[Outlandish unification cleanup] Applied '+state.appliedSubstitutions+' substitutions; modified '+state.modifiedRecipes+' recipes; held '+state.held.length);
    if (state.errors.length) throw Error('[Outlandish unification cleanup] '+JSON.stringify(state.errors));
  });
})();
