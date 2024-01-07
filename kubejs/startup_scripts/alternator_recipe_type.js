GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('basic_alternator')
        .category('multiblock')
        .setEUIO('out')
            .setMaxIOSize(0, 0, 0, 0)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ARC)
        .setMaxTooltips(6)
})