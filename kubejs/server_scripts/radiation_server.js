// Register Damage Type
ServerEvents.highPriorityData(event => {
  event.addJson("kubejs:damage_type/radiation", {
    "effects": "hurt",
    "exhaustion": 0.5,
    "message_id": "radiationKill",
    "scaling": "when_caused_by_living_non_player"
  })
})
EntityEvents.hurt(event => {
  if (!(event.entity.age % 10 == 0)) return
  if (event.source.getType().toString() == 'radiationKill') {
    event.entity.invulnerableTime = 1
  }
})