# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^3 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-1 ^2 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^1 ^2 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
