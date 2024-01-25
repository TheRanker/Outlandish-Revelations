function ItemOfBag(name, quantity, itemChance) {
    this.itemName = name;
    this.itemChance = itemChance || 5;
    this.quantity = quantity || 1;
    

    this.create_item = () => Item.of(`${this.quantity}x ${this.itemName}`).withChance(this.itemChance)
  
}

function Bag(loot_pool, item_quantity) {
    this.loot_pool = loot_pool.map(item => item.create_item());
    this.item_quantity = item_quantity || 2;  
}

let food = {
    common: new Bag(
        [ 
            new ItemOfBag("minecraft:mushroom_stew", 8),
            new ItemOfBag("minecraft:carrot", 4),
            new ItemOfBag("minecraft:potato", 4),
            new ItemOfBag("minecraft:cookie", 16),
            new ItemOfBag("minecraft:chicken", 16),
            new ItemOfBag("minecraft:rabbit", 16),
            new ItemOfBag("minecraft:apple", 12),
            new ItemOfBag("minecraft:pufferfish", 2),
            new ItemOfBag("minecraft:salmon", 8),
            new ItemOfBag("minecraft:cod", 16),
            new ItemOfBag("minecraft:tropical_fish", 4),
        ]
    ),
    rare: new Bag(
        [ 
            new ItemOfBag("minecraft:cooked_cod", 32),
            new ItemOfBag("minecraft:cooked_mutton", 64),
            new ItemOfBag("minecraft:rabbit_stew", 16),
            new ItemOfBag("minecraft:baked_potato", 64),
            new ItemOfBag("minecraft:cooked_porkchop", 32),
            new ItemOfBag("minecraft:cooked_salmon", 32),
            new ItemOfBag("minecraft:golden_apple"),
        ]
    ),
    epic: new Bag(
        [ 
            new ItemOfBag("minecraft:enchanted_golden_apple", 5),
            new ItemOfBag("minecraft:cake"),
        ]
    ),
}

let steam = {
    common: new Bag(
        [ 
            new ItemOfBag("minecraft:clay", 12),
            new ItemOfBag("gtceu:raw_copper", 4),
            new ItemOfBag("gtceu:raw_tin", 4),
            new ItemOfBag("gtceu:iron_gear", 1),
            new ItemOfBag("gtceu:iron_rod", 1),
            new ItemOfBag("gtceu:soapstone_small_dust", 16),
            new ItemOfBag("gtceu:stone_small_dust", 32),
            new ItemOfBag("gtceu:bronze_small_fluid_pipe", 2),
            new ItemOfBag("minecraft:furnace", 2),
        ]
    ),
    rare: new Bag(
        [ 
            new ItemOfBag("minecraft:clay", 24),
            new ItemOfBag("gtceu:raw_copper", 8),
            new ItemOfBag("gtceu:raw_tin", 8),
            new ItemOfBag("gtceu:raw_coal", 16),
            new ItemOfBag("gtceu:raw_redstone", 32),
            new ItemOfBag("minecraft:cooked_salmon", 32),
            new ItemOfBag("minecraft:golden_apple", 1),
        ]
    ),
    epic: new Bag(
        [ 
            new ItemOfBag("gtceu:bronze_small_gear", 6),
            new ItemOfBag("gtceu:bronze_machine_casing", 2),
            new ItemOfBag("gtceu:bronze_knife", 1),
            new ItemOfBag("gtceu:bronze_saw", 1),
            new ItemOfBag("gtceu:bronze_rod", 4),
        ]
    ),
}

let stone = {
    common: new Bag(
        [ 
            new ItemOfBag("gtceu:iron_ingot", 1),
            new ItemOfBag("minecraft:stone_pickaxe", 1),
            new ItemOfBag("minecraft:stone_sword", 1),
            new ItemOfBag("gtceu:stone_gear", 1),
            new ItemOfBag("gtceu:stone_rod", 1),
            new ItemOfBag("gtceu:soapstone_small_dust", 2),
            new ItemOfBag("gtceu:stone_small_dust", 8),
            new ItemOfBag("gtceu:raw_redstone", 16),
            new ItemOfBag("gtceu:coal_ore", 4),
        ]
    ),
    rare: new Bag(
        [ 
            new ItemOfBag("gtceu:iron_ingot", 4),
            new ItemOfBag("gtceu:stone_gear", 4),
            new ItemOfBag("gtceu:stone_rod", 4),
            new ItemOfBag("gtceu:raw_coal", 16),
            new ItemOfBag("gtceu:raw_redstone", 32),
            new ItemOfBag("minecraft:cooked_salmon", 32),
            new ItemOfBag("minecraft:golden_apple", 1),
        ]
    ),
    epic: new Bag(
        [ 
            new ItemOfBag("gtceu:iron_saw", 1),
            new ItemOfBag("gtceu:iron_hammer", 1),
            new ItemOfBag("gtceu:iron_knife", 1),
            new ItemOfBag("gtceu:iron_ore", 32),
            new ItemOfBag("gtceu:iron_rod", 4),
        ]
    ),
}

let lv = {
    common: new Bag(
        [ 
            new ItemOfBag("gtceu:tin_single_wire", 6),
            new ItemOfBag("gtceu:tin_double_wire", 2),
            new ItemOfBag("gtceu:tin_single_cable", 6),
            new ItemOfBag("gtceu:tin_double_cable", 2),
            new ItemOfBag("gtceu:raw_antimony", 6),
            new ItemOfBag("gtceu:raw_lead", 12),
            new ItemOfBag("gtceu:aluminium_rod", 6),
            new ItemOfBag("gtceu:aluminium_screw", 4),
        ]
    ),
    rare: new Bag(
        [ 
            new ItemOfBag("gtceu:lv_robot_arm", 2),
            new ItemOfBag("gtceu:lv_sensor", 1),
            new ItemOfBag("gtceu:raw_sulfur", 12),
            new ItemOfBag("gtceu:sticky_resin", 32),
            new ItemOfBag("gtceu:steel_rod",4),
            new ItemOfBag("naturalist:cooked_bass", 16),
            new ItemOfBag("minecraft:golden_apple", 3),
        ]
    ),
    epic: new Bag(
        [ 
            new ItemOfBag("gtceu:steel_small_gear", 6),
            new ItemOfBag("gtceu:steel_machine_casing", 2),
            new ItemOfBag("gtceu:steel_knife", 1),
            new ItemOfBag("gtceu:steel_saw", 1),
            new ItemOfBag("gtceu:steel_screwdriver", 4),
        ]
    ),
}

function add_bags(event, bag_name, object) {
    for (let rarity of global.rarity) {
        event.addLootTableModifier(`loot:${bag_name}/${bag_name}_bag_${rarity}`).addWeightedLoot(   
            object[rarity].item_quantity,
            object[rarity].loot_pool,
        )
    }
}

LootJS.modifiers((event) => {
    add_bags(event, 'food', food) 
    add_bags(event, 'stone', stone)
    add_bags(event, 'steam', steam)
    add_bags(event, 'lv', lv)
});
