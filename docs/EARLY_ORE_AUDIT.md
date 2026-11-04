# Early ore progression audit — 2026-11-03

Scope: ore inputs and intermediate forms, stopping before ingots and native GregTech later refining/byproduct yields. This was an audit; no gameplay recipes were changed.

## Result

The custom forms load successfully but currently form an optional MV/HV ore-block amplification branch. They are not connected as a required early raw-ore progression. If the intended early game is raw ore -> clusters/shards/clumps, that connection is missing from the current custom recipes.

## What is present

- 101 materials each register cluster, shard, crystal and clump: 404 custom items. Registration list matches metallurgy.json exactly.
- Latest available KubeJS server log reports 707 metallurgy recipes added with zero material preflight failures. Create adds nine recipes with zero group failures (eight raw-processing recipes plus the unrelated precision mechanism recipe).
- Repository and live instance metallurgy script/data, Create script/data and Blood Magic data are byte-identical.
- No missing custom-form item reference identified in these paths. This verifies authored data and successful recipe registration, not every machine operation in-game.

### Early raw-material path

| Input tag | Current Create output | Ratio before downstream refining |
|---|---|---|
| `#forge:raw_materials/iron` | `gtceu:iron_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/gold` | `gtceu:gold_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/copper` | `gtceu:copper_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/silver` | `gtceu:silver_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/tin` | `gtceu:tin_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/lead` | `gtceu:lead_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/zinc` | `gtceu:zinc_dust` | 1 input -> 1 dust; processingTime 100 |
| `#forge:raw_materials/nickel` | `gtceu:nickel_dust` | 1 input -> 1 dust; processingTime 100 |

These recipes require Crushing Wheels, not a Millstone. The recipe builder specifies one result without count/chance, so the output is one guaranteed dust. They do not use any of our custom cluster/shard/crystal/clump items. Existing recipe removals target Create crushed-raw outputs for nine materials, including platinum; the eight replacement raw-to-dust entries do not include platinum. That does not prove platinum has no GregTech processing route, but Create parity is incomplete. No recipe was added for platinum during this audit.

### Custom intermediate path

| Conversion | Machine / requirement | Earliest machine voltage |
|---|---|---|
| 1 ore-block-tag ingredient -> 1 shard | Chemical Reactor; 200 mB Life Essence + 200 mB water; 280 ticks, 48 EU/t | MV |
| 1 shard -> 4 clusters | Furnace recipe | After obtaining shard |
| 1 shard -> 1 crystal | Arc Furnace; 144 mB Blazing Pyrotheum; 80 ticks, 480 EU/t | HV |
| 1 crystal -> 8 clusters | Furnace recipe | After obtaining crystal |
| 1 crystal -> 1 clump | Chemical Bath; 10 mB UU-Matter; 100 ticks, 480 EU/t | HV machine minimum; fluid access may gate later |
| 1 clump -> 16 clusters | Furnace recipe | After obtaining clump |
| 1 cluster -> crushed ore | Macerator; 200 ticks, 12 EU/t | LV machine minimum, but current cluster source is later |

The script derives the shard input from TagPrefix.ore, not TagPrefix.rawOre or forge:raw_materials. Normal raw drops are therefore not inputs to that custom shard recipe. Ore-block collection (for example Silk Touch) is relevant to using the authored path. We did not broaden tags or change ore drops.

Iron/copper/gold also have an HV Chemical Reactor shard -> crystal alternative using a consumed Blood Chemical Catalyst and 1,000 mB water. It remains a higher-tier branch; it does not supply an early raw -> cluster entry.

## Gaps and boundaries

1. No authored direct raw -> cluster/shard/clump entry found. All clusters come from smelting the enhanced forms, which begin at MV. No separate early hammer/mortar/milling route into these custom forms was found.
2. The Create route bypasses custom forms by going directly from raw material to dust. This can be intentional as a baseline alternative, but it is not a mandatory custom-form line.
3. The cluster macerator's LV requirement does not make the whole path LV-accessible: its input first comes from the MV shard branch.
4. No custom-form output cycle found: shard -> crystal -> clump -> cluster -> crushed ore is forward-only, with direct shard/crystal -> cluster exits. No custom cluster -> raw/ore-block reverse recipe was found. This is not an exhaustive proof against loops involving every native mod recipe.
5. No quest/handbook explanation for this 101-material custom-form chain was found. Blood Magic documents its three HV crystallisation alternatives. Several existing quests describe native GregTech refining, which is outside this audit's yield scope.
6. Nine removed Create crushed-raw output families versus eight raw-to-dust replacements leaves platinum without a matching custom Create replacement. Confirm whether that omission is intentional before changing it.

## Recommended next decision

If the goal is to introduce these forms only as later ore amplification, current wiring broadly reflects that and needs clearer guidance. If the goal is for the forms to participate in early progression, define the intended first conversion and whether it is optional or required before adding recipes. Do not automatically reroute every material or change native refining yields.

## Manual checks

In JEI compare uses for minecraft:raw_iron and minecraft:iron_ore, and recipes/uses for kubejs:iron_ore_cluster, _shard, _crystal and _clump. Repeat for copper, gold and one non-vanilla raw material such as tin. Check raw platinum uses separately. Confirm the displayed reactor inputs and voltage; do not assume an LV macerator means an LV-accessible source. No in-game recipe execution was performed by this audit.

Relevant sources: kubejs/startup_scripts/outlandish_custom_content.js; kubejs/server_scripts/outlandish_metallurgy.js; kubejs/outlandish/metallurgy.json; kubejs/server_scripts/outlandish_create_progression.js; kubejs/outlandish/create_progression.json; kubejs/outlandish/blood_progression.json.

## Accepted design and implementation

Keep the early raw-material path straightforward; custom Shards, Crystals and Clumps remain optional later recovery upgrades. Updated existing Create/LV/MV/HV quest descriptions and handbook chapter 6 plus new chapter 7 topic, preserving quest IDs, tasks, rewards and dependencies. Added one standard Create Crushing Wheels recipe: forge:raw_materials/platinum -> gtceu:platinum_dust, one guaranteed output, processingTime 100. Existing eight recipes and all other recipe data are unchanged.

Confirmed installed GTCEu 7.5.3 ElementMaterials.register constructs Platinum with the ore property; existing Sheldonite Vein quest references gtceu:raw_platinum and endstone_platinum_ore. This route uses GTCEu output and the standard raw-material tag, without a K-Turrets requirement. The live instance still contains K-Turrets-3.0.48-1.20.1.jar; no mod was removed by this task. Runtime tag resolution and machine operation still require the next Minecraft reload.

## K-Turrets titanium unification

K-Turrets uses titanium, not platinum. Added the existing guarded unification system's substitution from k_turrets:titanium_ingot to #forge:ingots/titanium. Installed K-Turrets 3.0.48 has nine crafting consumers: copper_plate, exp_link, fire_shield, lantern, looting_link, magnet, recall_upgrade, reloader and wrench. Existing substitution behavior preserves recipe IDs/patterns/counts/outputs, rewrites matching inputs and removes the old ingot-producing recipes only when a registered alternative exists. Existing unrelated substitutions are unchanged.

Replaced the K-Turrets unit_repair item tag contents with a link to forge:ingots/titanium so repair also accepts unified titanium. No weapon stats, turret behavior, ore generation or GregTech titanium production recipes were changed. Verify in JEI and repair a damaged turret after reloading. This is a static/reference check, not executed in-game crafting.
