# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^1 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^-2 ^1 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^2 ^1 ^0 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^4 ^1 ^6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^0 ^4 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^1 ^4 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^4 ^5 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
execute positioned ^5 ^5 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:warped_planks
