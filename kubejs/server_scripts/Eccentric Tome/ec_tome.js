let ec_tome_id = 'eccentrictome:tome'

let ec_tome_data = '{"eccentrictome:mods":{apotheosis:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"apotheosis:apoth_chronicle"}}},bloodmagic:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"bloodmagic:guide"}}},botania:{0:{Count:1b,id:"botania:lexicon",tag:{armor_set:""}}},create:{0:{Count:1b,id:"create:create_manual",tag:{armor_set:""}}},ftbquests:{0:{Count:1b,id:"ftbquests:book"}},industrialforegoing:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"industrialforegoing:industrial_foregoing"}}},mffs:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"mffs:handbook"}}},player_companions:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"player_companions:guide"}}},pneumaticcraft:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"pneumaticcraft:book"}}},productivebees:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"productivebees:guide"}}},sebastrnlib:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"sebastrnlib:sebastrn_mods_guide_book"}}}}}'
let ec_tome = Item.of(ec_tome_id, ec_tome_data)

ServerEvents.recipes(event => {
    event.replaceOutput({}, ec_tome_id, ec_tome)
})

ItemEvents.rightClicked(event => {
    if (event.item == ec_tome_id) {
        let fl = false
        let cur_nbt = String(event.item.nbt)
        let new_nbt = ec_tome.nbt["eccentrictome:mods"]
        for (const newNbtKey in new_nbt) {
            if (!cur_nbt.includes(newNbtKey)) {
                fl = true
            }
        }

        if (fl) {
            event.item.setNbt(ec_tome_data)
            event.player.tell("Updated your Eccentric Tome with Latest data from the lastest update!")
            event.player.sendData('resetScreen', {})
            event.server.scheduleInTicks(1, e => {
            event.player.sendData('open_tome', {'hand': event.hand.toString()})
            })
        }
    }
})



function give_book_after_connect(event, r) {
    if (r > 3) {
        if (!is_player_online(event.player, event.server)) {
            console.log("Can't give book to " + event.player.username + " due to he logged out to quickly!")
            return 0
        }
    }
    if (r > 30) {
        console.log("Can't give book to " + event.player.username + " after 30 attempts! Stopping.")
        return 0
    }

    if (event.player.inventory.count(ec_tome) === 0) {
        console.log("Trying to give book to " + event.player.username)
        event.server.runCommandSilent(`give ${event.player.username} ${ec_tome_id}${ec_tome_data}`)
        event.server.scheduleInTicks(20 * (r + 1), e => {
            give_book_after_connect(event, r + 1)
        })

    } else {
        console.log("Book Given to " + event.player.username)
    }
}