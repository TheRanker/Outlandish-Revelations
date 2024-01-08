StartupEvents.registry('item', event => {

    function make_bag(bagName, displayName, texture, rarity, glow){
        event.create(bagName)
        .displayName(displayName)
        .texture(texture)
        .rarity(rarity)
        .glow(glow)
    }   
      
    for (let i = 0; i < pouch_name.length; i++) {
        make_bag(`${bag_name[i]}_bag_common`, pouch_name[i], pouch_color_map[pouch_color[i]], rarity[0], false)
        make_bag(`${bag_name[i]}_bag_rare`, pouch_name[i], pouch_color_map[pouch_color[i]], rarity[1], false)
        make_bag(`${bag_name[i]}_bag_epic`, pouch_name[i], pouch_color_map[pouch_color[i]], rarity[2], true)
    }

	event.create('ancient_tempura').displayName('§a§lAncient Tempura').food(food => {
		food
			.hunger(10)
			.saturation(.6)
			.effect('minecraft:regeneration', 1800, 1, 1)
			.effect('minecraft:strength', 1800, 2, 1)
			.removeEffect('poison')
			.alwaysEdible()
			.meat()
		    .eaten(ctx => {
				ctx.player.tell(Text.gold('Now THATS Ancient Tempura!'))
			})
		})
		
    event.create('rankers_ring')
        .displayName('§6Ring of Ranker')

})

ItemEvents.modification(event => {
	event.modify("kubejs:rankers_ring", item => { 
		item.maxStackSize = 1 
		item.fireResistant = true
		item.rarity = "EPIC"
	})
	event.modify("minecraft:potion", item => { item.setMaxStackSize(16) })
	event.modify("minecraft:splash_potion", item => { item.setMaxStackSize(16) })
})