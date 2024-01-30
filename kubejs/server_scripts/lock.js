BlockEvents.rightClicked(e => {
    /*you can replace these blocks into whatever blockentites that you want to limit.
    You could use the condition below if you are using lootr mod.*/
    if (e.block === 'lootr:lootr_chest' || e.block === 'lootr:lootr_barrel'|| e.block === 'lootr:lootr_cart' || e.block === 'lootr:lootr_shulker' || e.block === 'lootr:lootr_trapped_chest') {
        let chestData = e.block.getEntity().persistentData
        let lockValue = chestData.getInt('Lock')
        if (lockValue === 0) {
            lockValue = Math.floor(Math.random() * 25) + 1
            chestData.putInt('Lock', lockValue)
        }
        //You need to replace minecraft:arrow into your custom lockpick
        if (e.player.getMainHandItem().id != 'kubejs:lockpick') {
            if (lockValue <= 10) {
                console.log('Chest can be opened.')
            } else {
                e.player.tell('The chesk is locked. You need to use lockpicks to unlock it.')
                e.cancel()
            }
        } else if (e.player.getMainHandItem().id === 'kubejs:lockpick') {
            let check = Math.floor(Math.random() * 20)
            if (lockValue > 10 && (check > lockValue || check === 20)) {
                chestData.putInt('Lock', 1)
                e.player.tell('Succeed！')
                e.player.damageHeldItem('main_hand',1)
            } else if (lockValue <= 10){
            } else {
                e.player.tell('Fail！')
                e.player.damageHeldItem('main_hand',1)
                e.cancel()
            }
        }
    }
})

//making all chests placed by players unlocked.
BlockEvents.placed('chest' || 'barrel' || 'barrel' || 'shulker' || 'trapped_chest',e=>{
    e.block.getEntity().persistentData.getInt('Lock', 1)
})