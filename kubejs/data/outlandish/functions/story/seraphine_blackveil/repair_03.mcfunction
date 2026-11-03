# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^2 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^-2 ^2 ^3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^8 ^2 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
execute positioned ^8 ^2 ^5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:iron_bars
