# Marker-local coordinates follow the cottage rotation. Expected-block checks protect player edits.
execute positioned ^-4 ^0 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^-3 ^0 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^3 ^0 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^4 ^0 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^-5 ^0 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^5 ^0 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
# A repair may be partial if player edits block a replacement; quest progress is independent.
