# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^1 ^-4 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^-3 ^2 ^-4 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^3 ^1 ^-3 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^3 ^2 ^-3 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^-1 ^1 ^4 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^1 ^1 ^4 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
