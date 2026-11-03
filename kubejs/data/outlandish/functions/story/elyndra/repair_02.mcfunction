# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^5 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^-5 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^5 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^-2 ^5 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^-1 ^5 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^1 ^5 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
execute positioned ^2 ^5 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:oak_planks
