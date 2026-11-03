# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^4 if block ~ ~ ~ minecraft:flower_pot run setblock ~ ~ ~ minecraft:potted_poppy
execute positioned ^3 ^1 ^4 if block ~ ~ ~ minecraft:flower_pot run setblock ~ ~ ~ minecraft:potted_poppy
execute positioned ^-3 ^1 ^7 if block ~ ~ ~ minecraft:flower_pot run setblock ~ ~ ~ minecraft:potted_poppy
execute positioned ^3 ^1 ^7 if block ~ ~ ~ minecraft:flower_pot run setblock ~ ~ ~ minecraft:potted_poppy
