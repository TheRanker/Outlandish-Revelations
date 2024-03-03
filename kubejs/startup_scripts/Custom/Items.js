StartupEvents.registry('item', e => {
    function make_bag(bagName, displayName, texture, rarity, glow){
            e.create(bagName)
            .displayName(displayName)
            .texture(texture)
            .rarity(rarity)
            .glow(glow)
        }   
          
    for (let i = 0; i < global.pouch_name.length; i++) {
        make_bag(`${global.bag_name[i]}_bag_common`, global.pouch_name[i], global.pouch_color_map[global.pouch_color[i]], global.rarity[0], false)
        make_bag(`${global.bag_name[i]}_bag_rare`, global.pouch_name[i], global.pouch_color_map[global.pouch_color[i]], global.rarity[1], false)
        make_bag(`${global.bag_name[i]}_bag_epic`, global.pouch_name[i], global.pouch_color_map[global.pouch_color[i]], global.rarity[2], true)
    }
e.create('ancient_tempura').displayName('§a§lAncient Tempura').food(food => {
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
		
e.create('rankers_ring')
        .displayName('§6Ring of Ranker')

e.create('lockpick')
	.displayName('Lock-Pick')
	.maxDamage(50)
	.rarity("rare")
	.maxStackSize(32)

e.create('rankers_sword', 'sword')
	.tier('netherite')
	.attackDamageBaseline(17.5)
	.displayName('§6Tears for Fears')
	.speedBaseline(5)
	.maxDamage(0)
	.glow(true)

})

ItemEvents.modification(event => {
	event.modify("kubejs:rankers_ring", item => { 
		item.maxStackSize = 1 
		item.fireResistant = true
		item.rarity = "EPIC"
	})
	event.modify("minecraft:potion", item => { item.setMaxStackSize(16) })
	event.modify("minecraft:splash_potion", item => { item.setMaxStackSize(16) })
	event.modify("kubejs:rankers_sword", item => { 
		item.maxStackSize = 1 
		item.fireResistant = true
		item.rarity = "EPIC"
	})
})