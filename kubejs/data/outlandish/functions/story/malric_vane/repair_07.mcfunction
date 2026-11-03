# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-1 ^1 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^1 ^1 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^-1 ^1 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^1 ^1 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
