# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-4 ^1 ^-2 if block ~ ~ ~ minecraft:cracked_nether_bricks run setblock ~ ~ ~ minecraft:nether_bricks
execute positioned ^-4 ^2 ^-2 if block ~ ~ ~ minecraft:cracked_nether_bricks run setblock ~ ~ ~ minecraft:nether_bricks
execute positioned ^4 ^1 ^-2 if block ~ ~ ~ minecraft:cracked_nether_bricks run setblock ~ ~ ~ minecraft:nether_bricks
execute positioned ^4 ^2 ^-2 if block ~ ~ ~ minecraft:cracked_nether_bricks run setblock ~ ~ ~ minecraft:nether_bricks
execute positioned ^-2 ^1 ^3 if block ~ ~ ~ minecraft:cracked_nether_bricks run setblock ~ ~ ~ minecraft:nether_bricks
execute positioned ^2 ^1 ^3 if block ~ ~ ~ minecraft:cracked_nether_bricks run setblock ~ ~ ~ minecraft:nether_bricks
