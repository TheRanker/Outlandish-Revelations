//Server Script
let juices = ['pamhc2foodextended:pawpawjuiceitem', 'pamhc2foodextended:soursopjuiceitem', 'pamhc2foodextended:apricotjuiceitem', 'pamhc2foodextended:bananajuiceitem', 'pamhc2foodextended:datejuiceitem', 'pamhc2foodextended:dragonfruitjuiceitem', 'pamhc2foodextended:figjuiceitem', 'pamhc2foodextended:grapefruitjuiceitem', 'pamhc2foodextended:mangojuiceitem', 'pamhc2foodcore:applejuiceitem', 'pamhc2foodcore:melonjuiceitem', 'pamhc2foodcore:sweetberryjuiceitem', 'pamhc2foodcore:glowberryjuiceitem', 'pamhc2foodcore:p8juiceitem', 'pamhc2foodextended:carrotjuiceitem', 'pamhc2foodextended:blackberryjuiceitem', 'pamhc2foodextended:blueberryjuiceitem', 'pamhc2foodextended:cactusfruitjuiceitem', 'pamhc2foodextended:candleberryjuiceitem', 'pamhc2foodextended:cranberryjuiceitem', 'pamhc2foodextended:elderberryjuiceitem', 'pamhc2foodextended:huckleberryjuiceitem', 'pamhc2foodextended:juniperberryjuiceitem', 'pamhc2foodextended:mulberryjuiceitem', 'pamhc2foodextended:raspberryjuiceitem', 'pamhc2foodextended:strawberryjuiceitem', 'pamhc2foodextended:cantaloupejuiceitem', 'pamhc2foodextended:grapejuiceitem', 'pamhc2foodextended:greengrapejuiceitem', 'pamhc2foodextended:kiwijuiceitem', 'pamhc2foodextended:pineapplejuiceitem', 'pamhc2foodextended:cherryjuiceitem', 'pamhc2foodextended:orangejuiceitem', 'pamhc2foodextended:peachjuiceitem', 'pamhc2foodextended:pearjuiceitem', 'pamhc2foodextended:plumjuiceitem', 'pamhc2foodextended:papayajuiceitem', 'pamhc2foodextended:persimmonjuiceitem', 'pamhc2foodextended:pomegranatejuiceitem', 'pamhc2foodextended:starfruitjuiceitem', 'pamhc2foodextended:breadfruitjuiceitem', 'pamhc2foodextended:jackfruitjuiceitem', 'pamhc2foodextended:guavajuiceitem', 'pamhc2foodextended:lycheejuiceitem', 'pamhc2foodextended:passionfruitjuiceitem', 'pamhc2foodextended:rambutanjuiceitem', 'pamhc2foodextended:tamarindjuiceitem', 'pamhc2foodextended:gooseberryjuiceitem', 'pamhc2foodextended:durianjuiceitem', 'pamhc2foodextended:lemonjuiceitem', 'pamhc2foodextended:limejuiceitem']
  
ServerEvents.recipes(event => {
  
  juices.forEach(juice => {
    event.remove({output: juice})
    let name = juice.split(":")[1]
    let fluid_name = name.replace("item", "_fluid")
    let clear_name = juice.split(":")[1].replace("item", "").split("juice")[0]
    //Press fruits into fluids
    event.custom({
      "type": "create:compacting",
      "ingredients": [
        {
         "tag": `forge:fruits/${clear_name}`
        }
      ],
      "results": [
        {
          "amount": 50,
          "fluid": `kubejs:${fluid_name}`,
          "nbt": {}
        }
      ]
    })
    //Fill fluids into bottles
    event.custom({
      "type": "create:filling",
      "ingredients": [
        {
          "item": "minecraft:glass_bottle"
        },
        {
          "amount": 250,
          "fluid": `kubejs:${fluid_name}`
        }
      ],
      "results": [
        {
          "item": juice
        }
      ]
    })
  })
})
juices.forEach(juice => {
  ItemEvents.foodEaten(juice, event => {
    event.player.giveInHand('minecraft:glass_bottle')
  })
})