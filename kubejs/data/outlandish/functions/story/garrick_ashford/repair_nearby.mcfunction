# Admin retry entry point: AS AND AT the completing player, in the Overworld.
# Require earned completion, the nearby named NPC, and a uniquely isolated marker.
# Include already-placed markers when choosing nearest: never skip into another forge.
execute if entity @s[type=minecraft:player,advancements={outlandish:garrick_completed=true}] if dimension minecraft:overworld if entity @e[type=minecraft:villager,name="Garrick Ashford",distance=..12] as @e[type=minecraft:marker,tag=outlandish_garrick_anvil,distance=..12,sort=nearest,limit=1] at @s unless entity @e[type=minecraft:marker,tag=outlandish_garrick_anvil,distance=0.001..24] run function outlandish:garrick/upgrade_01
