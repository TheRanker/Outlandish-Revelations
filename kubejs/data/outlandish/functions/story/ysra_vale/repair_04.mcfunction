# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^0 ^-1 if block ~ ~ ~ minecraft:birch_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-3 ^0 ^0 if block ~ ~ ~ minecraft:birch_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-3 ^0 ^1 if block ~ ~ ~ minecraft:birch_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^3 ^0 ^-1 if block ~ ~ ~ minecraft:birch_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^3 ^0 ^0 if block ~ ~ ~ minecraft:birch_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^3 ^0 ^1 if block ~ ~ ~ minecraft:birch_planks run setblock ~ ~ ~ minecraft:white_wool
