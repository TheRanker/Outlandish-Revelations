# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^-1 ^-5 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^-2 ^-1 ^-5 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^2 ^-1 ^-5 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^3 ^-1 ^-5 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^-2 ^1 ^4 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
execute positioned ^2 ^1 ^4 if block ~ ~ ~ minecraft:cracked_polished_blackstone_bricks run setblock ~ ~ ~ minecraft:polished_blackstone_bricks
