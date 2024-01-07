StartupEvents.registry('item', e => {
    function make_bag(bagName, displayName, texture, rarity, glow){
            e.create(bagName)
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
})