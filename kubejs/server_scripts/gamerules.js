ServerEvents.loaded(e => {
  e.server.gameRules.set("keepInventory", true)
  e.server.gameRules.set("playersSleepingPercentage", 45)
})