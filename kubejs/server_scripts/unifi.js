const thermalExclusiveMaterials = ['tin', 'lead', 'silver', 'bronze', 'nickel', 'invar', 'electrum']
const thermalVanillaIngots = ['iron', 'copper', 'gold']
const thermalVanillaDusts = ['lapis', 'diamond', 'emerald']
const createMaterials = ['zinc', 'brass']
const createSheets = ['copper', 'gold', 'iron', 'brass']
const createAdditionsRods = ['copper', 'gold', 'iron', 'electrum', 'brass']

ServerEvents.recipes(event => {

    //Replaces removedItem with either a tag (#forge:ingots) or a different item then removes that item as a crafting output so only the replacedItem can be obtained.
    function replaceRemove(removedItem, replacedItem){
        event.replaceInput({ input:removedItem}, removedItem, replacedItem)
        event.remove({ output: removedItem})
    }   

    for (let i = 0; i < thermalExclusiveMaterials.length; i++) {
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_ingot', '#forge:ingots/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_nugget', '#forge:nuggets/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_block', '#forge:storage_blocks/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_dust', '#forge:dusts/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_gear', '#forge:gears/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_plate', '#forge:plates/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:' + thermalExclusiveMaterials[i] + '_coin', '#forge:coins/' + thermalExclusiveMaterials[i])
        replaceRemove('thermal:raw_' + thermalExclusiveMaterials[i], '#forge:raw_materials/' + thermalExclusiveMaterials[i])
    }
    for (let i = 0; i < thermalVanillaIngots.length; i++) {
        replaceRemove('thermal:' + thermalVanillaIngots[i] + '_nugget', '#forge:nuggets/' + thermalVanillaIngots[i])
        replaceRemove('thermal:' + thermalVanillaIngots[i] + '_dust', '#forge:dusts/' + thermalVanillaIngots[i])
        replaceRemove('thermal:' + thermalVanillaIngots[i] + '_gear', '#forge:gears/' + thermalVanillaIngots[i])
        replaceRemove('thermal:' + thermalVanillaIngots[i] + '_plate', '#forge:plates/' + thermalVanillaIngots[i])
        replaceRemove('thermal:' + thermalVanillaIngots[i] + '_coin', '#forge:coins/' + thermalVanillaIngots[i])
    }
    
    replaceRemove('thermal:quartz_dust', '#forge:dusts/nether_quartz')
    replaceRemove('thermal:lapis_dust', '#forge:dusts/lapis')
    replaceRemove('thermal:emerald_dust', '#forge:dusts/emerald')
    replaceRemove('thermal:diamond_dust', '#forge:dusts/diamond')

    replaceRemove('thermal:diamond_gear', '#forge:gears/diamond')

    replaceRemove('thermal:coal_coke', '#forge:gems/coke')
    replaceRemove('thermal:coal_coke_block', '#forge:storage_blocks/coal_coke')
    replaceRemove('thermal:sulfur_dust', '#forge:dusts/sulfur')

for (let i = 0; i < createMaterials.length; i++) {
    replaceRemove('create:' + createMaterials[i] + '_ingot', '#forge:ingots/' + createMaterials[i])
    replaceRemove('create:' + createMaterials[i] + '_nugget', '#forge:nuggets/' + createMaterials[i])
}

for (let i = 0; i < createSheets.length; i++) {
    replaceRemove('create:' + createSheets[i] + '_sheet', '#forge:plates/' + createSheets[i])
}

for (let i = 0; i < createAdditionsRods.length; i++) {
    replaceRemove('createaddition:' + createAdditionsRods[i] + '_rod', '#forge:rods/' + createAdditionsRods[i])
}

replaceRemove('createadditions:electrum_ingot', '#forge:ingots/electrum')
replaceRemove('createadditions:electrum_nugget', '#forge:nuggets/electrum')
replaceRemove('createadditions:electrum_sheet', '#forge:plates/electrum')
replaceRemove('createadditions:diamond_grit', '#forge:dusts/diamond')
replaceRemove('create:powdered_obsidian', '#forge:dusts/obsidian')
})


