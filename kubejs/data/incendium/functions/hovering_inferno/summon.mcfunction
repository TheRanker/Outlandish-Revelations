# from: entity/other/init
# @s: item

scoreboard players set $running in.inferno 1
scoreboard players set $cheater in.inferno 0
scoreboard players set $last.timer in.inferno 0

# summon the damn thing
execute at @e[type=marker,tag=in.altar,distance=..4] run summon blaze ~ ~4 ~ {Attributes: [{Base: 900.0d, Name: "minecraft:generic.max_health"}, {Base: 25.0d, Name: "minecraft:generic.armor"}, {Base: 0.87d, Name: "minecraft:generic.knockback_resistance"}, {Base: 25.0d, Name: "minecraft:generic.attack_knockback"}, {Base: 15.0d, Name: "minecraft:generic.armor_toughness"}, {Base: 0.4d, Name: "minecraft:generic.movement_speed"}, {Base: 30.0d, Name: "minecraft:generic.attack_damage"}, {Base: 70.0d, Name: "minecraft:generic.follow_range"}], PersistenceRequired: 1b, Tags: ["in.hovering_inferno"], Health: 900.0f, Rotation: [-129.48582f, 0.0f], HandItems: [{id:"totem_of_undying",Count:1b}, {}], CustomName: '{"translate":"incendium.admin.menu.inferno","fallback":"Hovering Inferno", "color": "#ff6600"}', CanPickUpLoot: 0b, DeathLootTable:"incendium:hovering_inferno"}
execute as @e[type=blaze,tag=in.hovering_inferno,tag=!in.checked,distance=..25] at @s run function incendium:hovering_inferno/inferno/init

# get bossbar
bossbar add incendium:inferno {"translate":"incendium.admin.menu.inferno","fallback":"Hovering Inferno","color":"#ff6600"}

bossbar set incendium:inferno color yellow
bossbar set incendium:inferno value 900
bossbar set incendium:inferno max 900

# status
data modify storage incendium:main inferno.mode set value 'normal'
data remove storage incendium:temp bullet

execute as @a run function incendium:border_of_life/stop

# bootstrap functions
schedule clear incendium:hovering_inferno/2s
schedule clear incendium:hovering_inferno/main
schedule clear incendium:hovering_inferno/loop
schedule clear incendium:hovering_inferno/timer

function incendium:hovering_inferno/spell/clear_all

function incendium:hovering_inferno/armor/summon
schedule function incendium:hovering_inferno/2s 2t replace
schedule function incendium:hovering_inferno/main 2t replace
schedule function incendium:hovering_inferno/loop 2t replace

# player
advancement grant @a[distance=..30,gamemode=!spectator] only incendium:infernal_dunes/inferno/summon

# kill nether star and destory (physical) altar
#  remember nether_star = @s
execute at @e[type=marker,tag=in.altar,distance=..4] run fill ~-3 ~1 ~-3 ~3 ~7 ~3 minecraft:air destroy

kill @s[type=item]
