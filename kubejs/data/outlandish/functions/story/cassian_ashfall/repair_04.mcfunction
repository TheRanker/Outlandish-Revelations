# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-1 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^1 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^-1 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
execute positioned ^1 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:light_weighted_pressure_plate[power=0]
