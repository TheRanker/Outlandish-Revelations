# NPC request audit — 2026-11-04

## Findings

All 81 existing quests were checked against dialogue counts, chain parents, named structure entities, reward function references and personal completion advancements. All 76 delivery-summary rows for the eleven newer arcs match their quest titles and quantities. Garrick retains his tested five-quest implementation, including its existing inventory-observation tasks; it was not rewritten to match the newer gift tasks.

The NPC index had five stale FTB task IDs (Voss, Mara, Edda, Ysra and Darius). Actual advancement trackers were already correct; only documentation metadata changed. Portable validation now checks those IDs. Two doubled sentence-ending periods after A.U.R.A. were corrected. No request items, quantities, rewards or progression conditions changed.

| NPC | Quests | FTB delivery-summary rows | Reachable functions checked |
|---|---:|---:|---:|
| Garrick Ashford | 5 | 0 | 3 |
| Professor Alden Voss | 6 | 6 | 13 |
| Mara Coppersmith | 7 | 7 | 15 |
| Captain Edda Thorne | 7 | 7 | 15 |
| Sister Ysra Vale | 7 | 7 | 15 |
| Darius Emberwright | 7 | 7 | 15 |
| Seraphine Blackveil | 7 | 7 | 15 |
| Malric Vane | 7 | 7 | 15 |
| Cassian Ashfall | 7 | 7 | 15 |
| Valen Cinderwatch | 7 | 7 | 15 |
| A.U.R.A. | 7 | 7 | 15 |
| Elyndra | 7 | 7 | 15 |

## Continuity and gameplay boundaries

The intended narrative order remains Garrick -> Voss -> Mara -> Edda -> Ysra -> Darius -> Seraphine -> Malric -> Cassian -> Valen -> A.U.R.A. -> Elyndra. Leads are narrative guidance; the actual dimension-access requirements remain separate team encounters. Named villagers and marker anchors match the request targets. Repeated copies share each player's Quest Giver history; FTB tracker sharing remains distinct. Function references resolve through both KubeJS data and Garrick's preserved Paxi archive.

Requests use vanilla resources plus existing Create components, bronze and steel. No newly introduced dependency on Easy NPC, Accessories, a relic awakening, or the Ring of Ranker was found. The repair and display-only congratulation rewards were not replaced. Final restoration dialogue does not simulate an awakening ceremony.

## Scope of verification

Executed tools/audit_npc_requests.py and portable reference validation. This is authored-data verification. It does not prove live gift interaction, repair rotation, inventory consumption, two-player separation, terrain placement or quest replay behavior. Garrick's non-gift task behavior is preserved as previously tested rather than treated as a reason to modify it. Scroll-repeat test remains pending; K-Turrets crafting/repair was confirmed working by the user before this audit.

## Delivery list

### Garrick Ashford

8 minecraft:iron_ingot; 12 minecraft:flint; 16 minecraft:brick; 12 minecraft:copper_ingot; 1 minecraft:anvil.

### Professor Alden Voss

16 minecraft:oak_planks; 12 minecraft:stone_bricks; 8 minecraft:glass; 12 minecraft:copper_ingot; 12 minecraft:paper; 4 minecraft:amethyst_shard.

### Mara Coppersmith

16 minecraft:spruce_planks; 12 minecraft:stone_bricks; 8 create:andesite_alloy; 4 create:shaft; 4 create:cogwheel; 12 gtceu:bronze_ingot; 12 minecraft:paper.

### Captain Edda Thorne

16 minecraft:stone_bricks; 16 minecraft:spruce_planks; 12 minecraft:iron_ingot; 8 minecraft:white_wool; 8 minecraft:copper_ingot; 12 minecraft:paper; 4 minecraft:lantern.

### Sister Ysra Vale

16 minecraft:stone_bricks; 16 minecraft:birch_planks; 8 minecraft:glass; 8 minecraft:white_wool; 8 minecraft:poppy; 12 minecraft:paper; 4 minecraft:lantern.

### Darius Emberwright

16 minecraft:polished_blackstone_bricks; 16 minecraft:crimson_planks; 12 minecraft:iron_ingot; 8 gtceu:steel_ingot; 12 minecraft:quartz; 12 minecraft:paper; 4 minecraft:soul_lantern.

### Seraphine Blackveil

16 minecraft:blackstone; 16 minecraft:warped_planks; 12 minecraft:iron_ingot; 8 minecraft:white_wool; 4 minecraft:gold_ingot; 12 minecraft:paper; 4 minecraft:soul_lantern.

### Malric Vane

16 minecraft:polished_blackstone_bricks; 12 minecraft:quartz; 8 minecraft:glass; 12 minecraft:iron_ingot; 8 minecraft:redstone; 12 minecraft:paper; 4 minecraft:amethyst_shard.

### Cassian Ashfall

16 minecraft:smooth_basalt; 12 minecraft:quartz; 12 minecraft:copper_ingot; 8 minecraft:gold_ingot; 8 minecraft:glass; 12 minecraft:paper; 4 minecraft:amethyst_shard.

### Valen Cinderwatch

16 minecraft:nether_bricks; 16 minecraft:basalt; 12 minecraft:iron_ingot; 8 minecraft:red_wool; 4 minecraft:gold_ingot; 12 minecraft:paper; 4 minecraft:soul_lantern.

### A.U.R.A.

16 minecraft:end_stone_bricks; 16 minecraft:purpur_block; 8 minecraft:glass; 8 minecraft:gold_ingot; 12 minecraft:redstone; 12 minecraft:paper; 4 minecraft:amethyst_shard.

### Elyndra

16 minecraft:mossy_stone_bricks; 16 minecraft:oak_planks; 6 minecraft:azalea; 8 minecraft:white_wool; 8 minecraft:glass; 12 minecraft:paper; 4 minecraft:lantern.
