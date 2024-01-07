ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments} = event;
    event.register(
        Commands.literal("create_manual_config")
            .then(Commands.literal("page_type")
                .then(Commands.literal("PonderTagIndexScreen")
                    .executes(ctx => {
                        let player = ctx.source.player;
                        player.persistentData.create_manual_page_type = "PonderTagIndexScreen"
                        player.tell("Now create manual will open PonderTagIndexScreen!")
                        return 1;
                    })
                )
                .then(Commands.literal("PonderIndexScreen")
                    .executes(ctx => {
                        let player = ctx.source.player;
                        player.persistentData.create_manual_page_type = "PonderIndexScreen"
                        player.tell("Now create manual will open PonderIndexScreen!")
                        return 1;
                    })
                )
                .then(Commands.literal("reset")
                    .executes(ctx => {
                        let player = ctx.source.player;
                        player.persistentData.remove('create_manual_page_type')
                        player.tell("Now create manual will open default server value!")
                        return 1;
                    })
                )
            )
            .then(Commands.literal("default_page_type")
                .requires(src => src.hasPermission(2))
                .then(Commands.literal("PonderTagIndexScreen")
                    .executes(ctx => {
                        let player = ctx.source.player;
                        set_page_type("PonderTagIndexScreen")
                        player.tell("Now create manual will open PonderTagIndexScreen by default!")
                        return 1;
                    })
                )
                .then(Commands.literal("PonderIndexScreen")
                    .executes(ctx => {
                        let player = ctx.source.player;
                        set_page_type("PonderIndexScreen")
                        player.tell("Now create manual will open PonderIndexScreen by default!")
                        return 1;
                    })
                )
            )
            .then(Commands.literal("help")
                .executes(ctx => {
                    let player = ctx.source.player;
                    player.tell('/create_manual_config default_page_type <type> - will set default screen type for all players.\n' +
                        '/create_manual_config page_type <type> will set screen type only for you.')
                    return 1;
                })
            )
    )
})