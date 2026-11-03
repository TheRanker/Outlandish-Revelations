# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-4 ^0 ^-1 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-4 ^0 ^0 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-4 ^0 ^1 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^4 ^0 ^-1 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^4 ^0 ^0 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^4 ^0 ^1 if block ~ ~ ~ minecraft:oak_planks run setblock ~ ~ ~ minecraft:white_wool
