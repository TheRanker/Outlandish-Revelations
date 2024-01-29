ServerEvents.recipes(event => {    

    const ULV = 7, LV = 30, MV = 120, HV = 480, EV = 1920, IV = 7680, LuV = 30720, ZPM = 122880, UV = 491520
    var id = 6250
    function nextId(){
      id = id + 1
      return id
    }
    /*
      Fixes Wood Recipes
    */
    var modId = 'ars_nouveau'
    var woodTypes = ['archwood']

    for (let i = 0; i < woodTypes.length; i++) {
               
      event.remove({ output: modId + ':' + woodTypes[i] + '_planks' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_slab' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_stairs' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_fence' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_fence_gate' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_door' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_trapdoor' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_pressure_plate' })
      event.remove({ output: modId + ':' + woodTypes[i] + '_button' })

      event.shapeless('2x ' + modId + ':' + woodTypes[i] + '_planks', ['#forge:logs/archwood'])
        event.recipes.gtceu.cutter(nextId()).itemOutputs('6x ' + modId + ':' + woodTypes[i] + '_planks').duration(400).EUt(7).inputFluids(Fluid.of('minecraft:water', 5)).itemInputs('#forge:logs/archwood')
        event.recipes.gtceu.cutter(nextId()).itemOutputs('6x ' + modId + ':' + woodTypes[i] + '_planks').duration(400).EUt(7).inputFluids(Fluid.of('gtceu:distilled_water', 3)).itemInputs('#forge:logs/archwood')
        event.recipes.gtceu.cutter(nextId()).itemOutputs('6x ' + modId + ':' + woodTypes[i] + '_planks').duration(200).EUt(7).inputFluids(Fluid.of('gtceu:lubricant', 1)).itemInputs('#forge:logs/archwood')
        event.shaped('4x ' + modId + ':' + woodTypes[i] + '_planks', [
                'A', 
                'B' 
            ], {
                A: '#forge:tools/saws',
                B: '#forge:logs/archwood'
        })
        
      event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_slab').duration(50).EUt(7).inputFluids(Fluid.of('minecraft:water', 5)).itemInputs(modId + ':' + woodTypes[i] + '_planks')
      event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_slab').duration(50).EUt(7).inputFluids(Fluid.of('gtceu:distilled_water', 3)).itemInputs(modId + ':' + woodTypes[i] + '_planks')
      event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_slab').duration(25).EUt(7).inputFluids(Fluid.of('gtceu:lubricant', 1)).itemInputs(modId + ':' + woodTypes[i] + '_planks')
      event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_button').duration(50).EUt(7).inputFluids(Fluid.of('minecraft:water', 5)).itemInputs(modId + ':' + woodTypes[i] + '_pressure_plate')
      event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_button').duration(50).EUt(7).inputFluids(Fluid.of('gtceu:distilled_water', 3)).itemInputs(modId + ':' + woodTypes[i] + '_pressure_plate')
      event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_button').duration(25).EUt(7).inputFluids(Fluid.of('gtceu:lubricant', 1)).itemInputs(modId + ':' + woodTypes[i] + '_pressure_plate')

      event.recipes.gtceu.assembler(nextId()).itemOutputs(modId + ':' + woodTypes[i] + '_fence_gate').duration(300).EUt(7).itemInputs('2x ' + modId + ':' + woodTypes[i] + '_planks').itemInputs('2x #forge:rods/wood')
      event.recipes.gtceu.assembler(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_fence').duration(300).EUt(7).circuit(3).itemInputs('3x ' + modId + ':' + woodTypes[i] + '_planks').itemInputs('3x #forge:rods/wood')
      event.recipes.gtceu.assembler(nextId()).itemOutputs('4x ' + modId + ':' + woodTypes[i] + '_trapdoor').duration(400).EUt(4).itemInputs('4x ' + modId + ':' + woodTypes[i] + '_slab').itemInputs('#forge:rods/wood').inputFluids(Fluid.of('gtceu:iron', 16))
      event.recipes.gtceu.assembler(nextId()).itemOutputs('6x ' + modId + ':' + woodTypes[i] + '_trapdoor').duration(400).EUt(4).itemInputs('4x ' + modId + ':' + woodTypes[i] + '_slab').itemInputs('#forge:rods/wood').inputFluids(Fluid.of('gtceu:steel', 16))
      event.recipes.gtceu.assembler(nextId()).itemOutputs('2x ' + modId + ':' + woodTypes[i] + '_pressure_plate').duration(400).EUt(4).itemInputs('2x ' + modId + ':' + woodTypes[i] + '_slab').itemInputs('#forge:springs/iron')
     
      event.shaped('2x ' + modId + ':' + woodTypes[i] + '_button', [
        'A', 
        'B' 
      ], {
        A: '#forge:tools/saws',
        B: modId + ':' + woodTypes[i] + '_pressure_plate',
      })

      event.shaped(modId + ':' + woodTypes[i] + '_planks', [
        'A', 
        'A' 
      ], {
        A: modId + ':' + woodTypes[i] + '_slab'
      })

      event.shaped('2x ' + modId + ':' + woodTypes[i] + '_slab', [
        'AB'
      ], {
        A: '#forge:tools/saws',
        B: modId + ':' + woodTypes[i] + '_planks'
      })

      event.shaped(modId + ':' + woodTypes[i] + '_fence_gate', [
        'A A',
        'BCB',
        'BCB'
      ], {
        A: 'minecraft:flint',
        B: modId + ':' + woodTypes[i] + '_planks',
        C: '#forge:rods/wood'
      })

      event.shaped('2x ' + modId + ':' + woodTypes[i] + '_fence_gate', [
        'ADA',
        'BCB',
        'BCB'
      ], {
        A: '#forge:screws/wood',
        B: modId + ':' + woodTypes[i] + '_planks',
        C: '#forge:rods/wood',
        D: '#forge:tools/screwdrivers',
      })

      event.shaped(modId + ':' + woodTypes[i] + '_fence', [
        'ABA',
        'ABA',
        'ABA'
      ], {
        A: '#forge:rods/wood',
        B: modId + ':' + woodTypes[i] + '_planks'
      })

      event.shaped('2x ' + modId + ':' + woodTypes[i] + '_fence', [
        'CDC',
        'ABA',
        'ABA'
      ], {
        A: '#forge:rods/wood',
        B: modId + ':' + woodTypes[i] + '_planks',
        C: '#forge:screws/wood',
        D: '#forge:tools/screwdrivers',
      })

      event.shaped('4x ' + modId + ':' + woodTypes[i] + '_stairs', [
        'A  ',
        'AA ',
        'AAA'
      ], {
        A: modId + ':' + woodTypes[i] + '_planks',
      })

      event.shaped(modId + ':' + woodTypes[i] + '_trapdoor', [
        'ABA',
        'BCB',
        'ABA'
      ], {
        A: modId + ':' + woodTypes[i] + '_slab',
        B: '#forge:rods/wood',
        C: 'minecraft:flint'
      })

      event.shaped('2x ' + modId + ':' + woodTypes[i] + '_trapdoor', [
        'ABA',
        'BCB',
        'ABA'
      ], {
        A: modId + ':' + woodTypes[i] + '_slab',
        B: '#forge:rods/wood',
        C: '#forge:screws/iron'
      })

      event.shaped('3x ' + modId + ':' + woodTypes[i] + '_trapdoor', [
        'ABA',
        'BCB',
        'ABA'
      ], {
        A: modId + ':' + woodTypes[i] + '_slab',
        B: '#forge:rods/wood',
        C: '#forge:screws/steel'
      })

      event.shaped('2x ' + modId + ':' + woodTypes[i] + '_pressure_plate', [
        'ADA', 
        'BCB',
        'AEA' 
      ], {
        A: '#forge:screws/wood',
        B: modId + ':' + woodTypes[i] + '_slab',
        C: '#forge:springs/iron',
        D: '#forge:tools/mallets',
        E: '#forge:tools/screwdrivers',
      })
    }

    })
