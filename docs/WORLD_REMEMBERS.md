# The World Remembers

Runtime configuration: `kubejs/outlandish/world_remembers.json`.

Sword carriers speaking to any of the twelve linked NPCs with a Quest Scroll
receive a personal **[Listen]** prompt once per NPC. The sword may be in normal
storage, the hotbar or offhand. The prompt opens display-only congratulations,
leaving normal quests/rewards intact. After speaking nearby, `/orremembers greet
<npc_id>` can reopen that dialogue. Carrying the sword does not grant awakening.

## Personal record and missing ceremony

The canonical record is stored in server KubeJS persistent data under
`or_world_remembers_v1_<player-uuid>`, with the original UTC completion timestamp.
Native advancement `outlandish:the_promise_fulfilled` is awarded individually from
that record, never through a shared FTB team task. The current profile username is
used for display; the UUID remains the owner.

**The real ceremony is not implemented here.** The shipped
`ceremonyIntegrationEnabled` is false. The trusted server ceremony must validate
the Tier 1 altar and three offerings, consume them successfully and apply the
player's existing individual awakening/soulbinding before calling:

```javascript
global.ORWorldRemembers.completeAwakening(player, {
  version: 1,
  success: true,
  ceremonyId: 'outlandish:tier1_three_offerings',
  altarTier: 1,
  acceptedOfferings: 3,
  playerUuid: String(player.getUUID()).toLowerCase(),
  bindingOwnerUuid: String(player.getUUID()).toLowerCase(),
  relicId: 'kubejs:rankers_sword',
  transactionId: completedCeremonyTransactionId
});
```

This receipt is a contract from trusted server code, not proof of altar contents
supplied by a client. No public completion command or serverbound completion
packet exists. Connect the genuine ceremony before enabling it. No sword/ring
mechanics or ritual design is replaced by this hook.

## Memorial renderer

The `memorials` array is intentionally empty. Once the real memorial exists, add
its actual dimension, hidden `anchor` coordinates, visible `interaction` block
coordinates and `plaque` x/y/z/yaw/scale. Both interaction and text must be within
eight blocks per axis of the anchor. An optional `anchor.requiredBlockId` verifies
an existing hidden block. This does not create a block, marker or structure.

Each viewer receives only their own inscription. Before completion, the configured
`originalInscription` is shown; replace the fallback with the intended original
text. After a genuine successful ceremony:

> THE RANKER'S MEMORIAL  
> The Promise Fulfilled  
> [current Minecraft username]  
> Bearer of Tears for Fears  
> *A promise once broken, now fulfilled.*

No shared-world sign text changes. The client renders within 24 blocks and
validates the viewer's UUID. Right-clicking the configured plaque or using
`/orremembers plaque` reads a private chat fallback and completion date.
`/orremembers` shows only the caller's status. Operators can reload configuration
with `/orremembers reload`; initial installation requires a full restart.

Test two viewers at the same memorial, real dedicated-server restarts, death,
relogin and a renamed profile with the same UUID after the real integration is
available. Do not simulate success by granting an advancement and call that a
passed ceremony test.
