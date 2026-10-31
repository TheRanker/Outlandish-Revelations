// Outlandish Revelations: potion names.
(function(){

  var state={registered:false,renamed:0,lastMatch:null,errors:[]};
  var Potions,Registries;

  function error(failure){var message=String(failure);if(state.errors.indexOf(message)<0){state.errors.push(message);console.error('[Outlandish potion names] '+message);}}

  try{
    Potions=Java.loadClass('net.minecraft.world.item.alchemy.PotionUtils');
    Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
  }catch(failure){error(failure);return;}
  var names={'minecraft:potion':'Potion of Radiation','minecraft:splash_potion':'Splash Potion of Radiation','minecraft:lingering_potion':'Lingering Potion of Radiation'};
  ItemEvents.tooltip(function(event){
    Object.keys(names).forEach(function(id){
      event.addAdvanced(id,function(stack,advanced,lines){
        try{
          var nbt=stack.nbt;

          if(nbt&&nbt.display&&nbt.display.Name)return;
          var effects=Potions.getMobEffects(stack);
          if(effects.size()!==1)return;
          var effect=String(Registries.MOB_EFFECTS.getKey(effects.get(0).getEffect()));
          if(effect!=='kubejs:radiation')return;
          var base=String(Registries.POTIONS.getKey(Potions.getPotion(stack)));
          if(base!=='minecraft:water'&&base!=='minecraft:empty')return;
          if(lines.isEmpty())return;
          lines.set(0,Text.of(names[id]));
          state.renamed++;

          if(!state.lastMatch||state.lastMatch.item!==id){state.lastMatch={item:id,effect:effect,basePotion:base};}
        }catch(failure){error(failure);}
      });
    });
    state.registered=true;
  });
})();
