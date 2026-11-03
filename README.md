# Outlandish Revelations

Minecraft **1.20.1**, Forge **47.4.28**. An exploration, technology and magic
modpack built around Create, GTCEu, AE2, Blood Magic and a parallel story:
**The Unfinished Promise**.

This branch contains development work after the initial **5.0 CurseForge release**.
It is source for the next update, not a newly published or fully tested release.

[Play on CurseForge](https://www.curseforge.com/minecraft/modpacks/outlandish-revelations)
· [Report a problem](https://github.com/TheRanker/Outlandish-Revelations/issues)

## Progression

Develop a Create workshop alongside early GTCEu Stone/Steam work, then continue
through LV, MV, HV, EV and IV. The installed JEI recipes determine the actual
ingredients and machine requirements. Magic and exploration support the factory.

Dimension access belongs to the FTB team:

- Trigger a natural Warden and defeat that same team encounter to enter the Nether.
- Summon a Wither and defeat that same team encounter to enter the End.
- A team member entering the End unlocks Twilight Forest access. Twilight's own
  progression remains in effect.

Incendium shapes the Nether; Nullscape shapes the End. The intended final combat
challenge is the Hovering Inferno at an Infernal Altar in the Infernal Dunes.
Its existing FTB victory rewards are **Tears for Fears** (`kubejs:rankers_sword`)
and four Radiation potions. A Nether Star is required for the summon.

## The Unfinished Promise

Twelve NPC arcs run alongside progression. Help restore their distinct homes,
hear their accounts of the Brass Concord and uncover The Ranker's unfinished promise.

| Dimension | Characters |
|---|---|
| Overworld | Garrick Ashford, Professor Alden Voss, Mara Coppersmith, Captain Edda Thorne, Sister Ysra Vale |
| Nether | Darius Emberwright, Seraphine Blackveil, Malric Vane, Cassian Ashfall, Valen Cinderwatch |
| End outer islands | A.U.R.A. |
| Twilight Forest | Elyndra, Keeper of the Veil |

Use a Quest Scroll to speak with the NPCs. The replacement-scroll quest is
repeatable; each NPC storyline is **one-time per player across all copies**.
Deliveries restore the nearby building without replacing unexpected player edits.
Personal NPC history and existing shared FTB tracking are separate systems.

Nether NPC starts exclude Infernal Dunes. A.U.R.A. uses outer-island biomes and
distant ring placement to keep its research station away from the central dragon
island. Elyndra uses ordinary Twilight woodland and clearing biomes.

## Current development status

- All twelve NPC questlines and their FTB advancement links are authored.
- Quest descriptions and progression guidance have received a cross-reference audit.
- Ponder syntax and outdated Tinkers casting item references were corrected.
- The World Remembers adds optional NPC recognition for sword carriers and a
  personal memorial renderer/record interface.
- **The memorial's actual coordinates and Tier 1, three-offering awakening ceremony
  are not integrated.** The completion hook is disabled and the anchor list is empty.
  Possessing the sword does not falsely award The Promise Fulfilled.
- Multiplayer and several newly authored arcs still need in-game acceptance tests.
  Passing static or mocked tests is not a claim that these gameplay tests passed.

See [development and validation](docs/DEVELOPMENT.md),
[The World Remembers](docs/WORLD_REMEMBERS.md) and [unreleased changes](CHANGELOG.md).

## Repository layout and building

`config`, `defaultconfigs`, `kubejs`, `patchouli_books` and `resources` are pack
overrides. FTB Quests and Paxi are intentionally tracked. Mod/resource-pack
downloads are pinned in `manifest.json`; launcher accounts, worlds and caches
are excluded.

```text
python tools/validate_pack.py
node tools/tests/world_remembers.mjs
python tools/build_pack.py
```

The last command produces a local development CurseForge archive under `build/`.
It does not upload or publish a release. Import that archive in CurseForge to
resolve the pinned dependencies; the repository is not a standalone mods folder.

The root license covers original project work. Bundled third-party datapacks,
resources and dependencies retain their respective upstream licenses.
