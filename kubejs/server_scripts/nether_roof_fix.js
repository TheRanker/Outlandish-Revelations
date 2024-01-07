const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const $RhinoPropertiesImpl = Java.loadClass('dev.latvian.mods.rhino.mod.util.forge.RhinoPropertiesImpl')


ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments} = event;
    event.register(
        Commands.literal("rankersmp")
            .then(Commands.literal("stuck_on_nether_roof")
                .executes(ctx => {
                    let player = ctx.source.player


                    let world_name = Utils.server.storageSource.getLevelId()
                    let world_path = Utils.server.storageSource.getWorldDir()["resolve(java.lang.String)"](world_name)
                    let game_path = $RhinoPropertiesImpl.getGameDir()
                    let kjs_path = game_path.relativize(world_path)

                    let nether_roof_json_path = kjs_path["resolve(java.lang.String)"]("nether_roof_fix.json")


                    let success = true
                    if (player.level.dimension != 'minecraft:the_nether') {
                        success = false
                    }
                    if (player.y <= 255) {
                        success = false
                    }
                    if (!can_player_build(player, Item.of('minecraft:dirt'), player.z, player.y, player.z)) {
                        success = false
                    }
                    if (!success) {
                        player.tell(Component.red("You must be on the nether roof at chunk, where you can build to execute this command!"))
                        return 1
                    }

                    let current = JsonIO.read(nether_roof_json_path)
                    if (current == null) {
                        current = {}
                    }
                    if (!("portals" in current)) {
                        current["portals"] = []
                    }

                    JsonIO.write(nether_roof_json_path, current)

                    let player_block_pos = player.blockPosition()
                    let x = Math.round(player.x)
                    let z = Math.round(player.z)

                    success = true
                    let near_portal = null

                    current["portals"].forEach(pos => {
                        let portal_pos = new $BlockPos(pos[0], 255, pos[1])
                        let dist = Math.sqrt(player_block_pos.distSqr(portal_pos))
                        if (dist <= 100) {
                            success = false
                            near_portal = portal_pos
                        }
                    })

                    if (!success) {
                        player.tell(Component.red(`You can't open portal here because where other portal in < 100 blocks from you: ${near_portal}`))
                        return 1
                    }

                    current["portals"].push([x, z])
                    JsonIO.write(nether_roof_json_path, current)

                    Utils.server.runCommandSilent(`execute in minecraft:the_nether run fill ${x + 2} 255 ${z - 3} ${x - 3} 250 ${z + 2} minecraft:bedrock`)
                    Utils.server.runCommandSilent(`execute in minecraft:the_nether run fill ${x + 1} 255 ${z - 2} ${x - 2} 251 ${z + 1} minecraft:air`)

                    Utils.server.runCommandSilent(`effect give ${player.username} minecraft:slow_falling 3`)

                    return 1
                })
            ))
})