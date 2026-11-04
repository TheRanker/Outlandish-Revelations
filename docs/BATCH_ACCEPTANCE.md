# Local batch acceptance — 2026-11-04

## Verified without gameplay today

- Portable pack validation: 580 JSON, 89 SNBT, 1,911 quests, 33 reward tables, 81 NPC quests, 12 structures; handbook categories and native artifact hash.
- NPC audit: all 81 requests, exact named villagers, parent chains, completion links, all reachable functions including Garrick Paxi functions, and 76 title/count summary rows.
- World Remembers: 57 mocked checks; 13 native Java fixture checks; dedicated-side JVM test with client-only bridge/event classes absent. Real Forge server/multiplayer still untested.
- Native bridge rebuilt against installed Forge/Minecraft libraries from the hash-verified original 1.2.6 backup; every JAR entry matches the pinned artifact's content. All old compatibility payloads preserved except version metadata.
- Dependency pins refreshed from public launcher addon IDs for current files only; disabled JEIOptimizer excluded; exactly one custom 1.2.7 JAR bundled. No account information, save files or progress repairs are included in exports.
- Earlier logs confirm 1.2.7 loads all script groups without errors and the old UUID failure did not recur.
- User confirmed K-Turrets crafting/repair works after titanium unification.

## Pending when gameplay is available

- Replacement scroll: claim, wait, re-tick, claim again, then retry after relog. Its one-off test-world reset is local and is not a portable fix for every previously claimed save.
- Create platinum raw-to-dust recipe: verify JEI and one crushing operation.
- Handbook version 4: check page fit and chapter 7 ore-upgrade topic.
- Sword recognition: normal Quest Scroll conversation with sword in hotbar/storage/offhand; ordinary dialogue/rewards remain usable. No backpack/Curios recognition is intended.
- All newly authored NPC arcs: hand-ins, rotated repairs, player edit protection, copies and one-time completion; preserve Garrick's tested behavior.
- Transporter components: check usable Industrial Foregoing transporter-type item icons, placement and connection rendering; the hidden base item #inventory log alone is not a conclusive visual failure.
- Accessories beta48: equip/effects, save/relog retention, relevant inventory-predicate interactions. Known rejected hook remains visible and does not block current story work.
- Dedicated Forge server, two-player personal/team separation, reward balance and pregeneration/performance tests remain release preparation.

## Known deferred work

ShetiPhianCore and Sodium Dynamic Lights retain upstream resource-listener registration warnings. No new native patch was attempted in this batch. Memorial anchors and real Tier 1 three-offering ceremony remain unimplemented/disabled; no false awakening or completion is granted. No release has been published.
