ServerEvents.recipes(event => {

    var id = 4000
    function nextId(){
      id = id + 1
      return id
    }
    const industrialRemove = ['pitiful_generator','biofuel_generator', 'mycelial_furnace', 'mycelial_slimy', 'mycelial_culinary', 'mycelial_potion', 'mycelial_disenchantment', 'mycelial_ender', 'mycelial_explosive', 'mycelial_frosty', 'mycelial_halitosis', 'mycelial_magma', 'mycelial_pink', 'mycelial_netherstar', 'mycelial_death', 'mycelial_rocket', 'mycelial_crimed', 'mycelial_meatallurgic']
    //event.recipes.gtceu.alloy_smelter(nextId()).itemOutputs('enderio:copper_alloy_ingot').itemInputs('#forge:ingots/copper').itemInputs('#forge:dusts/silicon').duration(50).EUt(42)
    //event.recipes.gtceu.chemical_reactor(nextId()).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 1000)).outputFluids(Fluid.of('gtceu:chloroform', 1000)).duration(120).EUt(30).itemInputs('#forge:dusts/carbon')
    
    for (let i = 0; i < industrialRemove.length; i++) {
        event.remove({ type: 'industrialforegoing:' + industrialRemove[i]})
        event.remove({ output: 'industrialforegoing:' + industrialRemove[i]})
    }

    event.remove({ output: 'industrialforegoing:pink_slime'})
    event.recipes.gtceu.fluid_solidifier(nextId()).inputFluids('industrialforegoing:pink_slime', 300).notConsumable('gtceu:ball_casting_mold').itemOutputs('industrialforegoing:pink_slime').duration(200).EUt(16)
    
    event.remove({ output: 'industrialforegoing:machine_frame_simple'})
    event.recipes.gtceu.assembler(nextId()).itemOutputs('industrialforegoing:machine_frame_simple').duration(200).EUt(16).itemInputs('industrialforegoing:machine_frame_pity').itemInputs('2x #forge:plates/polyethylene').itemInputs('2x #forge:plates/iron').itemInputs('#forge:gears/bronze').itemInputs('2x #forge:ingots/nether_brick')

    event.remove({ output: 'industrialforegoing:machine_frame_advanced'})
    event.recipes.gtceu.assembler(nextId()).itemOutputs('industrialforegoing:machine_frame_advanced').duration(200).EUt(16).inputFluids('industrialforegoing:pink_slime', 500).itemInputs('industrialforegoing:machine_frame_simple').itemInputs('2x #forge:plates/polyethylene').itemInputs('2x #forge:plates/gold').itemInputs('#forge:gears/diamond').itemInputs('2x minecraft:netherite_scrap')

    event.remove({ output: 'industrialforegoing:machine_frame_supreme'})
    event.recipes.gtceu.assembler(nextId()).itemOutputs('industrialforegoing:machine_frame_supreme').duration(200).EUt(16).inputFluids('industrialforegoing:ether_gas', 135).itemInputs('industrialforegoing:machine_frame_advanced').itemInputs('2x #forge:plates/polyethylene').itemInputs('2x #forge:plates/diamond').itemInputs('#forge:gears/diamond').itemInputs('2x minecraft:netherite_ingot')

    event.remove({ output: 'industrialforegoing:pink_slime_ingot'})
    event.recipes.gtceu.electric_blast_furnace(nextId()).itemOutputs('industrialforegoing:pink_slime_ingot').itemInputs('2x #forge:dusts/invar').inputFluids('industrialforegoing:pink_slime', 1000).blastFurnaceTemp(1350).duration(100).EUt(480)
    
    event.remove({ output: 'industrialforegoing:wither_builder'})
    event.shaped('industrialforegoing:wither_builder', [
        'ABA', 
        'CDC', 
        'EEE'  
      ], {
        A: '#forge:plates/polyethylene',
        B: '#forge:plates/nether_star',
        C: 'minecraft:wither_skeleton_skull',
        D: 'industrialforegoing:machine_frame_supreme',
        E: 'minecraft:soul_sand'               
    });

    event.remove({ output: 'industrialforegoing:common_black_hole_unit'})
    event.shaped('industrialforegoing:common_black_hole_unit', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/lv',
        B: 'industrialforegoing:pink_slime',
        C: '#forge:plates/polyethylene',
        D: '#forge:chests/wooden'              
    });

    event.remove({ output: 'industrialforegoing:pity_black_hole_unit'})
    event.shaped('industrialforegoing:pity_black_hole_unit', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/mv',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:common_black_hole_unit'              
    });

    event.remove({ output: 'industrialforegoing:simple_black_hole_unit'})
    event.shaped('industrialforegoing:simple_black_hole_unit', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/hv',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:pity_black_hole_unit'              
    });

    event.remove({ output: 'industrialforegoing:advanced_black_hole_unit'})
    event.shaped('industrialforegoing:advanced_black_hole_unit', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/ev',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:simple_black_hole_unit'              
    });

    event.remove({ output: 'industrialforegoing:supreme_black_hole_unit'})
    event.shaped('industrialforegoing:supreme_black_hole_unit', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/iv',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:advanced_black_hole_unit'              
    });

    event.remove({ output: 'industrialforegoing:common_black_hole_tank'})
    event.shaped('industrialforegoing:common_black_hole_tank', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/lv',
        B: 'industrialforegoing:pink_slime',
        C: '#forge:plates/polyethylene',
        D: 'minecraft:bucket'              
    });

    event.remove({ output: 'industrialforegoing:pity_black_hole_tank'})
    event.shaped('industrialforegoing:pity_black_hole_tank', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/mv',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:common_black_hole_tank'              
    });

    event.remove({ output: 'industrialforegoing:simple_black_hole_tank'})
    event.shaped('industrialforegoing:simple_black_hole_tank', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/hv',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:pity_black_hole_tank'              
    });

    event.remove({ output: 'industrialforegoing:advanced_black_hole_tank'})
    event.shaped('industrialforegoing:advanced_black_hole_tank', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/ev',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:simple_black_hole_tank'              
    });

    event.remove({ output: 'industrialforegoing:supreme_black_hole_tank'})
    event.shaped('industrialforegoing:supreme_black_hole_tank', [
        'ACA', 
        'CDC', 
        'ABA'  
      ], {
        A: '#forge:circuits/iv',
        B: 'industrialforegoing:pink_slime_ingot',
        C: '#forge:plates/polyethylene',
        D: 'industrialforegoing:advanced_black_hole_tank'              
    });
})  