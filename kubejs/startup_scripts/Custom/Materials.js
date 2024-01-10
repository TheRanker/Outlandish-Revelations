GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('manasteel')
        .ingot()
		.fluid()
        .color(0x0062FF).secondaryColor(0xCCCCCC).iconSet(GTMaterialIconSet.METALLIC)
        .cableProperties(GTValues.V[4], 8, 0)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('skystone')
        .color(0x303031).secondaryColor(0x3a4447).iconSet(GTMaterialIconSet.METALLIC)
        .flags(GTMaterialFlags.GENERATE_LENS)
})