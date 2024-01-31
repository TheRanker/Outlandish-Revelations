ServerEvents.recipes(event => {

    //Minecraft
    event.shaped('minecraft:hay_block', [
    'AAA', 
    'AAA', 
    'AAA'  
  ], {
    A: 'minecraft:wheat'   
  });

    event.shaped('minecraft:bamboo_raft', [
    'ABA', 
    'ACA', 
    'DDD'  
  ], {

    A: 'minecraft:bamboo_planks',
    B: 'minecraft:wooden_shovel',
    C: '#forge:tools/knives',
    D: 'minecraft:bamboo_slab'   
  }).id('gtceu:shaped/bamboo_raft');


 //LockPick
 event.shaped('kubejs:lockpick', [
        '  a',
        ' a ',
        'b c'
    ], {
        a:'#forge:stone',
        b:'#forge:gems/flint',
        c:'#forge:tools/files'
 }).id('kubejs:shaped/lockpick')


  //Advanced Peripherals
  event.remove('advancedperipherals:geo_scanner')
    event.shaped('advancedperipherals:geo_scanner', [
        'DMD', 
        'DCD', 
        'ROR'  
      ], {
        D: '#forge:gems/diamond', 
        C: 'advancedperipherals:peripheral_casing', 
        R: 'gtceu:aluminium_single_wire',
        O: 'minecraft:observer',
        M: 'computercraft:wired_modem_full'
      })
    
    event.remove('advancedperipherals:block_reader')
    event.shaped('advancedperipherals:block_reader', [
        'IRI',
        'MAO',
        'IRI'
    ], {
        I:'#forge:ingots/iron',
        R:'gtceu:aluminium_single_wire',
        M:'computercraft:wired_modem_full',
        A:'advancedperipherals:peripheral_casing',
        O:'minecraft:observer'
    })

    event.remove('advancedperipherals:redstone_integrator')
    event.shaped('advancedperipherals:redstone_integrator', [
        'RCR',
        'CAC',
        'RCR'
    ], {
        R:'gtceu:aluminium_single_wire',
        C:'minecraft:comparator',
        A:'advancedperipherals:peripheral_casing'
    })
    
    event.remove('advancedperipherals:player_detector')

    event.shaped('advancedperipherals:player_detector', [
        'SSS',
        'SAS',
        'SRS'
    ], {
        S:'minecraft:smooth_stone',
        A:'advancedperipherals:eripheral_casing',
        R:'gtceu:aluminium_single_wire'
    })

    event.remove('advancedperipherals:peripheral_casing')
    event.shaped('advancedperipherals:peripheral_casing', [
        'IiI',
        'iRi',
        'IiI'
    ], {
        I:'#forge:ingots/iron',
        i:'minecraft:iron_bars',
        R:'gtceu:aluminium_single_wire'
    })

    event.remove('advancedperipherals:weak_automata_core')
    event.shaped('advancedperipherals:weak_automata_core', [
        'rar',
        'dsd',
        'rlr'
    ], {
        r:'gtceu:aluminium_single_wire',
        a:'advancedperipherals:peripheral_casing',
        d:'#forge:gems/diamond',
        l: Item.of('minecraft:potion', '{Potion:"minecraft:regeneration"}'),
        s:'minecraft:soul_lantern'
    })
    
    event.remove('advancedperipherals:energy_detector')
    event.shaped('advancedperipherals:energy_detector', [
        'brb',
        'cac',
        'bgb'
    ], {
        r:'minecraft:red_torch',
        b:'gtceu:aluminium_single_wire',
        c:'minecraft:comparator',
        a:'advancedperipherals:peripheral_casing',
        g:'#forge:ingots/gold'
    })

    event.remove('advancedperipherals:nbt_storage')
    event.shaped('advancedperipherals:nbt_storage', [
        'ici',
        'cac',
        'rcr'
    ], {
        i:'#forge:ingots/iron',
        c:'#forge:chests',
        a:'minecraft:comparator',
        r:'gtceu:aluminium_single_wire'
    })

    //Jacks Economy
    event.shaped('jackseconomy:advanced_wallet', [
        'ABA', 
        'BCB', 
        'ABA'  
    
      ], {
        A: 'jackseconomy:fifty_dollar_bill', 
        B: 'minecraft:leather', 
        C: 'jackseconomy:intermediate_wallet'   
      })
    

    event.shaped('jackseconomy:intermediate_wallet', [
        'ABA', 
        'BCB', 
        'ABA'  
      ], {
    
        A: 'jackseconomy:ten_dollar_bill', 
        B: 'minecraft:leather', 
        C: 'jackseconomy:basic_wallet'   
      })
    

    event.shaped('jackseconomy:the_phat_wallet', [
        'ABA', 
        'BCB', 
        'ABA'  
      ], {
        A: 'jackseconomy:thousand_dollar_bill', 
        B: 'minecraft:leather', 
        C: 'jackseconomy:advanced_wallet'   
      })
})