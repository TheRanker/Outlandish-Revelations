// Outlandish Revelations: early inputs.
ServerEvents.recipes(function (event) {
  var groups=JSON.parse(String(JsonIO.readString('kubejs/outlandish/early_inputs.json')));
  var state={added:0,modifiedRecipes:0,appliedRules:0,skippedRules:0,groups:{},warnings:[],errors:[]};
  function check(id) {
    if (id.charAt(0)==='#') {
      if (!Ingredient.of(id).itemIds.size()) throw Error('Empty tag: '+id);
    } else if (!Item.exists(id)) throw Error('Missing item: '+id);
  }
  Object.keys(groups).forEach(function (name) {
    var group=groups[name];
    if (!Platform.isLoaded(group.mod)) {
      state.groups[name]={applied:false,skipped:true,reason:'Mod is not loaded',rules:group.rules.length};
      state.skippedRules+=group.rules.length;return;
    }
    var errors=[];
    group.rules.forEach(function (r) {
      try {check(r.output);check(r.from);check(r.to);}
      catch (error) {errors.push(r.output+': '+error);}
    });
    if (errors.length) {
      state.groups[name]={applied:false,errors:errors};
      errors.forEach(function (error) {state.errors.push(error);});return;
    }
    var result={applied:true,rules:[]};
    group.rules.forEach(function (r) {
      var row={output:r.output,from:r.from,to:r.to,outputRecipes:0,matchedRecipes:0,modifiedRecipes:0};
      event.forEachRecipe({output:r.output},function (recipe) {
        row.outputRecipes++;
        if (recipe.hasInput(r.from)) {
          row.matchedRecipes++;
          if (recipe.replaceInput(r.from,r.to)) row.modifiedRecipes++;
        }
      });
      if (!row.outputRecipes) {
        row.status='no_output_recipes';
        state.warnings.push('No recipes produce '+r.output+'; no replacement added');
      } else if (!row.matchedRecipes) row.status='no_matching_old_input';
      else row.status=row.modifiedRecipes===row.matchedRecipes?'modified':'incomplete_replacement';
      if (row.modifiedRecipes!==row.matchedRecipes) state.errors.push('Replacement did not update all matches for '+r.output);
      result.rules.push(row);state.appliedRules++;state.modifiedRecipes+=row.modifiedRecipes;
    });
    state.groups[name]=result;
  });

  console.info('[Outlandish early inputs] Modified '+state.modifiedRecipes+' recipes across '+state.appliedRules+' rules; skipped '+state.skippedRules+' absent-mod rules');
  if (state.errors.length) throw Error('[Outlandish early inputs] '+JSON.stringify(state.errors));
});
