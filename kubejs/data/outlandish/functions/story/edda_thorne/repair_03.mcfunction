# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^2 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-5 ^2 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^3 ^2 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^3 ^2 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-3 ^5 ^-7 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^1 ^5 ^-7 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-3 ^5 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^1 ^5 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
