ServerEvents.recipes(event => {
    event.remove({id: 'waystones:warp_plate'})
    event.remove({id: 'waystones:bound_scroll'})
    event.remove({id: 'waystones:warp_stone'})
    event.remove({id: 'waystones:warp_scroll'})
    event.remove({id: 'waystones:warp_dust'})
    event.remove({id: 'waystones:return_scroll'})
    event.custom({
            "result": {
                "item": "waystones:warp_stone"
            },
            "type": "minecraft:crafting_shaped",
            "pattern": [
                "DED",
                "EGE",
                "DED"
            ],
            "key": {
                "G": {
                    "item": "bloodmagic:reagentteleposition"
                },
                "E": {
                    "item": "waystones:warp_dust"
                },
                "D": {
                    "item": "waystones:warp_dust"
                }
            }
        }
    )
    event.custom({
            "result": {
                "item": "waystones:warp_plate"
            },
            "type": "minecraft:crafting_shaped",
            "pattern": [
                "SWS",
                "WFW",
                "SWS"
            ],
            "key": {
                "W": {
                    "item": "minecraft:flint"
                },
                "F": {
                    "item": "waystones:warp_stone"
                },
                "S": {
                    "item": "minecraft:stone_bricks"
                }
            }
        }
    )
    event.custom({
        "result": {
            "item": "waystones:bound_scroll",
            "count": 1
        },
        "type": "minecraft:crafting_shaped",
        "pattern": [
            "GEG",
            "PPP"
        ],
        "key": {
            "G": {
                "tag": "balm:gold_nuggets"
            },
            "E": {
                "item": "waystones:warp_dust"
            },
            "P": {
                "item": "minecraft:paper"
            }
        }
    })
    event.custom({
            "result": {
                "item": "waystones:warp_dust"
            },
            "type": "minecraft:crafting_shaped",
            "pattern": [
                "SWS",
                "WFW",
                "SWS"
            ],
            "key": {
                "W": {
                    "item": "minecraft:blaze_powder"
                },
                "F": {
                    "item": "gtceu:ender_eye_dust"
                },
                "S": {
                    "item": "minecraft:amethyst_shard"
                }
            }
        }
    )
})