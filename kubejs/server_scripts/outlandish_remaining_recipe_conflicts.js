// Outlandish Revelations: preserve unique processing routes and remove conflicts.
// priority: -140

ServerEvents.recipes(function(event) {
  var removals = [];
  var inputEdits = [];

  function find(id) {
    var found = null;
    event.forEachRecipe({id: id}, function(recipe) {
      found = recipe;
    });
    event.addedRecipes.forEach(function(recipe) {
      if (!recipe.removed && String(recipe.getId()) === id) {
        if (found && found !== recipe) {
          throw Error('[Outlandish recipes] Ambiguous recipe: ' + id);
        }
        found = recipe;
      }
    });
    return found;
  }

  function retainOne(removeId, keepId) {
    var obsolete = find(removeId);
    if (!obsolete) return;
    if (!find(keepId)) {
      throw Error('[Outlandish recipes] Missing retained recipe: ' + keepId);
    }
    removals.push(obsolete);
  }

  ['', '_water', '_distilled_water'].forEach(function(suffix) {
    retainOne(
      'gtceu:cutter/stone_button' + suffix,
      'gtceu:cutter/cut_stoneslab_into_button' + suffix
    );
    retainOne(
      'gtceu:cutter/blackstone_button' + suffix,
      'gtceu:cutter/cut_polished_blackstoneslab_into_button' + suffix
    );
  });

  ['iron', 'gold', 'copper'].forEach(function(metal) {
    retainOne(
      'bloodmagic:smelting/ingot_' + metal,
      'gtceu:smelting/smelt_dust_' + metal + '_to_ingot'
    );
  });

  retainOne('ruthless_beings:gggr', 'ruthless_beings:ethb');
  retainOne(
    'gtceu:distillery/hot_ruthenium_tetroxide_distill_to_water',
    'gtec:distillery/hot_ruthenium_tetroxide_distill_circuit_1'
  );

  // Edit inputs without rebuilding either extractor recipe.
  var nativeId = 'gtceu:extractor/extract_ender_pearl';
  var resonantId = 'otg:extractor/restored/gt_processing/resonant_ender';
  var nativeRecipe = find(nativeId);
  var resonantRecipe = find(resonantId);

  if (!nativeRecipe || !resonantRecipe) {
    throw Error('[Outlandish recipes] Missing Ender Pearl route: ' +
      (!nativeRecipe ? nativeId : resonantId));
  }

  var nativeInputs = JSON.parse(String(nativeRecipe.json)).inputs;
  if (!nativeInputs || !nativeInputs.item ||
      nativeInputs.item.length !== 1) {
    throw Error('[Outlandish recipes] Unexpected native Ender Pearl inputs');
  }

  function circuit(number) {
    return {
      content: {type: 'gtceu:circuit', configuration: number},
      chance: 0,
      maxChance: 10000,
      tierChanceBoost: 0
    };
  }

  nativeInputs.item.push(circuit(1));
  inputEdits.push({recipe: nativeRecipe, inputs: nativeInputs});

  // Keep the existing one-pearl ingredient for Resonant Ender.
  inputEdits.push({
    recipe: resonantRecipe,
    inputs: {
      item: [
        {
          content: {tag: 'forge:gems/ender_pearl'},
          chance: 10000,
          maxChance: 10000,
          tierChanceBoost: 0
        },
        circuit(2)
      ]
    }
  });

  // GTCEu's component reader requires Gson JSON here.
  inputEdits.forEach(function(edit) {
    edit.recipe.set('inputs', JsonIO.parseRaw(JSON.stringify(edit.inputs)));
  });

  removals.forEach(function(recipe) {
    recipe.remove();
  });

  console.info(
    '[Outlandish recipes] Applied duplicate cleanup and Ender Pearl circuit selectors.'
  );
});