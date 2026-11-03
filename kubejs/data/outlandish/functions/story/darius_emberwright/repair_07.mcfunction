# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
execute positioned ^3 ^1 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
execute positioned ^-4 ^1 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
execute positioned ^4 ^1 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:soul_lantern[hanging=false,waterlogged=false]
