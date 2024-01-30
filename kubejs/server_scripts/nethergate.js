PlayerEvents.tick(event => {
    const {player,server,player:{username}} = event
    if(!(player.age % 20 == 0)) return
if (player.persistentData.canaccessnetherportal == 1) return
    if (player.block.id == 'minecraft:nether_portal') {
        player.block.set('air')
        player.displayClientMessage(Component.of('Access Denied! You Must Kill the Warden To Enter the Nether').bold().red(), true)
    }else if (player.block.west == 'minecraft:nether_portal'){
        player.block.west.set('air')
        player.displayClientMessage(Component.of('Access Denied! You Must Kill the Warden To Enter the Nether').bold().red(), true)
    }else if (player.block.east == 'minecraft:nether_portal'){
        player.block.east.set('air')
        player.displayClientMessage(Component.of('Access Denied! You Must Kill the Warden To Enter the Nether').bold().red(), true)
    }else if (player.block.north == 'minecraft:nether_portal'){
        player.block.north.set('air')
        player.displayClientMessage(Component.of('Access Denied! You Must Kill the Warden To Enter the Nether').bold().red(), true)
    }else if (player.block.south == 'minecraft:nether_portal'){
        player.block.south.set('air')
        player.displayClientMessage(Component.of('Access Denied! You Must Kill the Warden To Enter the Nether').bold().red(), true)
    }
})
PlayerEvents.advancement(event => {
    if(event.advancement.id().toString() == "simplewarden:kill_the_warden") {
        event.player.persistentData.canaccessnetherportal = 1
    }
})