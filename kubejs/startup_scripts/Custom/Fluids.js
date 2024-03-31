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
        event.modify(juice, item => {
            item.foodProperties = food => {
                food.fastToEat(true)
            }
        })
    })
})

  