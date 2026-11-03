# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-5 ^1 ^-3 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:smooth_basalt
execute positioned ^-5 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:smooth_basalt
execute positioned ^5 ^1 ^-2 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:smooth_basalt
execute positioned ^5 ^1 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:smooth_basalt
execute positioned ^-2 ^-1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:smooth_basalt
execute positioned ^2 ^-1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:smooth_basalt
