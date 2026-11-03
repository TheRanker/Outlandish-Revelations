# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-5 ^2 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^3 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^3 ^2 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-3 ^1 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-2 ^1 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:stone_bricks
