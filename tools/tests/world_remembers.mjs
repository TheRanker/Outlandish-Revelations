import fs from 'node:fs/promises';
import vm from 'node:vm';

const root=new URL('../../',import.meta.url);
const read=async path=>fs.readFile(new URL(path,root),'utf8');
const base='kubejs/';
const sources={core:await read(base+'startup_scripts/outlandish_world_remembers_core.js'),
  bridge:await read(base+'startup_scripts/outlandish_world_remembers_events.js'),
  server:await read(base+'server_scripts/outlandish_world_remembers.js'),
  client:await read(base+'client_scripts/outlandish_world_remembers.js')};
const config=JSON.parse(await read(base+'outlandish/world_remembers.json'));
const report=[];
function check(name,test){if(!test)throw Error(name);report.push({name,passed:true});}
for(const [name,source] of Object.entries(sources))new vm.Script(source,{filename:name});
check('All four added JavaScript files parse',true);
const aliceId='11111111-1111-4111-8111-111111111111';
const bobId='22222222-2222-4222-8222-222222222222';
class List{constructor(items){this.data=items;}size(){return this.data.length;}get(i){return this.data[i];}}
function text(value){return {value:String(value),append(other){this.value+=other.value;return this;},gold(){return this;},bold(){return this;},italic(){return this;},clickRunCommand(command){this.command=command;return this;}};}
class Player{
  constructor(uuid,name,server,swordSlot=-1){this.uuid=uuid;this.name=name;this.server=server;this.x=0;this.y=61;this.z=0;this.chat=[];this.packets=[];this.awards=[];
    this.slots=Array.from({length:36},(_,i)=>({id:i===swordSlot?'kubejs:rankers_sword':'minecraft:air',isEmpty(){return this.id==='minecraft:air';}}));
    this.offhand=[{id:'minecraft:air',isEmpty(){return this.id==='minecraft:air';}}];
    this.level={dimension:'minecraft:overworld',getEntity:id=>server.entities[id],anchorBlockId:'minecraft:lodestone',getBlockState(){return {getBlock:()=>this.anchorBlockId};}};}
  get username(){return this.name;}
  getInventory(){return {items:new List(this.slots),offhand:new List(this.offhand)};}getItemInHand(){return {id:'quest_giver:quest_scroll'};}
  distanceToSqr(target){return (this.x-target.x)**2+(this.y-target.y)**2+(this.z-target.z)**2;}
  getAdvancements(){return {award:(adv,criterion)=>this.awards.push({adv,criterion})};}
  sendData(channel,data){this.packets.push({channel,data});}tell(message){this.chat.push(message);}
}
function serverFrom(saved={}){return {values:{...saved},entities:{},persistentData:{getString(key){return this.owner.values[key]??'';},putString(key,value){this.owner.values[key]=value;}},getAdvancements(){return {getAdvancement:location=>location.value};}};}
class Literal{
  constructor(name){this.name=name;this.children=[];}executes(handler){this.handler=handler;return this;}
  requires(requirement){this.requirement=requirement;return this;}then(child){this.children.push(child);return this;}
}
function makeEnvironment(enabled=false,saved={},requireAnchor=false,clientSide=false){
  const settings=structuredClone(config);settings.ceremonyIntegrationEnabled=enabled;
  settings.memorials=[{id:'test_only',dimension:'minecraft:overworld',anchor:{x:0,y:60,z:0},interaction:{x:0,y:61,z:0},plaque:{x:0.5,y:61.5,z:0.01,yaw:0,scale:0.01}}];
  if(requireAnchor)settings.memorials[0].anchor.requiredBlockId='minecraft:lodestone';
  const server=serverFrom(saved);server.persistentData.owner=server;
  const hooks={login:null,block:null,command:null,nativeListeners:[],clientEvents:[]};
  const logs=[];const packets=[];const classLoads=[];
  const clock={value:'2026-11-03T12:00:00Z'};
  const native={
    uuid:entity=>entity.uuid,username:player=>player.username,
    hasSword:player=>[...player.slots,...player.offhand].some(stack=>stack.id==='kubejs:rankers_sword'),
    installConversation:callback=>hooks.nativeListeners.push(['LOWEST',true,'entity-interact-specific-class',callback]),
    installRenderer:callback=>{if(clientSide)hooks.clientEvents.push(['net.minecraftforge.client.event.RenderLevelStageEvent',callback]);}
  };
  const java={
    'com.theranker.creativeguard.WorldRemembersBridge':native,
    'java.time.Instant':{now:()=>({toString:()=>clock.value})},
    'java.util.UUID':{fromString:value=>value},
    'net.minecraft.resources.ResourceLocation':class{constructor(value){this.value=value;}},
    'net.minecraft.server.level.ServerPlayer':Player,
    'net.minecraft.core.BlockPos':class{},
    'net.minecraftforge.registries.ForgeRegistries':{BLOCKS:{getKey:block=>block}},
    'com.saphienyako.quest_giver.network.QuestGiverNetwork':{sendToPlayer:(packet,player)=>packets.push({packet,player})},
    'com.saphienyako.quest_giver.network.OpenQuestDisplayMessage':class{constructor(...args){this.args=args;}},
    'com.saphienyako.quest_giver.quest.QuestDisplay':class{constructor(title,description,sound){Object.assign(this,{title,description,sound});}},
    'com.saphienyako.quest_giver.quest.QuestLinkManager':{getMatchingLink:target=>target.link},
    'net.minecraftforge.common.MinecraftForge':{EVENT_BUS:{addListener:(...args)=>hooks.nativeListeners.push(args)}},
    'net.minecraftforge.eventbus.api.EventPriority':{LOWEST:'LOWEST'},
    'net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteractSpecific':{__javaObject__:'entity-interact-specific-class'}
  };
  const sandbox={global:{},Platform:{isClientEnvironment:()=>clientSide},console:{error:value=>logs.push(value)},Java:{loadClass(name){classLoads.push(name);if(!(name in java))throw Error('Unexpected class: '+name);return java[name];}},
    JsonIO:{readString:()=>JSON.stringify(settings)},Text:{of:text},
    ForgeEvents:{onEvent:(...args)=>hooks.clientEvents.push(args)},
    BlockEvents:{rightClicked:fn=>hooks.block=fn},PlayerEvents:{loggedIn:fn=>hooks.login=fn},
    ServerEvents:{commandRegistry:fn=>hooks.command=fn}};
  const context=vm.createContext(sandbox);
  vm.runInContext(sources.core,context);vm.runInContext(sources.bridge,context);vm.runInContext(sources.server,context);
  const alice=new Player(aliceId,'OriginalName',server,35),bob=new Player(bobId,'OtherPlayer',server,20);
  server.players=[alice,bob];
  return {sandbox,server,hooks,logs,packets,classLoads,alice,bob,settings,context,clock,api:sandbox.global.ORWorldRemembers};
}
function receipt(uuid=aliceId){return {version:1,success:true,ceremonyId:'outlandish:tier1_three_offerings',altarTier:1,acceptedOfferings:3,
  playerUuid:uuid,bindingOwnerUuid:uuid,relicId:'kubejs:rankers_sword',transactionId:'test-only-transaction-0001'};}
const disabled=makeEnvironment();
check('Distributed ceremony hook refuses completion',disabled.api.completeAwakening(disabled.alice,receipt()).reason==='ceremony_integration_not_connected');
check('Disabled hook creates no records or achievements',Object.keys(disabled.server.values).length===0 && disabled.alice.awards.length===0);
check('Dedicated-server bridge registers no render event',disabled.hooks.clientEvents.length===0);
const clientBridge=makeEnvironment(false,{},false,true);
check('Client bridge registers the render observer',clientBridge.hooks.clientEvents.length===1 && clientBridge.hooks.clientEvents[0][0]==='net.minecraftforge.client.event.RenderLevelStageEvent');
check('Side checks never load filtered FML classes',![...disabled.classLoads,...clientBridge.classLoads].some(name=>name.startsWith('net.minecraftforge.fml.loading.')));
check('Dedicated-server path loads no client rendering classes',!disabled.classLoads.some(n=>n.startsWith('net.minecraft.client.')||n.startsWith('net.minecraftforge.client.')));
check('Conversation observer receives canceled events at LOWEST',disabled.hooks.nativeListeners[0][0]==='LOWEST' && disabled.hooks.nativeListeners[0][1]===true);
check('Observer uses the loaded event Class without forbidden reflection',disabled.hooks.nativeListeners[0][2]==='entity-interact-specific-class' && !disabled.classLoads.includes('java.lang.Class'));

const env=makeEnvironment(true);
for(const [label,alter] of [
  ['unsuccessful',r=>r.success=false],['wrong player',r=>r.playerUuid=bobId],['wrong binding',r=>r.bindingOwnerUuid=bobId],
  ['wrong tier',r=>r.altarTier=2],['missing offering',r=>r.acceptedOfferings=2],['wrong relic',r=>r.relicId='kubejs:rankers_ring'],
  ['missing transaction',r=>delete r.transactionId]
]){const r=receipt();alter(r);check('Completion rejects '+label,env.api.completeAwakening(env.alice,r).ok===false);}
check('Rejected receipts never mutate personal data',Object.keys(env.server.values).length===0);
const result=env.api.completeAwakening(env.alice,receipt());
check('Valid trusted completion with sword in slot 35 succeeds',result.ok && !result.alreadyComplete);
check('Only completing player earns achievement',env.alice.awards.length===1 && env.bob.awards.length===0);
check('Completion is UUID-owned, not team-owned',env.api.getPersonalRecord(env.alice).playerUuid===aliceId && env.api.getPersonalRecord(env.bob)===null);
check('Completion stores its original UTC timestamp',env.api.getPersonalRecord(env.alice).completedAtUtc==='2026-11-03T12:00:00Z');
check('Hook is idempotent',env.api.completeAwakening(env.alice,receipt()).alreadyComplete===true);
env.clock.value='2027-02-01T09:00:00Z';env.api.completeAwakening(env.alice,receipt());
check('Replay never overwrites the completion date',env.api.getPersonalRecord(env.alice).completedAtUtc==='2026-11-03T12:00:00Z');
env.alice.name='RenamedPlayer';
env.hooks.login({player:env.alice});
check('Rename preserves completion',env.api.getPersonalRecord(env.alice).usernameAtCompletion==='OriginalName');
const personal=JSON.parse(env.alice.packets.at(-1).data.payload);
check('Plaque uses current username after rename',personal.lines[2].text==='RenamedPlayer');
check('Fulfilled plaque has the exact requested inscription',personal.lines.map(l=>l.text).join('|')==="THE RANKER'S MEMORIAL|The Promise Fulfilled|RenamedPlayer|Bearer of Tears for Fears|A promise once broken, now fulfilled.");
env.hooks.login({player:env.bob});
check('Same memorial gives uncompleted player original text',JSON.parse(env.bob.packets.at(-1).data.payload).lines[1].text==='The Unfinished Promise');
const deadReplacement=new Player(aliceId,'RenamedPlayer',env.server,-1);
env.hooks.login({player:deadReplacement});
check('Death/replacement player keeps UUID record without carrying sword',env.api.getPersonalRecord(deadReplacement).completedAtUtc===result.completedAtUtc);
const restarted=makeEnvironment(true,JSON.parse(JSON.stringify(env.server.values)));
check('Serialized server restart restores record',restarted.api.getPersonalRecord(restarted.alice).completedAtUtc===result.completedAtUtc);

const target={x:1,y:61,z:0,link:{questLineId:'garrick_ashford'},uuid:'33333333-3333-4333-8333-333333333333',getId:()=>42,isAlive:()=>true};
env.server.entities[target.uuid]=target;
let canceled=false;
const conversation={getEntity:()=>env.alice,getHand:()=> 'MAIN_HAND',getTarget:()=>target,setCanceled:()=>canceled=true};
const previousChat=env.alice.chat.length;
env.sandbox.global.ORWorldRemembersConversation(conversation);
env.sandbox.global.ORWorldRemembersConversation(conversation);
check('Inventory sword recognized with Quest Scroll held',env.alice.chat.length===previousChat+1);
check('Recognition prompt appears once per NPC, not every interaction',env.alice.chat.at(-1).value.includes('[Listen]'));
check('Ordinary conversation is not canceled',!canceled);
const rootCommands=[];
env.hooks.command({commands:{literal:name=>new Literal(name)},register:cmd=>rootCommands.push(cmd)});
const command=rootCommands[0];
const greet=command.children.find(c=>c.name==='greet');
check('All twelve optional recognition branches registered',greet.children.length===12);
greet.children.find(c=>c.name==='garrick_ashford').handler({source:{player:env.alice}});
check('Listen opens verified display-only Quest Giver packet',env.packets.length===1 && env.packets[0].packet.args[1]===false && env.packets[0].packet.args[5]===false);
check('Congratulations do not grant another completion record',env.api.getPersonalRecord(env.bob)===null);
const names=[];function collect(node){names.push(node.name);node.children.forEach(collect);}collect(command);
check('No completion grant/revoke command exposed',!names.some(n=>['grant','complete','awaken','revoke'].includes(n)));
for(const npc of config.npcs){
  const actor={...target,link:{questLineId:npc.id},uuid:target.uuid};env.server.entities[actor.uuid]=actor;
  const interaction={...conversation,getEntity:()=>env.bob,getTarget:()=>actor};
  env.sandbox.global.ORWorldRemembersConversation(interaction);
  const count=env.packets.length;
  greet.children.find(c=>c.name===npc.id).handler({source:{player:env.bob}});
  check('Personal contextual dialogue works for '+npc.id,env.packets.length===count+1 && env.packets.at(-1).packet.args[0].description.value===npc.carrying);
}
check('Carrying the sword never awards awakening',env.bob.awards.length===0 && env.api.getPersonalRecord(env.bob)===null);
const offhandEnv=makeEnvironment(true);offhandEnv.alice.slots[35].id='minecraft:air';offhandEnv.alice.offhand[0].id='kubejs:rankers_sword';
check('Vanilla offhand is recognized without main-hand requirement',offhandEnv.api.completeAwakening(offhandEnv.alice,receipt()).ok);
const anchorEnv=makeEnvironment(false,{},true);let plaqueCanceled=false;
anchorEnv.alice.level.anchorBlockId='minecraft:air';
anchorEnv.hooks.block({hand:'MAIN_HAND',block:{x:0,y:61,z:0},player:anchorEnv.alice,cancel:()=>plaqueCanceled=true});
check('Missing required hidden anchor refuses plaque interaction',!plaqueCanceled && anchorEnv.alice.chat.length===0);
anchorEnv.alice.level.anchorBlockId='minecraft:lodestone';
anchorEnv.hooks.block({hand:'MAIN_HAND',block:{x:0,y:61,z:0},player:anchorEnv.alice,cancel:()=>plaqueCanceled=true});
check('Present hidden anchor enables only the configured interaction',plaqueCanceled && anchorEnv.alice.chat.length>0);
const corrupted=makeEnvironment(true,{['or_world_remembers_v1_'+aliceId]:'{not valid json'});
corrupted.hooks.login({player:corrupted.alice});
check('Corrupt personal data does not grant completion',corrupted.alice.awards.length===0 && corrupted.logs.length===1);

// Client renderer smoke test with two separate client contexts. No graphics claimed.
function drawSnapshot(packet,uuid,anchorBlockId='minecraft:lodestone'){
  const drawn=[];let receiver;let logout;
  const pose={pushPose(){},popPose(){},translate(){},mulPose(){},scale(){},last:()=>({pose:()=>({})})};
  const mc={player:{uuid},level:{dimension:'minecraft:overworld',getBlockState:()=>({getBlock:()=>anchorBlockId})},
    font:{width:t=>t.value.length,drawInBatch:(t,x,y,color)=>{if(!Number.isInteger(color)||color>2147483647||color< -2147483648)throw Error('Java ARGB int overflow');drawn.push(t.value);}},renderBuffers:()=>({bufferSource:()=>({endBatch(){}})})};
  const classes={'com.theranker.creativeguard.WorldRemembersBridge':{uuid:entity=>entity.uuid},'net.minecraft.client.Minecraft':{getInstance:()=>mc},'net.minecraftforge.client.event.RenderLevelStageEvent$Stage':{AFTER_TRANSLUCENT_BLOCKS:'after'},
    'net.minecraft.client.gui.Font$DisplayMode':{NORMAL:'normal'},'com.mojang.math.Axis':{YP:{rotationDegrees:value=>value}},
    'net.minecraft.core.BlockPos':class{},'net.minecraftforge.registries.ForgeRegistries':{BLOCKS:{getKey:block=>block}}};
  const sandbox={global:{},Java:{loadClass:name=>classes[name]},Text:{of:text},console,
    NetworkEvents:{dataReceived:(channel,handler)=>receiver=handler},ClientEvents:{loggedOut:fn=>logout=fn}};
  vm.runInNewContext(sources.client,sandbox);
  receiver({data:{payload:JSON.stringify(packet)}});
  sandbox.global.ORWorldRemembersRender({getStage:()=> 'after',getCamera:()=>({getPosition:()=>({x:()=>0,y:()=>61,z:()=>0})}),getPoseStack:()=>pose});
  logout();return drawn;
}
const aliceLines=drawSnapshot(personal,aliceId);
const bobSnapshot=JSON.parse(env.bob.packets.at(-1).data.payload);
const bobLines=drawSnapshot(bobSnapshot,bobId);
check('Two client render contexts show independent inscriptions',aliceLines.includes('RenamedPlayer') && !bobLines.includes('RenamedPlayer'));
check('Client refuses state belonging to another UUID',drawSnapshot(personal,bobId).length===0);
const guardedSnapshot=structuredClone(personal);guardedSnapshot.memorials[0].anchor.requiredBlockId='minecraft:lodestone';
check('Client hides plaque if required hidden anchor is missing',drawSnapshot(guardedSnapshot,aliceId,'minecraft:air').length===0);
check('No serverbound completion receiver exists',!sources.server.includes('NetworkEvents.dataReceived'));

const output={testType:'Node mocked integration/state tests; not a live Forge or graphics test',passed:report.length,failed:0,tests:report};
await fs.mkdir(new URL('build/validation/',root),{recursive:true});
await fs.writeFile(new URL('build/validation/world_remembers_tests.json',root),JSON.stringify(output,null,2)+'\n');
console.log(report.length+' mocked World Remembers checks passed (not a live Minecraft test).');
export default output;
