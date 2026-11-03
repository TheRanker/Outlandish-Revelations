# Marker-local coordinates follow the cottage rotation. Expected-block checks protect player edits.
execute positioned ^-3 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^3 ^1 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^-5 ^1 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^5 ^1 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^-2 ^1 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
execute positioned ^2 ^1 ^4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:glass
# A repair may be partial if player edits block a replacement; quest progress is independent.
