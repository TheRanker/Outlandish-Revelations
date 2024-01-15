ServerEvents.recipes(event => {   

    var id = 4000
    function nextId(){
      id = id + 1
      return id
    }

    const GTOreMaterials = ['almandine', 'asbestos','hematite','blue_topaz','goethite','calcite', 'cassiterite','chalcopyrite','chromite','cinnabar', 'coal','cobaltite','cooperite','diamond','emerald','galena',
    'garnierite','green_sapphire','grossular','ilmenite','bauxite','lazurite','magnesite','magnetite','powellite','pyrite','pyrolusite','rock_salt','salt','saltpeter','sapphire','scheelite','sodalite',
    'tantalite','spessartine','sphalerite','stibnite','tetrahedrite','topaz', 'tungstate','uraninite','wulfenite','yellow_limonite','nether_quartz','certus_quartz','quartzite','graphite','bornite',
    'chalcocite','realgar','bastnasite','pentlandite','spodumene','lepidolite','malachite','barite','alunite','talc','soapstone','kyanite','pyrochlore','oilsands','olivine','opal','amethyst', 'lapis',
    'apatite','tricalcium_phosphate','red_garnet','yellow_garnet','vanadium_magnetite','pollucite','bentonite','fullers_earth','pitchblende','monazite','trona','gypsum','zeolite','redstone','electrotine',
    'diatomite','aluminium','beryllium','cobalt','copper','gold','iron','lead','lithium','molybdenum','neodymium','nickel','palladium','platinum','plutonium','silver','sulfur','thorium','tin','naquadah']

    for (let i = 0; i < GTOreMaterials.length; i++) {
        if (GTOreMaterials[i] == 'redstone' || GTOreMaterials[i] == 'cassiterite' ){ //12
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('12x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }else if (GTOreMaterials[i] == 'lepidolite' || GTOreMaterials[i] == 'magnesite'){ //10
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('10x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }else if (GTOreMaterials[i] == 'bauxite' || GTOreMaterials[i] == 'cobaltite' || GTOreMaterials[i] == 'grossular' || GTOreMaterials[i] == 'pyrolusite' || GTOreMaterials[i] == 'sodalite' || GTOreMaterials[i] == 'stibnite'){ //6
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('6x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }else if (GTOreMaterials[i] == 'malachite'){ //5
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('5x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }else if (GTOreMaterials[i] == 'yellow_limonite' || GTOreMaterials[i] == 'tantalite'){ //4
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('4x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }else if (GTOreMaterials[i] == 'tetrahedrite' || GTOreMaterials[i] == 'pyrite' || GTOreMaterials[i] == 'magnetite'){ //3
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('3x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }else{
            event.recipes.gtceu.macerator(nextId()).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_cluster').itemOutputs('2x #forge:crushed_ores/' + GTOreMaterials[i]).duration(200).EUt(12)
        }

        event.recipes.gtceu.chemical_reactor(nextId()).inputFluids(Fluid.of('bloodmagic:life_essence_fluid', 200)).inputFluids(Fluid.of('minecraft:water', 200)).itemOutputs('kubejs:' + GTOreMaterials[i] + '_ore_shard').duration(280).EUt(48).itemInputs('#forge:ores/' + GTOreMaterials[i])
        event.smelting('4x kubejs:' + GTOreMaterials[i] + '_ore_cluster','kubejs:' + GTOreMaterials[i] + '_ore_shard')

        event.recipes.gtceu.arc_furnace(nextId()).inputFluids(Fluid.of('kubejs:blazing_pyrotheum', 144)).itemOutputs('kubejs:' + GTOreMaterials[i] + '_ore_crystal').duration(80).EUt(480).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_shard')
        event.smelting('8x kubejs:' + GTOreMaterials[i] + '_ore_cluster','kubejs:' + GTOreMaterials[i] + '_ore_crystal')

        event.recipes.gtceu.chemical_bath(nextId()).inputFluids(Fluid.of('gtceu:uu_matter', 10)).itemOutputs('kubejs:' + GTOreMaterials[i] + '_ore_clump').duration(100).EUt(480).itemInputs('kubejs:' + GTOreMaterials[i] + '_ore_crystal')
        event.smelting('16x kubejs:' + GTOreMaterials[i] + '_ore_cluster','kubejs:' + GTOreMaterials[i] + '_ore_clump')
    }

 })