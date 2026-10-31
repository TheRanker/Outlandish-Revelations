// Outlandish Revelations: juices.
(function () {
  var rows=JSON.parse(String(JsonIO.readString('kubejs/outlandish/juices.json')));
  var active={};
  ServerEvents.recipes(function (event) {
    var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
    var ResourceLocation=Java.loadClass('net.minecraft.resources.ResourceLocation');
    var state={added:0,applied:{},held:{}};
    active={};
    rows.forEach(function (row) {
      var chosen=null;
      var reason=null;
      var ingredientCount=row.ingredientCount===undefined?1:Number(row.ingredientCount);
      var pressAmount=row.pressAmount===undefined?50:Number(row.pressAmount);
      if (ingredientCount<1 || ingredientCount%1!==0 || pressAmount<1 || pressAmount%1!==0) reason='Invalid pressing quantity';
      else if (!Platform.isLoaded('create')) reason='Create is not loaded';
      else if (!Item.exists(row.item)) reason='Missing juice item: '+row.item;
      else if (!Item.exists('minecraft:glass_bottle')) reason='Missing glass bottle';
      else if (!Registries.FLUIDS.containsKey(new ResourceLocation(row.fluid))) reason='Missing juice fluid: '+row.fluid;
      else {
        row.tags.some(function (tag) {
          if (!Ingredient.of('#'+tag).itemIds.size()) return false;
          chosen=tag;return true;
        });
        if (!chosen) reason='Empty fruit ingredient tags: '+row.tags.join(', ');
      }
      if (reason) {
        state.held[row.item]=reason;
        console.warn('[Outlandish juices] Keeping existing recipes for '+row.item+': '+reason);
        return;
      }
      var pressIngredients=[];
      for(var i=0;i<ingredientCount;i++)pressIngredients.push({tag:chosen});

      event.remove({output:row.item});
      event.custom({type:'create:compacting',ingredients:pressIngredients,
        results:[{fluid:row.fluid,amount:pressAmount,nbt:{}}]})
        .id('otg:restored/juices/'+row.fruit+'/press');
      event.custom({type:'create:filling',ingredients:[{item:'minecraft:glass_bottle'},
        {fluid:row.fluid,amount:250}],results:[{item:row.item}]})
        .id('otg:restored/juices/'+row.fruit+'/bottle');
      active[row.item]=true;
      state.applied[row.item]={ingredientTag:chosen,ingredientCount:ingredientCount,pressAmount:pressAmount,added:2};
      state.added+=2;
    });

    console.info('[Outlandish juices] Added '+state.added+' recipes; '+Object.keys(state.held).length+' juices held with original recipes preserved.');
  });
  rows.forEach(function (row) {
    ItemEvents.foodEaten(row.item,function (event) {

      if (active[row.item] && event.player) event.player.giveInHand('minecraft:glass_bottle');
    });
  });
})();
