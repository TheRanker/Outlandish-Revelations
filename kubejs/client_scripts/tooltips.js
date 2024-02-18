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


//custom lockpick tooltip
    let lockpick = Text.yellow('Use to unlock chests in wild, has 50 uses')
        tooltip.add('kubejs:lockpick', [lockpick])
          
    let rankersring = text.yellow('Creative Flight')    
        tooltip.add('kubejs:rankers_ring', [rankersring])
    
    
    //AE2 tooltips wip
    let togglet = Text.darkRed ('A _network cable_ that allows its connection state to be _toggled_ via _redstone._ This allows you to cut off a section of a ME Network. When _redstone signal_ supplied the part enables the connection, _ME Inverted Toggle Bus_ provides the reverse behavior by disabling the connection instead.')
    let toggle =  ['ae2:toggle_bus', 'ae2:inverted_toggle_bus']
        toggle.forEach(toggle => {
            tooltip.add(toggle, [togglet])
        })

    let storagebust = Text.darkRed('The _ME Storage Bus_, when attached to another inventory block in the world lets you _access_ that inventory _via networked functions_. This allows you to use chests, barrels, or other types of item storage in your networks. The storage via the _ME Storage Bus_ is bi-directional, it can both insert, or extract items from the inventory block it is attached to as long as the _ME Storage Bus_ has its _required channel._ The UI allows you to control which items are selected as storable items, this selection has no effect on what items can be extracted once they are in the storage. The Storage Bus will function with nearly any inventory block, including')
        tooltip.add('ae2:storage_bus', [storagebust])

    let terminalt = Text.darkRed('The _Storage Terminal_ is a HID which gives you _access_ to items stored in your _ME Network_. This will also include items accessible through _ME Storage Bus_. It has the ability to _sort_ and _search_, as well as _filter_ by using _View Cell_. It requires a _channel_ to function. Can be upgraded into a _ME Crafting Terminal_.')
        tooltip.add('ae2:terminal', [terminalt])

    let cablest = Text.darkRed('A Network _requires power_, provided by _energy cells_. The maximum amount of devices in one network is _8_. A cable will show the amount of _channels_ used on connected devices')
    let cables = ["ae2:fluix_smart_cable",'ae2:red_smart_cable','ae2:blue_smart_cable','ae2:green_smart_cable','ae2:purple_smart_cable','ae2:white_smart_cable','ae2:orange_smart_cable','ae2:yellow_smart_cable','ae2:lime_smart_cable','ae2:pink_smart_cable','ae2:gray_smart_cable','ae2:light_gray_smart_cable','ae2:cyan_smart_cable','ae2:light_blue_smart_cable','ae2:magenta_smart_cable','ae2:brown_smart_cable','ae2:green_smart_cable','ae2:red_smart_cable','ae2:black_smart_cable']
        cables.forEach(cables => {
            tooltip.add(cables, [cablest])
        })
    let cellst = Text.darkRed.apply('A _Energy cell_, which can be filled with _energy_ using cables when placed in the world, is the only way to supply an ae2 network with _power_.')
        tooltip.add('ae2:energy_cell', [cellst])
    
    let quartzt = Text.darkRed('Quartz grows on _budding quartz_ naturally, when the budding quartz is depleted it can be recharged using _Polished Rose Quartz_. The quartz buds and clusters that grow on the budding quartz can be broken gently (not with a drill! They are fragile!) to obtain quartz')
    let quartz = ['ae2:flawed_budding_quartz','ae2:chipped_budding_quartz','ae2:damaged_budding_quartz','ae2:small_quartz_bud','ae2:medium_quartz_bud','ae2:large_quartz_bud','quartz',]
        quartz.forEach(quartz => {
            tooltip.add(quartz, [quartzt])
        })
})