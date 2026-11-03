# Marker-local repair, preserving unexpected player blocks.
execute positioned ^-3 ^0 ^3 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:bookshelf
execute positioned ^-2 ^0 ^3 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:bookshelf
execute if entity @s[y_rotation=-45..45] positioned ^2 ^0 ^3 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:lectern[facing=north,has_book=false,powered=false]
execute if entity @s[y_rotation=45..135] positioned ^2 ^0 ^3 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:lectern[facing=east,has_book=false,powered=false]
execute unless entity @s[y_rotation=-135..135] positioned ^2 ^0 ^3 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:lectern[facing=south,has_book=false,powered=false]
execute if entity @s[y_rotation=-135..-45] positioned ^2 ^0 ^3 if block ~ ~ ~ minecraft:purpur_block run setblock ~ ~ ~ minecraft:lectern[facing=west,has_book=false,powered=false]
