# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^2 ^-4 if block ~ ~ ~ minecraft:smooth_basalt run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^5 ^2 ^-4 if block ~ ~ ~ minecraft:smooth_basalt run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^-2 ^2 ^3 if block ~ ~ ~ minecraft:smooth_basalt run setblock ~ ~ ~ minecraft:quartz_block
execute positioned ^2 ^2 ^3 if block ~ ~ ~ minecraft:smooth_basalt run setblock ~ ~ ~ minecraft:quartz_block
