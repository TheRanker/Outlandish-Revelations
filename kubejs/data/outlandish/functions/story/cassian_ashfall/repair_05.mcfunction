# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^5 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^0 ^2 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^0 ^6 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
