# Marker-local coordinates follow the cottage rotation. Expected-block checks protect player edits.
execute positioned ^-3 ^0 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-3 ^1 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-3 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-3 ^3 ^-1 if block ~ ~ ~ minecraft:dark_oak_planks run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-3 ^4 ^-1 if block ~ ~ ~ minecraft:dark_oak_slab run setblock ~ ~ ~ minecraft:amethyst_block
execute positioned ^-3 ^5 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lightning_rod
# A repair may be partial if player edits block a replacement; quest progress is independent.
