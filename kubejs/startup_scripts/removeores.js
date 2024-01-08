WorldgenEvents.remove(event => {
  // print all features for a given biome filter
  event.printFeatures('', 'minecraft:plains')

  // remove features by their id (first argument is a generation step)
  event.removeFeatureById('underground_ores', ['create:zinc'])
})