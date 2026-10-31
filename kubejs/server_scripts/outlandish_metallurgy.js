// Outlandish Revelations: metallurgy.
ServerEvents.recipes(function (event) {
  var materials = JSON.parse(String(JsonIO.readString('kubejs/outlandish/metallurgy.json')));
  var GTMaterials = Java.loadClass('com.gregtechceu.gtceu.common.data.GTMaterials');
  var TagPrefix = Java.loadClass('com.gregtechceu.gtceu.api.data.tag.TagPrefix');
  var ChemicalHelper = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.ChemicalHelper');
  var Registries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  var ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
  var state = { added:0, materials:{}, errors:[]};
  var yields = {redstone:12,cassiterite:12,lepidolite:10,magnesite:10,bauxite:6,cobaltite:6,
    grossular:6,pyrolusite:6,sodalite:6,stibnite:6,malachite:5,yellow_limonite:4,tantalite:4,
    tetrahedrite:3,pyrite:3,magnetite:3};
  function requireFluid(id) {
    if (!Registries.FLUIDS.containsKey(new ResourceLocation(id))) throw Error('Missing fluid: '+id);
  }
  materials.forEach(function (entry) {
    var name=entry.name;
    var base='kubejs:'+name+'_ore_';
    var path='otg:restored/metallurgy/'+name+'/';
    var crushed,ore;

    try {
      ['cluster','shard','crystal','clump'].forEach(function (form) {
        if (!Item.exists(base+form)) throw Error('Missing custom item: '+base+form);
      });
      var material=GTMaterials.get(entry.gtMaterial);
      if (!material || String(material.getName())==='null') throw Error('Missing GT material: '+entry.gtMaterial);
      crushed=Item.of(ChemicalHelper.get(TagPrefix.crushed,material,yields[name] || 2));
      if (String(crushed.id)==='minecraft:air') throw Error('Missing crushed ore: '+entry.gtMaterial);
      var tags=TagPrefix.ore.getItemTags(material);
      if (!tags.length) throw Error('No ore tag: '+entry.gtMaterial);
      ore='#'+tags[0].location();
      if (!Ingredient.of(ore).itemIds.size()) throw Error('Empty ore tag: '+ore);
      ['bloodmagic:life_essence_fluid','minecraft:water','kubejs:blazing_pyrotheum','gtceu:uu_matter'].forEach(requireFluid);
    } catch (error) {
      state.materials[name]={applied:false,error:String(error)};
      state.errors.push(name+': '+error);
      console.error('[Outlandish metallurgy] '+name+': '+error);
      return;
    }
    event.recipes.gtceu.macerator(path+'cluster').itemInputs(base+'cluster').itemOutputs(crushed).duration(200).EUt(12);
    event.recipes.gtceu.chemical_reactor(path+'shard').itemInputs(ore)
      .inputFluids([Fluid.of('bloodmagic:life_essence_fluid',200),Fluid.of('minecraft:water',200)])
      .itemOutputs(base+'shard').duration(280).EUt(48);
    event.smelting('4x '+base+'cluster',base+'shard').id(path+'smelt_shard');
    event.recipes.gtceu.arc_furnace(path+'crystal').itemInputs(base+'shard')
      .inputFluids(Fluid.of('kubejs:blazing_pyrotheum',144)).itemOutputs(base+'crystal').duration(80).EUt(480);
    event.smelting('8x '+base+'cluster',base+'crystal').id(path+'smelt_crystal');
    event.recipes.gtceu.chemical_bath(path+'clump').itemInputs(base+'crystal')
      .inputFluids(Fluid.of('gtceu:uu_matter',10)).itemOutputs(base+'clump').duration(100).EUt(480);
    event.smelting('16x '+base+'cluster',base+'clump').id(path+'smelt_clump');
    state.materials[name]={applied:true,added:7};
    state.added+=7;
  });

  console.info('[Outlandish metallurgy] Added '+state.added+' recipes; '+state.errors.length+' materials failed preflight.');
  if (state.errors.length) throw Error('[Outlandish metallurgy] '+JSON.stringify(state.errors));
});
