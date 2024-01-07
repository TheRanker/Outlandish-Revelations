ItemEvents.tooltip(tooltip => {
    let myMessage = Text.yellow('You can have only one backpack in the inventory!')
    let backpacks = ['sophisticatedbackpacks:backpack', 'sophisticatedbackpacks:iron_backpack', 'sophisticatedbackpacks:gold_backpack', 'sophisticatedbackpacks:diamond_backpack', 'sophisticatedbackpacks:netherite_backpack']
    backpacks.forEach(backpack => {
        tooltip.add(backpack, [myMessage])
    })
})
ItemEvents.tooltip(tooltip => {
    let myMessage = Text.yellow('Reset with a left click on the air!')
    tooltip.add('akashictome:tome', [myMessage])
})
