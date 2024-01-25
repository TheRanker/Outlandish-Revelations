ItemEvents.tooltip(tooltip => {
	// description on bags  
    function add_color_description(itemName, rarity, color) {
        tooltip.add(itemName, Text.of(rarity)[color]())
    }

    for (let i = 0; i < global.bag_name.length; i++) { 
        add_color_description(`kubejs:${global.bag_name[i]}_bag_${global.rarity[0]}`, 'Common', global.rarity_color.common)
        add_color_description(`kubejs:${global.bag_name[i]}_bag_${global.rarity[1]}`, 'Rare', global.rarity_color.rare)
        add_color_description(`kubejs:${global.bag_name[i]}_bag_${global.rarity[2]}`, 'Epic', global.rarity_color.epic);
      }

    let backpackMessage = Text.yellow('You can have only one backpack in the inventory!')
    let backpacks = ['sophisticatedbackpacks:backpack', 'sophisticatedbackpacks:iron_backpack', 'sophisticatedbackpacks:gold_backpack', 'sophisticatedbackpacks:diamond_backpack', 'sophisticatedbackpacks:netherite_backpack']
    backpacks.forEach(backpack => {
        tooltip.add(backpack, [backpackMessage])
    })

    let tomeMessage = Text.yellow('Reset with a left click on the air!')
    tooltip.add('akashictome:tome', [tomeMessage])
})