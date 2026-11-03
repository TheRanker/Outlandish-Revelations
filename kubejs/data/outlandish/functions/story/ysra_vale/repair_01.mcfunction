# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-4 ^0 ^-1 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-4 ^1 ^-1 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^4 ^0 ^-1 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^4 ^1 ^-1 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-2 ^-1 ^-3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^2 ^-1 ^-3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
