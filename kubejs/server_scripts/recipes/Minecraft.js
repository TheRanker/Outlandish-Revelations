ServerEvents.recipes(event => {
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
 })