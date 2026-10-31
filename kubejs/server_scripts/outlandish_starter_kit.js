// Outlandish Revelations: starter kit.
(function () {
  var data=JSON.parse(String(JsonIO.readString('kubejs/outlandish/starter_kit.json')));
  var EquipmentSlot=Java.loadClass('net.minecraft.world.entity.EquipmentSlot');
  var prepared=null;
  var state={phase:'registered',ready:false,entries:data.entries.length,scanner:null,lastPlayer:null,errors:[]};

  function prepare() {
    state.errors=[];state.ready=false;state.phase='preflight';prepared=null;
    var pending=[];
    data.entries.forEach(function (r) {if (!Item.exists(r.item)) state.errors.push('Missing starter item: '+r.item);});
    data.scannerModules.forEach(function (id) {if (!Item.exists(id)) state.errors.push('Missing scanner module: '+id);});
    if (state.errors.length) {state.phase='held';return false;}
    try {
      data.entries.forEach(function (r) {
        var stack=r.nbt?Item.of(r.item,r.nbt):Item.of(r.item,r.count);
        if (String(stack.id)!==r.item || Number(stack.count)!==r.count) throw Error('Unexpected prepared stack: '+r.item);
        pending.push({entry:r,stack:stack});
      });
      var scanner=pending.filter(function (p) {return p.entry.key==='scanner';})[0].stack;
      var ScannerContainer=Java.loadClass('li.cil.scannable.common.inventory.ScannerContainer');
      var container=ScannerContainer.of(scanner);
      var checked={totalSlots:Number(container.getContainerSize()),activeSlots:Number(container.getActiveModules().getContainerSize()),spareSlots:Number(container.getInactiveModules().getContainerSize()),modules:[]};
      data.scannerModules.forEach(function (id,i) {
        var module=container.getItem(i);
        checked.modules.push({slot:i,item:String(module.id),count:Number(module.count),active:i<checked.activeSlots});
        if (String(module.id)!==id || Number(module.count)!==1) throw Error('Scanner module failed native deserialization in slot '+i);
      });
      if (checked.totalSlots!==9 || checked.activeSlots!==3 || checked.spareSlots!==6) throw Error('Unexpected scanner slot layout');
      state.scanner=checked;prepared=pending;state.ready=true;state.phase='ready';
    } catch (error) {state.errors.push(String(error));state.phase='held';}
    return state.ready;
  }
  ServerEvents.loaded(function () {prepare();});
  ServerEvents.unloaded(function () {prepared=null;});
  PlayerEvents.loggedIn(function (event) {
    var player=event.player;
    var result={name:String(player.username),status:'checking',granted:[],alreadyGranted:[],errors:[]};
    state.lastPlayer=result;
    if (player.stages.has(data.legacyStage)) {result.status='already_received_legacy';return;}
    var persistent=player.persistentData;
    var progress=persistent.getCompound('otg_port:starter_kit');
    if (progress.getBoolean('complete')) {result.status='already_received';return;}
    if (!prepared && !prepare()) {result.status='held';result.errors=state.errors.slice();return;}

    persistent.put('otg_port:starter_kit',progress);
    try {
      prepared.forEach(function (p) {
        var r=p.entry;var key='given_'+r.key;
        if (progress.getBoolean(key)) {result.alreadyGranted.push(r.key);return;}
        var stack=p.stack.copy();var delivery='inventory';
        if (r.slot && player.getEquipment(EquipmentSlot[r.slot]).isEmpty()) {
          player.setEquipment(EquipmentSlot[r.slot],stack);delivery='equipped';
        } else {player.give(stack);}
        progress.putBoolean(key,true);
        result.granted.push({key:r.key,item:r.item,count:r.count,delivery:delivery});
      });
      progress.putBoolean('complete',true);
      player.stages.add(data.legacyStage);result.status='granted';
    } catch (error) {result.status='incomplete';result.errors.push(String(error));}

    if (result.errors.length) console.error('[Outlandish starter kit] '+result.name+': '+result.errors.join('; '));
    else console.info('[Outlandish starter kit] '+result.name+': '+result.status+' ('+result.granted.length+' entries this login)');
  });
})();
