// Outlandish Revelations: potion names.
(function(){

  var updating=false;
  var state={ready:false,renamed:0,lastUpdate:null,errors:[]};
  var Potions,Registries;
  var names={'minecraft:potion':'Potion of Radiation','minecraft:splash_potion':'Splash Potion of Radiation','minecraft:lingering_potion':'Lingering Potion of Radiation'};

  function error(failure){var message=String(failure);if(state.errors.indexOf(message)<0){state.errors.push(message);console.error('[Outlandish potion stack names] '+message);}}

  try{
    Potions=Java.loadClass('net.minecraft.world.item.alchemy.PotionUtils');
    Registries=Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
    state.ready=true;
  }catch(failure){error(failure);return;}
  function title(stack){
    var name=names[String(stack.id)];if(!name)return null;
    var nbt=stack.nbt;if(nbt&&nbt.display&&nbt.display.Name)return null;
    var effects=Potions.getMobEffects(stack);if(effects.size()!==1)return null;
    if(String(Registries.MOB_EFFECTS.getKey(effects.get(0).getEffect()))!=='kubejs:radiation')return null;
    var base=String(Registries.POTIONS.getKey(Potions.getPotion(stack)));
    return base==='minecraft:water'||base==='minecraft:empty'?name:null;
  }
  function update(player,trigger){
    if(updating)return;updating=true;var changed=0;
    try{
      var inventory=player.inventory;
      for(var slot=0;slot<inventory.getContainerSize();slot++){
        var stack=inventory.getItem(slot),name=title(stack);
        if(!name)continue;

        inventory.setItem(slot,stack.withName(Text.of(name)));changed++;
      }
      if(changed){inventory.setChanged();player.inventoryMenu.broadcastChanges();state.renamed+=changed;}
    }catch(failure){error(failure);}
    finally{updating=false;}
    if(trigger==='login'||changed){state.lastUpdate={trigger:trigger,renamed:changed};}
  }
  PlayerEvents.loggedIn(function(event){update(event.player,'login');});
  PlayerEvents.inventoryChanged(function(event){if(!updating&&names[String(event.item.id)])update(event.player,'inventory_changed');});
})();
