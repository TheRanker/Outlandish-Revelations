
JEIEvents.hideItems(event => {
    event.hide([
        'create:zinc_ingot',
        'create:zinc_nugget',
        'create:brass_ingot',
        'create:brass_nugget',
        'create:copper_sheet',
        'create:golden_sheet',
        'create:iron_sheet',
        'create:brass_sheet',
        'createaddition:copper_rod',
        'createaddition:gold_rod',
        'createaddition:iron_rod',
        'createaddition:electrum_rod',
        'createaddition:brass_rod',
        'createaddition:electrum_ingot',
        'createaddition:electrum_nugget',
        'createaddition:electrum_sheet',
        'createaddition:diamond_grit',
        'create:powdered_obsidian',
        'enderio:alloy_smelter',
        'enderio:sag_mill',
        'enderio:stirling_generator',
        'enderio:powdered_coal',
        'enderio:powdered_iron',
        'enderio:powdered_gold',
        'enderio:powdered_copper',
        'enderio:powdered_tin',
        'enderio:powdered_ender_pearl',
        'enderio:powdered_obsidian',
        'enderio:powdered_cobalt',
        'enderio:powdered_lapis_lazuli',
        'enderio:powdered_quartz',
        'enderio:silicon',
        'industrialforegoing:iron_gear',
        'industrialforegoing:gold_gear',
        'industrialforegoing:diamond_gear',
        'industrialforegoing:plastic',
        

'gtceu:manasteel_ingot', 
'gtceu:manasteel_nugget',
'gtceu:manasteel_block', 

'gtceu:vibrant_alloy_ingot', 
'gtceu:vibrant_alloy_nugget', 
'gtceu:vibrant_alloy_block',

'gtceu:energetic_alloy_ingot',
'gtceu:energetic_alloy_nugget', 
'gtceu:energetic_alloy_block'
      ])

      const industrialRemove = ['pitiful_generator', 'biofuel_generator', 'mycelial_furnace', 'mycelial_slimy', 'mycelial_culinary', 'mycelial_potion', 'mycelial_disenchantment', 'mycelial_ender', 'mycelial_explosive', 'mycelial_frosty', 'mycelial_halitosis', 'mycelial_magma', 'mycelial_pink', 'mycelial_netherstar', 'mycelial_death', 'mycelial_rocket', 'mycelial_crimed', 'mycelial_meatallurgic']

      for (let i = 0; i < industrialRemove.length; i++) {
          event.hide( 'industrialforegoing:' + industrialRemove[i])
      }
})