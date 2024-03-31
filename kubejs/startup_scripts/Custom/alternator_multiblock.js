GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('basic_alternator', 'multiblock')
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType('basic_alternator')
        .pattern(definition => FactoryBlockPattern.start()
            .aisle("CWC", "CWC", "#W#")
            .aisle("CWC", "K#E", "CWC")
            .aisle("CWC", "CWA", "#W#")
            .where('A', Predicates.controller(Predicates.blocks(definition.get())))
            .where('W', Predicates.blocks(GTBlocks.COIL_CUPRONICKEL.get()))
            .where("C", Predicates.blocks(GTBlocks.CASING_STEEL_SOLID.get()))
            .where('#', Predicates.any())
            .where('K', Predicates.abilities(PartAbility.INPUT_KINETIC).setExactLimit(1))
            .where('E', Predicates.abilities(PartAbility.OUTPUT_ENERGY).setExactLimit(1))
            .build()
        )
        .workableCasingRenderer(
            "gtceu:block/casings/solid/machine_casing_solid_steel",
            "gtceu:block/multiblock/implosion_compressor", false
        )
})