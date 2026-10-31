// Outlandish Revelations: retain one copy of duplicate chemistry recipes.
// priority: -130

ServerEvents.recipes(function(event) {
  var pairs = [
    ['gcyr:chemical_reactor/potassium_hydroxide', 'gcyr:chemical_reactor/pyrometillic_dianhydride'],
    ['gcyr:large_chemical_reactor/potassium_hydroxide', 'gcyr:large_chemical_reactor/pyrometillic_dianhydride'],
    ['gtec:large_chemical_reactor/cerium_oxidesed_rare_earth_oxides_dust_large', 'gtec:large_chemical_reactor/cerium_oxidesed_rare_earth_oxides_dust'],
    ['gtec:large_chemical_reactor/ammonium_chloride_fluid_large', 'gtec:large_chemical_reactor/ammonium_chloride_fluid']
  ];
  var pending = [];
  pairs.forEach(function(pair) {
    var duplicate = false;
    var retained = false;
    event.forEachRecipe({id: pair[0]}, function() { duplicate = true; });
    event.forEachRecipe({id: pair[1]}, function() { retained = true; });
    if (duplicate && !retained) {
      throw Error('[Outlandish recipes] Cannot remove duplicate without retained recipe: ' + pair[1]);
    }
    if (duplicate && retained) pending.push(pair[0]);
  });
  pending.forEach(function(id) { event.remove({id: id}); });
});
