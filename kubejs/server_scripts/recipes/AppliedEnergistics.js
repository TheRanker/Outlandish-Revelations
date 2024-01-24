ServerEvents.recipes(event => {    

  const ULV = 7, LV = 30, MV = 120, HV = 480, EV = 1920, IV = 7680, LuV = 30720, ZPM = 122880, UV = 491520
  var id = 1000
  function nextId(){
    id = id + 1
    return id
  }

    const ae2RemoveRecipe = ['annihilation_plane','fluix_smart_dense_cable', 'fluix_smart_cable', 'spatial_anchor','cable_pattern_provider','pattern_provider','void_card','equal_distribution_card','crafting_card','capacity_card','inverter_card','redstone_card','speed_card','fuzzy_card','pattern_encoding_terminal','spatial_io_port','memory_card', 'color_applicator','formation_plane','inverted_toggle_bus','toggle_bus','spatial_pylon', 'tiny_tnt','energy_level_emitter','light_detector','quartz_fixture','wireless_access_point', 'condenser', 'crafting_monitor', 'crafting_accelerator', 'cell_workbench','io_port','spatial_storage_cell_2','spatial_storage_cell_16','spatial_storage_cell_128','spatial_cell_component_2','spatial_cell_component_16','spatial_cell_component_128','fluix_block','cable_anchor', 'view_cell','storage_bus','annihilation_core', 'formation_core','basic_card', 'advanced_card', 'fluid_storage_cell_1k','fluid_storage_cell_4k','fluid_storage_cell_16k','fluid_storage_cell_64k','fluid_storage_cell_256k','item_storage_cell_1k','item_storage_cell_4k','item_storage_cell_16k','item_storage_cell_64k','item_storage_cell_256k', 'fluid_cell_housing','item_cell_housing','quantum_ring', 'molecular_assembler', 'level_emitter', 'export_bus', 'import_bus', 'quartz_vibrant_glass', 'chest', 'wireless_receiver', 'blank_pattern', 'quantum_ring','me_p2p_tunnel', 'interface', 'controller', 'sky_dust', 'crafting_unit', 'printed_silicon', 'printed_engineering_processor','printed_calculation_processor', 'printed_logic_processor', 'logic_processor', 'calculation_processor', 'engineering_processor', 'wireless_booster', 'fluix_pearl', 'fluix_crystal', 'semi_dark_monitor', 'cell_component_1k', 'cell_component_4k', 'cell_component_16k', 'cell_component_64k', 'cell_component_256k','quantum_link', 'sky_stone_chest', 'smooth_sky_stone_chest', 'quartz_glass', 'drive', 'energy_cell', 'dense_energy_cell', 'fluix_covered_cable', 'fluix_glass_cable', '1k_crafting_storage', '4k_crafting_storage', '16k_crafting_storage', '64k_crafting_storage', '256k_crafting_storage', 'energy_acceptor', 'quartz_fiber', 'crafting_terminal', 'terminal']
    for (let i = 0; i < ae2RemoveRecipe.length; i++) {
        event.remove({ output: 'ae2:' + ae2RemoveRecipe[i] })
    }
    event.remove({ output: '#forge:gems/fluix'})
    event.remove({ output: '#forge:dusts/fluix'})
    event.remove({type: 'ae2:inscriber'})
    event.remove({type: 'ae2:charger'}) 
    event.remove({type: 'ae2:growth_accelerator'})   
    event.remove({type: 'ae2:vibration_chamber'})   

    //Assembler
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:sky_stone_chest').duration(200).EUt(LV).itemInputs('#forge:chests/wooden').itemInputs('4x ae2:sky_stone_block')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:smooth_sky_stone_chest').duration(200).EUt(LV).itemInputs('#forge:chests/wooden').itemInputs('4x ae2:smooth_sky_stone_block')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:energy_cell').duration(200).EUt(MV).itemInputs('4x #forge:plates/certus_quartz').itemInputs('gtceu:lv_battery_hull').itemInputs('4x #forge:dusts/fluix')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:dense_energy_cell').duration(200).EUt(HV).itemInputs('8x ae2:energy_cell').itemInputs('ae2:calculation_processor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('4x ae2:quartz_glass').duration(200).EUt(LV).inputFluids(Fluid.of('gtceu:glass', 1000)).itemInputs('2x #forge:dusts/certus_quartz')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('4x ae2:quartz_glass').duration(200).EUt(LV).inputFluids(Fluid.of('gtceu:glass', 1000)).itemInputs('2x #forge:dusts/nether_quartz')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:drive').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 1296)).itemInputs('4x gtceu:stainless_steel_plate').itemInputs('2x ae2:fluix_glass_cable').itemInputs('2x ae2:engineering_processor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:fluix_covered_cable').duration(60).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 2)).itemInputs('ae2:fluix_glass_cable')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('8x ae2:quartz_fiber').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:glass', 576)).itemInputs('#forge:plates/nether_quartz')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('8x ae2:quartz_fiber').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:glass', 576)).itemInputs('#forge:plates/certus_quartz')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:terminal').duration(110).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('4x #forge:screws/aluminium').itemInputs('#gtceu:circuits/mv').itemInputs( 'ae2:semi_dark_monitor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:quantum_ring').duration(225).EUt(EV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 576)).itemInputs('4x #forge:plates/stainless_steel').itemInputs('ae2:engineering_processor').itemInputs('ae2:calculation_processor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:quantum_link').duration(225).EUt(EV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 576)).itemInputs('2x ae2:quartz_glass').itemInputs('#gtceu:circuits/ev').itemInputs('4x ae2:fluix_pearl').itemInputs('2x ae2:engineering_processor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:semi_dark_monitor').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:glowstone', 288)).itemInputs('2x ae2:quartz_glass').itemInputs('#forge:plates/red_alloy').itemInputs('#forge:plates/aluminium')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('4x ae2:fluix_glass_cable').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polyethylene', 144)).itemInputs('#forge:dusts/fluix').itemInputs('2x ae2:quartz_fiber')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:me_p2p_tunnel').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('#forge:plates/polytetrafluoroethylene').itemInputs('ae2:engineering_processor').itemInputs('4x ae2:fluix_smart_dense_cable')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:interface').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polyethylene', 144)).itemInputs('6x gtceu:skystone_plate').itemInputs('ae2:conversion_monitor').itemInputs('#forge:gems/fluix')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:controller').duration(600).EUt(HV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 576)).itemInputs('8x ae2:smooth_sky_stone_block').itemInputs('16x ae2:fluix_smart_cable').itemInputs('ae2:energy_acceptor').itemInputs('2x ae2:energy_cell').itemInputs('ae2:engineering_processor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:cell_component_1k').duration(600).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('#forge:plates/certus_quartz').itemInputs('ae2:quartz_glass').itemInputs('ae2:logic_processor').itemInputs('2x #forge:fine_wires/copper')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:cell_component_4k').duration(600).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('#forge:foils/aluminium').itemInputs('ae2:quartz_glass').itemInputs('ae2:cell_component_1k').itemInputs('#gtceu:circuits/mv')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:cell_component_16k').duration(600).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('#forge:foils/stainless_steel').itemInputs('ae2:quartz_glass').itemInputs('ae2:cell_component_4k').itemInputs('#gtceu:circuits/hv')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:cell_component_64k').duration(600).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('#forge:plates/titanium').itemInputs('ae2:quartz_glass').itemInputs('ae2:cell_component_16k').itemInputs('#gtceu:circuits/ev')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:cell_component_256k').duration(600).EUt(MV).inputFluids(Fluid.of('gtceu:redstone', 144)).itemInputs('#forge:foils/tungsten_steel').itemInputs('ae2:quartz_glass').itemInputs('ae2:cell_component_64k').itemInputs('#gtceu:circuits/iv')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:crafting_unit').duration(350).EUt(HV).inputFluids(Fluid.of('gtceu:redstone', 576)).itemInputs('#gtceu:circuits/hv').itemInputs('2x ae2:calculation_processor').itemInputs('4x #forge:plates/stainless_steel')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:1k_crafting_storage').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('ae2:cell_component_1k')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:4k_crafting_storage').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('ae2:cell_component_4k')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:16k_crafting_storage').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('ae2:cell_component_16k')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:64k_crafting_storage').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('ae2:cell_component_64k')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:crafting_accelerator').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('2x ae2:engineering_processor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:crafting_monitor').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('ae2:storage_monitor')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:256k_crafting_storage').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144)).itemInputs('ae2:crafting_unit').itemInputs('ae2:cell_component_256k')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:spatial_cell_component_2').duration(600).EUt(HV).inputFluids(Fluid.of('gtceu:glowstone', 576)).itemInputs('2x ae2:fluix_pearl').itemInputs('ae2:quartz_glass').itemInputs('ae2:engineering_processor').itemInputs('2x #forge:fine_wires/annealed_copper')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:spatial_cell_component_16').duration(600).EUt(HV).inputFluids(Fluid.of('gtceu:glowstone', 576)).itemInputs('#forge:plates/stainless_steel').itemInputs('ae2:quartz_glass').itemInputs('2x ae2:spatial_cell_component_2').itemInputs('#gtceu:circuits/hv')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:spatial_cell_component_128').duration(600).EUt(HV).inputFluids(Fluid.of('gtceu:glowstone', 576)).itemInputs('#forge:plates/titanium').itemInputs('ae2:quartz_glass').itemInputs('2x ae2:spatial_cell_component_16').itemInputs('#gtceu:circuits/ev')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('2x ae2:quartz_fixture').duration(200).EUt(MV).itemInputs('#forge:rods/aluminium').itemInputs('#forge:plates/certus_quartz')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('2x ae2:light_detector').duration(200).EUt(MV).itemInputs('#forge:rods/aluminium').itemInputs('#forge:plates/nether_quartz')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:toggle_bus').duration(200).EUt(MV).itemInputs('ae2:level_emitter').itemInputs('2x #ae2:glass_cable')
    event.recipes.gtceu.assembler(nextId()).itemOutputs('ae2:pattern_encoding_terminal').duration(200).EUt(HV).itemInputs('ae2:crafting_terminal').itemInputs('2x #forge:screws/stainless_steel').itemInputs('2x #forge:plates/nether_quartz').itemInputs('ae2:blank_pattern').itemInputs('ae2:engineering_processor')
    
    //Circuit Assembler
    event.recipes.gtceu.circuit_assembler(nextId()).itemOutputs('ae2:logic_processor').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 144)).itemInputs('ae2:printed_logic_processor').itemInputs('ae2:printed_silicon').itemInputs('#forge:dusts/redstone')
    event.recipes.gtceu.circuit_assembler(nextId()).itemOutputs('ae2:calculation_processor').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 144)).itemInputs('ae2:printed_calculation_processor').itemInputs('ae2:printed_silicon').itemInputs('#forge:dusts/redstone')
    event.recipes.gtceu.circuit_assembler(nextId()).itemOutputs('ae2:engineering_processor').duration(200).EUt(MV).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 144)).itemInputs('ae2:printed_engineering_processor').itemInputs('ae2:printed_silicon').itemInputs('#forge:dusts/redstone')
    event.recipes.gtceu.circuit_assembler(nextId()).itemOutputs('2x ae2:annihilation_core').duration(100).EUt(MV).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 144)).itemInputs('ae2:logic_processor').itemInputs('#forge:dusts/fluix').itemInputs('#forge:plates/nether_quartz')
    event.recipes.gtceu.circuit_assembler(nextId()).itemOutputs('2x ae2:formation_core').duration(100).EUt(MV).inputFluids(Fluid.of('gtceu:hydrochloric_acid', 144)).itemInputs('ae2:logic_processor').itemInputs('#forge:dusts/fluix').itemInputs('#forge:plates/certus_quartz')

    //Mixer
    event.recipes.gtceu.mixer(nextId()).itemOutputs('ae2:fluix_glass_cable').duration(60).EUt(LV).inputFluids(Fluid.of('minecraft:water', 100)).itemInputs('#ae2:glass_cable')
    event.recipes.gtceu.mixer(nextId()).itemOutputs('ae2:fluix_smart_cable').duration(60).EUt(LV).inputFluids(Fluid.of('minecraft:water', 100)).itemInputs('#ae2:smart_cable')
    event.recipes.gtceu.mixer(nextId()).itemOutputs('ae2:fluix_covered_cable').duration(60).EUt(LV).inputFluids(Fluid.of('minecraft:water', 100)).itemInputs('#ae2:covered_cable')
    event.recipes.gtceu.mixer(nextId()).itemOutputs('ae2:fluix_smart_dense_cable').duration(60).EUt(LV).inputFluids(Fluid.of('minecraft:water', 100)).itemInputs('#ae2:smart_dense_cable')
    event.recipes.gtceu.mixer(nextId()).itemOutputs('ae2:fluix_smart_dense_cable').duration(60).EUt(LV).inputFluids(Fluid.of('minecraft:water', 100)).itemInputs('#ae2:smart_dense_cable')
    event.recipes.gtceu.mixer(nextId()).itemOutputs('2x ae2:fluix_crystal').duration(60).EUt(MV).inputFluids(Fluid.of('minecraft:water', 200)).itemInputs('#forge:gems/certus_quartz').itemInputs('#forge:gems/nether_quartz').itemInputs('#forge:dusts/redstone')
    event.recipes.gtceu.mixer(nextId()).itemOutputs('ae2:fluix_pearl').duration(600).EUt(MV).inputFluids(Fluid.of('gtceu:helium', 30)).itemInputs('#forge:dusts/ender_pearl').itemInputs('ae2:fluix_crystal')
    
    //Cuttter
    event.recipes.gtceu.cutter(nextId()).itemOutputs('gtceu:skystone_plate').duration(320).EUt(LV).inputFluids(Fluid.of('minecraft:water', 15)).itemInputs('ae2:smooth_sky_stone_block')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('gtceu:skystone_plate').duration(240).EUt(LV).inputFluids(Fluid.of('gtceu:distilled_water', 11)).itemInputs('ae2:smooth_sky_stone_block')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('gtceu:skystone_plate').duration(160).EUt(LV).inputFluids(Fluid.of('gtceu:lubricant', 3)).itemInputs('ae2:smooth_sky_stone_block')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ae2:cable_anchor').duration(320).EUt(LV).inputFluids(Fluid.of('minecraft:water', 15)).itemInputs('#forge:rods/iron')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ae2:cable_anchor').duration(240).EUt(LV).inputFluids(Fluid.of('gtceu:distilled_water', 11)).itemInputs('#forge:rods/iron')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('2x ae2:cable_anchor').duration(160).EUt(LV).inputFluids(Fluid.of('gtceu:lubricant', 3)).itemInputs('#forge:rods/iron')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('4x ae2:cable_anchor').duration(320).EUt(LV).inputFluids(Fluid.of('minecraft:water', 15)).itemInputs('#forge:rods/steel')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('4x ae2:cable_anchor').duration(240).EUt(LV).inputFluids(Fluid.of('gtceu:distilled_water', 11)).itemInputs('#forge:rods/steel')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('4x ae2:cable_anchor').duration(160).EUt(LV).inputFluids(Fluid.of('gtceu:lubricant', 3)).itemInputs('#forge:rods/steel')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('8x ae2:cable_anchor').duration(320).EUt(LV).inputFluids(Fluid.of('minecraft:water', 15)).itemInputs('#forge:rods/aluminium')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('8x ae2:cable_anchor').duration(240).EUt(LV).inputFluids(Fluid.of('gtceu:distilled_water', 11)).itemInputs('#forge:rods/aluminium')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('8x ae2:cable_anchor').duration(160).EUt(LV).inputFluids(Fluid.of('gtceu:lubricant', 3)).itemInputs('#forge:rods/aluminium')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('16x ae2:cable_anchor').duration(320).EUt(LV).inputFluids(Fluid.of('minecraft:water', 15)).itemInputs('#forge:rods/stainless_steel')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('16x ae2:cable_anchor').duration(240).EUt(LV).inputFluids(Fluid.of('gtceu:distilled_water', 11)).itemInputs('#forge:rods/stainless_steel')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('16x ae2:cable_anchor').duration(160).EUt(LV).inputFluids(Fluid.of('gtceu:lubricant', 3)).itemInputs('#forge:rods/stainless_steel')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('32x ae2:cable_anchor').duration(320).EUt(LV).inputFluids(Fluid.of('minecraft:water', 15)).itemInputs('#forge:rods/titanium')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('32x ae2:cable_anchor').duration(240).EUt(LV).inputFluids(Fluid.of('gtceu:distilled_water', 11)).itemInputs('#forge:rods/titanium')
    event.recipes.gtceu.cutter(nextId()).itemOutputs('32x ae2:cable_anchor').duration(160).EUt(LV).inputFluids(Fluid.of('gtceu:lubricant', 3)).itemInputs('#forge:rods/titanium')
    
    //Lathe
    event.recipes.gtceu.lathe(nextId()).itemOutputs('gtceu:skystone_lens').itemInputs('gtceu:skystone_plate')

    //Macerator
    event.recipes.gtceu.macerator(nextId()).itemOutputs('#forge:dusts/fluix').duration(40).EUt(LV).itemInputs('#forge:gems/fluix')
    event.recipes.gtceu.macerator(nextId()).itemOutputs('ae2:sky_dust').duration(40).EUt(LV).itemInputs('ae2:sky_stone_block' )

    //Laser Engraver
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('gtceu:silicon_wafer').notConsumable('gtceu:skystone_lens').itemOutputs('4x ae2:printed_silicon').duration(200).EUt(MV)
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('gtceu:phosphorus_wafer').notConsumable('gtceu:skystone_lens').itemOutputs('8x ae2:printed_silicon').duration(200).EUt(HV)
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('gtceu:naquadah_wafer').notConsumable('gtceu:skystone_lens').itemOutputs('16x ae2:printed_silicon').duration(200).EUt(EV)
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('gtceu:neutronium_wafer').notConsumable('gtceu:skystone_lens').itemOutputs('32x ae2:printed_silicon').duration(200).EUt(IV)
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('#forge:plates/gold').notConsumable('gtceu:skystone_lens').itemOutputs('ae2:printed_logic_processor').duration(200).EUt(MV)
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('#forge:plates/diamond').notConsumable('gtceu:skystone_lens').itemOutputs('ae2:printed_engineering_processor').duration(200).EUt(MV)
    event.recipes.gtceu.laser_engraver(nextId()).itemInputs('#forge:plates/certus_quartz').notConsumable('gtceu:skystone_lens').itemOutputs('ae2:printed_calculation_processor').duration(200).EUt(MV)

    //Compressor
    event.recipes.gtceu.compressor(nextId()).itemOutputs('ae2:fluix_block').duration(40).EUt(LV).itemInputs('4x #forge:gems/fluix')

    //Centrifuge
    event.recipes.gtceu.centrifuge(nextId()).itemOutputs('2x ae2:tiny_tnt').duration(100).EUt(LV).itemInputs('minecraft:tnt')

    //Chemical Bath
    event.recipes.gtceu.chemical_bath(nextId()).itemOutputs('ae2:quartz_vibrant_glass').duration(200).EUt(LV).inputFluids(Fluid.of('gtceu:glowstone', 288)).itemInputs('ae2:quartz_glass')
    

    //Shaped Crafting
    event.shaped('ae2:molecular_assembler', [
      'ACA', 
      'B B', 
      'ADA'  
    ], {
      A: '#forge:plates/stainless_steel',
      B: 'ae2:quartz_glass',
      C: 'ae2:annihilation_core', 
      D: 'ae2:formation_core' 
    })

    event.shaped('ae2:pattern_provider', [
      'ACA', 
      'B B', 
      'ADA'  
    ], {
      A: '#forge:plates/stainless_steel',
      B: 'minecraft:crafting_table',
      C: 'ae2:annihilation_core', 
      D: 'ae2:formation_core' 
    })

    event.shaped('ae2:energy_acceptor', [
        'ABA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:plates/aluminium',
        B: 'ae2:quartz_glass',
        C: '#gtceu:circuits/mv' 
      })
    event.shaped('ae2:crafting_terminal', [
        'ADA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:screws/stainless_steel',
        B: '#forge:plates/stainless_steel',
        C: 'minecraft:crafting_table',
        D: 'ae2:terminal' 
      })
    event.shaped('ae2:wireless_booster', [
        'ADA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:plates/aluminium',
        B: '#forge:fine_wires/red_alloy',
        C: 'ae2:fluix_pearl',
        D: '#gtceu:circuits/ev'
      })

      event.shaped('ae2:wireless_receiver', [
        ' C ', 
        'BAB', 
        ' B '  
      ], {
        A: 'ae2:fluix_pearl',
        B: '#forge:plates/titanium',
        C: 'gtceu:ev_emitter'
      })

      event.shaped('ae2:chest', [
        'ABA', 
        'C C', 
        'DED'  
      ], {
        A: 'ae2:quartz_glass',
        B: 'ae2:terminal',
        C: '#ae2:glass_cable',
        D: '#forge:plates/aluminium',
        E: '#forge:fine_wires/copper'
      })

      event.shaped('ae2:import_bus', [
        '   ', 
        ' A ', 
        'BCB'  
      ], {
        A: 'ae2:annihilation_core',
        B: '#forge:plates/aluminium',
        C: 'gtceu:mv_electric_piston' 
      })

      event.shaped('ae2:export_bus', [
        '   ', 
        'BAB', 
        ' C '  
      ], {
        A: 'ae2:formation_core',
        B: '#forge:plates/aluminium',
        C: 'gtceu:mv_electric_piston' 
      })
    
      event.shaped('ae2:energy_level_emitter', [
        'AB', 
        'CD' 
      ], {
        A: 'minecraft:redstone_torch',
        B: '#forge:plates/certus_quartz',
        C: 'ae2:calculation_processor',
        D: '#forge:rods/stainless_steel'  
      })

      event.shaped('ae2:level_emitter', [
        'AB', 
        'CD' 
      ], {
        A: 'minecraft:redstone_torch',
        B: '#forge:plates/aluminium',
        C: 'ae2:calculation_processor',
        D: '#forge:rods/stainless_steel'  
      })

      event.shaped('8x ae2:blank_pattern', [
        'AAA', 
        'BCB',
        'BBB' 
      ], {
        A: '#forge:fine_wires/silver',
        B: '#forge:plates/polyethylene',
        C: '#gtceu:circuits/hv'
      })

      event.shaped('ae2:item_cell_housing', [
        'ABA', 
        'B B',
        'CCC' 
      ], {
        A: 'ae2:quartz_glass',
        B: '#forge:dusts/redstone',
        C: '#forge:plates/aluminium'
      })
      
      event.shaped('ae2:fluid_cell_housing', [
        'ABA', 
        'BCB',
        'DDD' 
      ], {
        A: 'ae2:quartz_glass',
        B: '#forge:dusts/redstone',
        C: 'gtceu:fluid_cell',
        D: '#forge:plates/aluminium'
      })

      event.shaped('ae2:view_cell', [
        'ABA', 
        'BCB',
        'DDD' 
      ], {
        A: 'ae2:quartz_glass',
        B: '#forge:dusts/redstone',
        C: '#gtceu:circuits/mv',
        D: '#forge:plates/aluminium'
      })

      event.shaped('2x ae2:basic_card', [
        'AB ', 
        'CDB',
        'AB ' 
      ], {
        A: '#forge:plates/gold',
        B: '#forge:plates/aluminium',
        C: '#forge:dusts/redstone',
        D: 'ae2:calculation_processor'
      })

      event.shaped('2x ae2:advanced_card', [
        'AB ', 
        'CDB',
        'AB ' 
      ], {
        A: '#forge:plates/diamond',
        B: '#forge:plates/aluminium',
        C: '#forge:dusts/redstone',
        D: 'ae2:calculation_processor'
      })

      event.shaped('ae2:storage_bus', [
        ' A ', 
        'BCB', 
        ' D '  
      ], {
        A: 'minecraft:sticky_piston',
        B: '#forge:plates/certus_quartz',
        C: '#ae2:interface',
        D: 'minecraft:piston'
      })

      event.shaped('ae2:cell_workbench', [
        'ABE', 
        'CDC', 
        'CCC'  
      ], {
        A: 'ae2:formation_core',
        B: 'ae2:calculation_processor',
        C: '#forge:plates/stainless_steel',
        D: '#forge:chests/wooden',
        E: 'ae2:annihilation_core'
      })

      event.shaped('ae2:io_port', [
        'AAA', 
        'BCB', 
        'DED'  
      ], {
        A: 'ae2:quartz_glass',
        B: 'ae2:drive',
        C: '#ae2:glass_cable',
        D: '#forge:plates/stainless_steel',
        E: 'ae2:logic_processor'
      })

      event.shaped('ae2:spatial_io_port', [
        'AAA', 
        'BCB', 
        'DED'  
      ], {
        A: 'ae2:quartz_glass',
        B: '#ae2:glass_cable',
        C: 'ae2:io_port',
        D: '#forge:plates/stainless_steel',
        E: 'ae2:engineering_processor'
      })

      event.shaped('ae2:condenser', [
        'ABA', 
        'BCB', 
        'ABA'  
      ], {
        A: '#forge:plates/titanium',
        B: 'gtceu:ev_electric_piston',
        C: 'gtceu:ev_machine_hull'
      })

      event.shaped('ae2:wireless_access_point', [
        ' A ', 
        'BCB', 
        ' D '  
      ], {
        A: 'ae2:wireless_receiver',
        B: '#forge:screws/titanium',
        C: 'ae2:calculation_processor',
        D: '#ae2:glass_cable'
      })

      event.shaped('ae2:spatial_pylon', [
        'ABA', 
        'CDC', 
        'ABA'  
      ], {
        A: 'forge:plates/titanium',
        B: '#ae2:glass_cable',
        C: '#forge:dusts/fluix',
        D: '#forge:gems/fluix'
      })

      event.shaped('ae2:formation_plane', [
        'AB', 
        'CB', 
        'AB'  
      ], {
        A: '#forge:plates/stainless_steel',
        B: '#forge:gems/fluix',
        C: 'ae2:formation_core'
      })

      event.shaped('ae2:formation_plane', [
        'BBB', 
        'ACA'  
      ], {
        A: '#forge:plates/stainless_steel',
        B: '#forge:gems/fluix',
        C: 'ae2:formation_core'
      })

      event.shaped('ae2:annihilation_plane', [
        'AB', 
        'CB', 
        'AB'  
      ], {
        A: '#forge:plates/stainless_steel',
        B: '#forge:gems/fluix',
        C: 'ae2:annihilation_core'
      })

      event.shaped('ae2:annihilation_plane', [
        'BBB', 
        'ACA'  
      ], {
        A: '#forge:plates/stainless_steel',
        B: '#forge:gems/fluix',
        C: 'ae2:annihilation_core'
      })

      event.shaped('ae2:color_applicator', [
        'AB ', 
        'BC ',
        '  D'    
      ], {
        A: 'ae2:formation_core',
        B: '#forge:rods/stainless_steel',
        C: 'ae2:cell_component_4k',
        D: 'ae2:energy_cell',
      })

      event.shaped('ae2:matter_cannon', [
        'AAB', 
        'CD ',
        'A  '    
      ], {
        A: '#forge:plates/stainless_steel',
        B: 'ae2:formation_core',
        C: 'ae2:cell_component_4k',
        D: 'ae2:energy_cell',
      })

      event.shaped('ae2:memory_card', [
        'ABB', 
        'CDC'   
      ], {
        A: 'ae2:calculation_processor',
        B: '#forge:plates/stainless_steel',
        C: '#forge:plates/gold',
        D: '#gtceu:circuits/hv'
      })

      event.shaped('ae2:spatial_anchor', [
        'AAA', 
        'BCB',
        'DED'   
      ], {
        A: 'ae2:spatial_pylon',
        B: '#ae2:glass_cable',
        C: 'ae2:spatial_cell_component_128',
        D: '#forge:plates/titanium',
        E: 'ae2:engineering_processor'
      })
      
      //Shapeless Crafting
      event.shapeless('ae2:item_storage_cell_1k', ['ae2:cell_component_1k', 'ae2:item_cell_housing'])
      event.shapeless('ae2:item_storage_cell_4k', ['ae2:cell_component_4k', 'ae2:item_cell_housing'])
      event.shapeless('ae2:item_storage_cell_16k', ['ae2:cell_component_16k', 'ae2:item_cell_housing'])
      event.shapeless('ae2:item_storage_cell_64k', ['ae2:cell_component_64k', 'ae2:item_cell_housing'])
      event.shapeless('ae2:item_storage_cell_256k', ['ae2:cell_component_256k', 'ae2:item_cell_housing'])

      event.shapeless('ae2:fluid_storage_cell_1k', ['ae2:cell_component_1k', 'ae2:fluid_cell_housing'])
      event.shapeless('ae2:fluid_storage_cell_4k', ['ae2:cell_component_4k', 'ae2:fluid_cell_housing'])
      event.shapeless('ae2:fluid_storage_cell_16k', ['ae2:cell_component_16k', 'ae2:fluid_cell_housing'])
      event.shapeless('ae2:fluid_storage_cell_64k', ['ae2:cell_component_64k', 'ae2:fluid_cell_housing'])
      event.shapeless('ae2:fluid_storage_cell_256k', ['ae2:cell_component_256k', 'ae2:fluid_cell_housing'])

      event.shapeless('ae2:spatial_storage_cell_2', ['ae2:spatial_cell_component_2', 'ae2:item_cell_housing'])
      event.shapeless('ae2:spatial_storage_cell_16', ['ae2:spatial_cell_component_16', 'ae2:item_cell_housing'])
      event.shapeless('ae2:spatial_storage_cell_128', ['ae2:spatial_cell_component_128', 'ae2:item_cell_housing'])

      event.shapeless('ae2:toggle_bus', ['ae2:inverted_toggle_bus'])
      event.shapeless('ae2:inverted_toggle_bus', ['ae2:toggle_bus'])

      event.shapeless('ae2:fluix_smart_cable', ['ae2:fluix_covered_cable', '#forge:dusts/redstone', '#forge:dusts/glowstone'])
      event.shapeless('ae2:fluix_smart_dense_cable', ['ae2:fluix_covered_dense_cable', '#forge:dusts/redstone', '#forge:dusts/glowstone'])
      event.shapeless('ae2:fluix_smart_dense_cable', ['4x ae2:fluix_smart_cable'])

      event.shapeless('ae2:fuzzy_card', ['ae2:advanced_card', 'ae2:logic_processor', 'ae2:engineering_processor', 'ae2:calculation_processor'])
      event.shapeless('ae2:speed_card', ['ae2:advanced_card', 'ae2:logic_processor', 'ae2:engineering_processor', '#forge:gems/fluix'])
      event.shapeless('ae2:redstone_card', ['ae2:basic_card', 'ae2:calculation_processor', 'minecraft:redstone_torch'])
      event.shapeless('ae2:inverter_card', ['ae2:advanced_card', 'ae2:calculation_processor', 'minecraft:redstone_torch'])
      event.shapeless('ae2:capacity_card', ['ae2:basic_card', '#forge:plates/certus_quartz', 'ae2:cell_component_1k'])
      event.shapeless('ae2:crafting_card', ['ae2:basic_card', 'minecraft:crafting_table', 'ae2:cell_component_1k'])
      event.shapeless('ae2:equal_distribution_card', ['ae2:advanced_card', '#gtceu:circuits/hv', 'ae2:calculation_processor'])
      event.shapeless('ae2:void_card', ['ae2:basic_card', '#gtceu:circuits/hv', 'ae2:calculation_processor'])

      event.shapeless('ae2:cable_pattern_provider', ['ae2:pattern_provider'])
      event.shapeless('ae2:pattern_provider', ['ae2:cable_pattern_provider'])

})