# Marker-local coordinates follow the cottage rotation. Expected-block checks protect player edits.
execute positioned ^2 ^0 ^3 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:bookshelf
execute positioned ^3 ^0 ^3 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:bookshelf
execute positioned ^4 ^0 ^3 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:bookshelf
# A repair may be partial if player edits block a replacement; quest progress is independent.
