ServerEvents.recipes(event => {

    const rawMaterials = ['iron', 'gold', 'copper', 'silver', 'tin', 'lead', 'zinc', 'nickel']

    const {
        fire_crafting,
        grinding_ball,
        alloy_smelting,
        enchanting,
        painting,
        sag_milling,
        slicing,
        soul_binding,
        tank,
    } = event.recipes.enderio;

    const enderIoRemove = ['alloy_smelter', 'sag_mill', 'stirling_generator', 'primitive_alloy_smelter', 'powdered_coal', 'powdered_iron', 'powdered_gold', 'powdered_copper', 'powdered_tin', 'powdered_ender_pearl', 'powdered_obsidian', 'powdered_cobalt', 'powdered_lapis_lazuli', 'powdered_quartz', 'silicon']
    for (let i = 0; i < enderIoRemove.length; i++) {
        event.remove({ output: 'enderio:' + enderIoRemove[i] })
    }

    event.remove({type: 'enderio:alloy_smelting'})
    event.shaped('enderio:primitive_alloy_smelter', [
        'AAA', 
        'ABA', 
        'CCC'  
      ], {
        A: 'minecraft:cobblestone',
        B: '#forge:campfires',
        C: 'minecraft:cobbled_deepslate' 
      })      

      for (let i = 0; i < rawMaterials.length; i++) {
        alloy_smelting('#forge:ingots/' + rawMaterials[i], 'gtceu:' + rawMaterials[i] + '_dust')
    }
    
    alloy_smelting("minecraft:nether_brick", ["minecraft:netherrack"]);
    alloy_smelting("minecraft:stone", ["minecraft:cobblestone"]);
    alloy_smelting("minecraft:charcoal", ["#minecraft:logs"]);
    alloy_smelting("minecraft:smooth_sandstone", ["minecraft:sandstone"]);
    alloy_smelting("minecraft:cracked_deepslate_bricks", ["minecraft:deepslate_bricks"]);
    alloy_smelting("minecraft:sponge", ["minecraft:wet_sponge"]);
    alloy_smelting("minecraft:cracked_deepslate_tiles", ["minecraft:deepslate_tiles"]);
    alloy_smelting("minecraft:green_dye", ["minecraft:cactus"]);
    alloy_smelting("minecraft:cracked_stone_bricks", ["minecraft:stone_bricks"]);
    alloy_smelting("minecraft:smooth_stone", ["minecraft:stone"]);
    alloy_smelting("minecraft:smooth_basalt", ["minecraft:basalt"]);
    alloy_smelting("minecraft:glass", ["#forge:glass"]);
    alloy_smelting("minecraft:terracotta", ["minecraft:clay"]);
    alloy_smelting("minecraft:dried_kelp", ["minecraft:kelp"]);
    alloy_smelting("minecraft:brick", ["minecraft:clay_ball"]);
    alloy_smelting("minecraft:smooth_red_sandstone", ["minecraft:red_sandstone"]);
    alloy_smelting("minecraft:cracked_polished_blackstone_bricks", ["minecraft:polished_blackstone_bricks"]);
    alloy_smelting("minecraft:lime_dye", ["minecraft:sea_pickle"]);
    alloy_smelting("minecraft:cracked_nether_bricks", ["minecraft:nether_bricks"]);
    alloy_smelting("minecraft:deepslate", ["minecraft:cobbled_deepslate"]);

    alloy_smelting("5x minecraft:iron_nugget", ["#forge:raw_materials/iron"]);
    alloy_smelting("5x minecraft:gold_nugget", ["#forge:raw_materials/gold"]);
    alloy_smelting("5x gtceu:copper_nugget", ["#forge:raw_materials/copper"]);
    alloy_smelting("5x gtceu:tin_nugget", ["#forge:raw_materials/tin"]);
    alloy_smelting("5x gtceu:zinc_nugget", ["#forge:raw_materials/zinc"]);
    alloy_smelting("minecraft:coal", ["#forge:raw_materials/coal"]);
    alloy_smelting("minecraft:redstone", ["#forge:raw_materials/redstone"]);
    alloy_smelting("minecraft:lapis_lazuli", ["#forge:raw_materials/lapis"]);
    alloy_smelting("gtceu:brass_ingot", ["#forge:dusts/brass"]);
    alloy_smelting("gtceu:bronze_ingot", ["#forge:dusts/bronze"]);

    event.recipes.gtceu.alloy_smelter('copperAlloy').itemOutputs('enderio:copper_alloy_ingot').itemInputs('#forge:ingots/copper').itemInputs('#forge:dusts/silicon').duration(50).EUt(42)
    event.recipes.gtceu.alloy_smelter('redstoneAlloy').itemOutputs('enderio:redstone_alloy_ingot').itemInputs('#forge:ingots/red_alloy').itemInputs('#forge:dusts/silicon').duration(40).EUt(12)
    event.recipes.gtceu.alloy_smelter('conductiveAlloy').itemOutputs('enderio:conductive_alloy_ingot').itemInputs('#forge:ingots/red_alloy').itemInputs('enderio:copper_alloy_ingot').duration(50).EUt(42)
    event.recipes.gtceu.alloy_smelter('pulsatingAlloy').itemOutputs('enderio:pulsating_alloy_ingot').itemInputs('#forge:ingots/iron').itemInputs('#forge:dusts/ender_pearl').duration(120).EUt(42)
    event.recipes.gtceu.alloy_smelter('clearGlass').itemOutputs('enderio:clear_glass').itemInputs('#forge:glass').itemInputs('#forge:sand').duration(10).EUt(4)
    event.recipes.gtceu.alloy_smelter('clearGlassE').itemOutputs('enderio:clear_glass_e').itemInputs('enderio:clear_glass').itemInputs('2x #forge:dusts/glowstone').duration(60).EUt(12)
    event.recipes.gtceu.alloy_smelter('clearGlassDCharcoal').itemOutputs('enderio:clear_glass_d').itemInputs('enderio:clear_glass').itemInputs('2x #forge:dusts/charcoal').duration(60).EUt(12)
    event.recipes.gtceu.alloy_smelter('clearGlassDCoal').itemOutputs('enderio:clear_glass_d').itemInputs('enderio:clear_glass').itemInputs('2x #forge:dusts/coal').duration(60).EUt(12)

    event.recipes.gtceu.electric_blast_furnace('energeticAlloy').itemOutputs('enderio:energetic_alloy_ingot').itemInputs('#forge:dusts/redstone').itemInputs('#forge:dusts/glowstone').itemInputs('minecraft:gold_ingot').blastFurnaceTemp(2500).duration(100).EUt(480)
    event.recipes.gtceu.electric_blast_furnace('vibrantAlloy').itemOutputs('enderio:vibrant_alloy_ingot').itemInputs('enderio:energetic_alloy_ingot').itemInputs('#forge:dusts/ender_pearl').blastFurnaceTemp(2500).duration(200).EUt(480)
    event.recipes.gtceu.electric_blast_furnace('darkSteel').itemOutputs('enderio:dark_steel_ingot').itemInputs('#forge:ingots/black_steel').itemInputs('4x #forge:dusts/obsidian').blastFurnaceTemp(2500).duration(220).EUt(480)
    event.recipes.gtceu.electric_blast_furnace('endSteel').itemOutputs('enderio:end_steel_ingot').itemInputs('#forge:ingots/tungsten_steel').itemInputs('4x #forge:dusts/endstone').blastFurnaceTemp(2500).duration(220).EUt(480)
    event.recipes.gtceu.electric_blast_furnace('soularium').itemOutputs('enderio:soularium_ingot').itemInputs('#forge:ingots/netherite').itemInputs('minecraft:soul_sand').blastFurnaceTemp(1700).duration(220).EUt(120)
    event.recipes.gtceu.electric_blast_furnace('netherFusedQuartz').itemOutputs('enderio:fused_quartz').itemInputs('4x #forge:dusts/nether_quartz').itemInputs('#forge:dusts/graphite').blastFurnaceTemp(1700).duration(100).EUt(120)
    event.recipes.gtceu.electric_blast_furnace('certusFusedQuartz').itemOutputs('enderio:fused_quartz').itemInputs('4x #forge:dusts/certus_quartz').itemInputs('#forge:dusts/graphite').blastFurnaceTemp(1700).duration(100).EUt(120)
    event.recipes.gtceu.electric_blast_furnace('quartzFusedQuartz').itemOutputs('enderio:fused_quartz').itemInputs('4x #forge:dusts/quartzite').itemInputs('#forge:dusts/graphite').blastFurnaceTemp(1700).duration(100).EUt(120)
    

  })