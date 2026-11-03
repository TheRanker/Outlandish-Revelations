# Marker-local coordinates follow the cottage rotation. Expected-block checks protect player edits.
execute positioned ^-4 ^-2 ^-3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-3 ^-2 ^-3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^3 ^-2 ^3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^4 ^-2 ^3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^-4 ^-2 ^3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
execute positioned ^4 ^-2 ^-3 if block ~ ~ ~ minecraft:cracked_stone_bricks run setblock ~ ~ ~ minecraft:stone_bricks
# A repair may be partial if player edits block a replacement; quest progress is independent.
