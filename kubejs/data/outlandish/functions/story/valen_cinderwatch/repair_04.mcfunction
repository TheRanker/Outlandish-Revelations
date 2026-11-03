# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^0 ^0 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:red_wool
execute positioned ^-3 ^0 ^1 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:red_wool
execute positioned ^-3 ^0 ^2 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:red_wool
execute positioned ^-2 ^0 ^2 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:red_wool
execute positioned ^-2 ^2 ^-4 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:red_wool
execute positioned ^2 ^2 ^-4 if block ~ ~ ~ minecraft:warped_planks run setblock ~ ~ ~ minecraft:red_wool
