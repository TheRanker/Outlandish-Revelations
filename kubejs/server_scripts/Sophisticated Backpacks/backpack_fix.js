const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')

function throw_item(player, item, msg) {
    player.tell(msg)
    let itemEntity = player.drop(item, false, true)
    itemEntity.noGravity = true
    itemEntity.setInvulnerable(true)
    itemEntity.setGlowing(true)
    itemEntity.setPickUpDelay(100)
    setDeltaMovement(itemEntity, 0, -0.02, 0)
}

function throw_from_inv_include_curious(player, item_list, max_count, msg) {
    if (!player.isAlive()) return
    if (!player.gameMode.isSurvival()) return
    let curious_counter = 0
    let targets = []
    item_list.forEach(item => {
        targets.push(Ingredient.of(item))
    })
    const api = new CuriosApi();
    const curios = api.getCuriosHelper().getEquippedCurios(player).resolve().get();
    for (let slot = 0; slot < curios.getSlots(); slot++) {
        var itemstack = Item.of(curios.getStackInSlot(slot))
        targets.forEach(target => {
            if (target.test(itemstack)) {
                curious_counter++
                if (curious_counter > max_count) {
                    curios.setStackInSlot(slot, "minecraft:air")
                    throw_item(player, itemstack, msg)
                    curious_counter--
                }
                return; // exit from forEach
            }
        })
    }
    let counter = player.inventory.count(item_list)
    while (curious_counter + counter > max_count) {
        console.log(Ingredient.of('#forge:ores').itemIds)
        console.log("43476rhfn8hf487")
        let item = player.inventory.extractItem(player.inventory.find(item_list), 1, false)
        throw_item(player, item, msg)
        counter = player.inventory.count(item_list)
    }
    return curious_counter + counter
}

function check_inv(player) {
    throw_from_inv_include_curious(player, ['sophisticatedbackpacks:backpack', 'sophisticatedbackpacks:iron_backpack', 'sophisticatedbackpacks:gold_backpack', 'sophisticatedbackpacks:diamond_backpack', 'sophisticatedbackpacks:netherite_backpack'], 1, "You can have only one backpack in your inventory! You can create a backpack of higher level or use upgrades to be able to carry more items. One of the backpacks was thrown to the ground!")
    throw_from_inv_include_curious(player, ['supplementaries:sack'], 3, "Too much sacks in inventory! One of the sacks was thrown to the ground!")
}
