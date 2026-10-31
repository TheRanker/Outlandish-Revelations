// Outlandish Revelations: tome.
(function () {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/tome_manuals.json')));
  var state={ready:false,availableBooks:[],skipped:[],baseRecipeModified:0,lastPlayer:null,errors:[]};
  var prepared=null,updating=false;

  if (!Platform.isLoaded('eccentrictome') || !Item.exists('eccentrictome:tome')) {state.skipped.push({reason:'Eccentric Tome is not available'});return;}
  var Tome=Java.loadClass('website.eccentric.tome.Tome');
  var Migration=Java.loadClass('website.eccentric.tome.Migration');
  var ResourceLocation=Java.loadClass('net.minecraft.resources.ResourceLocation');
  function identity(stack) {
    var id=String(stack.id);var tag=stack.nbt;
    return id==='patchouli:guide_book'?id+'|'+(tag?String(tag['patchouli:book'] || ''):''):id;
  }
  function error(message) {if (state.errors.indexOf(message)<0) {state.errors.push(message);console.error('[Outlandish tome] '+message);}}
  function prepare() {
    prepared=[];state.ready=false;state.availableBooks=[];state.skipped=[];
    try {
    data.forEach(function (r) {
      if (!Item.exists(r.item)) {state.skipped.push({group:r.group,item:r.item,reason:'Item is not registered'});return;}
      if (r.bookId) {
        if (!Platform.isLoaded('patchouli')) {state.skipped.push({group:r.group,bookId:r.bookId,reason:'Patchouli is unavailable'});return;}
        var BookRegistry=Java.loadClass('vazkii.patchouli.common.book.BookRegistry');
        if (!BookRegistry.INSTANCE.books.containsKey(new ResourceLocation(r.bookId))) {
          var alternatives=[];var registered=BookRegistry.INSTANCE.books.keySet().toArray();
          for (var i=0;i<registered.length;i++) {var id=String(registered[i]);if(id.split(':')[0]===r.bookId.split(':')[0]) alternatives.push(id);}
          state.skipped.push({group:r.group,bookId:r.bookId,reason:'Patchouli book is not registered',registeredAlternatives:alternatives});return;
        }
      }
      var stack=Item.of(r.item,r.nbt);
      if (stack.isEmpty() || String(stack.id)!==r.item) throw Error('Invalid prepared manual: '+r.item);
      prepared.push(stack);state.availableBooks.push({group:r.group,item:r.item,bookId:r.bookId});
    });
    } catch (failure) {prepared=null;error('Manual preflight: '+failure);return false;}
    state.ready=true;return true;
  }
  function merge(stack) {
    var original=stack.copy();var before=Number(Migration.getVersion(stack));var migrated=false,added=0;
    try {
      var tag=stack.nbt;
      if (tag && tag['eccentrictome:mods'] != null && tag['eccentrictome:items'] != null) throw Error('Tome has both legacy and current book storage;preserved for review');

      if (before<1 && tag && tag['eccentrictome:mods'] != null) Migration.setVersion(stack,1);
      else if (before<2 && tag && tag['eccentrictome:items'] != null) Migration.setVersion(stack,2);
      var items=Tome.getItems(stack);var have={};
      for (var i=0;i<items.size();i++) {
        var existing=items.get(i);
        if (existing.isEmpty()) throw Error('Tome contains an unreadable existing entry;preserved for review');
        have[identity(existing)]=true;
      }

      if (String(stack.id)!=='eccentrictome:tome') have[identity(stack)]=true;
      prepared.forEach(function (book) {
        var key=identity(book);
        if (!have[key]) {items.add(book.copy());have[key]=true;added++;}
      });
      if (added) Tome.setItems(stack,items);
      migrated=Number(Migration.getVersion(stack))!==before;
      return {added:added,migrated:migrated};
    } catch (failure) {

      stack.nbt=original.nbt;
      throw failure;
    }
  }
  function updatePlayer(player,trigger) {
    if (updating) return;
    if (!prepared && !prepare()) return;
    var result={name:String(player.username),trigger:trigger,tomesSeen:0,booksAdded:0,migratedTomes:0,errors:[]};
    updating=true;
    try {
      var inventory=player.inventory;
      for (var i=0;i<inventory.getContainerSize();i++) {
        var stack=inventory.getItem(i);
        if (!Tome.isTome(stack)) continue;
        result.tomesSeen++;
        try {var changed=merge(stack);result.booksAdded+=changed.added;if(changed.migrated)result.migratedTomes++;}
        catch (failure) {var message='Slot '+i+': '+failure;result.errors.push(message);error(message);}
      }
      if (result.booksAdded || result.migratedTomes) {inventory.setChanged();player.inventoryMenu.broadcastChanges();}
    } catch (failure) {var message='Inventory update: '+failure;result.errors.push(message);error(message);}
    finally {updating=false;}
    if (trigger==='login' || result.booksAdded || result.migratedTomes || result.errors.length) {state.lastPlayer=result;}
  }
  ServerEvents.recipes(function (event) {
    if (!prepare()) return;
    try {
    var filled=Item.of('eccentrictome:tome');merge(filled);

    event.forEachRecipe({id:'eccentrictome:tome'},function (recipe) {if(recipe.replaceOutput('eccentrictome:tome',filled)) state.baseRecipeModified++;});
    } catch (failure) {error('Base tome recipe: '+failure);}

  });
  ServerEvents.loaded(function () {prepare();});
  PlayerEvents.loggedIn(function (event) {
    if (prepare()) updatePlayer(event.player,'login');
    else {state.lastPlayer={name:String(event.player.username),trigger:'login',status:'held_preflight',errors:state.errors.slice()};}
  });
  PlayerEvents.inventoryChanged(function (event) {
    if (!updating && Tome.isTome(event.item)) updatePlayer(event.player,'inventory_changed');
  });
})();
