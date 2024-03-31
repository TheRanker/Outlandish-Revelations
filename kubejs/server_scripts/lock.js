BlockEvents.rightClicked(event => {
  const isLoot = event.block.entityData?.LootTable
  if (isLoot /*blacklist vanilla chest example: && !event.block.id == 'minecraft:chest'*/) {
    let chestData = event.block.getEntity().persistentData
    let lockValue = chestData.getInt('Lock')
    const lockPick = event.player.getMainHandItem()

    if (!lockValue) {
      lockValue = Math.floor(Math.random() * 20 + 1) // change 20 to a higher number to make it more difficult
      chestData.putInt('Lock', lockValue);
    }

    if (lockValue != 1) {
      let unlockValue = Math.floor(Math.random() * 20 + 1);
      if (lockValue > 1 && lockPick.id != 'kubejs:lockpick' /*change to your lockpick id*/) {
        event.player.tell('This is locked. You need a lockpick to open it.')
        event.cancel();
      }
      else if (lockPick.id == 'kubejs:lockpick' /*change to your lockpick id*/) {
        if (lockValue - unlockValue <= 1) {
          chestData.putInt('Lock', 1)
          event.player.tell("Success!");
	  event.player.damageHeldItem('main_hand',1)
          return;
        }
        else {
          event.player.tell("Failed.")
          lockValue = lockValue - unlockValue
          event.player.damageHeldItem('main_hand',1) // you can change this value to deal a custom amount of damage to your item.
          chestData.putInt('Lock', lockValue)
          event.cancel()
        }
      }
    }
  }
});