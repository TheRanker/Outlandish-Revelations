// Outlandish Revelations: recipes.
ServerEvents.recipes(event => {
  const GTMaterials = Java.loadClass('com.gregtechceu.gtceu.common.data.GTMaterials');
  const TagPrefix = Java.loadClass('com.gregtechceu.gtceu.api.data.tag.TagPrefix');
  const ChemicalHelper = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.ChemicalHelper');
  const Registries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

  const rows = JSON.parse(String(JsonIO.readString('kubejs/outlandish/recipes.json')))
    .concat(JSON.parse(String(JsonIO.readString('kubejs/outlandish/restored_progression.json'))));
  const removals = JSON.parse(String(JsonIO.readString('kubejs/outlandish/removals.json')));
  if (!rows || !removals) throw new Error('[Outlandish recipes] Missing kubejs/otg_port data files.');
  const state = { added: 0, groups: {}, errors: []};

  function mat(name) {
    const value = GTMaterials.get(name);
    if (!value || String(value.getName()) === 'null') throw new Error('Missing GT material: ' + name);
    return value;
  }
  function input(spec) {
    let id = spec.item;
    if (spec.prefix) {
      const tags = TagPrefix[spec.prefix].getItemTags(mat(spec.material));
      if (tags.length === 0) throw new Error('No tag for ' + spec.prefix + '/' + spec.material);
      id = '#' + tags[0].location();
    }
    if (id.charAt(0) === '#') {
      if (Ingredient.of(id).itemIds.size() === 0) throw new Error('Empty ingredient tag: ' + id);
    } else if (!Item.exists(id)) {
      throw new Error('Missing ingredient item: ' + id);
    }
    return (spec.count > 1 ? spec.count + 'x ' : '') + id;
  }
  function output(spec) {
    const stack = spec.prefix
      ? Item.of(ChemicalHelper.get(TagPrefix[spec.prefix], mat(spec.material), spec.count))
      : Item.of(spec.item, spec.count);
    if (String(stack.id) === 'minecraft:air') throw new Error('Missing output: ' + JSON.stringify(spec));
    return stack;
  }
  function fluid(spec) {
    const id = spec.fluidMaterial
      ? String(Registries.FLUIDS.getKey(mat(spec.fluidMaterial).getFluid()))
      : spec.fluid;
    if (!Registries.FLUIDS.containsKey(new ResourceLocation(id))) throw new Error('Missing fluid: ' + id);
    return Fluid.of(id, spec.amount);
  }
  function prepare(row) {
    const p = {row: row, inputs: [], outputs: [], fluids: [], catalysts: []};
    if (row.type === 'shaped') {
      p.output = output(row.output);
      p.key = {};
      Object.keys(row.key).forEach(k => { p.key[k] = input(row.key[k]); });
    } else if (row.type === 'shapeless') {
      p.output = output(row.output);
      p.inputs = row.inputs.map(input);
    } else {
      p.inputs = row.inputs.map(input);
      p.outputs = row.outputs.map(output);
      p.fluids = row.fluids.map(fluid);
      p.catalysts = row.catalysts.map(input);
    }
    return p;
  }
  function add(p) {
    const row = p.row;
    if (row.nativeJson) {

      event.custom(row.nativeJson).id(row.id);
    } else if (row.type === 'shaped') {
      event.shaped(p.output, row.pattern, p.key).id(row.id);
    } else if (row.type === 'shapeless') {
      event.shapeless(p.output, p.inputs).id(row.id);
    } else {
      let recipe = event.recipes.gtceu[row.type](row.id).duration(row.duration).EUt(row.EUt);
      if (p.inputs.length) recipe.itemInputs(p.inputs);
      recipe.itemOutputs(p.outputs);
      if (p.fluids.length) recipe.inputFluids(p.fluids);
      p.catalysts.forEach(v => recipe.notConsumable(v));
      if (row.blastFurnaceTemp !== undefined) recipe.blastFurnaceTemp(row.blastFurnaceTemp);
      if (row.circuitMeta !== undefined) recipe.circuit(row.circuitMeta);
    }
    state.added++;
  }

  ['core', 'ae2', 'botania', 'industrialforegoing', 'enderio', 'buildinggadgets2', 'cookingforblockheads', 'waystones', 'sophisticatedbackpacks', 'butchersdelight'].forEach(group => {
    if (group !== 'core' && !Platform.isLoaded(group)) return;
    if (group === 'butchersdelight' && (!Platform.isLoaded('create') || !Platform.isLoaded('butchersdelightfoods'))) {
      state.groups[group] = {applied:false, skipped:true, reason:'Create and Butchers Delight Foods are required'};
      return;
    }
    const groupRows = rows.filter(r => r.group === group);
    const pending = [];
    const errors = [];
    groupRows.forEach(row => {
      try { pending.push(prepare(row)); }
      catch (e) { errors.push(row.id + ': ' + e); }
    });
    if (errors.length) {
      state.groups[group] = {applied:false, errors:errors};
      errors.forEach(e => { console.error('[Outlandish recipes] ' + e); state.errors.push(e); });
      return;
    }
    (removals[group] || []).forEach(id => event.remove({id:id}));

    if (group === 'buildinggadgets2') {
      pending.forEach(p => event.remove({output:p.row.output.item}));
    }
    pending.forEach(add);

    state.groups[group] = {applied:true, added:pending.length};
  });

  console.info('[Outlandish recipes] Added ' + state.added + ' recipes. Failed references: ' + state.errors.length);
  if (state.errors.length) throw Error('[Outlandish recipes] '+JSON.stringify(state.errors));
});

ServerEvents.tags('item', event => {
  const hidden = JSON.parse(String(JsonIO.readString('kubejs/outlandish/hidden_items.json')));
  if (!hidden) throw new Error('[Outlandish recipes] Missing hidden_items.json');
  hidden.forEach(id => {
    if (Item.exists(id)) event.add('c:hidden_from_recipe_viewers', id);
  });
});
