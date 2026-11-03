# Development and validation

This repository holds overrides and dependency pins, not downloaded mod JARs or
private launcher metadata. Use Python 3.12+ and Node.js 22+ for the validation tools.

Run from the repository root:

```text
python tools/validate_pack.py
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

The Node tests parse the four World Remembers scripts and run mocked checks of
ownership, dates, renamed players, death/restart reconstruction, independent
viewers, recognition and client/server boundaries. They do not boot Minecraft,
exercise real rendering or substitute for a dedicated-server test.

Before release, test all authored arcs, rotated repairs, player-block protection,
per-player completion across copies, FTB team behavior and reward claims. Check
natural terrain placement in Incendium, Nullscape and Twilight Forest. Preserve
the central End island and existing Warden/Wither/team gates.

## Known implementation limits

- Memorial geometry/location and the Tier 1 three-offering awakening are not
  integrated. Do not enable the completion hook as a substitute for a real ceremony.
- Seventeen legacy reward tables have identical basic supply contents. Their
  IDs and balance were preserved; a later reward-theme pass should keep references stable.
- Existing task-level AE2 prerequisites are intentional. Do not remove them merely
  because they are task IDs rather than whole-quest IDs.
- Garrick retains his tested mix of gifts and inventory-possession tasks. Newer
  arcs use named gifts. Changing that behavior needs its own gameplay review.
- Moving between NPC structures midway through an arc repairs the current stage
  at that structure; it does not replay earlier repairs on the new copy.

No build or validation workflow publishes releases. Keep release publication
separate from updating development source.
