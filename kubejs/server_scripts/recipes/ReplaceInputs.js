ServerEvents.recipes(event => {

    //CC Tweaked
    event.replaceInput({mod: 'computercraft'}, 'minecraft:redstone', 'gtceu:terminal')
    event.replaceInput({mod: 'computercraft'}, 'minecraft:golden_apple', 'ae2:wireless_terminal')
    event.replaceInput({mod: 'advancedperipherals'}, 'minecraft:redstone', 'gtceu:terminal')
    event.replaceInput({mod: 'advancedperipherals'}, 'minecraft:golden_apple', 'ae2:wireless_terminal')
    event.replaceInput({mod: 'advancedperipherals'}, 'minecraft:redstone_block', 'storagedrawers:controller')
    event.replaceInput({mod: 'computercraft'}, 'minecraft:ender_eye', 'ae2:wireless_terminal')
    event.replaceInput({mod: 'computercraft'}, 'minecraft:ender_pearl', 'ae2:wireless_terminal')

})