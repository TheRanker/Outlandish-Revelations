StartupEvents.registry('block', event => {

	event.create('charred_grass').displayName('Charred Grass')
		.soundType('rooted_dirt')
		.hardness(0.8)
		.tagBlock('minecraft:mineable/shovel') 
		.requiresTool(false)

	event.create('charred_dirt').displayName('Charred Dirt')
		.soundType('rooted_dirt')
		.hardness(0.8)
		.tagBlock('minecraft:mineable/shovel') 
		.requiresTool(false)

	event.create('exploding_block').displayName('Exploding Block')
		.soundType('rooted_dirt')
		.hardness(0.8)
		.tagBlock('minecraft:mineable/shovel') 
		.requiresTool(false)

	event.create('charred_stone').displayName('Charred Stone')
		.soundType('stone')
		.hardness(1)
		.tagBlock('minecraft:mineable/pickaxe') 
		.requiresTool(true)

	event.create('charred_earth').displayName('Charred Earth')
		.soundType('rooted_dirt')
		.hardness(0.7)
		.tagBlock('minecraft:mineable/shovel') 
		.requiresTool(false)

})