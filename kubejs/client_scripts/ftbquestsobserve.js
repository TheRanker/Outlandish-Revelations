const mapGTMachineIdToTaskId = {
	"gtceu:electric_blast_furnace": "6E2F24117ACF3694",
	"gtceu:cleanroom": "62BBF61C9849CA26",
	"gtceu:distillation_tower": "3BEDF19CD79D53D5",
	"gtceu:pyrolyse_oven": "130DDACA0E38A8E8",
	"gtceu:cracker": "3762F8137BFD5A74",
	"gtceu:vacuum_freezer": "6D082AE4CF9A56DC",
	"gtceu:large_chemical_reactor": "47871110028991D3",
	"gtceu:iv_processing_array": "72A2AA6274D6FA9A"
}

const $MetaMachine = Java.tryLoadClass('com.gregtechceu.gtceu.api.blockentity.MetaMachineBlockEntity')
const $MultiController = Java.tryLoadClass('com.gregtechceu.gtceu.api.machine.feature.multiblock.IMultiController')
const $CompoundTag = Java.tryLoadClass('net.minecraft.nbt.CompoundTag')

ClientEvents.tick(event => {
    if (Client.hitResult != null && Client.hitResult.getType() == 'BLOCK') {
        let block = event.level.getBlock(Client.hitResult.getBlockPos())
        if (block && block.id.contains('gtceu')) {
            let blockEntity = block.entity
            // Multiblock handler
            if (blockEntity && blockEntity instanceof $MetaMachine) {
                // Multiblock is complete
                if (blockEntity.metaMachine instanceof $MultiController) {
                    if (blockEntity.metaMachine.isFormed()) {
                        let taskString = mapGTMachineIdToTaskId[block.id]
                        if (taskString) {
                            let tag = new $CompoundTag()
                            tag.putString('task', taskString)
                            event.player.sendData('customTask', tag)
                        }
                    }
                }
            }
        }
    }
})

NetworkEvents.dataReceived('customTask', event => {
    //const {entity, data, level} = event
    //let taskString = data.task
    //let task = FTBQuests.getObject(level, taskString)
    //let playerQuestData = FTBQuests.getData(entity)
    //if (task && playerQuestData && !playerQuestData.isCompleted(task) && playerQuestData.canStartTasks(task.quest)) {
    //    playerQuestData.addProgress(task, 1)
    //}
})