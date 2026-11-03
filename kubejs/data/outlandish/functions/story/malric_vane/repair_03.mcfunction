# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^2 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^-3 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^3 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^3 ^2 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^0 ^4 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^0 ^5 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
