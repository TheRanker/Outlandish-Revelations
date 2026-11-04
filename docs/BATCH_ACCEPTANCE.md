# Local batch acceptance — 2026-11-04

## Verified without gameplay today

- Syntax: all 68 KubeJS files and 17 Python tools parse; events were not executed.
- Portable pack validation: 581 JSON, 89 SNBT, 1,911 quests, 33 reward tables, 81 NPC quests, 12 structures; handbook categories and native artifact hash.
- Instance identity reconciliation: preserve the live Valen/A.U.R.A. FTB chapter, quest and task IDs and all editor metadata, merging only description punctuation. No quest progress reset.
- NPC audit: all 81 requests, exact named villagers, parent chains, completion links, all reachable functions including Garrick Paxi functions, and 76 title/count summary rows.
- World Remembers: 80 mocked script checks, including native-completion mirroring and preservation of older UUID/date records. All twelve optional greetings and independent display contexts pass. This does not run a ceremony or graphics.
- Native relics 1.2.8: Java 17 build/SRG remapping, 19 classes and 435 installed API member references checked; common classes contain no client API types. 53 production rules/journal checks (including failed-write/restart recovery), 11 actual binding-bytecode fixtures, and actual Nashorn/coremod instruction-preservation checks at six ordinary knife returns, one altar recipient and three incense returns passed. The expected unreadable-journal line comes from a deliberately corrupt fixture.
- Existing native bridge in the new JAR: 13 JVM fixtures and dedicated-side loading without its client bridge/render event passed. This is not a full native-relic Forge server boot.
- Native packaging: ten JSON resources and a 23,870-block-entry memorial NBT validated, matching packaged resources, twelve personal advancement links, Java 17/client boundaries and disabled defaults checked. Native worldgen is registered with the JAR even while gameplay is off. Creator-supplied original 64 × 64 skin is now bundled unchanged, with classic arms and a pinned checksum verified against the JAR. Native class bytes are unchanged by the skin update; no substitute was used.
- Relic preservation: original sword/ring artwork, six-frame animation, sonic script and item properties pass fingerprint checks. Installed Curios/Caelus/Blood Magic APIs inspected; Apotheosis Enchantment enabled and Adventure disabled. Native source only adds its own item compound and leaves prior compatibility payload byte-identical apart from metadata/additive coremod mapping.
- Dependency pins refreshed from public launcher addon IDs for current files only; disabled JEIOptimizer excluded; exactly one custom 1.2.8 JAR bundled; 1.2.7 retained only as a repository rollback artifact. No account information, save files or progress repairs are included in exports.
- Earlier live logs confirm 1.2.7 loaded all script groups without errors and the UUID failure did not recur. The new 1.2.8 is now installed with a rollback backup, but has not been launched in Minecraft.
- User confirmed K-Turrets crafting/repair works after titanium unification.

- Blood Magic audit: 24 custom items with producers, 39 authored recipes, 265 quests and 450 reward entries; tier numbering and 24 texture references checked against installed assets. Recipe/memorial runtime files unchanged.
- Late progression audit: 340 quests, 634 reward entries, seven supply pools and 186 authored Draconic recipes. No cross-chapter quest dependency cycles; six formed-machine task links and eleven chemistry sample tasks resolve. Installed GTCEu 7.5.3 recipe instructions and Incendium 5.3.5 summon/victory functions were inspected. Seven quest descriptions and two handbook topics clarified; all other selected quest data and 76 runtime file hashes preserved. See LATE_PROGRESSION_AUDIT.md for scope and limits.

## Pending when gameplay is available

- Follow LEGENDARY_RELICS_TESTING.md for the full native ceremony/combat/equipment/persistence/render checklist in a separate backed-up test copy. Multiplayer remains deferred until nearer release, as requested.

- Replacement scroll: claim, wait, re-tick, claim again, then retry after relog. Its one-off test-world reset is local and is not a portable fix for every previously claimed save.
- Create platinum raw-to-dust recipe: verify JEI and one crushing operation.
- Handbook version 5: check page fit and chapter 7 ore-upgrade topic.
- Late progression guidance: confirm Kanthal and RTM coil recipes, IV Niobium-Titanium mixing, Radon recycling and PBI's Large Chemical Reactor steps in JEI; check the new chapter 7/8 handbook pages. Test real fusion crafts, formed-machine observations, the Inferno victory claim and final sword task before release.
- Sword recognition: normal Quest Scroll conversation with sword in hotbar/storage/offhand; ordinary dialogue/rewards remain usable. No backpack/Curios recognition is intended.
- All newly authored NPC arcs: hand-ins, rotated repairs, player edit protection, copies and one-time completion; preserve Garrick's tested behavior.
- Transporter components: check usable Industrial Foregoing transporter-type item icons, placement and connection rendering; the hidden base item #inventory log alone is not a conclusive visual failure.
- Accessories beta48: equip/effects, save/relog retention, relevant inventory-predicate interactions. Known rejected hook remains visible and does not block current story work.
- Dedicated Forge server, two-player personal/team separation, reward balance and pregeneration/performance tests remain release preparation.

## Known deferred work

ShetiPhianCore and Sodium Dynamic Lights retain upstream resource-listener registration warnings. No new native patch was attempted in this batch. Native memorial/ceremony, paired powers and presentation are implemented but disabled pending game acceptance. Apparition appearance, real LP/chunk/player-save behavior, Totems/modded revival, flight coexistence, dedicated Forge and multiplayer remain unverified. See LEGENDARY_RELICS_TESTING.md. Installed fifteen verified files with a rollback backup and local relic testing enabled; no saves/player progress were changed and no CurseForge release has been published. See INSTANCE_INSTALLATION.md.
