# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^3 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^-3 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^3 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:amethyst_block
