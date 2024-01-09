
//Takes list of thermal and create materials that exist in gregtech and ore-dict them, followed by removing the ability to make the thermal version for any recipe
const thermalMaterials = ['tin', 'lead', 'silver', 'bronze', 'nickel', 'invar', 'electrum']
const createMaterials = ['zinc', 'brass']


ServerEvents.recipes(event => {
for (let i = 0; i < thermalMaterials.length; i++) {
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_ingot'}, 'thermal:' + thermalMaterials[i] + '_ingot' ,'#forge:ingots/' + thermalMaterials[i])
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_nugget'}, 'thermal:' + thermalMaterials[i] + '_nugget' ,'#forge:nuggets/' + thermalMaterials[i])
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_block'}, 'thermal:' + thermalMaterials[i] + '_block' ,'#forge:storage_blocks/' + thermalMaterials[i])
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_dust'}, 'thermal:' + thermalMaterials[i] + '_dust' ,'#forge:dusts/' + thermalMaterials[i])
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_gear'}, 'thermal:' + thermalMaterials[i] + '_gear' ,'#forge:gears/' + thermalMaterials[i])
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_plate'}, 'thermal:' + thermalMaterials[i] + '_plate' ,'#forge:plates/' + thermalMaterials[i])
    event.replaceInput({ input:'thermal:' + thermalMaterials[i] + '_coin'}, 'thermal:' + thermalMaterials[i] + '_coin' ,'#forge:coins/' + thermalMaterials[i])
    event.remove({ output: 'thermal:' + thermalMaterials[i] + '_ingot'})
    event.remove({ output: 'thermal:' + thermalMaterials[i] + '_nugget'})
    event.remove({ output: 'thermal:' + thermalMaterials[i] + '_block'})
    event.remove({ output: 'thermal:' + thermalMaterials[i] + '_dust'})
    event.remove({ output: 'thermal:' + thermalMaterials[i] + '_gear'})
    event.remove({ output: 'thermal:' + thermalMaterials[i] + '_plate'})
    }


for (let i = 0; i < createMaterials.length; i++) {
    event.replaceInput({ input:'create:' + createMaterials[i] + '_ingot'}, 'create:' + createMaterials[i] + '_ingot' ,'#forge:ingots/' + createMaterials[i])
    event.remove({ output: 'create:' + createMaterials[i] + '_ingot'})
}

event.replaceInput({ input:'create:brass_sheet'}, 'create:brass_sheet' ,'#forge:plates/brass')
event.replaceInput({ input:'create:brass_nugget'}, 'create:brass_nugget' ,'#forge:nuggets/brass')
event.replaceInput({ input:'createadditions:brass_rod'}, 'createadditions:brass_rod' ,'#forge:rods/brass')
event.remove({ output: 'create:brass_sheet'})
event.remove({ output: 'create:brass_nugget'})
event.remove({ output: 'create:brass_nugget'})

})


