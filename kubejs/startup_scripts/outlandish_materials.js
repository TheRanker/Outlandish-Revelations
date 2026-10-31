// Outlandish Revelations: materials.
(function () {
  let apiReady = false;
  let GTValues, GTMaterials, GTElements, TagPrefix, Element, MaterialIconSet, MaterialFlags, GasTier, PropertyKey, FluidProperty, FluidStorageKeys, FluidBuilder;
  function loadApi() {
    if (apiReady) return;
    GTValues = Java.loadClass('com.gregtechceu.gtceu.api.GTValues');
    GTMaterials = Java.loadClass('com.gregtechceu.gtceu.common.data.GTMaterials');
    GTElements = Java.loadClass('com.gregtechceu.gtceu.common.data.GTElements');
    TagPrefix = Java.loadClass('com.gregtechceu.gtceu.api.data.tag.TagPrefix');
    Element = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.Element');
    MaterialIconSet = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.info.MaterialIconSet');
    MaterialFlags = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.info.MaterialFlags');
    GasTier = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty$GasTier');
    PropertyKey = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey');
    FluidProperty = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidProperty');
    FluidStorageKeys = Java.loadClass('com.gregtechceu.gtceu.api.fluids.store.FluidStorageKeys');
    FluidBuilder = Java.loadClass('com.gregtechceu.gtceu.api.fluids.FluidBuilder');
    apiReady = true;
  }

  GTCEuStartupEvents.registry('gtceu:material', event => {
    loadApi();
    if (true) {
      event.create('gtceu:signalum').langValue('Signalum').color(15677190).secondaryColor(10751489).iconSet(MaterialIconSet.SHINY).ingot().cableProperties(GTValues.V[3], 4, 0).blastTemp(1800, GasTier.LOW, GTValues.VA[2], 2000).components("3x copper", "1x silver", "4x redstone");
    }
    if (true) {
      event.create('gtceu:enderium').langValue('Enderium').color(2927022).secondaryColor(733270).iconSet(MaterialIconSet.SHINY).ingot().cableProperties(GTValues.V[5], 4, 0).blastTemp(2200, GasTier.LOW, GTValues.VA[3], 2000).components("3x lead", "1x platinum", "4x ender_pearl");
    }
    if (Platform.isLoaded("botania")) {
      event.create('gtceu:magic').langValue('Magic').element(GTElements.Ma);
    }
    if (Platform.isLoaded("botania")) {
      event.create('gtceu:manasteel').langValue('Manasteel').color(4028635).iconSet(MaterialIconSet.SHINY).ingot().cableProperties(GTValues.V[1], 4, 0).components("1x stainless_steel", "1x magic");
    }
    if (Platform.isLoaded("botania")) {
      event.create('gtceu:terrasteel').langValue('Terrasteel').color(3269931).iconSet(MaterialIconSet.SHINY).ingot().blastTemp(4500, GasTier.MID, GTValues.VA[4], 2000).cableProperties(GTValues.V[6], 4, 0).components("1x manasteel", "1x diamond", "1x ender_pearl");
    }
    if (Platform.isLoaded("botania")) {
      event.create('gtceu:elementium').langValue('Elementium').color(15817902).iconSet(MaterialIconSet.SHINY).ingot().components("2x manasteel", "1x magic");
    }
    if (Platform.isLoaded("ae2")) {
      event.create('gtceu:skystone').langValue('Skystone').color(0x303031).secondaryColor(3818567).iconSet(MaterialIconSet.METALLIC).dust().flags(MaterialFlags.GENERATE_LENS).element(new Element(14, 16, -1, null, "Sky Stone", "Sk", false));
    }
    if (Platform.isLoaded("ae2")) {
      event.create('gtceu:fluix').langValue('Fluix').color(10118085).secondaryColor(6311850).iconSet(MaterialIconSet.METALLIC).gem().flags(MaterialFlags.NO_WORKING).components("1x redstone", "2x certus_quartz");
    }
    if (Platform.isLoaded("industrialforegoing")) {
      event.create('gtceu:pinkslime').langValue('Pink Slime').color(12814522).ingot().flags(MaterialFlags.NO_SMASHING, MaterialFlags.NO_SMELTING, MaterialFlags.NO_WORKING, MaterialFlags.NO_UNIFICATION);
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:copper_alloy').langValue('Copper Alloy').color(12156166).secondaryColor(8082692).iconSet(MaterialIconSet.SHINY).ingot().components("1x copper", "1x silicon");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:energetic_alloy').langValue('Energetic Alloy').color(15311616).secondaryColor(15711822).iconSet(MaterialIconSet.SHINY).ingot().cableProperties(GTValues.V[2], 4, 0).components("1x redstone", "1x gold", "1x glowstone");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:vibrant_alloy').langValue('Vibrant Alloy').color(15335286).secondaryColor(10135108).iconSet(MaterialIconSet.SHINY).ingot().cableProperties(GTValues.V[4], 4, 0).blastTemp(2200, GasTier.LOW, GTValues.VA[3], 2000).components("1x energetic_alloy", "1x ender_pearl");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:redstone_alloy').langValue('Redstone Alloy').color(16342365).secondaryColor(6494489).iconSet(MaterialIconSet.SHINY).ingot().components("1x redstone", "1x silicon");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:conductive_alloy').langValue('Conductive Alloy').color(13079440).secondaryColor(11109753).iconSet(MaterialIconSet.SHINY).ingot().components("1x copper_alloy", "1x iron", "1x redstone");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:pulsating_alloy').langValue('Pulsating Alloy').color(10284974).secondaryColor(4226895).iconSet(MaterialIconSet.SHINY).ingot().components("1x iron", "1x ender_pearl");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:dark_steel').langValue('Dark Steel').color(0x777676).secondaryColor(0x2A2B2A).iconSet(MaterialIconSet.SHINY).ingot().blastTemp(3600, GasTier.MID, GTValues.VA[4], 3600).components("1x iron", "1x obsidian", "1x coal");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:soularium').langValue('Soularium').color(6442274).secondaryColor(3745295).iconSet(MaterialIconSet.SHINY).ingot().components("1x gold", "1x netherrack");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:end_steel').langValue('End Steel').color(12630120).secondaryColor(10262360).iconSet(MaterialIconSet.SHINY).ingot().blastTemp(4500, GasTier.MID, GTValues.VA[4], 5000).components("1x endstone", "1x obsidian", "1x dark_steel");
    }
    if (Platform.isLoaded("enderio")) {
      event.create('gtceu:stellar_alloy').langValue('Stellar Alloy').color(12244223).iconSet(MaterialIconSet.SHINY).ingot().cableProperties(GTValues.V[7], 4, 0).blastTemp(4500, GasTier.MID, GTValues.VA[4], 5000).components("1x endstone", "1x obsidian", "1x dark_steel");
    }
  });

  GTCEuStartupEvents.materialModification(event => {
    loadApi();
    GTMaterials.Gold.addFlags(MaterialFlags.GENERATE_GEAR);

    if (Platform.isLoaded('cookingforblockheads')) {
      GTMaterials.IronMagnetic.addFlags(MaterialFlags.GENERATE_PLATE);
    }
    if (!GTMaterials.EnderPearl.hasProperty(PropertyKey.FLUID)) {
      GTMaterials.EnderPearl.setProperty(PropertyKey.FLUID,
        new FluidProperty(FluidStorageKeys.LIQUID, new FluidBuilder()));
    }
    if (Platform.isLoaded('botania')) {
      TagPrefix.ingot.setIgnored(GTMaterials.get('manasteel'));
      TagPrefix.block.setIgnored(GTMaterials.get('manasteel'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('manasteel'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('terrasteel'));
      TagPrefix.block.setIgnored(GTMaterials.get('terrasteel'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('terrasteel'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('elementium'));
      TagPrefix.block.setIgnored(GTMaterials.get('elementium'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('elementium'));
    }
    if (Platform.isLoaded('ae2')) {
      TagPrefix.dust.setIgnored(GTMaterials.get('skystone'));
      TagPrefix.dust.setIgnored(GTMaterials.get('fluix'));
      TagPrefix.gem.setIgnored(GTMaterials.get('fluix'));
      TagPrefix.block.setIgnored(GTMaterials.get('fluix'));
      TagPrefix.gem.setIgnored(GTMaterials.get('certus_quartz'));
      TagPrefix.dust.setIgnored(GTMaterials.get('certus_quartz'));
    }
    if (Platform.isLoaded('industrialforegoing')) {
      TagPrefix.ingot.setIgnored(GTMaterials.get('pinkslime'));
      TagPrefix.dust.setIgnored(GTMaterials.get('pinkslime'));
      TagPrefix.dustTiny.setIgnored(GTMaterials.get('pinkslime'));
      TagPrefix.dustSmall.setIgnored(GTMaterials.get('pinkslime'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('pinkslime'));
      TagPrefix.block.setIgnored(GTMaterials.get('pinkslime'));
    }
    if (Platform.isLoaded('enderio')) {
      TagPrefix.ingot.setIgnored(GTMaterials.get('copper_alloy'));
      TagPrefix.block.setIgnored(GTMaterials.get('copper_alloy'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('copper_alloy'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('energetic_alloy'));
      TagPrefix.block.setIgnored(GTMaterials.get('energetic_alloy'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('energetic_alloy'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('vibrant_alloy'));
      TagPrefix.block.setIgnored(GTMaterials.get('vibrant_alloy'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('vibrant_alloy'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('redstone_alloy'));
      TagPrefix.block.setIgnored(GTMaterials.get('redstone_alloy'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('redstone_alloy'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('conductive_alloy'));
      TagPrefix.block.setIgnored(GTMaterials.get('conductive_alloy'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('conductive_alloy'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('pulsating_alloy'));
      TagPrefix.block.setIgnored(GTMaterials.get('pulsating_alloy'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('pulsating_alloy'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('dark_steel'));
      TagPrefix.block.setIgnored(GTMaterials.get('dark_steel'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('dark_steel'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('soularium'));
      TagPrefix.block.setIgnored(GTMaterials.get('soularium'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('soularium'));
      TagPrefix.ingot.setIgnored(GTMaterials.get('end_steel'));
      TagPrefix.block.setIgnored(GTMaterials.get('end_steel'));
      TagPrefix.nugget.setIgnored(GTMaterials.get('end_steel'));
    }
  });

  StartupEvents.postInit(event => {
    loadApi();
    const links = [
  {
    "group": "botania",
    "prefix": "ingot",
    "material": "manasteel",
    "item": "botania:manasteel_ingot"
  },
  {
    "group": "botania",
    "prefix": "block",
    "material": "manasteel",
    "item": "botania:manasteel_block"
  },
  {
    "group": "botania",
    "prefix": "nugget",
    "material": "manasteel",
    "item": "botania:manasteel_nugget"
  },
  {
    "group": "botania",
    "prefix": "ingot",
    "material": "terrasteel",
    "item": "botania:terrasteel_ingot"
  },
  {
    "group": "botania",
    "prefix": "block",
    "material": "terrasteel",
    "item": "botania:terrasteel_block"
  },
  {
    "group": "botania",
    "prefix": "nugget",
    "material": "terrasteel",
    "item": "botania:terrasteel_nugget"
  },
  {
    "group": "botania",
    "prefix": "ingot",
    "material": "elementium",
    "item": "botania:elementium_ingot"
  },
  {
    "group": "botania",
    "prefix": "block",
    "material": "elementium",
    "item": "botania:elementium_block"
  },
  {
    "group": "botania",
    "prefix": "nugget",
    "material": "elementium",
    "item": "botania:elementium_nugget"
  },
  {
    "group": "ae2",
    "prefix": "dust",
    "material": "skystone",
    "item": "ae2:sky_dust"
  },
  {
    "group": "ae2",
    "prefix": "dust",
    "material": "fluix",
    "item": "ae2:fluix_dust"
  },
  {
    "group": "ae2",
    "prefix": "gem",
    "material": "fluix",
    "item": "ae2:fluix_crystal"
  },
  {
    "group": "ae2",
    "prefix": "block",
    "material": "fluix",
    "item": "ae2:fluix_block"
  },
  {
    "group": "ae2",
    "prefix": "gem",
    "material": "certus_quartz",
    "item": "ae2:certus_quartz_crystal"
  },
  {
    "group": "ae2",
    "prefix": "dust",
    "material": "certus_quartz",
    "item": "ae2:certus_quartz_dust"
  },
  {
    "group": "industrialforegoing",
    "prefix": "ingot",
    "material": "pinkslime",
    "item": "industrialforegoing:pink_slime_ingot"
  },
  {
    "group": "industrialforegoing",
    "prefix": "dust",
    "material": "pinkslime",
    "item": "industrialforegoing:pink_slime"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "copper_alloy",
    "item": "enderio:copper_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "copper_alloy",
    "item": "enderio:copper_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "copper_alloy",
    "item": "enderio:copper_alloy_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "copper_alloy",
    "item": "enderio:copper_alloy_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "energetic_alloy",
    "item": "enderio:energetic_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "energetic_alloy",
    "item": "enderio:energetic_alloy_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "energetic_alloy",
    "item": "enderio:energetic_alloy_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "vibrant_alloy",
    "item": "enderio:vibrant_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "vibrant_alloy",
    "item": "enderio:vibrant_alloy_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "vibrant_alloy",
    "item": "enderio:vibrant_alloy_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "redstone_alloy",
    "item": "enderio:redstone_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "redstone_alloy",
    "item": "enderio:redstone_alloy_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "redstone_alloy",
    "item": "enderio:redstone_alloy_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "conductive_alloy",
    "item": "enderio:conductive_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "conductive_alloy",
    "item": "enderio:conductive_alloy_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "conductive_alloy",
    "item": "enderio:conductive_alloy_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "pulsating_alloy",
    "item": "enderio:pulsating_alloy_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "pulsating_alloy",
    "item": "enderio:pulsating_alloy_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "pulsating_alloy",
    "item": "enderio:pulsating_alloy_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "dark_steel",
    "item": "enderio:dark_steel_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "dark_steel",
    "item": "enderio:dark_steel_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "dark_steel",
    "item": "enderio:dark_steel_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "soularium",
    "item": "enderio:soularium_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "soularium",
    "item": "enderio:soularium_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "soularium",
    "item": "enderio:soularium_nugget"
  },
  {
    "group": "enderio",
    "prefix": "ingot",
    "material": "end_steel",
    "item": "enderio:end_steel_ingot"
  },
  {
    "group": "enderio",
    "prefix": "block",
    "material": "end_steel",
    "item": "enderio:end_steel_block"
  },
  {
    "group": "enderio",
    "prefix": "nugget",
    "material": "end_steel",
    "item": "enderio:end_steel_nugget"
  }
];
    links.forEach(link => {
      if (!Platform.isLoaded(link.group)) return;
      if (!Item.exists(link.item)) throw new Error('[Outlandish recipes] Missing unification item: ' + link.item);

      TagPrefix[link.prefix]['setIgnored(com.gregtechceu.gtceu.api.data.chemical.material.Material,net.minecraft.world.level.ItemLike[])'](
        GTMaterials.get(link.material), [Item.of(link.item).item]);
    });
    console.info('[Outlandish recipes] Material unification initialized.');
  });
})();
