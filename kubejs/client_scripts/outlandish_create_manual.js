// Outlandish Revelations: create manual.
(function () {

  var state={ready:false,lastOpen:null,scopedFilterActive:false,tagRegistryMutations:false,pluginRegistered:false,errors:[]};
  var Index,UI,Plugin,TagIndexScreen,IndexScreen,Opener,Location;
  var pending=null;

  function feedback(value){state.lastOpen=value;if(Client.player)Client.player.sendData('otg_port_manual_result',{payload:JSON.stringify(value)});}
  function error(failure){var message=String(failure);state.errors.push(message);console.error('[Outlandish Create manual client] '+message);feedback({status:'error',error:message});}
  global.otgPortManualScroll=null;global.otgPortManualFilter=null;
  if(!Platform.isLoaded('create'))return;
  try{
    Index=Java.loadClass('net.createmod.ponder.foundation.PonderIndex');
    UI=Java.loadClass('net.createmod.ponder.foundation.ui.PonderUI');
    Plugin=Java.loadClass('net.createmod.ponder.api.registration.PonderPlugin');
    TagIndexScreen=Java.loadClass('net.createmod.ponder.foundation.ui.PonderTagIndexScreen');
    IndexScreen=Java.loadClass('net.createmod.ponder.foundation.ui.PonderIndexScreen');
    Opener=Java.loadClass('net.createmod.catnip.gui.ScreenOpener');
    Location=Java.loadClass('net.minecraft.resources.ResourceLocation');

    global.otgPortManualApplyExclusions=function(helper){
      if(!global.otgPortManualFilter)return;
      var allowed=global.otgPortManualFilter.slice();
      helper['exclude(java.util.function.Predicate)'](function(item){return allowed.indexOf(String(Item.of(item).id))<0;});
    };
    if(!global.otgPortManualPlugin){
      var plugin=new Plugin({getModId:function(){return 'otg_port_manual';},indexExclusions:function(helper){if(global.otgPortManualApplyExclusions)global.otgPortManualApplyExclusions(helper);}});
      Index.addPlugin(plugin);global.otgPortManualPlugin=plugin;
    }
    state.pluginRegistered=true;state.ready=true;
  }catch(failure){error(failure);return;}
  function multiScreen(matches){
    global.otgPortManualFilter=matches.slice();state.scopedFilterActive=true;
    try{return new IndexScreen();}
    finally{global.otgPortManualFilter=null;state.scopedFilterActive=false;}
  }
  NetworkEvents.dataReceived('otg_port_manual_open',function(event){
    try{
      var data=JSON.parse(String(event.data.payload)),matches=[];
      (data.candidates||[]).forEach(function(id){id=String(id);if(matches.indexOf(id)<0&&Index.getSceneAccess().doScenesExistForId(new Location(id)))matches.push(id);});
      var screen,kind;
      if(matches.length===1){screen=UI.of(new Location(matches[0]));kind='target';}
      else if(matches.length>1){screen=multiScreen(matches);kind='multiple_targets';}
      else if(data.mode==='PonderIndexScreen'){screen=new IndexScreen();kind='item_index';}
      else{screen=new TagIndexScreen();kind='tag_index';}
      Opener.clearStack();Opener.open(screen);
      pending={screen:screen,kind:kind,matches:matches,ticks:0};
      state.lastOpen={status:'open_requested',screen:kind,matches:matches};
    }catch(failure){error(failure);}
  });
  ClientEvents.tick(function(){

    if(pending){
      pending.ticks++;
      if(Client.currentScreen===pending.screen||pending.screen.equals(Client.currentScreen)){
        var done=pending;pending=null;feedback({status:'opened',screen:done.kind,matches:done.matches});
      }else if(pending.ticks>40){pending=null;error('Ponder screen did not become active within40 client ticks');}
    }
  });
  global.otgPortManualScroll=function(event){
    try {
    var p=Client.player;
    if(Client.currentScreen!=null||!p||String(p.mainHandItem.id)!=='create:create_manual'||!(p.isCrouching()||Client.isShiftDown()))return;
    if(event.getScrollDelta()===0)return;
    p.sendData('otg_port_manual_toggle',{});event.setCanceled(true);
    }catch(failure){error(failure);}
  };
  ItemEvents.tooltip(function(event){event.add('create:create_manual',Text.yellow('Right-click a block for Ponder help,up to64 blocks. Right-click elsewhere to browse. Shift + scroll switches browsing modes.'));});

})();
