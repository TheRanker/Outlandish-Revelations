# Later progression and finale audit - 2026-11-04

## Scope and result

Reviewed 340 quests and 634 reward entries across nine chapters. Checked the 186
authored Draconic recipes (14 GT recipes and 172 fusion overrides), their ten
custom items, injector upgrade order and related handbook guidance. Installed
GTCEu 7.5.3 and Incendium 5.3.5 files supplied the native recipe/encounter evidence.

| Chapter | Quests |
| --- | ---: |
| EV / Extreme Voltage | 47 |
| IV / Insane Voltage | 88 |
| EV Chemistry | 6 |
| IV Chemistry | 9 |
| Draconic Industry | 11 |
| Draconic Evolution | 168 |
| End Game Armor | 9 |
| End Game Boss | 1 |
| Journey's End | 1 |

All cross-chapter dependency references resolve, and no cycles were found in the
quest graph. Six custom formed-machine task IDs match their observation rules;
the existing script requires the correct formed controller, eligible team quest,
living non-spectator player and a nearby look at the controller. Its timer and
runtime behavior were not changed or tested in Minecraft.

Eleven EV/IV chemistry fluid tasks request 1,000 mB samples. Their chapter names
describe a factory development order, not the minimum voltage of every native
recipe: some Epoxy inputs are available earlier. The PBI chain still needs an
IV-capable Large Chemical Reactor for Diaminobenzidine and Diphenyl Isophthalate.
Zinc is not consumed in the former recipe. The final polymerization is an
IV-tier Chemical Reactor recipe. The fluid IDs, including the correctly spelled
`gtceu:diphenyl_isophthalate`, match the installed material registration.

## Verified guidance fixes

Only descriptions changed in the following existing quests; IDs, counts, tasks,
dependencies, rewards, positions and all other quest properties were preserved.

| Quest ID | Correction |
| --- | --- |
| `2E47C92E3E8D826A` | Microprocessor Mainframe possession is an IV circuit milestone; it does not check every other EV quest. |
| `72E5439299E957A8` | Kanthal coils use 8 Double Kanthal Wires, 8 Aluminium Foils and 144 mB Copper in an MV-capable Assembler. Full EBF coil set: 16; base temperature: 2700 K. |
| `0A848E0B9F485B2C` | Explain the existing RTM Alloy Coil task, its Ruthenium/Tungsten/Molybdenum supply, assembly inputs and complete 16-coil structure. Existing one-coil task is a supply milestone. Base temperature remains 4500 K. |
| `533DB1666B11489A` | EV Assembler text now names RTM Alloy Coils instead of the obsolete Tungstensteel coil description. Assembly uses 8 Double RTM Alloy Wires, 8 Vanadium Steel Foils and 144 mB Nichrome. |
| `4AA6D19469FB306F` | Explain the actual Niobium-Titanium alloy recipe: one of each dust, circuit 1, IV-capable Mixer, two alloy dust. Earlier resource collection does not lower its recipe tier. |
| `19BA973FECFA3B06` | The alternative Radon recipe consumes Uranium-238 Dust and Plutonium-239 Ingots with Air, returning plutonium as dust. Recycling requires converting that output before repeating. |
| `599BABC83E76A711` | Remove the promise of a later platinum-line chapter that is absent from this questbook. Direct Iridium planning to installed platinum-group processing recipes. |

Added one page each to handbook chapter 7 topic 5 (RTM coils) and chapter 8 topic 3
(PBI equipment and sample consumption). Page fit remains a Minecraft check.

## Draconic progression and reward checks

- Matrices retain their existing HV/EV/IV/LuV/ZPM/UV circuits and recipe demands:
  256/1024/4096/16384/65536/262144 EU/t. Every fusion override requires its own
  industrial-stage matrix. No costs or stages were edited.
- Wyvern injector upgrades require Basic/Draconium injectors; Awakened upgrades
  require Wyvern; Chaotic upgrades require Draconic/Awakened. No injector needs
  itself or a later injector to perform that upgrade.
- All ten custom Draconic items have authored producers. Their custom-item
  ancestry is reachable when native items, tags, machines and fluids are supplied.
  This limited graph is not a proof that every native recipe/resource is reachable.
- Checked 159 explicit fusion energy descriptions against recipe data, plus
  explicit injector-tier instructions. Six deliberately general equipment
  descriptions use JEI instead of repeating numerical costs. The two Chaotic
  Staff recipes are alternatives with matching stage, injector tier and energy.
- `draconicevolution:generator` remains intentionally removed; the other gated
  outputs have authored replacements. The 28 preserved conversion/utility recipe
  IDs were not changed. These checks do not rule out every external mod loot/trade
  or machine bypass in a live world.
- Outside the intended boss rewards, the audited quests award XP and seven supply
  crate pools: HV, EV, IV, LuV, ZPM, UV and End. Their contents are basic metals,
  redstone, lapis, glass and food. No direct machine, circuit, slate/orb, industrial
  matrix, awakening ingredient or relic reward bypass was found in this scope.

## Finale

The installed Incendium `entity/other/init.mcfunction` checks a dropped Nether Star
near an Infernal Altar marker and invokes the Inferno summon. Its final detonation
grants `incendium:infernal_dunes/inferno/kill` to eligible survival players within
50 blocks. That advancement's criterion is impossible through an ordinary mob
kill; the encounter function grants it. FTB's existing victory task uses this
exact advancement, not an ordinary Blaze kill.

The victory quest retains its announcement, one `kubejs:rankers_sword` and four
`minecraft:potion` bottles tagged `Potion: "kubejs:radiation"`. These are FTB reward
claims, not newly added entity drops. Existing FTB team progress and individual
reward settings were preserved. Journey's End still depends on the victory quest
and checks sword possession without consuming it. This audit does not impose an
NPC, industrial, ceremony or ring gate on the Inferno summon.

The sword, sonic ability, ring, textures, NPC stories, dimension gates and personal
awakening rules were not edited. Ceremony integration remains disabled and its
memorial-location list empty. The separate structure prototype is not installed.

## Native evidence and reproducibility

Inspected installed class instructions without loading Minecraft or downloading a
decompiler: `MachineRecipeLoader` (coil assembly), `MixerRecipes` (RTM and
Niobium-Titanium), `ReactorRecipes` (Radon), `PolymerRecipes` (Epoxy/PBI),
`CoilBlock$CoilType` (coil temperatures), and `OrganicChemistryMaterials` (fluid ID).
Native instructions establish what that JAR registers; later runtime edits by
other mods still require JEI/playtesting. No claim of a complete numerical audit
of every native EV/IV recipe or ore deposit is made.

| Installed file | SHA-256 |
| --- | --- |
| GTCEu 7.5.3 | `d6560d8b695828a763389d3f45e0210ef70c1892c7b1633ac458544905df1a0d` |
| Draconic Evolution 3.1.2.621 | `06ae009929799d7f912adcf83498b83328395bd53c90e4e03eb07d710b40441a` |
| Incendium 5.3.5 | `96068e4d66ea503efebb1e31d28c2d6ce85db749049463cab9f799c8c0ae1e75` |

Portable audit: `python tools/audit_late_progression.py`. It is included in CI.
Before/after comparison confirmed description-only changes to seven quests and
preserved hashes for 76 runtime files (scripts, recipe/config JSON and the bundled
compatibility JAR). These hashes compare against the start of this audit, retaining
all earlier local work. No live-instance file, save, Git commit, GitHub push or
release publication was performed by this audit.

Executed successfully:

- Portable pack validation: 580 JSON, 89 SNBT, 1,911 quests, 33 reward tables,
  81 NPC quests and 12 pack structures. The separate memorial prototype is outside
  this pack-structure count.
- NPC request audit and the existing 265-quest/39-recipe Blood Magic audit.
- New late progression audit: 340 quests, 634 reward entries, 186 Draconic recipes,
  six observation tasks and eleven chemistry fluid samples.
- Five in-memory fault fixtures rejected: missing industrial matrix, injector
  bootstrap loop, stale fusion energy, progression-item reward and quest cycle.
  These fixtures never wrote changed recipes or quests into the workspace.
- 57 existing mocked World Remembers checks and patch whitespace validation.
- Local development export: `build/Outlandish-Revelations-5.0-development.zip`,
  1,698 overrides. No dependency downloads or release publication.

Changed files for this phase (earlier uncommitted Blood Magic work was retained):

- `config/ftbquests/quests/chapters/extreme_voltage.snbt`
- `config/ftbquests/quests/chapters/insane_voltage.snbt`
- `patchouli_books/outlandish_player_handbook/en_us/entries/chapter_07/topic_05.json`
- `patchouli_books/outlandish_player_handbook/en_us/entries/chapter_08/topic_03.json`
- `tools/audit_late_progression.py` and `.github/workflows/validate.yml`
- `docs/LATE_PROGRESSION_AUDIT.md`, `docs/DEVELOPMENT.md`,
  `docs/BATCH_ACCEPTANCE.md`, `docs/BATCH_PR_DESCRIPTION.md` and `CHANGELOG.md`.

## Manual acceptance still required

After the accumulated development changes are copied into the test instance,
verify the described recipes in JEI and perform representative EV/IV operations,
PBI intermediate steps, successive injector upgrades and Wyvern equipment fusion.
Check formed-controller observation tasks and handbook page fit. Complete the real
Inferno encounter, claim the sword and four potion bottles, then complete the final
sword task. Existing dedicated-server/multiplayer and reward-balance checks remain
pending. No Minecraft crafting, combat, rendering or multiplayer test was run here.
