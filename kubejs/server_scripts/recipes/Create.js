ServerEvents.recipes(event => {
    const creatRemove = ['crushed_raw_iron', 'crushed_raw_gold', 'crushed_raw_copper', 'crushed_raw_zinc', 'crushed_raw_platinum', 'crushed_raw_silver', 'crushed_raw_tin', 'crushed_raw_lead', 'crushed_raw_lead']
    const rawMaterials = ['iron', 'gold', 'copper', 'silver', 'tin', 'lead', 'zinc', 'nickel']
    for (let i = 0; i < creatRemove.length; i++) {
        event.remove({ output: 'create:' + creatRemove[i] })
    }

    for (let i = 0; i < rawMaterials.length; i++) {
        event.recipes.create.crushing('gtceu:' + rawMaterials[i] + '_dust', '#forge:raw_materials/' + rawMaterials[i])
    }
})