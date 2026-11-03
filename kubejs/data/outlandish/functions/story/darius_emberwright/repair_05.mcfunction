# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-2 ^2 ^4 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^-1 ^2 ^4 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^1 ^2 ^4 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^2 ^2 ^4 if block ~ ~ ~ minecraft:polished_blackstone_bricks run setblock ~ ~ ~ minecraft:quartz_block
