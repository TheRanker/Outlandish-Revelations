// priority: 0

ServerEvents.recipes(event => {
    event.recipes.create.cutting(['butchersdelight:deadcowblockskinned','butchersdelight:cow_hide'], 'butchersdelight:dead_cow');
    event.recipes.create.cutting(['butchersdelight:skullcow', 'minecraft:bone', 'butchersdelightfoods:beefribs', 'butchersdelightfoods:legcow', 'butchersdelight:beeftenderloin'],  'butchersdelight:deadcowblockskinned');
    
    event.recipes.create.cutting(['butchersdelightfoods:ham', 'butchersdelightfoods:porkloin', 'butchersdelightfoods:porkribs'], 'butchersdelight:deadpig');

    event.recipes.create.cutting(['butchersdelight:deadsheepskinnedblock', 'butchersdelight:sheephide'], 'butchersdelight:deadsheep');
    event.recipes.create.cutting(['butchersdelightfoods:sheepshank', 'butchersdelightfoods:sheeprack', 'butchersdelightfoods:sheeploin'], 'butchersdelight:deadsheepskinnedblock');
    event.recipes.create.milling([Item.of('3x minecraft:white_wool')], 'butchersdelight:sheephide')

    event.recipes.create.cutting(['butchersdelight:deadgoatskinnedblock', 'butchersdelight:goatfur'], 'butchersdelight:deadgoat');
    event.recipes.create.cutting(['butchersdelightfoods:goat_loin', 'butchersdelightfoods:goat_shank', 'butchersdelightfoods:goatrack'], 'butchersdelight:deadgoatskinnedblock');

    event.recipes.create.cutting(['butchersdelight:hoglinskin', 'butchersdelightfoods:ham', 'butchersdelightfoods:porkloin', 'butchersdelightfoods:porkribs'], 'butchersdelight:deadhoglin');
    
    event.recipes.create.cutting(['butchersdelight:deadchickenblockskinned', Item.of('3x minecraft:feather')], 'butchersdelight:deadchiken');
    event.recipes.create.cutting(['minecraft:chicken'], 'butchersdelight:deadchickenblockskinned');

    event.recipes.create.cutting(['butchersdelight:deadrabiitskinnedblock', 'minecraft:rabbit_hide'], 'butchersdelight:deadrabbitbrown');
    event.recipes.create.cutting([Item.of('minecraft:rabbit_foot').withChance(.65), 'minecraft:rabbit'], 'butchersdelight:deadrabiitskinnedblock');
    
    event.recipes.create.cutting(['butchersdelight:deadllamaskinnedblock', Item.of('3x minecraft:white_wool').withChance(.85)], 'butchersdelight:deadllama');
    event.recipes.create.cutting(['butchersdelightfoods:llama_leg', 'butchersdelightfoods:llama_loin', 'butchersdelightfoods:llamma_ribs'], 'butchersdelight:deadllamaskinnedblock');
})