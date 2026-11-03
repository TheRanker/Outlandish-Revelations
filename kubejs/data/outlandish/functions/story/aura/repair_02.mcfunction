# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^5 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^-5 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^5 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^-2 ^4 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^-1 ^4 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^1 ^4 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
execute positioned ^2 ^4 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:purpur_block
