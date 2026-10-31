// Outlandish Revelations: dimension gate.
(function(){
    var dimensions={
        'minecraft:the_nether':'nether',
        'minecraft:the_end':'end',
        'twilightforest:twilight_forest':'twilight'
    };
    var stages={nether:'nether_access',end:'end_access',twilight:'twilight_access'};
    var labels={nether:'the Nether',end:'the End',twilight:'Twilight Forest'};
    var requirements={
        nether:'Your team must trigger a Warden and defeat that same Warden.',
        end:'Your team must summon a Wither and defeat that same Wither.',
        twilight:'A member of your team must enter the End first.'
    };
    var Hooks=null,ticks=0,lastError='';
    function error(failure){var msg=String(failure);if(msg!==lastError){console.error('[OR Team Progression] '+msg);lastError=msg;}}
    function sync(player){
        if(!Hooks)return;
        Object.keys(stages).forEach(function(key){
            var allowed=Hooks.has(player,key),present=player.stages.has(stages[key]);
            if(allowed&&!present)player.stages.add(stages[key]);
            else if(!allowed&&present)player.stages.remove(stages[key]);
        });
    }
    function syncAll(server){server.players.forEach(sync);}
    global.otgPortDimensionGate=function(event){
        var player=event.getEntity(),key=dimensions[String(event.getDimension().location())];
        if(!player.player||!key)return;
        var allowed=false;
        try{allowed=Hooks!==null&&Hooks.has(player,key);sync(player);}catch(failure){error(failure);}
        if(!allowed){event.setCanceled(true);player.statusMessage=Text.of(Hooks?requirements[key]:'Dimension access is unavailable: progression service failed to load.');}
    };
    global.otgTeamBossDeath=function(event){
        var boss=event.getEntity(),id=String(boss.type);
        if(id!=='minecraft:warden'&&id!=='minecraft:wither')return;
        var killer=event.getSource().getEntity();
        if(!killer||!killer.player||!Hooks)return;

        killer.server.scheduleInTicks(1,function(){
            if(event.isCanceled())return;
            try{
                var unlocked=String(Hooks.bossDied(boss,killer));
                if(unlocked){
                    killer.tell(Text.of('Your team has unlocked '+labels[unlocked]+'!'));
                    syncAll(killer.server);
                }
            }catch(failure){error(failure);}
        });
    };
    global.otgTeamDimensionArrived=function(event){
        if(String(event.getTo().location())!=='minecraft:the_end'||!Hooks)return;
        var player=event.getEntity();
        try{
            if(Hooks.enteredEnd(player))player.tell(Text.of('Your team has unlocked Twilight Forest!'));
            syncAll(player.server);
        }catch(failure){error(failure);}
    };
    try{Hooks=Java.loadClass('com.theranker.creativeguard.TeamProgress');}
    catch(failure){error(failure);}
    PlayerEvents.loggedIn(function(event){try{sync(event.player);}catch(failure){error(failure);}});

    ServerEvents.tick(function(event){
        if(++ticks%20!==0)return;
        try{syncAll(event.server);}catch(failure){error(failure);}
    });
    ServerEvents.loaded(function(event){console.info('[OR Team Progression] Team gate policy loaded; native hooks '+(Hooks?'available':'MISSING — access locked'));});
    ServerEvents.commandRegistry(function(event){
        var cmd=event.commands.literal('orprogress').executes(function(ctx){
            var player=ctx.source.player;
            ctx.source.sendSystemMessage(Text.of(Hooks?String(Hooks.status(player)):'Progression hooks unavailable.'));
            return 1;
        });
        ['grant','revoke'].forEach(function(action){
            var branch=event.commands.literal(action).requires(function(source){return source.hasPermission(2);});
            Object.keys(stages).forEach(function(key){
                branch.then(event.commands.literal(key).executes(function(ctx){
                    if(!Hooks)return 0;
                    Hooks.adminSet(ctx.source.player,key,action==='grant');syncAll(ctx.source.server);
                    ctx.source.sendSystemMessage(Text.of(String(Hooks.status(ctx.source.player))));return 1;
                }));
            });
            cmd.then(branch);
        });
        event.register(cmd);
    });
})();
