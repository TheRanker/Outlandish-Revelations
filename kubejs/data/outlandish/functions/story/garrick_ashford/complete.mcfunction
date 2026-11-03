# Called only by the final Quest Giver reward, AS the completing player.
# Advancement is durable per-player state; existing FTB team sharing remains unchanged.
execute if entity @s[type=minecraft:player] run advancement grant @s only outlandish:garrick_completed
execute if entity @s[type=minecraft:player] at @s if dimension minecraft:overworld run function outlandish:story/garrick_ashford/repair_nearby
