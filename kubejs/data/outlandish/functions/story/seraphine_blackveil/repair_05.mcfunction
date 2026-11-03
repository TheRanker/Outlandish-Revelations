# Marker-local repair, preserving unexpected player blocks.
execute positioned ^5 ^1 ^5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^3 ^1 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^3 ^1 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^6 ^1 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
