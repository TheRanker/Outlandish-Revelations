WorldgenEvents.remove(event => {
  // remove features by their id (first argument is a generation step)
  event.removeFeatureById('underground_ores', ['create:zinc_ore', 'k_turrets:titanium_ore'])
})