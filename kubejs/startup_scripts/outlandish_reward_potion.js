// Outlandish Revelations: reward potion.
StartupEvents.registry('potion', function(event){
  event.createCustom('kubejs:radiation', function(){
    var Location=Java.loadClass('net.minecraft.resources.ResourceLocation');
    var Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
    var PotionBuilder=Java.loadClass('dev.latvian.mods.kubejs.misc.PotionBuilder');
    var id=new Location('kubejs:radiation');
    var effect=Registries.MOB_EFFECTS.getValue(id);
    if(!effect)throw new Error('[Outlandish potion] Radiation effect missing during potion registration');
    return new PotionBuilder(id).effect(effect,600,0).createObject();
  });
});
