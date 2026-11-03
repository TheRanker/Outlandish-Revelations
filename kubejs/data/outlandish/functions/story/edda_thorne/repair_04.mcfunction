# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^0 ^0 if block ~ ~ ~ minecraft:spruce_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-3 ^0 ^1 if block ~ ~ ~ minecraft:spruce_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-2 ^0 ^0 if block ~ ~ ~ minecraft:spruce_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-2 ^0 ^1 if block ~ ~ ~ minecraft:spruce_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-2 ^8 ^-3 if block ~ ~ ~ minecraft:spruce_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^2 ^8 ^-3 if block ~ ~ ~ minecraft:spruce_planks run setblock ~ ~ ~ minecraft:white_wool
