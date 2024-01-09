ServerEvents.recipes(event => {    
    function assemblerRecipe(recipeName, itemOutputs, duration, EUt,  firstItem, secondItem, thirdItem, fourthItem, fithItem, sixthItem, seventhItem, eighthItem, ninthItem) {            
        if (secondItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
        }else if (thirdItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem)
        }else if (fourthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem)
        }else if (fithItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem)
        }else if (sixthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem)
        }else if (seventhItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem)
        }else if (eighthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem).itemInputs(seventhItem)
        }else if (ninthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem).itemInputs(seventhItem).itemInputs(eighthItem)
        }else{
            event.recipes.gtceu.assembler(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(firstItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem).itemInputs(seventhItem).itemInputs(eighthItem).itemInputs(ninthItem)
        }
    }

    function assemblerRecipeWithFluid(recipeName, inputFluids, fluidAmount, itemOutputs, duration, EUt,  firstItem, secondItem, thirdItem, fourthItem, fithItem, sixthItem, seventhItem, eighthItem, ninthItem) {            
        if (secondItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
        }else if (thirdItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem)
        }else if (fourthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem)
        }else if (fithItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem)
        }else if (sixthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem)
        }else if (seventhItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem)
        }else if (eighthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem).itemInputs(seventhItem)
        }else if (ninthItem == undefined){
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(thirdItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem).itemInputs(seventhItem).itemInputs(eighthItem)
        }else{
            event.recipes.gtceu.assembler(recipeName).inputFluids(Fluid.of(inputFluids, fluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem).itemInputs(firstItem).itemInputs(fourthItem).itemInputs(fithItem).itemInputs(sixthItem).itemInputs(seventhItem).itemInputs(eighthItem).itemInputs(ninthItem)
        }
    }

    function maceratorRecipe(recipeName, itemOutputs, duration, EUt,  itemInputs){
        event.recipes.gtceu.macerator(recipeName).itemInputs(itemInputs).itemOutputs(itemOutputs).duration(duration).EUt(EUt)
    }

    function mixerWashRecipe(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount, firstItem, secondItem, thirdItem, fourthItem, fithItem, sixthItem){
        event.recipes.gtceu.mixer(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    //Applied Energistics
    const ae2Remove = ['crafting_unit', 'printed_silicon', 'printed_engineering_processor','printed_calculation_processor', 'printed_logic_processor', 'logic_processor', 'calculation_processor', 'engineering_processor', 'wireless_booster', 'fluix_pearl', 'semi_dark_monitor', 'cell_component_1k', 'cell_component_4k', 'cell_component_16k', 'cell_component_64k', 'cell_component_256k','quantum_link','silicon', 'sky_stone_chest', 'smooth_sky_stone_chest', 'quartz_glass', 'drive', 'energy_cell', 'dense_energy_cell', 'fluix_covered_cable', 'fluix_glass_cable', '1k_crafting_storage', '4k_crafting_storage', '16k_crafting_storage', '64k_crafting_storage', '256k_crafting_storage', 'energy_acceptor', 'quartz_fiber', 'crafting_terminal', 'terminal']
    for (let i = 0; i < ae2Remove.length; i++) {
        event.remove({ output: 'ae2:' + ae2Remove[i] })
    }
    event.remove({ output: '#forge:gems/fluix'})
    event.remove({ output: '#forge:dusts/fluix'})

    assemblerRecipe('skyStoneChest', 'ae2:sky_stone_chest', 200, 16, '#forge:chests/wooden', '4x ae2:sky_stone_block')
    assemblerRecipe('smoothSkyStoneChest', 'ae2:smooth_sky_stone_chest', 200, 16, '#forge:chests/wooden', '4x ae2:smooth_sky_stone_block')
    assemblerRecipe('energyCell', 'ae2:energy_cell', 200, 16, '4x #forge:plates/certus_quartz', 'gtceu:lv_battery_hull', '4x #forge:dusts/fluix')
    assemblerRecipe('denseEnergyCell', 'ae2:dense_energy_cell', 200, 16, '8x ae2:energy_cell', 'ae2:calculation_processor')

    assemblerRecipeWithFluid('quartzCertusGlass', 'gtceu:glass', 1000,'4x ae2:quartz_glass', 200, 16, '2x #forge:dusts/certus_quartz')
    assemblerRecipeWithFluid('quartzNetherGlass', 'gtceu:glass', 1000,'4x ae2:quartz_glass', 200, 16, '2x #forge:dusts/nether_quartz')
    assemblerRecipeWithFluid('meDrive', 'gtceu:molten_redstone', 1296,'ae2:drive', 200, 16, '4x gtceu:stainless_steel_plate', '2x ae2:fluix_glass_cable', '2x ae2:engineering_processor' )
    assemblerRecipeWithFluid('coveredCable', 'gtceu:polytetrafluoroethylene', 2,'ae2:fluix_covered_cable', 60, 10, 'ae2:fluix_glass_cable') 
    assemblerRecipeWithFluid('netherQuartzFiber', 'gtceu:glass', 1000, '8x ae2:quartz_fiber', 200, 16, '#forge:plates/nether_quartz') 
    assemblerRecipeWithFluid('certusQuartzFiber', 'gtceu:glass', 1000, '8x ae2:quartz_fiber', 200, 16, '#forge:plates/certus_quartz') 
    assemblerRecipeWithFluid('terminal', 'gtceu:redstone', 144, 'ae2:terminal', 110, 48, '4x #forge:screws/aluminium', '#forge:circuits/mv', 'ae2:semi_dark_monitor') 
    assemblerRecipeWithFluid('quantumLinkChamber', 'gtceu:redstone', 576, 'ae2:quantum_link', 225, 480, '2x ae2:quartz_glass', '#forge:circuits/hv', 'ae2:fluix_pearl') 
    assemblerRecipeWithFluid('illuminatedPanel', 'gtceu:glowstone', 288, 'ae2:semi_dark_monitor', 225, 480, '2x ae2:quartz_glass', '#forge:plates/red_alloy', '#forge:plates/aluminium') 
    assemblerRecipeWithFluid('glassCable', 'gtceu:ethylene', 144, '4x ae2:fluix_glass_cable', 200, 16, '#forge:dusts/fluix', '2x ae2:quartz_fiber') 

    assemblerRecipeWithFluid('logicProcessor', 'gtceu:hydrochloric_acid', 144, 'ae2:logic_processor', 600, 16, 'ae2:printed_logic_processor', 'ae2:printed_silicon', '#forge:dusts/redstone') 
    assemblerRecipeWithFluid('calculationProcessor', 'gtceu:hydrochloric_acid', 144, 'ae2:calculation_processor', 600, 16, 'ae2:printed_calculation_processor', 'ae2:printed_silicon', '#forge:dusts/redstone') 
    assemblerRecipeWithFluid('engineeringProcessor', 'gtceu:hydrochloric_acid', 144, 'ae2:engineering_processor', 600, 16, 'ae2:printed_engineering_processor', 'ae2:printed_silicon', '#forge:dusts/redstone') 

    assemblerRecipeWithFluid('1kItemStorage', 'gtceu:redstone', 144, 'ae2:cell_component_1k', 600, 16, '#forge:plates/certus_quartz', 'ae2:quartz_glass', 'ae2:logic_processor', 'forge:fine_wires/copper' )
    assemblerRecipeWithFluid('4kItemStorage', 'gtceu:redstone', 144, 'ae2:cell_component_4k', 600, 16, '#forge:foils/aluminium', 'ae2:quartz_glass', 'ae2:cell_component_1k', '#forge:circuits/mv')
    assemblerRecipeWithFluid('16kItemStorage', 'gtceu:redstone', 144, 'ae2:cell_component_16k', 600, 16, '#forge:foils/stainless_steel', 'ae2:quartz_glass', 'ae2:cell_component_4k', '#forge:circuits/hv')
    assemblerRecipeWithFluid('64kItemStorage', 'gtceu:redstone', 144, 'ae2:cell_component_64k', 600, 16, '#forge:plates/titanium', 'ae2:quartz_glass', 'ae2:cell_component_16k', '#forge:circuits/ev')
    assemblerRecipeWithFluid('256kItemStorage', 'gtceu:redstone', 144, 'ae2:cell_component_256k', 600, 16, '#forge:foils/tungsten_steel', '3x ae2:quartz_glass', 'ae2:cell_component_64k', '#forge:circuits/iv')

    assemblerRecipeWithFluid('craftingStorage', 'gtceu:redstone', 576, 'ae2:crafting_unit', 350, 410, '#forge:circuits/mv', '2x ae2:calculation_processor', '4x #forge:plates/aluminium')
    assemblerRecipeWithFluid('1kcraftingStorage', 'gtceu:polytetrafluoroethylene', 144, 'ae2:1k_crafting_storage', 200, 16, 'ae2:crafting_unit', 'ae2:cell_component_1k') 
    assemblerRecipeWithFluid('4kcraftingStorage', 'gtceu:polytetrafluoroethylene', 144, 'ae2:4k_crafting_storage', 200, 16, 'ae2:crafting_unit', 'ae2:cell_component_4k') 
    assemblerRecipeWithFluid('16kcraftingStorage', 'gtceu:polytetrafluoroethylene', 144, 'ae2:16k_crafting_storage', 200, 16, 'ae2:crafting_unit', 'ae2:cell_component_16k') 
    assemblerRecipeWithFluid('64kcraftingStorage', 'gtceu:polytetrafluoroethylene', 144, 'ae2:64k_crafting_storage', 200, 16, 'ae2:crafting_unit', 'ae2:cell_component_64k') 
    assemblerRecipeWithFluid('256kcraftingStorage', 'gtceu:polytetrafluoroethylene', 144, 'ae2:256k_crafting_storage', 200, 16, 'ae2:crafting_unit', 'ae2:cell_component_256k') 

    mixerWashRecipe('glassCableWash', 'ae2:fluix_glass_cable', 60, 18, 'minecraft:water', 100, '#ae2:glass_cable')
    mixerWashRecipe('smartCableWash', 'ae2:fluix_smart_cable', 60, 18, 'minecraft:water', 100, '#ae2:smart_cable')
    mixerWashRecipe('coveredCableWash', 'ae2:fluix_covered_cable', 60, 18, 'minecraft:water', 100, '#ae2:covered_cable')
    mixerWashRecipe('smartDenseCableWash', 'ae2:fluix_smart_dense_cable', 60, 18, 'minecraft:water', 100, '#ae2:smart_dense_cable')
    mixerWashRecipe('coveredDenseCableWash', 'ae2:fluix_smart_dense_cable', 60, 18, 'minecraft:water', 100, '#ae2:smart_dense_cable')

    event.recipes.gtceu.mixer('fluixCrystal').inputFluids(Fluid.of('minecraft:water', 200)).itemOutputs('2x ae2:fluix_crystal').duration(60).EUt(48).itemInputs('#forge:gems/certus_quartz').itemInputs('#forge:gems/nether_quartz').itemInputs('#forge:dusts/redstone')
    event.recipes.gtceu.mixer('fluixPearl').inputFluids(Fluid.of('gtceu:helium', 30)).itemOutputs('ae2:fluix_pearl').duration(600).EUt(48).itemInputs('#forge:dusts/ender_pearl').itemInputs('ae2:fluix_crystal')
    
    maceratorRecipe('fluixDust', '#forge:dusts/fluix', 40, 48, '#forge:gems/fluix' )

    event.shaped('ae2:energy_acceptor', [
        'ABA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:plates/aluminium',
        B: 'ae2:quartz_glass',
        C: '#forge:circuits/mv' 
      })
    event.shaped('ae2:crafting_terminal', [
        'ADA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:screws/aluminium',
        B: '#forge:plates/stainless_steel',
        C: 'minecraft:crafting_table',
        D: 'ae2:terminal' 
      })
    event.shaped('ae2:wireless_booster', [
        'ABA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:plates/aluminium',
        B: '#forge:fine_wires/red_alloy',
        C: 'ae2:fluix_pearl'
      })

})