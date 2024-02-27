global.dimChangeEvent = event => {
    if (!event.getEntity().player) return;

    let player = event.getEntity();
    let targetDimension = event.dimension.location();
    let server = player.getServer();

    if (targetDimension == 'minecraft:the_nether') {
        if (!player.stages.has('nether_access')) {
            player.statusMessage = Text.of("The portal doesn't seem to work...");
            server.schedule(2 * 1000, () => player.statusMessage = Text.of("You have not unlocked the ability to use this portal!"));
            event.setCanceled(true);
        }
    }
}