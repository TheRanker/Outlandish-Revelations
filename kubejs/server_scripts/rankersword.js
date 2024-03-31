// This script was written by d00dlenoodles on KubeJS discord, thanks

ItemEvents.rightClicked("kubejs:rankers_sword", e => {
    if (e.player.cooldowns.isOnCooldown(e.item)) return
    let damage = 25
    let distance = 15
    let user = e.player
    let target = user.rayTrace(distance,true).entity
    sonicBoom(e, damage, user, target)
})

function sonicBoom(e, damageAmount, user, target) {
    if(target) {
        e.player.addItemCooldown('kubejs:rankers_sword', 10*20)
        e.server.runCommandSilent(`execute in ${e.level.dimension} positioned ${user.x} ${user.y} ${user.z} run playsound minecraft:entity.warden.sonic_charge player @a ~ ~ ~ 3 2`)
        let userPosition = user.getEyePosition()
        let targetDistance = target.getEyePosition().subtract(userPosition)
        let targetDistanceNormalized = targetDistance.normalize()
        for(let i = 1; i < Math.floor(targetDistance.length()) + 2; ++i) {
            let particlePoint = userPosition.add(targetDistanceNormalized.scale(i))
            user.level.sendParticles("minecraft:sonic_boom",particlePoint.x(),particlePoint.y(),particlePoint.z(),1,0,0,0,0)
        }
        Utils.server.scheduleInTicks(10, callback => {
            let knockbackResist = 1.0 - target.getAttributeValue("minecraft:generic.knockback_resistance")
            e.server.runCommandSilent(`execute in ${e.level.dimension} positioned ${user.x} ${user.y} ${user.z} run playsound minecraft:entity.warden.sonic_boom player @a ~ ~ ~ 3 1`)
            target.attack(user.level.damageSources().sonicBoom(target),damageAmount)
            target.addMotion(targetDistanceNormalized.x() * (2.5 * knockbackResist), targetDistanceNormalized.y() * (0.5 * knockbackResist), targetDistanceNormalized.z() * (2.5 * knockbackResist))
            target.hurtMarked()
        })
    }
}