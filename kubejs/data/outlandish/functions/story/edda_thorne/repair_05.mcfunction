# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^5 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^3 ^5 ^-4 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:cut_copper
execute positioned ^0 ^9 ^-1 if block ~ ~ ~ minecraft:dark_oak_slab[type=bottom,waterlogged=false] run setblock ~ ~ ~ minecraft:cut_copper
execute if entity @s[y_rotation=-45..45] positioned ^0 ^10 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lightning_rod[facing=up,waterlogged=false,powered=false]
execute if entity @s[y_rotation=45..135] positioned ^0 ^10 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lightning_rod[facing=up,waterlogged=false,powered=false]
execute unless entity @s[y_rotation=-135..135] positioned ^0 ^10 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lightning_rod[facing=up,waterlogged=false,powered=false]
execute if entity @s[y_rotation=-135..-45] positioned ^0 ^10 ^-1 if block ~ ~ ~ minecraft:air run setblock ~ ~ ~ minecraft:lightning_rod[facing=up,waterlogged=false,powered=false]
