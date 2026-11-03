# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-4 ^2 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^-4 ^2 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^4 ^2 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^4 ^2 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^-4 ^2 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^4 ^2 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
