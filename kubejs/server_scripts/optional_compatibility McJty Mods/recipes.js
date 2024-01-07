if (Platform.isLoaded("mcjtylib")) {
    let mcjty_mod_ids = []

    if (Platform.isLoaded('xnet')) {
        mcjty_mod_ids.push("xnet")
    }
    if (Platform.isLoaded('rftoolsbase')) {
        ServerEvents.recipes(event => {
            event.remove({output: "rftoolsbase:machine_base"})
            event.remove({output: "rftoolsbase:machine_frame"})
            event.custom({
                "type": "minecraft:crafting_shaped",
                "key": {
                    "g": {
                        "item": 'gtceu:gold_refined_ore'
                    },
                    "s": {
                        "tag": "forge:stone"
                    },
                    "l": {
                        "item": 'blockmagic:mastercore'
                    }
                },
                "pattern": [
                    "glg",
                    "sss"
                ],
                "result": {
                    "item": "rftoolsbase:machine_base"
                }
            })
            event.custom({
                "type": "minecraft:crafting_shaped",
                "key": {
                    "g": {
                        "item": 'gtceu:gold_refined_ore'
                    },
                    "i": {
                        "tag": "forge:ingots/iron"
                    },
                    "l": {
                        "tag": "forge:dyes/blue"
                    },
                    "k": {
                        "item": 'gtceu:steel_machine_casing'
                    }
                },
                "pattern": [
                    "ili",
                    "gkg",
                    "ili"
                ],
                "result": {
                    "item": "rftoolsbase:machine_frame"
                }
            })

        })
    }

    let modIds = Platform.getList()
    modIds.forEach(modId => {
        if (modId.includes('rftools')) {
            mcjty_mod_ids.push(modId)
        }
    })

    mcjty_mod_ids.forEach(id => {
        ServerEvents.recipes(event => {
            event.replaceInput({mod: id}, 'minecraft:redstone', 'gtceu:refined_redstone_ore')
            event.replaceInput({mod: id}, 'minecraft:gold_nugget', 'gtceu:gold_refined_ore')
        })
    })
}