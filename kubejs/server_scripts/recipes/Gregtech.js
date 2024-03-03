ServerEvents.recipes(event => {    

    var id = 3000
    function nextId(){
      id = id + 1
      return id
    }

    function assemblerBuilder(recipeName, itemOutputs, duration, EUt,  firstItem, secondItem, thirdItem, fourthItem, fithItem, sixthItem, seventhItem, eighthItem, ninthItem) {            
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

    function assemblerFluidBuilder(recipeName, inputFluids, fluidAmount, itemOutputs, duration, EUt,  firstItem, secondItem, thirdItem, fourthItem, fithItem, sixthItem, seventhItem, eighthItem, ninthItem) {            
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

    function maceratorBuilder(recipeName, itemOutputs, duration, EUt,  itemInputs){
        event.recipes.gtceu.macerator(recipeName).itemInputs(itemInputs).itemOutputs(itemOutputs).duration(duration).EUt(EUt)
    }

    function extractorItemBuilder(recipeName, itemOutputs, duration, EUt,  itemInputs){
        event.recipes.gtceu.extractor(recipeName).itemInputs(itemInputs).itemOutputs(itemOutputs).duration(duration).EUt(EUt)
    }

    function extractorFluidBuilder(recipeName, fluidOutputs, fluidOutputsAmount, duration, EUt,  itemInputs){
        event.recipes.gtceu.extractor(recipeName).itemInputs(itemInputs).outputFluids(Fluid.of(fluidOutputs, fluidOutputsAmount)).duration(duration).EUt(EUt)
    }

    function smeltingBuilder(itemOutputs,   itemInputs){
        event.smelting(itemOutputs, itemInputs)
    }

    function chemicalBathBuilder(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount, firstItem){
        event.recipes.gtceu.chemical_bath(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    function chemicalReactorItemBuilder(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount, secondFluid, secondFluidAmount,  firstItem){
        event.recipes.gtceu.chemical_reactor(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).inputFluids(Fluid.of(secondFluid, secondFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }
    function chemicalReactorFluidBuilder(recipeName,fluidOutputs, fluidOutputsAmount, duration, EUt, firstFluid, firstFluidAmount, secondFluid, secondFluidAmount,  firstItem){
        event.recipes.gtceu.chemical_reactor(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).inputFluids(Fluid.of(secondFluid, secondFluidAmount)).outputFluids(Fluid.of(fluidOutputs, fluidOutputsAmount)).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    function arcFurnaceBuilder(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount,  firstItem){
        event.recipes.gtceu.arc_furnace(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    function alloySmelterBuilder(recipeName,itemOutputs, duration, EUt, firstItem, secondItem){
        event.recipes.gtceu.arc_furnace(recipeName).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem).itemInputs(secondItem)
    }
    event.recipes.gtceu.extractor(nextId()).itemInputs('#forge:gems/ender_pearl').outputFluids(Fluid.of('kubejs:resonant_ender', 250)).duration(160).EUt(18)
    //Cryogenic Oxygen and Hydrogen
    event.recipes.gtceu.chemical_reactor(nextId()).inputFluids(Fluid.of('gtceu:ethenone', 1000)).outputFluids(Fluid.of('gtceu:tetranitromethane', 200)).duration(200).EUt(192).itemInputs('#forge:dusts/glowstone')
    event.recipes.gtceu.chemical_reactor(nextId()).inputFluids(Fluid.of('gtceu:cetane_boosted_diesel', 10000)).outputFluids(Fluid.of('gtceu:infused_nitro_fuel', 10000)).duration(200).EUt(192).itemInputs('#forge:dusts/lithium')
    event.recipes.gtceu.chemical_reactor(nextId()).inputFluids(Fluid.of('gtceu:infused_nitro_fuel', 3000)).inputFluids(Fluid.of('gtceu:enriched_naquadah_solution', 1000)).outputFluids(Fluid.of('gtceu:naquadriatic_fuel', 3000)).duration(200).EUt(192)
    event.recipes.gtceu.chemical_reactor(nextId()).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 1000)).outputFluids(Fluid.of('gtceu:chloroform', 1000)).duration(120).EUt(30).itemInputs('#forge:dusts/carbon')
    
    event.recipes.gtceu.combustion_generator(nextId()).inputFluids(Fluid.of('gtceu:infused_nitro_fuel', 2)).duration(15).EUt(128)
    event.recipes.gtceu.combustion_generator(nextId()).inputFluids(Fluid.of('gtceu:naquadriatic_fuel', 1)).duration(175).EUt(128)

    extractorItemBuilder(nextId(), '4x integrateddynamics:crystalized_menril_chunk', 20, 8, 'integrateddynamics:menril_log')

    event.recipes.gtceu.mixer(nextId()).itemOutputs('2x gtceu:enderium_dust').inputFluids(Fluid.of('kubejs:resonant_ender', 1000)).itemInputs('3x #forge:dusts/lead').itemInputs('#forge:dusts/platinum').duration(120).EUt(30)
    event.recipes.gtceu.mixer(nextId()).itemOutputs('2x gtceu:signalum_dust').inputFluids(Fluid.of('gtceu:redstone', 576)).itemInputs('3x #forge:dusts/copper').itemInputs('#forge:dusts/sterling_silver').duration(120).EUt(30)
    
    event.recipes.gtceu.macerator(nextId()).duration(400).EUt(2).itemOutputs('4x gtceu:obsidian_dust').itemInputs('minecraft:obsidian')

})