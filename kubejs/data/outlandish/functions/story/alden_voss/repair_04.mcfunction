# Marker-local coordinates follow the cottage rotation. Expected-block checks protect player edits.
execute positioned ^-3 ^0 ^2 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-2 ^0 ^2 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-1 ^0 ^2 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:cut_copper
# A repair may be partial if player edits block a replacement; quest progress is independent.
