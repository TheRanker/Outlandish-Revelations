ServerEvents.recipes(event => {
    event.replaceInput({mod: 'computercraft'}, 'minecraft:redstone', 'gtceu:terminal')
    event.replaceInput({mod: 'computercraft'}, 'minecraft:golden_apple', 'toms_storage:ts.wireless_terminal')
    event.replaceInput({mod: 'advancedperipherals'}, 'minecraft:redstone', 'gtceu:terminal')
    event.replaceInput({mod: 'advancedperipherals'}, 'minecraft:golden_apple', 'toms_storage:ts.wireless_terminal')
    event.replaceInput({mod: 'advancedperipherals'}, 'minecraft:redstone_block', 'storagedrawers:controller')
    event.replaceInput({mod: 'computercraft'}, 'minecraft:ender_eye', 'toms_storage:ts.wireless_terminal')
    event.replaceInput({mod: 'computercraft'}, 'minecraft:ender_pearl', 'toms_storage:ts.wireless_terminal')

})