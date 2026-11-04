# Development and validation

This repository holds overrides and dependency pins, one explicitly bundled custom compatibility JAR, and no
private launcher metadata. Use Python 3.12+ and Node.js 22+ for the validation tools.

Run from the repository root:

```text
python tools/validate_pack.py
python tools/audit_npc_requests.py
python tools/audit_blood_progression.py
python tools/audit_late_progression.py
python tools/audit_relic_preservation.py
python tools/audit_legendary_relics.py
node tools/tests/world_remembers.mjs
python tools/build_pack.py
```

The exporter includes tracked overrides and a CurseForge manifest in `build/`.
It does not publish anything. `manifest.json` records the current installed
CurseForge project/file IDs without usernames, account credentials or local paths.
`docs/dependency-inventory.json` maps those pins to filenames for review.

## What checks establish

The Python validator parses FTB SNBT and pack JSON, checks unique object IDs,
quest/task prerequisites, reward-table references, all twelve NPC registrations,
nonrepeatable quest chains, dialogue and custom completion advancement links.
External mod-provided resources are resolved by the pinned mods at runtime;
they are not assumed to be present as source files in this repository.

The late-progression audit checks cross-chapter dependency cycles, formed-machine
task links, fluid samples, reward pools, authored Draconic matrix/producer paths,
injector upgrade order, fusion energy guidance and the existing finale rewards.
Native items, tags, machines and fluids are assumed supplied when following custom
producer paths; this is not a complete native-mod recipe reachability proof. See
[late progression audit](LATE_PROGRESSION_AUDIT.md) for the installed-JAR review.

The relic preservation audit protects the original sword/ring textures, animation,
sonic script and authored item properties. It also checks personal story resources
and reports Apotheosis module settings. The approved relic design is in
[Legendary Relics Specification](LEGENDARY_RELICS_SPECIFICATION.md); the
[implementation inventory](LEGENDARY_RELICS_IMPLEMENTATION.md) distinguishes
implemented native behavior from pending game acceptance. The
native packaging audit checks the pinned JAR against its source JSON/NBT/resources,
personal advancement roster and disabled defaults; local installed-API tests/build
steps are documented in compat/README.md.

The Node tests parse the four World Remembers scripts and run mocked checks of
ownership, dates, renamed players, death/restart reconstruction, independent
viewers, recognition and client/server boundaries. They do not boot Minecraft,
exercise real rendering or substitute for a dedicated-server test.

Before release, test all authored arcs, rotated repairs, player-block protection,
per-player completion across copies, FTB team behavior and reward claims. Check
natural terrain placement in Incendium, Nullscape and Twilight Forest. Preserve
the central End island and existing Warden/Wither/team gates.

## Known implementation limits

- Native memorial/ceremony, ownership, powers and presentation are implemented in
  1.2.8 but disabled pending actual testing. The original skin is now bundled
  unchanged and hash-protected; its actual rendering remains untested. Follow
  [native acceptance](LEGENDARY_RELICS_TESTING.md); keep the obsolete LP-only hook
  disabled. No real Forge server or multiplayer acceptance has been run.
- The formerly identical 17 reward pools now have distinct theme/rarity supplies.
  IDs and draw counts are preserved; the existing Steam baseline is retained.
  See [reward balance](REWARD_BALANCE.md). In-game balance testing remains necessary.
- Existing task-level AE2 prerequisites are intentional. Do not remove them merely
  because they are task IDs rather than whole-quest IDs.
- Garrick retains his tested mix of gifts and inventory-possession tasks. Newer
  arcs use named gifts. Changing that behavior needs its own gameplay review.
- Moving between NPC structures midway through an arc repairs the current stage
  at that structure; it does not replay earlier repairs on the new copy.

No build or validation workflow publishes releases. Keep release publication
separate from updating development source.

The native bridge artifact and its checked-in source are documented in [compatibility build notes](../compat/README.md). The export pins current installed download versions, excludes disabled JEIOptimizer and includes exactly one custom compatibility JAR. See [NPC request audit](NPC_REQUEST_AUDIT.md) and [batch acceptance list](BATCH_ACCEPTANCE.md) for outstanding checks.
