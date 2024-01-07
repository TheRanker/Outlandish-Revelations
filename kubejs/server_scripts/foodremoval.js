LootJS.modifiers((event) => {
    event.addEntityLootModifier("minecraft:sheep").removeLoot("minecraft:mutton")
    event.addEntityLootModifier("minecraft:cow").removeLoot("minecraft:beef")
    event.addEntityLootModifier("minecraft:pig").removeLoot("minecraft:porkchop");
    event.addEntityLootModifier("minecraft:chicken").removeLoot("minecraft:chicken")
    event.addEntityLootModifier("minecraft:rabbit").removeLoot("minecraft:rabbit");
});