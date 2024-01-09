GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('manasteel')
        .ingot()
		.fluid()
        .color(0x0062FF).secondaryColor(0xCCCCCC).iconSet(GTMaterialIconSet.METALLIC)
        .cableProperties(GTValues.V[4], 8, 0)
})