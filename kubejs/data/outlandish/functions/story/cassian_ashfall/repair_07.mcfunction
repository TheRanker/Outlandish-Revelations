# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^2 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^-2 ^1 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^2 ^1 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
