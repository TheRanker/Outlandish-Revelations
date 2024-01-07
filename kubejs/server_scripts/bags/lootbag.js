//open bag when rightClicked
ItemEvents.rightClicked(event=>{
    function lootbag(lootbag,lootable){
        if(event.item == lootbag){
            let x = event.player.x
            let y = event.player.y
            let z = event.player.z
            event.server.runCommandSilent(`execute in ${event.level.dimension} run loot spawn ${event.player.x} ${event.player.y} ${event.player.z} loot ${lootable}`) 
            event.server.runCommandSilent(`playsound minecraft:entity.experience_orb.pickup player @a ${x} ${y} ${z} 1 1`)
            
            // in creative dont use bag
            if(!event.player.isCreative()){event.item.count--} 
        }
    }
    //use vanilla loot table for every type of bags
    for (let i = 0; i < bag_name.length; i++) {
        lootbag(`kubejs:${bag_name[i]}_bag_common`,`loot:${bag_name[i]}/${bag_name[i]}_bag_common`)
        lootbag(`kubejs:${bag_name[i]}_bag_rare`,`loot:${bag_name[i]}/${bag_name[i]}_bag_rare`)
        lootbag(`kubejs:${bag_name[i]}_bag_epic`,`loot:${bag_name[i]}/${bag_name[i]}_bag_epic`)
    }
})

//Craft rare and epic bags
ServerEvents.recipes(event => {
    function bagBuilder(itemName, itemResult) {
        event.shapeless(itemResult, [itemName])
    }
    
    for (let i = 0; i < bag_name.length; i++) {
        bagBuilder(`4x kubejs:${bag_name[i]}_bag_common`, `kubejs:${bag_name[i]}_bag_rare`)
        bagBuilder(`4x kubejs:${bag_name[i]}_bag_rare`, `kubejs:${bag_name[i]}_bag_epic`)
    }
})
