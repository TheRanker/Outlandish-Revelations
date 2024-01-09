const hostiles = ['minecraft:elder_guardian', 'minecraft:wither_skeleton', 'minecraft:stray', 'minecraft:husk', 'minecraft:zombie_villager', 'minecraft:evocation_illager', 'minecraft:vex', 'minecraft:vindication_illager', 'minecraft:illusion_illager', 'minecraft:creeper', 'minecraft:skeleton', 'minecraft:spider', 'minecraft:giant', 'minecraft:zombie', 'minecraft:slime', 'minecraft:ghast', 'minecraft:zombie_pigman', 'minecraft:enderman', 'minecraft:cave_spider', 'minecraft:silverfish', 'minecraft:blaze', 'minecraft:magma_cube', 'minecraft:ender_dragon', 'minecraft:wither', 'minecraft:witch', 'minecraft:guadian', 'minecraft:hoglin']
            
LootJS.modifiers((event) => {
    event
        .addEntityLootModifier(hostiles)
        .addWeightedLoot(
            [ 
                Item.of("jackseconomy:penny").withChance(50), 
                Item.of("jackseconomy:nickel").withChance(25),
                Item.of("jackseconomy:dime").withChance(10),
                Item.of("jackseconomy:quarter").withChance(5)
            ]);
});