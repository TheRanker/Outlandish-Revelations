# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^1 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
execute positioned ^2 ^1 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
execute positioned ^3 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
execute positioned ^7 ^9 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
