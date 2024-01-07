PlayerEvents.loggedOut(event => {
    let player = event.player
    console.log(`Outlandish Revelations: Player ${player.username} logged out(${player.level.dimension}). ${Math.floor(player.x)} ${Math.floor(player.y)} ${Math.floor(player.z)}!`)
})
PlayerEvents.loggedIn(event => {
    let player = event.player
    console.log(`Outlandish Revelations: Player ${player.username} logged in(${player.level.dimension}). ${Math.floor(player.x)} ${Math.floor(player.y)} ${Math.floor(player.z)}!`)
})