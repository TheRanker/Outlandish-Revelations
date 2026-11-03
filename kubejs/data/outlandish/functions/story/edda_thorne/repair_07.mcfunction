# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^5 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
execute positioned ^1 ^5 ^-5 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
execute positioned ^-4 ^5 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
execute positioned ^3 ^5 ^2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lantern[hanging=false,waterlogged=false]
