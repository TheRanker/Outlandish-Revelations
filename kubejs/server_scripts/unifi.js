const createMaterials = ['zinc', 'brass']
const createSheets = ['copper', 'iron', 'brass']
const createAdditionsRods = ['copper', 'gold', 'iron', 'electrum', 'brass']

ServerEvents.recipes(event => {

    //Replaces removedItem with either a tag (#forge:ingots) or a different item then removes that item as a crafting output so only the replacedItem can be obtained.
    function replaceRemove(removedItem, replacedItem){
        event.replaceInput({ input:removedItem}, removedItem, replacedItem)
        event.remove({ output: removedItem})
    }   

    function remove(removedItem){
        event.remove({ output: removedItem})
    }

for (let i = 0; i < createMaterials.length; i++) {
    replaceRemove('create:' + createMaterials[i] + '_ingot', '#forge:ingots/' + createMaterials[i])
    replaceRemove('create:' + createMaterials[i] + '_nugget', '#forge:nuggets/' + createMaterials[i])
}


for (let i = 0; i < createSheets.length; i++) {
    replaceRemove('create:' + createSheets[i] + '_sheet', '#forge:plates/' + createSheets[i])
}
replaceRemove('create:golden_sheet', '#forge:plates/gold')

for (let i = 0; i < createAdditionsRods.length; i++) {
    replaceRemove('createaddition:' + createAdditionsRods[i] + '_rod', '#forge:rods/' + createAdditionsRods[i])
}

replaceRemove('createadditions:electrum_ingot', '#forge:ingots/electrum')
replaceRemove('createadditions:electrum_nugget', '#forge:nuggets/electrum')
replaceRemove('createadditions:electrum_sheet', '#forge:plates/electrum')
replaceRemove('createadditions:diamond_grit', '#forge:dusts/diamond')
replaceRemove('create:powdered_obsidian', '#forge:dusts/obsidian')

replaceRemove('industrialforegoing:iron_gear', '#forge:gears/iron')
replaceRemove('industrialforegoing:gold_gear', '#forge:gears/bronze')
replaceRemove('industrialforegoing:diamond_gear', '#forge:gears/diamond')
replaceRemove('industrialforegoing:plastic', '#forge:plates/polyethylene')

replaceRemove('gtceu:manasteel_ingot', '#forge:ingots/manasteel')
replaceRemove('gtceu:manasteel_nugget', '#forge:nuggets/manasteel')
replaceRemove('gtceu:manasteel_block', '#forge:storage_blocks/manasteel')

replaceRemove('gtceu:vibrant_alloy_ingot', '#forge:ingots/vibrant_alloy')
replaceRemove('gtceu:vibrant_alloy_nugget', '#forge:nuggets/vibrant_alloy')
replaceRemove('gtceu:vibrant_alloy_block', '#forge:storage_blocks/vibrant_alloy')

replaceRemove('gtceu:energetic_alloy_ingot', '#forge:ingots/energetic_alloy')
replaceRemove('gtceu:energetic_alloy_nugget', '#forge:nuggets/energetic_alloy')
replaceRemove('gtceu:energetic_alloy_block', '#forge:storage_blocks/energetic_alloy')

})


