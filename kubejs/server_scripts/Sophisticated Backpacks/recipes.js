ServerEvents.recipes(event => {
    event.remove({output: "sophisticatedbackpacks:iron_backpack"})
    event.custom({
        "type": "sophisticatedbackpacks:backpack_upgrade",
        "conditions": [
            {
                "itemRegistryName": "sophisticatedbackpacks:iron_backpack",
                "type": "sophisticatedcore:item_enabled"
            }
        ],
        "pattern": [
            "ICI",
            "IBI",
            "ICI"
        ],
        "key": {
            "I": {
                "tag": "forge:ingots/iron"
            },
            "B": {
                "item": "sophisticatedbackpacks:backpack"
            },
            "C": {
                "item": "minecraft:shulker_shell"
            }
        },
        "result": {
            "item": "sophisticatedbackpacks:iron_backpack"
        }
    })
    event.remove({output: 'sophisticatedbackpacks:pump_upgrade'})
    event.custom({
        "type": "sophisticatedcore:upgrade_next_tier",
        "conditions": [
            {
                "itemRegistryName": "sophisticatedbackpacks:pump_upgrade",
                "type": "sophisticatedcore:item_enabled"
            }
        ],
        "pattern": [
            "GUG",
            "PBS",
            "GUG"
        ],
        "key": {
            "U": {
                "item": "minecraft:bucket"
            },
            "G": {
                "tag": "forge:glass"
            },
            "P": {
                "item": "gtceu:pump_deck"
            },
            "S": {
                "item": "gtceu:lv_pump"
            },
            "B": {
                "item": "sophisticatedbackpacks:upgrade_base"
            }
        },
        "result": {
            "item": "sophisticatedbackpacks:pump_upgrade"
        }
    })
    event.remove({output: "sophisticatedbackpacks:inception_upgrade"})
    event.custom({
        "type": "minecraft:crafting_shaped",
        "conditions": [
            {
                "itemRegistryName": "sophisticatedbackpacks:inception_upgrade",
                "type": "sophisticatedcore:item_enabled"
            }
        ],
        "pattern": [
            "SES",
            "DBD",
            "KEK"
        ],
        "key": {
            "B": {
                "item": "sophisticatedbackpacks:upgrade_base"
            },
            "S": {
                "tag": "forge:nether_stars"
            },
            "D": {
                "tag": "forge:gems/diamond"
            },
            "E": {
                "item": "minecraft:ender_eye"
            },
            "K": {
                "item": "minecraft:shulker_shell"
            }
        },
        "result": {
            "item": "sophisticatedbackpacks:inception_upgrade"
        }
    })
    event.remove({output: "sophisticatedbackpacks:tank_upgrade"})
    event.custom({
        "type": "sophisticatedcore:upgrade_next_tier",
        "conditions": [
            {
                "itemRegistryName": "sophisticatedbackpacks:tank_upgrade",
                "type": "sophisticatedcore:item_enabled"
            }
        ],
        "pattern": [
            "GGG",
            "GBG",
            "GCG"
        ],
        "key": {
            "G": {
                "tag": "forge:glass"
            },
            "B": {
                "item": "sophisticatedbackpacks:upgrade_base"
            },
            "C": {
                "item": "pneumaticcraft:small_tank"
            }
        },
        "result": {
            "item": "sophisticatedbackpacks:tank_upgrade"
        }
    })
})