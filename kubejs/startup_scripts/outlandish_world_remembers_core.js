// Pure shared rules. No game, client, inventory polling or team APIs.
(function () {
  var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  function uuid(value) { var id = String(value).toLowerCase(); if (!UUID.test(id)) throw Error('Invalid player UUID'); return id; }
  function validLpPayment(value) {
    return value.lpConsumed === 30000 && Array.isArray(value.lpCharges) && value.lpCharges.length === 3 &&
      value.lpCharges.every(function (charge) { return charge === 10000; });
  }
  function validRecord(record, id) {
    // Preserve existing UUID/date records; new records also retain LP payment details.
    return !!record && (record.version === 1 || record.version === 2) && record.playerUuid === uuid(id) &&
      record.ceremonyId === 'outlandish:tier1_three_offerings' &&
      (record.version === 1 || (record.relicId === 'kubejs:rankers_sword' && validLpPayment(record))) &&
      /^\d{4}-\d{2}-\d{2}T/.test(String(record.completedAtUtc));
  }
  function validateReceipt(id, receipt, enabled) {
    id = uuid(id);
    if (!enabled) return 'ceremony_integration_not_connected';
    if (!receipt || receipt.version !== 2 || receipt.success !== true) return 'unsuccessful_receipt';
    if (receipt.ceremonyId !== 'outlandish:tier1_three_offerings' || receipt.altarTier !== 1) return 'wrong_ceremony';
    if (receipt.playerUuid !== id || receipt.bindingOwnerUuid !== id) return 'wrong_owner';
    if (receipt.relicId !== 'kubejs:rankers_sword') return 'wrong_relic';
    if (!validLpPayment(receipt)) return 'incomplete_lp_payment';
    if (typeof receipt.transactionId !== 'string' || !/^[a-zA-Z0-9:_-]{8,128}$/.test(receipt.transactionId)) return 'missing_transaction';
    return null;
  }
  function makeRecord(id, name, receipt, timestamp) {
    return { version: 2, playerUuid: uuid(id), usernameAtCompletion: String(name), completedAtUtc: String(timestamp),
      ceremonyId: receipt.ceremonyId, transactionId: receipt.transactionId, relicId: receipt.relicId,
      lpConsumed: receipt.lpConsumed, lpCharges: receipt.lpCharges.slice() };
  }
  function inscription(record, name, original) {
    if (!record) return original.map(function (text) { return { text: String(text), italic: false }; });
    return [
      { text: "THE RANKER'S MEMORIAL", gold: true, bold: true }, { text: 'The Promise Fulfilled', gold: true, bold: true },
      { text: String(name) }, { text: 'Bearer of Tears for Fears' },
      { text: 'A promise once broken, now fulfilled.', italic: true }
    ];
  }
  function hasSword(ids) { return ids.indexOf('kubejs:rankers_sword') >= 0; }
  function validateConfig(config) {
    if (!config || config.version !== 1 || typeof config.ceremonyIntegrationEnabled !== 'boolean') throw Error('Invalid World Remembers configuration');
    if (!Array.isArray(config.originalInscription) || config.originalInscription.length < 1 || config.originalInscription.length > 8) throw Error('Invalid original inscription');
    config.originalInscription.forEach(function (line) { if (typeof line !== 'string' || line.length > 100) throw Error('Inscription line too long'); });
    if (!Array.isArray(config.memorials) || config.memorials.length > 16) throw Error('At most 16 memorials supported');
    var seen = {};
    config.memorials.forEach(function (m) {
      if (!/^[a-z0-9_]{1,40}$/.test(m.id) || seen[m.id]) throw Error('Invalid/duplicate memorial ID'); seen[m.id] = true;
      if (!/^[a-z0-9_.-]+:[a-z0-9_./-]+$/.test(m.dimension)) throw Error('Invalid dimension');
      ['anchor', 'interaction', 'plaque'].forEach(function (key) {
        if (!m[key]) throw Error('Missing memorial ' + key);
        ['x', 'y', 'z'].forEach(function (axis) { if (typeof m[key][axis] !== 'number' || !isFinite(m[key][axis])) throw Error('Invalid memorial coordinates'); });
      });
      ['anchor','interaction'].forEach(function (key) { ['x','y','z'].forEach(function (axis) { if (Math.floor(m[key][axis]) !== m[key][axis]) throw Error('Block coordinates must be integers'); }); });
      if(m.anchor.requiredBlockId && !/^[a-z0-9_.-]+:[a-z0-9_./-]+$/.test(m.anchor.requiredBlockId))throw Error('Invalid hidden anchor block ID');
      if (Math.abs(m.anchor.x-m.interaction.x)>8 || Math.abs(m.anchor.y-m.interaction.y)>8 || Math.abs(m.anchor.z-m.interaction.z)>8) throw Error('Plaque interaction must be near its hidden anchor');
      if (Math.abs(m.anchor.x-m.plaque.x)>8 || Math.abs(m.anchor.y-m.plaque.y)>8 || Math.abs(m.anchor.z-m.plaque.z)>8) throw Error('Rendered plaque must be near its hidden anchor');
      if (typeof m.plaque.yaw !== 'number' || !isFinite(m.plaque.yaw) || typeof m.plaque.scale !== 'number' || !(m.plaque.scale >= 0.005 && m.plaque.scale <= 0.04)) throw Error('Invalid plaque rendering settings');
    });
    if (!Array.isArray(config.npcs) || config.npcs.length !== 12) throw Error('Expected all twelve existing NPCs');
    var npcIds={};
    config.npcs.forEach(function(npc) {
      if(!/^[a-z0-9_]{1,40}$/.test(npc.id) || npcIds[npc.id])throw Error('Invalid/duplicate NPC ID');npcIds[npc.id]=true;
      ['displayName','carrying','fulfilled'].forEach(function(key) {if(typeof npc[key]!=='string' || !npc[key].length || npc[key].length>1000)throw Error('Missing/invalid NPC recognition text');});
    });
    return config;
  }
  global.ORWorldRemembersCore = { uuid: uuid, validRecord: validRecord, validateReceipt: validateReceipt,
    makeRecord: makeRecord, inscription: inscription, hasSword: hasSword, validateConfig: validateConfig };
})();
