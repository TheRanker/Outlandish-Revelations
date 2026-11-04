# Legendary relics implementation — 2026-11-04

The [approved specification](LEGENDARY_RELICS_SPECIFICATION.md) is implemented in
compatibility mod **1.2.8** for local testing. Native gameplay defaults to **off**.
The pinned JAR and matching files are now installed in the creator's development
instance with a rollback backup and relic testing enabled locally. Repository
defaults remain off; no Minecraft acceptance or CurseForge release is claimed.
The creator supplied the original 64 × 64 PNG, bundled byte-for-byte with the classic
four-pixel arm model. No substitute or generated skin is used.

## Findings and preserved work

All twelve existing personal NPC completion advancements are present, including
Garrick's original `outlandish:garrick_completed`. Existing story arcs, their
structures and repairs are retained. The separate NPC audit checks all 81 Quest
Giver requests and 76 FTB delivery summaries. Shared questbook tasks are not used
to establish ritual eligibility.

The original sword/ring PNGs, six-frame animation metadata and complete sonic
script match their preservation hashes. Item IDs/properties and generated models
are unchanged. Existing Inferno victory rewards still give the sword and four
Radiation potions. Warden → Nether and Wither → End team gates are unchanged.
The existing ring tag supports Curios equipment. Apotheosis Enchantment is enabled
and Adventure disabled; existing affix/socket data is retained without relying on
its acquisition being enabled.

The previous World Remembers foundation supplied recognition, UUID/date records
and an inactive receipt hook. It did not implement real LP debits, paired binding,
combat powers or flight. The native implementation below supplies those parts.

## Implemented behavior

| Feature | Implementation and boundary |
| --- | --- |
| Memorial | Registered Overworld jigsaw structure, biome tag, pool and 100-chunk placement grid: approximately one attempt per 10,000 chunks, not guaranteed successful placement. Uses the approved prototype geometry with a hidden, locked, tagged barrel anchor. Original prototype is retained. Explorer's Compass has no configured structure blacklist. Terrain/compass behavior remains untested. |
| Ceremony | Plaque or `/orritual offer`; living Survival player, all twelve own story advancements, one original sword and ring, valid generated memorial, idle Tier 1 altar. Spare relic copies must be stored so the chosen originals are unambiguous. Three separate exact 10,000-LP main-basin debits; no output-buffer drain. Ordinary crafting remains available outside payment operations. |
| Personal sacrifice | The knife-use event captures intent. Post-action observers verify actual health loss and the actual altar Blood Magic selected. Blood Magic's self-sacrifice flag is false; mob sacrifice is rejected. Both ordinary and incense-assisted knife paths are observed. A full basin can still witness the final sacrifice; LP payment is checked separately. |
| Persistence and exclusion | Atomic UUID journal in the world's `data/outlandish_relics/`. Prepared debit, serialized zero main-basin amount/payment marker, target-chunk write/flush/readback, then personal stage commit. Recovery checks the matching altar marker before credit. Per-memorial exclusion prevents sharing one debit. Remaining stages can continue at another valid memorial; final knife evidence must match the current one. |
| Paired awakening | Mutates only `outlandish_relic` on both existing stacks. Confirms both bindings in the saved player file before committing completion. UUID, transaction and UTC date persist. Original enchantments, NBT, affixes, sockets, item art, animation and sonic script remain untouched. No predetermined enchantments. |
| Personal record | Awards only the completing player's native advancement. Mirrors genuine completion into the existing World Remembers UUID key; retains older records and dates. A legacy plaque record alone cannot grant awakened powers. Username changes affect display, not ownership. |
| Ring acquisition/protection | One existing ring drops from a player-attributed Warden kill, separate from the team gate. Equipped dormant ring: hit ≥30% max HP is reduced 25%, 90-second cooldown. Owned awakened ring: fatal-hit prevention restores 20% max HP capped at 10 HP, 10-minute cooldown, hostile-only knockback pulse. Totem/modded revival coexistence needs gameplay testing. |
| Flight | Owner's awakened ring must be equipped. Adds/removes only a distinct Caelus modifier; does not directly overwrite unrelated flight permissions. Removal supplies up to 60 seconds of one-landing fall protection, with its deadline retained in player NBT across relog/restart. Curios/Accessories and other flight providers require actual play tests. |
| Sword | Fracture: 3-second mark, +35% melee damage capped at 12 HP. Echo: 40% of the triggering final hit capped at 14 HP, delayed 0.6 seconds, cost 45, 12-second cooldown. Skybreaker: aerial charged attack with both owned awakened relics, radius 4.5, maximum 12 HP per enemy, cost 75, 20-second cooldown. Skybreaker takes priority over Echo on the same strike. |
| Resonance | Maximum 100; charged melee +8 at most once per 10 ticks; successful original sonic hit +15 per original activation cooldown. Decays 1/second after 15 seconds outside combat. Resonance resets on logout; ability/protection cooldown deadlines persist. Secondary effects cannot trigger themselves or grant resonance. |
| Friendly/boss safeguards | New effects target hostile enemies only, excluding players, allies, owned entities and unprovoked neutral mobs. Damage caps/cooldowns and normal knockback resistance apply. Echo avoids applying armor/resistance/enchantments twice to an already mitigated hit and bypasses ordinary hurt cooldown; it does not bypass actual invulnerability. Skybreaker uses normal damage handling. No terrain changes. Original sonic behavior is preserved exactly. |
| Personal plaque | Clientbound per-viewer state; exact fulfilled inscription/current username, no shared inscription writes. Native renderer discovers generated anchors on chunk-watch/plaque events. `/orritual` gives the private completion date. |
| Finale | Client-only 15-second pose/rise, exact dialogue, white/gold particles, simulated lightning, flash and thunder. No spawned entity, real lightning, fire or damage. The exact creator-supplied skin is now bundled and hash-protected, using the classic arm model. Actual appearance/pose still needs Minecraft verification. |
| HUD | Optional resonance/status/cooldowns and owner tooltips. `/orrelichud show`, `hide`, `scale 0.5..2`, `position x y`; negative y is relative to the bottom. Layout saved in client config. Display packets grant no server powers. |

Tick work is limited to queued echoes, active combat records and temporary landing
protection; no per-tick full-inventory or world scans. Equipment, damage, attacks,
conversation, altar use and chunk-watch events drive the system. Synchronous saves
occur at ceremony commits and cooldown activation; their real server cost has not
been measured.

## Verification actually executed

- Java 17-target compilation and SRG remapping against the installed MC 1.20.1,
  Forge 47.4.28, Blood Magic 3.3.8-50, Curios 5.14.1 and Caelus 3.2.0 APIs.
- Existing compatibility classes/resources and prior coremod mappings preserved.
- Production rule/journal tests: 53 checks, including separate UUIDs, restart,
  payment replay, final-knife proof, corrupt records and failed-write recovery.
- Actual remapped binding bytecode: 11 checks for in-place ownership, unchanged
  enchantment/affix objects, rejected foreign binding and username independence.
- Actual coremod JavaScript evaluated with installed Nashorn against installed
  Blood Magic classes: six ordinary knife returns, one altar-recipient return,
  three incense-helper returns; original method instructions retained.
- Existing native bridge: 13 fixtures and a dedicated-side JVM without its client
  bridge/render event. This is not a full native-relic Forge server launch.
- Portable packaging/data audit checks Java 17/common-side boundaries, twelve
  advancement links, all native JSON/NBT and matching packaged resources.
- Original skin: 64 × 64 PNG, classic arm layout, copied without modification.
  Source/resource/JAR checksums match; native class bytes remain unchanged from
  the preceding tested build. This asset update does not re-test gameplay.

See [batch acceptance](BATCH_ACCEPTANCE.md) for final aggregate audit results and
[manual testing](LEGENDARY_RELICS_TESTING.md) for remaining acceptance. No Minecraft
client, dedicated Forge server, real altar consumption, combat, rendering or
multiplayer tests were executed. Balance targets are initial values.

## Files for this implementation

Paths below are repository-relative. Existing unrelated batch changes remain.

- `compat/relics/com/theranker/creativeguard/relics/`: `AltarAccess.java`,
  `Memorial.java`, `RelicClient.java`, `RelicCombat.java`, `RelicItems.java`,
  `RelicNetwork.java`, `RelicRules.java`, `RelicStore.java`, `RelicSystem.java`.
- `compat/relics-resources/coremods/legendary_knife.js`.
- `compat/relics-resources/assets/outlandish/lang/en_us.json`.
- `compat/relics-resources/assets/outlandish/textures/entity/the_ranker.png` and
  `tools/data/ranker_skin.json` (original skin and preservation metadata).
- `compat/relics-resources/data/outlandish/structures/ranker_memorial.nbt`.
- `compat/relics-resources/data/outlandish/worldgen/structure/ranker_memorial.json`,
  `worldgen/structure_set/ranker_memorial.json`,
  `worldgen/template_pool/ranker_memorial.json`,
  `tags/worldgen/biome/memorial_spawnable.json`, `damage_type/relic_echo.json`.
- `compat/relics-resources/data/minecraft/tags/damage_type/`:
  `bypasses_armor.json`, `bypasses_resistance.json`, `bypasses_enchantments.json`,
  `bypasses_cooldown.json` (all additive and exclusive to the Echo damage type).
- `compat/artifacts/outlandish-compatibility-fixes-1.2.8.jar`,
  `compat/native-artifact.json`, `compat/README.md`, `docs/dependency-inventory.json`.
- `kubejs/outlandish/legendary_relics.json`,
  `kubejs/startup_scripts/outlandish_legendary_relics.js`,
  `kubejs/server_scripts/outlandish_world_remembers.js`,
  `kubejs/startup_scripts/outlandish_world_remembers_core.js`.
- `tools/build_relics.py`, `relic_build_env.py`, `classfile.py`,
  `audit_relic_linkage.py`, `audit_relic_preservation.py`,
  `audit_legendary_relics.py`, `test_relics.py`, `test_native_bridge.py`,
  `build_relics_test_patch.py`, `tools/data/relic_preservation.json`.
- `tools/java/RelicRemapper.java`, `RelicRulesTest.java`, `RelicKnifeHookTest.java`,
  `tools/tests/world_remembers.mjs`, `.github/workflows/validate.yml`.
- `docs/LEGENDARY_RELICS_SPECIFICATION.md`, this implementation report,
  `docs/LEGENDARY_RELICS_TESTING.md`, `docs/MEMORIAL_CEREMONY_DESIGN.md`,
  `docs/WORLD_REMEMBERS.md`, `docs/BATCH_ACCEPTANCE.md`,
  `docs/BATCH_PR_DESCRIPTION.md`, `docs/DEVELOPMENT.md`, `CHANGELOG.md`.

## Original skin and staging boundary

Expected resource: `outlandish:textures/entity/the_ranker.png`, source location
`compat/relics-resources/assets/outlandish/textures/entity/the_ranker.png`.
The creator supplied `1000003970.png` on 2026-11-04. The original is 64 × 64;
opaque pixels in both classic-only arm regions support the classic model already
selected by `slimSkin: false`. The source bytes are retained exactly.

SHA256: `df8b756fca38531ba43b92b01c6217a8dc84426a99de52c7a864f641ee284de8`.

The portable audit checks the source PNG hash, dimensions, model configuration
and packaged resource. No skin asset remains missing. Verify the apparition
in Minecraft before marking the cinematic complete.

Enable only `kubejs/outlandish/legendary_relics.json.enabled` in a backed-up test
copy. Keep the obsolete `world_remembers.json.ceremonyIntegrationEnabled` false
and its manual memorial list empty. Native worldgen resources are registered
whenever 1.2.8 is installed, even while native gameplay is disabled. Existing
1.2.7 remains available for rollback; install exactly one compatibility JAR.

## Installation/source reconciliation follow-up

The instance installation and exact backup scope are recorded in
[INSTANCE_INSTALLATION.md](INSTANCE_INSTALLATION.md). Additional source updates
preserve live IDs/editor settings in `the_last_watchfire.snbt` and
`the_memory_beyond_the_void.snbt`, update `docs/npc-arcs.json` and
`docs/NPC_REQUEST_AUDIT.md`, and bring handbook `book.json`, chapter 15 topic 03
and chapter 22 topic 05 to revision 5 with current ceremony guidance. Separate
JAR/cumulative pack changelogs are in `compat/CHANGELOG.md` and
`docs/MODPACK_CHANGELOG_SINCE_5.0.md`. No NPC delivery requirements changed.
