# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-1 ^0 ^2 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^-1 ^0 ^3 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^0 ^0 ^3 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^3 ^0 ^5 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^4 ^0 ^5 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:white_wool
execute positioned ^4 ^0 ^4 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:white_wool
