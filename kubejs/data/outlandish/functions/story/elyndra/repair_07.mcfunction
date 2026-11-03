# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
execute positioned ^3 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
execute positioned ^-2 ^1 ^6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
execute positioned ^2 ^1 ^6 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
