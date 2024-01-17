ServerEvents.recipes(event => {
    event.remove({ output: 'botania:manasteel_ingot'})

    event.recipes.botania.mana_infusion("botania:manasteel_ingot", "#forge:ingots/wrought_iron", 2000)
    event.recipes.botania.mana_infusion("botania:manasteel_ingot", "#forge:ingots/steel", 2000)
    event.recipes.botania.mana_infusion("2x botania:manasteel_ingot", "#forge:ingots/aluminium", 2000)
    event.recipes.botania.mana_infusion("4x botania:manasteel_ingot", "#forge:ingots/stainless_steel", 2000)
   
})