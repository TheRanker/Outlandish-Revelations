# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
execute positioned ^2 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
execute positioned ^-2 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
execute positioned ^2 ^1 ^1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:redstone_lamp[lit=false]
