// Outlandish Revelations: recipe schema fixes.
StartupEvents.recipeSchemaRegistry(function(event){
  var Schema=Java.loadClass('dev.latvian.mods.kubejs.recipe.schema.RecipeSchema');
  var Strings=Java.loadClass('dev.latvian.mods.kubejs.recipe.component.StringComponent');
  var Items=Java.loadClass('dev.latvian.mods.kubejs.recipe.component.ItemComponents');

  event.register('botania:brew',new Schema(Strings.ID.key('brew'),Items.INPUT_ARRAY.key('ingredients')));
  var Cooking=Java.loadClass('qinomed.kubejsdelight.recipe.CookingRecipeJS');
  var Numbers=Java.loadClass('dev.latvian.mods.kubejs.recipe.component.NumberComponent');
  var Float=Java.loadClass('java.lang.Float');
  var Long=Java.loadClass('java.lang.Long');

  event.register('farmersdelight:cooking',new Schema(Cooking.INGREDIENTS,Cooking.ITEM,
    Numbers.FLOAT.key('experience').optional(Float.valueOf('0.0')).alt('exp','xp'),
    Cooking.TIME.optional(Long.valueOf('200')),Cooking.CONTAINER));

  Java.loadClass('dev.latvian.mods.kubejs.recipe.schema.minecraft.SmithingTransformRecipeSchema').TEMPLATE.allowEmpty();
});
