# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-1 ^1 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:heavy_weighted_pressure_plate[power=0]
execute positioned ^0 ^1 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:heavy_weighted_pressure_plate[power=0]
execute positioned ^1 ^1 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:heavy_weighted_pressure_plate[power=0]
