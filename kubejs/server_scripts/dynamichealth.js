function getOldHP(data) { return data.oldHP; }

function getOldMaxHP(data) { return data.oldMaxHP; }

function getPercent(data) { return data.hpPercent; }

function setOldHP(data, hp) { data.oldHP = Math.round(hp * 100) / 100; }

function setOldMaxHP(data, hp) { data.oldMaxHP = hp; }

function setPercent(data, hp, maxHp) { data.hpPercent = Math.round((hp / maxHp) * 100) / 100; }


function updateHp(event, hp) {
    let player = event.player;

    player.resetSentInfo();
    event.server.scheduleInTicks(1, callback => {
        player.setHealth(hp);
    });
}

function armorRemoved(event) {
    let player = event.player;
    let data = player.persistentData;
    let hp = player.health, maxHp = player.maxHealth

    if(maxHp < getOldMaxHP(data)) {
        event.server.scheduleInTicks(10, callback => {
            setOldHP(data, hp)
            data.healCooldown = 60;
        });
    } 
}

function setHp(event) {
    let player = event.player, data = player.persistentData;
    let hp = player.health, maxHp = player.maxHealth, newHp = 0;
    let oldHP = getOldHP(data), oldMax = getOldMaxHP(data);

    setPercent(data, hp, oldMax);

    if (data.healCooldown > 0 && !(oldHP > maxHp)) { newHp = oldHP; }
    else {
        newHp = (maxHp * getPercent(data));
        if(newHp < 1) { newHp = 1; }
        else { Math.floor(newHp); }
    }

    updateHp(event, newHp);
    armorRemoved(event);
    
}

function cancelHealing(event) {
    let player = event.player, data = player.persistentData;
    let hp = player.health;

    if(hp > getOldHP(data) + 0.2) { updateHp(event, getOldHP(data)) }

}


PlayerEvents.tick(event => {
    let player = event.player, data = player.persistentData;
    let hp = player.health, maxHp = player.maxHealth;
    let oldHP = getOldHP(data), oldMax = getOldMaxHP(data);
    let percent = getPercent(data);

    if(player.deadOrDying) return;
    if(!(player.age % 5 == 0)) return;

    if(oldHP == 0 || oldHP == null){ setOldHP(data, hp); }
    if(oldMax == 0 || oldMax == null) { setOldMaxHP(data, maxHp); }

    if(data.healCooldown > 0) {
        data.healCooldown--;
        cancelHealing(event);
        setOldHP(data, hp);
    }

    if(hp == maxHp && percent == 1.0) return;
    if(percent < 1.0 && oldMax == maxHp) {
        setPercent(data, hp, maxHp);
        return;
    }
    setHp(event);
    setOldMaxHP(data, maxHp)
    
});