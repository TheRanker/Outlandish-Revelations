# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^3 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^-3 ^1 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^3 ^1 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
