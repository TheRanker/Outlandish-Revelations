# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^-1 ^-6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:end_stone_bricks
execute positioned ^-2 ^-1 ^-6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:end_stone_bricks
execute positioned ^2 ^-1 ^-6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:end_stone_bricks
execute positioned ^3 ^-1 ^-6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:end_stone_bricks
execute positioned ^-2 ^1 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:end_stone_bricks
execute positioned ^2 ^1 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:end_stone_bricks
