// Outlandish Revelations: greenhouse.
GTCEuStartupEvents.registry('gtceu:recipe_type',function (event) {
  var FillDirection=Java.loadClass('com.lowdragmc.lowdraglib.gui.texture.ProgressTexture$FillDirection');
  event.create('gtceu:greenhouse').category('test').setEUIO('in')
    .setMaxIOSize(3,4,1,0).setSlotOverlay(false,false,GuiTextures.BOX_OVERLAY)
    .setProgressBar(GuiTextures.PROGRESS_BAR_BATH,FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COOLING);
});
GTCEuStartupEvents.registry('gtceu:machine',function (event) {
  event.create('gtceu:greenhouse','multiblock')
    .rotationState(RotationState.NON_Y_AXIS).recipeType('gtceu:greenhouse')
    .appearanceBlock(GTBlocks.MACHINE_CASING_ULV).recipeModifier(GTRecipeModifiers.OC_NON_PERFECT)
    .pattern(function (definition) {
      return FactoryBlockPattern.start()
        .aisle('0BBB0','0BBB0','0BBB0','0BBB0')
        .aisle('BBBBB','BDDDB','B###B','BGGGB')
        .aisle('BBBBB','BDDDB','B###B','BGGGB')
        .aisle('BBBBB','BDDDB','B###B','BGGGB')
        .aisle('0BBB0','0BEB0','0BBB0','0BBB0')
        .where('E',Predicates.controller(Predicates.blocks(definition.get())))
        .where('D',Predicates.blocks('minecraft:dirt'))
        .where('G',Predicates.blocks('gtceu:tempered_glass'))
        .where('B',Predicates.blocks('gtceu:ulv_machine_casing').setMinGlobalLimited(5)
          .or(Predicates.autoAbilities(definition.getRecipeTypes())))
        .where('#',Predicates.air()).where('0',Predicates.any()).build();
    })
    .workableCasingModel('gtceu:block/casings/voltage/ulv/side','gtceu:block/multiblock/implosion_compressor');
});
