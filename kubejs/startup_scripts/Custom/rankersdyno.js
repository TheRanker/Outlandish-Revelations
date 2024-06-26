StartupEvents.registry("block", event => {
    event.create("rankers_dynamo")
.displayName("Rankers Dynamo")
        .blockEntity(info => {
            info.attachCapability(CapabilityBuilder.ENERGY.customBlockEntity()
                .canExtract(() => true)
                .canReceive(() => true)
                .extractEnergy((be, amount, simulate) => {
                    let energy = be.persistentData.getInt("energy")
                    let extracted = Math.min(energy, amount)
                    if (!simulate) {
                        be.persistentData.putInt("energy", energy - extracted)
                    }
                    return extracted
                })
                .receiveEnergy((be, amount, simulate) => {
                    let energy = be.persistentData.getInt("energy")
                    let received = Math.min(10919810 - energy, amount)
                    if (!simulate) {
                        be.persistentData.putInt("energy", energy + received)
                    }
                    return received

                })
                .getEnergyStored(be => {
                    return be.persistentData.getInt("energy")
                })
                .getMaxEnergyStored(() => 10919810)
            )
        })
})