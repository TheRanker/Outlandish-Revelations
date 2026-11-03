# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^0 ^-3 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^2 ^0 ^-3 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^-2 ^0 ^-1 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^2 ^0 ^-1 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:cut_copper
