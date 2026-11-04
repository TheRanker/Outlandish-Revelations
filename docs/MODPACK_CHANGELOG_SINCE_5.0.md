# Outlandish Revelations — changes since 5.0

**Current development batch; no new CurseForge release number assigned.**
Minecraft 1.20.1, Forge 47.4.28. This covers the accumulated pack work since the
initial 5.0 release, including previously merged story/handbook/reward work and
the current stability, progression and relic batch. Features described as
experimental are implemented for testing and have not passed gameplay acceptance.

## The Unfinished Promise

- Add twelve connected, personally completed NPC story arcs running alongside
  technological and adventure progression, without replacing either route.
- Overworld: Garrick Ashford, Professor Alden Voss, Mara Coppersmith, Captain Edda
  Thorne and Sister Ysra Vale.
- Nether: Darius Emberwright, Seraphine Blackveil, Malric Vane, Cassian Ashfall and
  Valen Cinderwatch.
- End: A.U.R.A. Twilight Forest: Elyndra, Keeper of the Veil.
- Add distinct generated homes and staged restoration tied to material deliveries.
  Preserve Garrick's tested five quests, generated forge and anvil repair behavior.
  Restoration functions identify the nearby correct structure and protect
  player-placed replacement blocks.
- Make story completion one-time per player across all copies of each NPC.
  Finding another ruined home does not reset a finished arc. A shared building's
  visible repairs and each player's personal history remain separate.
- Configure Nether homes for Incendium outside the Infernal Dunes. Place A.U.R.A.
  on Nullscape's outer-island route, away from the dragon's central island, and
  add Elyndra's Twilight woodland refuge.
- Audit all 81 Quest Giver requests, dialogue counts, parent chains, named entities,
  completion functions and 76 FTB delivery-summary rows. Correct stale index IDs
  and retain the live editor identities/settings for Valen and A.U.R.A.

## Questbook, rewards and player handbook

- Cross-reference 1,911 FTB quests and 33 reward tables with progression, story
  descriptions and finale rewards. Explain personal story history versus shared
  FTB team trackers.
- Correct the replacement Quest Scroll's repeat definition. Existing claimed saves
  still need the documented claim/relog test; no bulk progress reset is included.
- Differentiate all 17 workshop reward pools by theme and rarity; retune 16 while
  retaining the established Steam baseline. Preserve table IDs, draw counts and
  quest links. Rewards remain basic supplies rather than machines, boss keys or
  relic shortcuts.
- Update the player handbook, now revision 5, with NPC discovery, one-time stories,
  restoration, scrolls, reward bags, ore routes, later industry and the approved
  experimental awakening requirements.
- Preserve live FTB chapter/quest/task IDs and extra editor settings during the
  instance installation, rather than replacing saved identities with template IDs.

## Ore, crafting and later progression

- Retain useful early raw-ore processing. Explain optional MV/HV refinement and
  byproduct routes instead of forcing every ore through a later industrial line.
- Add a matching 1:1 Create raw-platinum-to-dust route.
- Unify nine K-Turrets titanium crafting inputs and the repair ingredient with the
  pack's titanium tags. The creator has confirmed crafting/repair works.
- Audit Blood Magic's 24 custom items, 39 authored recipes and tier references;
  review 265 early/industrial quests and 450 rewards. Clarify altar tiers and rune
  supply milestones without changing recipe costs or established gates.
- Audit 340 later/finale quests, 634 rewards and 186 authored Draconic recipes.
  Correct Kanthal/RTM coil guidance, Niobium-Titanium mixing and Radon recycling
  descriptions; clarify circuit milestones and platinum guidance. Preserve recipe
  costs, quest tasks, rewards and the existing fusion/injector progression.

## The World Remembers and Legendary Relics — experimental

- All twelve NPCs offer short optional congratulations when the sword is carried
  anywhere in normal inventory/offhand. Recognition leaves ordinary quests and
  rewards usable and does not itself grant awakening.
- Compatibility mod 1.2.8 implements the memorial and one joint awakening for both
  original relics: all twelve personal stories, three real 10,000-LP Tier 1 basin
  payments, and the player's separately verified final knife sacrifice.
- Add personal payment recovery, paired in-place soulbinding, a permanent individual
  achievement/date and a per-viewer memorial inscription using the current username.
- Add Warden ring acquisition, dormant dangerous-hit protection, awakened Last Stand
  and creative-style flight; add resonance, Fracture, Echo and aerial Skybreaker
  to the awakened sword. Owner validation and combat calculations stay on the server.
- Add an optional adjustable HUD, owner tooltips and the harmless ascension cinematic
  with the creator's exact original skin. No real lightning, fire or terrain damage.
- Preserve the sword/ring artwork and IDs, six-frame sword animation, original
  sonic attack and all player-applied item data. Do not auto-enchant the relics.
- Native gameplay is off in repository/export defaults and enabled in the creator's
  development instance for testing. No real ceremony, combat, flight, cinematic or
  multiplayer acceptance has been claimed. See [the testing guide](LEGENDARY_RELICS_TESTING.md).

## Loading, compatibility and packaging

- Upgrade the existing compatibility mod through the stable 1.2.7 story bridge to
  the additive 1.2.8 relic integration; preserve its earlier targeted fixes. See
  [the JAR changelog](../compat/CHANGELOG.md).
- Correct the Ponder script closure and obsolete Tinkers basin/table item references.
- Correct Beautify's candelabra advancement item references.
- Replace A.U.R.A.'s invalid structure placement salt/configuration with its proper
  outer-island setup.
- Narrow Log Begone rules to the observed harmless callback and repeated height-range
  messages. Keep unrelated worldgen, mixin and error diagnostics visible. Filtering
  reduces log output, not chunk-generation work or TPS cost.
- Remove the incompatible JEIOptimizer from development distribution. Refresh
  CurseForge dependency pins to the actual current pack; relevant installed
  versions include Accessories beta48, Easy NPC 7.18.0, JEI 15.74.0.234,
  GTCEu 7.5.3, Curios 5.14.1 and Blood Magic 3.3.8-50. This is not a complete
  version-by-version changelog of every third-party mod since 5.0.
- Restore tracked FTB/Paxi/menu resources and add source, validation, audit and
  local-export tools. Export exactly one custom compatibility JAR. Exclude worlds,
  player progress, launcher credentials and machine-specific settings.

## Established progression retained

Create → GTCEu Stone/Steam/LV/MV/HV/EV/IV remains the established progression.
The qualifying Warden victory unlocks the Nether for the FTB team; the qualifying
Wither victory unlocks the End; End entry unlocks Twilight Forest. The Inferno
victory still awards Tears for Fears and four Radiation bottles. Story restoration
and personal relic awakening do not change those dimension gates.

## Validation and remaining acceptance

Portable checks cover 581 pack JSON files, 89 SNBT files, 1,911 quests, 33 reward
tables, all 81 NPC requests, twelve NPC structures and the additional native
memorial resources. All 68 KubeJS files parse. The native build/API/asset checks,
53 rule/journal checks, 11 binding-bytecode fixtures, 13 bridge fixtures, three real
coremod transformation tests and 80 mocked script checks passed. These are not
Minecraft or multiplayer tests.

Still pending: real ritual LP/chunk/player saves, combat balance, Totems/modded
revival, flight coexistence, cinematic/HUD/page layout, dedicated Forge and the
planned near-release two-player tests. Replacement-scroll claims, new recipe JEI
checks and authored-arc playthroughs retain their existing acceptance checklist.
Known upstream ShetiPhianCore/Sodium Dynamic Lights listener warnings and the
Accessories beta48 inventory-predicate limitation remain documented; transporter
component rendering still needs inspection. Pregeneration remains planned before
release, rather than a claimed fix for generation-time TPS.
