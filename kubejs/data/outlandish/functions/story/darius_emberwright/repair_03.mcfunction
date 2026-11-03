# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^2 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-5 ^2 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^5 ^2 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^5 ^2 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
