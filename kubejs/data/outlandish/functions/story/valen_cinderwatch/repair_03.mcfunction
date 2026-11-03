# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-4 ^2 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-4 ^2 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^4 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-2 ^2 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^2 ^2 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
