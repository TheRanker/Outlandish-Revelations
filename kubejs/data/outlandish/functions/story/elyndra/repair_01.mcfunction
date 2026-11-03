# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^-1 ^-6 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:mossy_stone_bricks
execute positioned ^-2 ^-1 ^-6 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:mossy_stone_bricks
execute positioned ^2 ^-1 ^-6 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:mossy_stone_bricks
execute positioned ^3 ^-1 ^-6 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:mossy_stone_bricks
execute positioned ^-4 ^0 ^3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:mossy_stone_bricks
execute positioned ^4 ^0 ^3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:mossy_stone_bricks
