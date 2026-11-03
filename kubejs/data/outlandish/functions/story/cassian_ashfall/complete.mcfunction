# Invoke from this NPC final delivery reward AS the completing player.
# Personal durable state; repeated calls are harmless. No items or world edits.
execute if entity @s[type=minecraft:player] run advancement grant @s only outlandish:story/cassian_ashfall_completed
