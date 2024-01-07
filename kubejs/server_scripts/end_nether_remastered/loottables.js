const netherremastered = ['minecraft:creeper', 'minecraft:skeleton', 'minecraft:spider', 'minecraft:zombie', 'minecraft:slime']



LootJS.modifiers((event) => {

    event

        .addEntityLootModifier(netherremastered)

        .addWeightedLoot(

            [ 

                Item.of("nether_remastered:seal_piece_1").withChance(100)
            ]);

});