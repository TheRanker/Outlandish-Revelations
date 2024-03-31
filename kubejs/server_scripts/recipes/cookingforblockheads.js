
ServerEvents.recipes(event => {

event.remove('cookingforblockheads:oven')
event.shaped('cookingforblockheads:oven', [
    'ggg',
    'ifi',
    'iii'
], {
    g:'#forge:glass/colorless',
    i:'gtceu:magnetic_iron_plate',
    f:'farmersdelight:stove'
})

event.remove('cookingforblockheads:toaster')
event.shaped('cookingforblockheads:toaster', [
    '  b',
    'iti',
    'iii'
], {
    i:'gtceu:magnetic_iron_plate',
    b:'minecraft:iron_trapdoor',
    t:'cookingforblockheads:heating_unit'
})

event.remove('cookingforblockheads:fridge')
event.shaped('cookingforblockheads:fridge', [
    'pxp',
    'pcp',
    'pxp'
], {
    p:'gtceu:magnetic_iron_plate',
    x:'minecraft:iron_door',
    c:'#forge:chests'
})

event.remove('cookingforblockheads:sink')
event.shaped('cookingforblockheads:sink', [
    'iii',
    'tbt',
    'ttt'
], {
    i:'gtceu:magnetic_iron_plate',
    t:'#minecraft:terracotta',
    b:'gtceu:primitive_pump'
})

event.remove('cookingforblockheads:ice_unit')
event.shaped('cookingforblockheads:ice_unit', [
    '   ',
    'sss',
    'iri'
], {
    s:'minecraft:packed_ice',
    i:'gtceu:magnetic_iron_plate',
    r:'minecraft:comparator'
    })

event.remove('cookingforblockheads:preservation_chamber')
event.shaped('cookingforblockheads:preservation_chamber', [
    '   ',
    'sss',
    'iri'
], {
    s:'gtceu:impure_redstone_dust',
    i:'gtceu:magnetic_iron_plate',
    r:'minecraft:comparator'
    })

event.remove('cookingforblockheads:heating_unit')
    event.shaped('cookingforblockheads:heating_unit', [
    '   ',
    'sss',
    'iri'
], {
    s:'gtceu:magnetic_iron_nugget',
    i:'gtceu:magnetic_iron_plate',
    r:'minecraft:comparator'
    })
})