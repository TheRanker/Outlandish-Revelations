ServerEvents.recipes(event => {    
    function assemblerRecipe(recipeName, inputFluids, fluidAmount, itemOutputs, duration, EUt,  firstItem, secondItem, thirdItem, fourthItem, fithItem, sixthItem, seventhItem, eighthItem, ninthItem) {            
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
    assemblerRecipe('diamond', 'minecraft:water', 1000, 'minecraft:diamond', 5, 32, '2x minecraft:dirt', '2x minecraft:cobblestone')
    
})