# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^0 ^-2 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
execute positioned ^2 ^0 ^-2 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
execute positioned ^-2 ^0 ^2 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
execute positioned ^2 ^0 ^2 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
