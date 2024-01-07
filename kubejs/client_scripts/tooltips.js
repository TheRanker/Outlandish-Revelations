ItemEvents.tooltip(tooltip => {
	// description on bags
    function add_color_description(itemName, rarity, color) {
        tooltip.add(itemName, Text.of(rarity)[color]())
    }

    for (let i = 0; i < bag_name.length; i++) { 
        add_color_description(`kubejs:${bag_name[i]}_bag_${rarity[0]}`, 'Common', rarity_color.common)
        add_color_description(`kubejs:${bag_name[i]}_bag_${rarity[1]}`, 'Rare', rarity_color.rare)
        add_color_description(`kubejs:${bag_name[i]}_bag_${rarity[2]}`, 'Epic', rarity_color.epic);
      }
})