# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^3 ^-5 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^3 ^3 ^-5 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^-3 ^3 ^2 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^3 ^3 ^2 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
