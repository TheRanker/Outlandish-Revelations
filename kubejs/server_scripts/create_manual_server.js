function get_page_type(ponder, player) {
    if (!player.persistentData.contains('create_manual_page_type')) {
        if (!("page_type" in ponder) || ponder.get("page_type") == 'PonderTagIndexScreen') {
            return 'PonderTagIndexScreen';
        }
        if (ponder.get("page_type") == 'PonderIndexScreen') {
            return 'PonderIndexScreen';
        }
        return 'PonderTagIndexScreen';
    }
    let page_type = player.persistentData.create_manual_page_type
    if (page_type == 'PonderTagIndexScreen') {
        return 'PonderTagIndexScreen';
    }
    if (page_type == 'PonderIndexScreen') {
        return 'PonderIndexScreen';
    }
    return 'PonderTagIndexScreen';
}

function set_page_type(page_type) {
    let current = JsonIO.read('kubejs/ponder.json')
    current["page_type"] = page_type
    JsonIO.write('kubejs/ponder.json', current)
}

let players_create_manual_right_click = []
let players_checking_closed = []

function create_manual_right_click(event) {

    if (event.player.mainHandItem == 'create:create_manual') {
        if (players_create_manual_right_click.includes(event.player.username)) {
            event.cancel()
            return;
        }
        players_create_manual_right_click.push(event.player.username)
        event.server.scheduleInTicks(3, callback => {
            players_create_manual_right_click = players_create_manual_right_click.filter((el) => el !== event.player.username);
        })

        let ray = event.player.rayTrace(64)
        let ponder = JsonIO.read('kubejs/ponder.json')
        if (ponder == null) {
            event.player.tell('The file "kubejs/ponder.json" does not exist on the server side, move it from the client to the server files so that create_manual works properly.')
            event.player.sendData('openPonderTagIndexScreen', {})
            event.cancel()
            return;
        }
        ponder = ponder.get("ponder")
        if (!event.player.stages.has('notified_about_create_manual_options')) {
            event.player.stages.add('notified_about_create_manual_options')
            event.player.tell("Shift + scroll if you want to change screen mode or click on the block from Create for which you want to get help.")
        }
        if (ray.block !== null && !event.player.isCrouching()) {
            let ponders = []
            if (ray.block.id.includes('andesite_encased')) {
                ponders.push('create:andesite_casing')
            } else if (ray.block.id.includes('brass_encased')) {
                ponders.push('create:brass_casing')
            } else if (ray.block.id.includes('encased') && ray.block.id.includes('fluid')) {
                ponders.push('create:copper_casing')
            }
            if (ponder.contains(ray.block.id)) {
                ponders.push(ray.block.id)
            }
            for (const drop of ray.block.getDrops()) {
                if (ponder.contains(drop.id) && !ponders.includes(drop.id)) {
                    ponders.push(drop.id)
                }
            }
            if (ponders.includes('create:vertical_gearbox') && ponders.includes('create:gearbox')) {
                ponders = ponders.filter((el) => el !== 'create:gearbox');
            }

            if (ponders.length == 1) {
                event.server.runCommandSilent(`/execute as ${event.entity.uuid} run create ponder ${ponders[0]}`)
                event.cancel()
                return;
            } else if (ponders.length >= 2) {
                event.player.sendData('open_multi_ponder', {'ponders': ponders})
                event.cancel()
                return;
            }

        }
        let page_type = get_page_type(ponder, event.player)
        if (page_type == 'PonderTagIndexScreen') {
            event.player.sendData('openPonderTagIndexScreen', {})
            event.cancel()
            return;
        }
        if (page_type == 'PonderIndexScreen') {
            event.server.runCommandSilent(`/execute as ${event.entity.uuid} run create ponder`)
            event.cancel()
            return;
        }
        event.cancel()
    }
}

ItemEvents.rightClicked(event => {
    create_manual_right_click(event)
})

BlockEvents.rightClicked(event => {
    create_manual_right_click(event)
})

function is_player_online(player, server) {
    let players = server.players
    let is_online = false
    players.forEach(p => {
        if (p.username == player.username) {
            is_online = true
        }
    })
    if (is_online) {
        return true;
    }
    return false;
}

NetworkEvents.dataReceived('create_manual_change_screen', event => {
    let screen = null
    if (!event.player.persistentData.contains('create_manual_page_type') || event.player.persistentData.create_manual_page_type == 'PonderTagIndexScreen') {
        screen = "PonderIndexScreen"
    } else if (event.player.persistentData.create_manual_page_type == 'PonderIndexScreen') {
        screen = "PonderTagIndexScreen"
    }
    event.player.persistentData.create_manual_page_type = screen
    event.server.runCommandSilent(`title ${event.player.username} actionbar "Now manual will open ${screen}!"`)
})

NetworkEvents.dataReceived('check_client_every_tick', event => {
    players_checking_closed.push(event.player.username)
    event.server.scheduleInTicks(1, callback => {
        if (is_player_online(event.player, event.server) && players_checking_closed.includes(event.player.username)) {
            event.player.sendData('check_client', {})
            callback.reschedule()
        }
    })
})
NetworkEvents.dataReceived('stop_checking_client_every_tick', event => {
    players_checking_closed = players_checking_closed.filter((el) => el !== event.player.username);
})

ServerEvents.recipes(event => {
    event.shapeless('create:create_manual', ['minecraft:book', 'create:andesite_alloy'])
})
