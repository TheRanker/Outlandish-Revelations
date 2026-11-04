# Blood Magic and early quest audit — 2026-11-04

## Existing implementation

The pack has 24 custom Blood Magic support items and 39 authored recipes: 22 GregTech, 14 altar and three crafting recipes. The script replaces all recipes producing eleven native outputs, then supplies the custom replacements. All 24 custom items have producers; every removed output has a replacement. No closed dependency loop was found within this authored graph when native/external inputs are supplied. This does not prove that every external fluid/material is obtainable in a particular playthrough.

| Stage | Existing preparation | Resulting Blood Magic recipe stage |
|---|---|---|
| Create / Steam workshop | Mechanical Crafting with Precision Mechanism, Steam Engine, stone, gold and furnace | First altar; native Blank Slate/Weak Orb remain entry points |
| LV | Steel plates, LV substrate/circuit and prepared slate/orb core; 16 EU/t assembler recipes | Tier 2 Reinforced Slate and Apprentice Orb recipes |
| MV | Aluminium plates and MV equivalents; 64 EU/t | Tier 3 Infused Slate and Magician Orb recipes; Ritual Control Core |
| HV | Stainless steel and HV equivalents; 256 EU/t | Tier 4 Demonic Slate and Master Orb; Dusk control and chemical catalysts |
| EV | Titanium and EV equivalents; 1,024 EU/t | Tier 5 Ethereal Slate and Archmage Orb recipes |

Physical altar construction and availability of its upgraded recipes are distinct. The pack does not add a global prohibition on building a structure early; its replacements require the corresponding prepared ingredients/machines. Existing dimension gates were not edited.

The installed Blood Magic 3.3.8-50 altar recipe JSON uses upgradeLevel 0 for Tier 1, 1 for Tier 2, through 4 for Tier 5. The authored data uses those same indices. Native altar costs in inspected recipes match the intended tiers. All 24 custom item texture references were checked in the installed Blood Magic and vanilla asset JARs. Startup/server Blood Magic scripts and data remain identical to the live instance.

The three HV iron/copper/gold shard-to-crystal alternatives consume Blood Chemical Catalyst and water. This remains the optional enhancement route reviewed in EARLY_ORE_AUDIT.md; it does not introduce early mandatory ore forms.

## Quest audit scope and findings

Checked 265 quests across Create (56), Steam (19), LV (38), MV (55), HV (47), and Blood Magic (50). Dependency references resolve. All 450 rewards in these chapters are XP, loot-table rewards or registered supply crates; no direct machine, Blood Orb, slate or custom Blood Magic ingredient reward bypass was found. This is a structural/reward and targeted recipe-guidance audit, not proof of every numeric statement or native mod mechanic in every description.

Changes are description/documentation only:

- Blood Magic introduction now distinguishes the prepared-ingredient recipe tiers from physical altar construction.
- Tier 4 quest asks for 48 Blank Runes but describes a 56-rune full altar; Tier 5 asks for 64 but describes 108 total. These existing item tasks are now explicitly called supply milestones, with the Divination Sigil/guidebook used to verify the actual structure. Counts, tasks, rewards, IDs and dependencies were preserved.
- Corrected the WORLD_REMEMBERS.md integration example to obtain UUIDs through the native bridge, removing the old getUUID script call that previously failed at runtime.

No recipe, Blood Magic tier, slate/orb cost, reward or industrial progression gate was changed. Native ritual/diviner and Living Armor gameplay still need acceptance testing; item possession tasks alone do not verify assembled multiblocks.

## Memorial inspection: discussion inventory only

No real relic-awakening ritual, three-offering transaction handler, sword soulbinding implementation or dedicated memorial block/structure was found in pack runtime assets. A hand-built site in a save may still exist; this audit did not inspect or modify world geometry.

Present reusable pieces:

- `outlandish:the_promise_fulfilled` personal advancement.
- UUID-owned server record with completion timestamp and native identity helpers.
- Trusted server completion receipt contract requiring Tier 1, matching player/binding UUID and a unique transaction ID. Later clarified to 30,000 LP in three 10,000-LP main-basin charges for the sword only; the version 2 receipt records those amounts. See MEMORIAL_CEREMONY_DESIGN.md.
- Per-viewer plaque renderer and hidden-anchor configuration schema.
- Twelve character-specific sword-recognition messages.

`ceremonyIntegrationEnabled` remains false and memorials remains empty. There is no grant command or client completion packet. The hook cannot substitute for the actual ceremony. No offering items, altar blocks, placement, animation, LP costs or new mechanics were selected during this audit. The existing sword, ring, sonic ability, NPC questlines and unfinished memorial design were preserved.

The subsequent full user-approved specification supersedes the partial cost
discussion: one joint ceremony awakens both relics for 30,000 LP total, with all
twelve personal arcs and a separately validated personal knife offering in the
final stage. See LEGENDARY_RELICS_SPECIFICATION.md and its implementation status.
The actual memorial anchor/site, plaque initiation, real payment/knife checks and
paired awakening/soulbinding commit still need integration.

## Executed validation and remaining checks

`python tools/audit_blood_progression.py` passed: item/recipe references, authored-graph reachability, per-tier recipe metadata, 265 quest dependencies and 450 reward entries; real ceremony disabled. Full portable data validation and existing NPC/script checks are run alongside it. No Minecraft crafting, altar operation, LP transfer, ritual, multiplayer or memorial ceremony was performed. No GitHub push or release publication occurred.
