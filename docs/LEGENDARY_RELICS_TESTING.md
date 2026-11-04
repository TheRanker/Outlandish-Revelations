# Legendary relics — Minecraft acceptance checklist

This is a development test, not a release. Code, fixtures and packaging checks
passed; no real ceremony, combat or rendering tests have been run.

## Install a matching test copy

1. Close the test Minecraft client/server. Back up the instance and test world,
   including playerdata, advancements, Curios/Accessories data, KubeJS persistent
   data and `data/outlandish_relics/`. Keep matching old scripts and JAR for rollback.
2. Use the generated `build/outlandish-relics-1.2.8-test-patch.zip` on a separate
   copy of the current pack. Its file list is embedded. It supplies only the
   matching relic/story integration files and one compatibility JAR, not all mods.
   Replace the old compatibility JAR; do not leave two versions installed.
3. Change only `kubejs/outlandish/legendary_relics.json` to `enabled: true` in that
   copy. Keep `world_remembers.json.ceremonyIntegrationEnabled: false` and its
   manual memorial array empty. Restart fully. Check startup/server/client logs
   and the native enabled status; `/reload` alone cannot install a new JAR.
4. Native worldgen is registered whenever the new JAR is installed, even with
   gameplay off. Explore new Overworld chunks. Use Explorer's Compass or operator
   `/locate structure outlandish:ranker_memorial`. Test natural terrain and rotations.
   A standalone `/place template` does not create a registered structure piece
   and must not qualify for awakening. An operator-placed registered structure
   is useful for testing but does not validate natural generation frequency.

## Ceremony and preservation

- Obtain the sword from the existing Inferno victory reward and confirm all four
  Radiation bottles. A player-attributed Warden kill should drop one dormant
  ring while retaining the existing team Nether gate. Check actual Curios equip.
- Play the twelve story arcs personally. A teammate's shared FTB chapter progress
  must not satisfy eligibility. Check normal NPC deliveries/repairs are unchanged.
  Operator-granted story advancements can isolate development tests but are not
  evidence that a real story playthrough or acquisition route passed.
- Carry exactly the sword and ring selected for awakening. Add your own normal
  enchantments/name and retain any pre-existing affix/socket data. Compare the
  exact item NBT before/after: only `outlandish_relic` should be added/updated.
- Reject an ordinary player-built altar, incomplete story progress, missing or
  foreign-owned relics, a missing/moved anchor and an altar with a crafting item.
  These rejections must consume no ceremony LP.
- At a valid memorial, right-click its plaque. As a non-operator Survival player,
  use the clickable offering or `/orritual offer`. Fill the Tier 1 main basin to
  exactly 10,000 LP for each payment. Observe three separate reductions to zero
  and personal totals 10,000 → 20,000 → 30,000. Inspect output-buffer LP separately;
  it must not be charged as the main basin.
- After two payments, use the plaque to prepare the final stage. Refill fully and
  use your own ordinary Sacrificial Knife near that same altar; verify health
  loss and the personal witness message. A full basin must still count the knife.
  Then offer the last 10,000 LP. Also test incense-assisted sacrifice separately.
  Canceled/failed, mob, friend's and wrong-nearby-altar actions must not count.
- Restart/relog after stages one/two and after witnessing the knife. Continue paid
  stages at another registered memorial, making a fresh final knife offering there.
  Exercise interruption/restart during a payment on a backed-up disposable world:
  check matching pending transactions recover once, never twice. Compare journal,
  actual altar chunk and player save; do not edit/grant a successful receipt.
- On completion both original stacks must retain all unrelated data and share the
  player's UUID/transaction. Only that player earns The Promise Fulfilled. Check
  logout, death, dimension change, server restart and a renamed same-UUID profile.
  Another player holding either item keeps baseline sword behavior but gains no
  awakened powers. No teammate receives completion automatically.

## Combat, equipment and presentation

- Dormant equipped ring: test hits below, at and above 30% maximum health; the
  qualifying final hit drops by 25%, then the 90-second cooldown persists on relog.
  Repeat with increased max health and armor/absorption.
- Owned awakened ring: test a fatal hit, 20% restoration capped at five hearts,
  10-minute persistent cooldown and four-block knockback with no pulse damage.
  Test Totems and installed modded revival; neither protection should be wasted
  by duplicate handling. Operator kill is intentionally excluded.
- Flight: double-tap jump, dimension/death/relog, removal high in the air and safe
  landing. Relog/restart mid-fall after removal and verify the unexpired landing
  grace survives once, without lasting beyond its 60-second deadline. Test other flight equipment before/after removing the ring. Check
  Curios through Accessories beta48 saves and restores the same bound item.
- Original sword art, animation, damage, speed, indestructibility and sonic attack
  must remain unchanged, including when held by a different player.
- Fracture: sonic mark expires at three seconds; the next melee adds 35% of its
  damage capped at 12 HP. Echo: charged melee, 45 resonance, 12-second cooldown,
  delayed 40% capped at 14 HP. Echo should work during ordinary hurt cooldown while
  respecting actual boss invulnerability. Skybreaker: aerial charged attack with
  both owned awakened relics, 75 resonance, 20-second cooldown, radius 4.5 and
  maximum 12 HP per enemy; it takes priority over Echo on that strike.
- Check resonance +8 no more often than 0.5 seconds, sonic +15 per activation,
  maximum 100, decay after 15 seconds idle, and no extra gain/recursive attacks
  from secondary effects. Test bosses, rapid attacks, several mobs, friendly
  NPCs, pets, allies and players. No new terrain damage is allowed.
- Test HUD/owner tooltips and `/orrelichud hide`, `show`, `scale 1`, `position 8 -78`.
  Reconnect with empty hands and a ring already equipped to verify initial state.
- At the same plaque two viewers must see their own inscription/current username.
  No shared-world text changes. Speak with all twelve NPCs carrying the sword in
  ordinary storage/offhand; optional congratulations must preserve deliveries.
- Finale is approximately 15 seconds, harmless particles/flash/lightning/thunder
  and the two approved lines. The creator's exact 64 × 64 skin is now bundled with
  the classic arm model. Verify its texture layout, four-pixel arms, two-block
  rise, head/arms, outer skin layers, disappearance and drifting particles.
  Packaging checks do not establish actual cinematic appearance.

## Server and release acceptance

Boot a real dedicated Forge server and join with matching clients. Check startup,
login, chunk watch, save/restart, reconnect and client render/resource reload.
Measure the infrequent ceremony save cost and ordinary combat with the actual
pack. There are no full inventory/world scans per tick, but that does not establish
measured TPS performance. Two-player personal progress, same-memorial exclusion,
independent memorials, packet isolation and other-flight/revival compatibility
remain release gates. The creator has deferred multiplayer testing until nearer
release; these checks are retained, not marked passed.
