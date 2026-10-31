// Outlandish Revelations: custom content.
// priority: 10
(function () {

StartupEvents.registry('item', e => {
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
;
StartupEvents.registry('item', event => {

    function materialBuilder(material, hexColor){
      event.create(material + '_ore_clump').texture('kubejs:item/ore_clump').color(hexColor)
      event.create(material + '_ore_cluster').texture('kubejs:item/ore_cluster').color(hexColor)
      event.create(material + '_ore_crystal').texture('kubejs:item/ore_crystal').color(hexColor)
      event.create(material + '_ore_shard').texture('kubejs:item/ore_shard').color(hexColor)
    }

    materialBuilder('almandine', 0xa21717)
    materialBuilder('asbestos', 0xE6E6E6)
    materialBuilder('hematite', 0xff7161)
    materialBuilder('blue_topaz', 0xdbfeff)
    materialBuilder('goethite', 0x97873a)
    materialBuilder('calcite', 0xfffef8)
    materialBuilder('cassiterite', 0x89847e)
    materialBuilder('chalcopyrite', 0x96c185)
    materialBuilder('chromite', 0xc5c1a8)
    materialBuilder('cinnabar', 0xff335f)
    materialBuilder('coal', 0x393e41)
    materialBuilder('cobaltite', 0x1975ff)
    materialBuilder('cooperite', 0xe9ffa7)
    materialBuilder('diamond', 0xC8FFFF)
    materialBuilder('emerald', 0x17ff6c)
    materialBuilder('galena', 0x393e41)
    materialBuilder('garnierite', 0x32c880)
    materialBuilder('green_sapphire', 0x9ae6b0)
    materialBuilder('grossular', 0xffb777)
    materialBuilder('ilmenite', 0x2b2a24)
    materialBuilder('bauxite', 0xcfb853)
    materialBuilder('lazurite', 0x2836f1)
    materialBuilder('magnesite', 0xfbfbf6)
    materialBuilder('magnetite', 0xe3ddc3)
    materialBuilder('powellite', 0xd8cfac)
    materialBuilder('pyrite', 0xfffee6)
    materialBuilder('pyrolusite', 0xc7b5ab)
    materialBuilder('rock_salt', 0xd72310)
    materialBuilder('salt', 0xFAFAFA)
    materialBuilder('saltpeter', 0xE6E6E6)
    materialBuilder('sapphire', 0x3235e3)
    materialBuilder('scheelite', 0xd7e8b3)
    materialBuilder('sodalite', 0x3d54ff)
    materialBuilder('tantalite', 0x4e6b94)
    materialBuilder('spessartine', 0xffa81e)
    materialBuilder('sphalerite', 0xffdc88)
    materialBuilder('stibnite', 0x656565)
    materialBuilder('tetrahedrite', 0xa3a09b)
    materialBuilder('topaz', 0xe8d73a)
    materialBuilder('tungstate', 0xe0ffc4)
    materialBuilder('uraninite', 0xffd52e)
    materialBuilder('wulfenite', 0xff9000)
    materialBuilder('yellow_limonite', 0xf5e315)
    materialBuilder('nether_quartz', 0xf8efe3)
    materialBuilder('certus_quartz', 0xc2d6ff)
    materialBuilder('quartzite', 0xf2f5ed)
    materialBuilder('graphite', 0xa8a89e)
    materialBuilder('bornite', 0xffe05a)
    materialBuilder('chalcocite', 0x657882)
    materialBuilder('realgar', 0xff3d33)
    materialBuilder('bastnasite', 0xcaab60)
    materialBuilder('pentlandite', 0xe3cf13)
    materialBuilder('spodumene', 0xffbcbc)
    materialBuilder('lepidolite', 0xffdae4)
    materialBuilder('malachite', 0xecfeff)
    materialBuilder('barite', 0xe8e2d1)
    materialBuilder('alunite', 0xfbd677)
    materialBuilder('talc', 0xebffe9)
    materialBuilder('soapstone', 0x5a7261)
    materialBuilder('kyanite', 0xd5ffff)
    materialBuilder('pyrochlore', 0x5b4838)
    materialBuilder('oilsands', 0xe3c78a)
    materialBuilder('olivine', 0xa7e404)
    materialBuilder('opal', 0xf9e3ea)
    materialBuilder('amethyst', 0xcfa0f3)
    materialBuilder('lapis', 0x85a9ff)
    materialBuilder('apatite', 0x06cdf1)
    materialBuilder('tricalcium_phosphate', 0xfffddb)
    materialBuilder('red_garnet', 0x950c15)
    materialBuilder('yellow_garnet', 0xf6ff09)
    materialBuilder('vanadium_magnetite', 0x8a94a2)
    materialBuilder('pollucite', 0xeed9e1)
    materialBuilder('bentonite', 0xede8a3)
    materialBuilder('fullers_earth', 0xf3efbb)
    materialBuilder('pitchblende', 0xffd647)
    materialBuilder('monazite', 0xd0ee98)
    materialBuilder('trona', 0xe7e7b4)
    materialBuilder('gypsum', 0xfffaec)
    materialBuilder('zeolite', 0xf2e3e0)
    materialBuilder('redstone', 0xff0000)
    materialBuilder('electrotine', 0x83cbf5)
    materialBuilder('diatomite', 0xfffafa)
    materialBuilder('aluminium', 0xb6e5ff)
    materialBuilder('beryllium', 0x98d677)
    materialBuilder('cobalt', 0xf1e2d1)
    materialBuilder('copper', 0xe77c56)
    materialBuilder('gold', 0xfdf55f)
    materialBuilder('iron', 0xeeeeee)
    materialBuilder('lead', 0x7e6f82)
    materialBuilder('lithium', 0xd7e7ee)
    materialBuilder('molybdenum', 0xc1c1ce)
    materialBuilder('neodymium', 0x9a8b94)
    materialBuilder('nickel', 0xccdff5)
    materialBuilder('palladium', 0xA0A0A0)
    materialBuilder('platinum', 0xfff9da)
    materialBuilder('plutonium', 0xba2727)
    materialBuilder('silver', 0xDCDCFF)
    materialBuilder('sulfur', 0xfdff31)
    materialBuilder('thorium', 0x323528)
    materialBuilder('tin', 0xfafeff)
    materialBuilder('naquadah', 0x323232)
  })

;
let juices = ['pamhc2foodextended:pawpawjuiceitem', 'pamhc2foodextended:soursopjuiceitem', 'pamhc2foodextended:apricotjuiceitem', 'pamhc2foodextended:bananajuiceitem', 'pamhc2foodextended:datejuiceitem', 'pamhc2foodextended:dragonfruitjuiceitem', 'pamhc2foodextended:figjuiceitem', 'pamhc2foodextended:grapefruitjuiceitem', 'pamhc2foodextended:mangojuiceitem', 'pamhc2foodcore:applejuiceitem', 'pamhc2foodcore:melonjuiceitem', 'pamhc2foodcore:sweetberryjuiceitem', 'pamhc2foodcore:glowberryjuiceitem', 'pamhc2foodcore:p8juiceitem', 'pamhc2foodextended:carrotjuiceitem', 'pamhc2foodextended:blackberryjuiceitem', 'pamhc2foodextended:blueberryjuiceitem', 'pamhc2foodextended:cactusfruitjuiceitem', 'pamhc2foodextended:candleberryjuiceitem', 'pamhc2foodextended:cranberryjuiceitem', 'pamhc2foodextended:elderberryjuiceitem', 'pamhc2foodextended:huckleberryjuiceitem', 'pamhc2foodextended:juniperberryjuiceitem', 'pamhc2foodextended:mulberryjuiceitem', 'pamhc2foodextended:raspberryjuiceitem', 'pamhc2foodextended:strawberryjuiceitem', 'pamhc2foodextended:cantaloupejuiceitem', 'pamhc2foodextended:grapejuiceitem', 'pamhc2foodextended:greengrapejuiceitem', 'pamhc2foodextended:kiwijuiceitem', 'pamhc2foodextended:pineapplejuiceitem', 'pamhc2foodextended:cherryjuiceitem', 'pamhc2foodextended:orangejuiceitem', 'pamhc2foodextended:peachjuiceitem', 'pamhc2foodextended:pearjuiceitem', 'pamhc2foodextended:plumjuiceitem', 'pamhc2foodextended:papayajuiceitem', 'pamhc2foodextended:persimmonjuiceitem', 'pamhc2foodextended:pomegranatejuiceitem', 'pamhc2foodextended:starfruitjuiceitem', 'pamhc2foodextended:breadfruitjuiceitem', 'pamhc2foodextended:jackfruitjuiceitem', 'pamhc2foodextended:guavajuiceitem', 'pamhc2foodextended:lycheejuiceitem', 'pamhc2foodextended:passionfruitjuiceitem', 'pamhc2foodextended:rambutanjuiceitem', 'pamhc2foodextended:tamarindjuiceitem', 'pamhc2foodextended:gooseberryjuiceitem', 'pamhc2foodextended:durianjuiceitem', 'pamhc2foodextended:lemonjuiceitem', 'pamhc2foodextended:limejuiceitem']

StartupEvents.registry('fluid', event => {
    let juice_colors = ['74b558', '54954a', 'e8af6b', 'a3aa25', '99405f', 'c13a20', 'bd8bd8', 'd18533', 'da7b7b', 'c7b540', 'e35849', 'a50700', 'f5c05e', 'a00505', 'ff8619', '592a2a', '1d3459', 'bc112e', '1b511f', 'aa1d1d', '3a2348', '271a3b', '243987', '511f1b', 'a63749', 'c41a1a', '7d5e2c', '9622a0', '3d7a31', 'abe05d', '6e5f15', '911600', 'f29a3b', 'd29c78', 'adbf5a', 'c260ca', 'dbae72', 'ee9521', 'a03d3d', 'c0ed6c', '629540', '578a37', '568734', 'bc1d1d', '3a314e', '9d492e', '64552d', 'eeca00', '6b971a', 'e5c646', '76d378']
    var i = 0;
    juices.forEach(juice => {
        let name = juice.split(":")[1]
        let fluid_name = name.replace("item", "_fluid")
        let clear_name = juice.split(":")[1].replace("item", "").split("juice")[0]
        let color = "0x" + juice_colors[i]
        i += 1
        event.create(fluid_name)
        .displayName(clear_name.charAt(0).toUpperCase() + clear_name.slice(1) + " Juice")
        .thinTexture(parseInt(color))
        .bucketColor(parseInt(color))
        .noBlock()
    })

    event.create('blazing_pyrotheum')
        .displayName("Blazing Pyrotheum")
        .stillTexture('kubejs:block/pyrotheum_still')
        .flowingTexture('kubejs:block/pyrotheum_flow')
        .bucketColor(0xfe983d)
    event.create('resonant_ender')
        .displayName("Resonant Ender")
        .stillTexture('kubejs:block/ender_still')
        .flowingTexture('kubejs:block/ender_flow')
        .bucketColor(0x071B3D)
    event.create('gelid_cryotheum')
        .displayName("Gelid Cryotheum")
        .stillTexture('kubejs:block/ender_still')
        .flowingTexture('kubejs:block/ender_flow')
        .bucketColor(0x071B3D)
})

ItemEvents.modification(event => {
    juices.forEach( juice => {
        if (!Item.exists(juice)) return;
        event.modify(juice, item => {
            item.setFoodProperties(food => {
                food.fastToEat(true)
            })
        })
    })
})

})();
