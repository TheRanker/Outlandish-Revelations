# Reward-table cohesion

The 17 formerly identical pools now have distinct workshop themes and rarity supplies. Sixteen tables are retuned; `outlandish_steam` retains its existing general Steam bag baseline. All original table IDs, crate identifiers, weights/defaults, one-draw sizes and quest reward definitions are preserved.

Each table still makes one draw from four possible stacks. The table below lists possibilities, not a guarantee of receiving every listed item.

| Pool | Possible stack rewards |
|---|---|
| common | 16 torch; 8 coal; 8 copper ingot; 4 cooked porkchop |
| uncommon | 8 iron ingot; 8 redstone; 16 glass; 8 cooked porkchop |
| rare | 12 iron ingot; 16 redstone; 4 gold ingot; 12 lapis lazuli |
| epic | 24 iron ingot; 24 redstone; 8 gold ingot; 16 lapis lazuli |
| legendary | 32 iron ingot; 32 redstone; 12 gold ingot; 24 lapis lazuli |
| ae2_basic_rewards | 12 iron ingot; 16 copper ingot; 12 redstone; 16 glass |
| ae2_basic_reward_table | 24 glass; 16 redstone; 12 paper; 8 iron ingot |
| ars_nouveau_rewards | 8 lapis lazuli; 4 amethyst shard; 16 paper; 4 gold ingot |
| blood_magic_loot_bag | 32 stone; 16 glass; 12 redstone; 8 iron ingot |
| botania_flowers | 4 white mystical flower; 4 light blue mystical flower; 4 yellow mystical flower; 4 red mystical flower |
| elven_loot | 24 glass; 6 gold ingot; 12 lapis lazuli; 16 paper |
| legendary_mana_loot | 8 gold ingot; 16 lapis lazuli; 8 amethyst shard; 24 bone meal |
| living_loot | 16 oak log; 24 cobblestone; 12 wheat; 8 leather |
| Rune_loot | 12 bone meal; 16 clay ball; 12 redstone; 16 paper |
| twilight_forest_loot_bag | 24 torch; 12 baked potato; 24 oak planks; 16 paper |
| gt_steam_basic_rewards | 24 torch; 16 coal; 12 copper ingot; 12 clay ball |
| outlandish_steam | 32 torch; 16 coal; 12 copper ingot; 8 cooked porkchop |

## Balance boundaries

- Only basic vanilla supplies and four ordinary Botania mystical-flower colours are included.
- No finished machines, voltage circuits, mana/elementium ingots, functional flowers, slates/orbs, glyphs, boss trophies, dimension keys, relics or awakening materials are awarded.
- Rare -> Epic -> Legendary use the same four raw materials with every stack increasing. Common and Uncommon remain small practical supplies.
- AE2 assembly and network maintenance pools have different useful inputs. Rune and magic supply names now describe ingredients rather than promising completed progression items.
- Existing GT/Outlandish LV through IV reward tables and their compatibility IDs are outside this patch.
- NPC completion rewards, the replacement scroll, boss sword/Radiation awards and all quest conditions are unchanged.
- Several legacy pools have no direct quest reference in the current pack. Their IDs and existing registrations remain intact; this patch does not add new drops or repeatable reward paths.

## Validation and manual check

Preparation verified every selected item model against the installed vanilla/Botania JARs and proved table metadata unchanged except rewards/display title. Portable validation enforces the 17 stable IDs, four-entry pools, one-draw sizes, distinct contents, safe supply allowlist and Rare/Epic/Legendary quantity increases.

After restarting Minecraft, inspect representative Common/Rare/Epic/Legendary and themed rewards in FTB Quests. Claim the existing Steam bag and a story completion reward to verify their established behavior. Use a disposable test world to inspect retained legacy tables; this patch does not attach them to new quests. Watch quantities through a normal playthrough before release. Static checks cannot prove economic balance or live claim behavior.

Policy data: `tools/data/reward_pools.json`.
