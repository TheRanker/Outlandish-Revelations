// Outlandish Revelations: create manual.
(function () {

  var settingsPath='kubejs/outlandish/create_manual_settings.json';
  var state={ready:false,added:0,range:64,defaultMode:'PonderTagIndexScreen',clicksReceived:0,lastUse:null,lastClientResult:null,errors:[]};
  var busy={},settings={page_type:'PonderTagIndexScreen'};

  function validMode(value){return value==='PonderTagIndexScreen'||value==='PonderIndexScreen';}
  function error(message){state.errors.push(String(message));console.error('[Outlandish Create manual] '+message);}
  try {var raw=JsonIO.readString(settingsPath);if(raw){var old=JSON.parse(String(raw));if(old&&validMode(old.page_type))settings.page_type=old.page_type;}}
  catch (failure){error('Settings read: '+failure);}
  state.defaultMode=settings.page_type;
  if(!Platform.isLoaded('create')||!Item.exists('create:create_manual'))return;
  state.ready=true;
  function mode(player){var value=String(player.persistentData.create_manual_page_type||'');return validMode(value)?value:settings.page_type;}
  function holding(player){return String(player.mainHandItem.id)==='create:create_manual';}
  function cooldown(player){var id=String(player.uuid);if(busy[id])return false;busy[id]=true;player.server.scheduleInTicks(3,function(){delete busy[id];});return true;}
  function use(event){
    var player=event.player;
    if(!holding(player)||String(event.item.id)!=='create:create_manual')return;
    state.clicksReceived++;
    try {
      if(cooldown(player)){
      state.lastUse={name:String(player.username),status:'handling_click'};
      var candidates=[];
      var add=function(id){id=String(id);if(candidates.indexOf(id)<0)candidates.push(id);};
      if(!player.isCrouching()){
        var ray=player.rayTrace(64),block=ray.block;
        if(block){
          var id=String(block.id);
          if(id.indexOf('andesite_encased')>=0)add('create:andesite_casing');
          else if(id.indexOf('brass_encased')>=0)add('create:brass_casing');
          else if(id.indexOf('encased')>=0&&id.indexOf('fluid')>=0)add('create:copper_casing');
          add(id);block.getDrops().forEach(function(drop){add(drop.id);});
          if(candidates.indexOf('create:vertical_gearbox')>=0)candidates=candidates.filter(function(v){return v!=='create:gearbox';});
        }
      }
      var payload={mode:mode(player),candidates:candidates};
      player.sendData('otg_port_manual_open',{payload:JSON.stringify(payload)});
      state.lastUse={name:String(player.username),mode:payload.mode,candidates:candidates,status:'sent_to_client'};
      }
    }catch(failure){error('Use: '+failure);}

    event.cancel();
  }
  ItemEvents.rightClicked('create:create_manual',use);
  BlockEvents.rightClicked(use);
  NetworkEvents.dataReceived('otg_port_manual_toggle',function(event){
    var player=event.player;if(!holding(player)||!cooldown(player))return;
    var next=mode(player)==='PonderTagIndexScreen'?'PonderIndexScreen':'PonderTagIndexScreen';
    player.persistentData.create_manual_page_type=next;player.tell('Create Manual: '+next);
  });
  NetworkEvents.dataReceived('otg_port_manual_result',function(event){

    try {var value=JSON.parse(String(event.data.payload));state.lastClientResult={name:String(event.player.username),status:String(value.status),screen:String(value.screen||''),matches:value.matches||[],error:value.error?String(value.error):null};}
    catch(failure){error('Client diagnostic: '+failure);}
  });
  ServerEvents.recipes(function(event){
    try{event.shapeless('create:create_manual',['minecraft:book','create:andesite_alloy']).id('otg:restored/create_manual');state.added=1;}
    catch(failure){error('Recipe: '+failure);}
  });
  ServerEvents.commandRegistry(function(event){
    var C=event.commands;
    function personal(value){return function(ctx){var p=ctx.source.player;if(value==='reset')delete p.persistentData.create_manual_page_type;else p.persistentData.create_manual_page_type=value;p.tell('Create Manual: '+mode(p));return 1;};}
    function defaults(value){return function(ctx){settings.page_type=value;JsonIO.write(settingsPath,settings);state.defaultMode=value;ctx.source.player.tell('Create Manual default: '+value);return 1;};}
    event.register(C.literal('create_manual_config')
      .then(C.literal('page_type').then(C.literal('PonderTagIndexScreen').executes(personal('PonderTagIndexScreen'))).then(C.literal('PonderIndexScreen').executes(personal('PonderIndexScreen'))).then(C.literal('reset').executes(personal('reset'))))
      .then(C.literal('default_page_type').requires(function(src){return src.hasPermission(2);}).then(C.literal('PonderTagIndexScreen').executes(defaults('PonderTagIndexScreen'))).then(C.literal('PonderIndexScreen').executes(defaults('PonderIndexScreen'))))
      .then(C.literal('help').executes(function(ctx){ctx.source.player.tell('/create_manual_config page_type <PonderTagIndexScreen|PonderIndexScreen|reset>\n/create_manual_config default_page_type <PonderTagIndexScreen|PonderIndexScreen> (operator)');return 1;})));
  });
})();
