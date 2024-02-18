ServerEvents.recipes(event => {
    const creatRemove = ['crushed_raw_iron', 'crushed_raw_gold', 'crushed_raw_copper', 'crushed_raw_zinc', 'crushed_raw_platinum', 'crushed_raw_silver', 'crushed_raw_tin', 'crushed_raw_lead', 'crushed_raw_nickel']
    const rawMaterials = ['iron', 'gold', 'copper', 'silver', 'tin', 'lead', 'zinc', 'nickel']
    for (let i = 0; i < creatRemove.length; i++) {
        event.remove({ output: 'create:' + creatRemove[i] })
    }

    for (let i = 0; i < rawMaterials.length; i++) {
        event.recipes.create.crushing('gtceu:' + rawMaterials[i] + '_dust', '#forge:raw_materials/' + rawMaterials[i])
    }

    event.recipes.createSequencedAssembly([
        Item.of('create:precision_mechanism').withChance(120.0),
        Item.of('#forge:plates/gold').withChance(8.0),
        Item.of('create:andesite_alloy').withChance(8.0),
        Item.of('create:cogwheel').withChance(5.0),
        Item.of('minecraft:gold_nugget').withChance(3.0),
        Item.of('create:shaft').withChance(2.0),
        Item.of('gtceu:crushed_gold_ore').withChance(2.0),
        Item.of('minecraft:iron_ingot').withChance(1.5),
        Item.of('minecraft:clock').withChance(0.7)
    ], '#forge:plates/gold', [
        event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:cogwheel']),
        event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', 'create:large_cogwheel']),
        event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', '#forge:nuggets/iron'])
    ]).transitionalItem('create:incomplete_precision_mechanism').loops(5).id('create:sequenced_assembly/precision_mechanism')
})