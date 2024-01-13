const GTOreMaterials = ['almandine', 'asbestos','hematite','blue_topaz','goethite','calcite', 'cassiterite','chalcopyrite','chromite','cinnabar', 'coal','cobaltite','cooperite','diamond','emerald','galena',
    'garnierite','green_sapphire','grossular','ilmenite','bauxite','lazurite','magnesite','magnetite','powellite','pyrite','pyrolusite','rock_salt','salt','saltpeter','sapphire','scheelite','sodalite',
    'tantalite','spessartine','sphalerite','stibnite','tetrahedrite','topaz', 'tungstate','uraninite','wulfenite','yellow_limonite','nether_quartz','certus_quartz','quartzite','graphite','bornite',
    'chalcocite','realgar','bastnasite','pentlandite','spodumene','lepidolite','malachite','barite','alunite','talc','soapstone','kyanite','pyrochlore','oilsands','olivine','opal','amethyst', 'lapis',
    'apatite','tricalcium_phosphate','red_garnet','yellow_garnet','vanadium_magnetite','pollucite','bentonite','fullers_earth','pitchblende','monazite','trona','gypsum','zeolite','redstone','electrotine',
    'diatomite','aluminium','beryllium','cobalt','copper','gold','iron','lead','lithium','molybdenum','neodymium','nickel','palladium','platinum','plutonium','silver','sulfur','thorium','tin','naquadah']

    ServerEvents.recipes(event => {   
    function maceratorBuilder(recipeName, itemOutputs, duration, EUt,  itemInputs){
        event.recipes.gtceu.macerator(recipeName).itemInputs(itemInputs).itemOutputs(itemOutputs).duration(duration).EUt(EUt)
    }

    function smeltingBuilder(itemOutputs,   itemInputs){
        event.smelting(itemOutputs, itemInputs)
    }

    function chemicalBathBuilder(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount, firstItem){
        event.recipes.gtceu.chemical_bath(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    function chemicalReactorBuilder(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount, secondFluid, secondFluidAmount,  firstItem){
        event.recipes.gtceu.chemical_reactor(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).inputFluids(Fluid.of(secondFluid, secondFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    function arcFurnaceBuilder(recipeName,itemOutputs, duration, EUt, firstFluid, firstFluidAmount,  firstItem){
        event.recipes.gtceu.arc_furnace(recipeName).inputFluids(Fluid.of(firstFluid, firstFluidAmount)).itemOutputs(itemOutputs).duration(duration).EUt(EUt).itemInputs(firstItem)
    }

    for (let i = 0; i < GTOreMaterials.length; i++) {
        if (GTOreMaterials[i] == 'redstone' || GTOreMaterials[i] == 'cassiterite' ){ //12
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '12x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }else if (GTOreMaterials[i] == 'lepidolite' || GTOreMaterials[i] == 'magnesite'){ //10
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '10x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }else if (GTOreMaterials[i] == 'bauxite' || GTOreMaterials[i] == 'cobaltite' || GTOreMaterials[i] == 'grossular' || GTOreMaterials[i] == 'pyrolusite' || GTOreMaterials[i] == 'sodalite' || GTOreMaterials[i] == 'stibnite'){ //6
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '6x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }else if (GTOreMaterials[i] == 'malachite'){ //5
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '5x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }else if (GTOreMaterials[i] == 'yellow_limonite' || GTOreMaterials[i] == 'tantalite'){ //4
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '4x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }else if (GTOreMaterials[i] == 'tetrahedrite' || GTOreMaterials[i] == 'pyrite' || GTOreMaterials[i] == 'magnetite'){ //3
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '3x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }else{
            maceratorBuilder(GTOreMaterials[i] + 'ClusterToCrushed', '2x #forge:crushed_ores/' + GTOreMaterials[i], 200, 12, 'kubejs:' + GTOreMaterials[i] + '_ore_cluster' )
        }

        chemicalReactorBuilder(GTOreMaterials[i] + 'OreToShard', 'kubejs:' + GTOreMaterials[i] + '_ore_shard', 280, 48, 'bloodmagic:life_essence_fluid', 200, 'minecraft:water', 200, '#forge:ores/' + GTOreMaterials[i])
        smeltingBuilder('4x kubejs:' + GTOreMaterials[i] + '_ore_cluster','kubejs:' + GTOreMaterials[i] + '_ore_shard')

        arcFurnaceBuilder(GTOreMaterials[i] + 'ShardToCrystal', 'kubejs:' + GTOreMaterials[i] + '_ore_crystal', 80, 480, 'kubejs:blazing_pyrotheum', 144,  'kubejs:' + GTOreMaterials[i] + '_ore_shard' )
        smeltingBuilder('8x kubejs:' + GTOreMaterials[i] + '_ore_cluster','kubejs:' + GTOreMaterials[i] + '_ore_crystal')

        chemicalBathBuilder(GTOreMaterials[i] + 'CrystalToClump', 'kubejs:' + GTOreMaterials[i] + '_ore_clump', 100, 480, 'gtceu:uu_matter', 10, 'kubejs:' + GTOreMaterials[i] + '_ore_crystal' )
        smeltingBuilder('16x kubejs:' + GTOreMaterials[i] + '_ore_cluster','kubejs:' + GTOreMaterials[i] + '_ore_clump')
    }

 })