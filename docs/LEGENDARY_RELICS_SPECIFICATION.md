# Outlandish Revelations — Legendary Relics Specification

User-supplied approved design, recorded 2026-11-04. This document supersedes the
earlier ceremony drafts and assistant proposals. Implementation status is tracked
separately in `LEGENDARY_RELICS_IMPLEMENTATION.md`.

**Minecraft 1.20.1 — Forge**

## 1. Tears for Fears — The Ranker's Sword

**Item ID:** `kubejs:rankers_sword`

**Existing properties:**
- Original six-frame animated texture — preserve completely.
- Netherite-tier weapon.
- Attack damage baseline: `17.5`.
- Attack speed baseline: `5`.
- Maximum durability: `0` (indestructible).
- Existing right-click Warden sonic shriek attack.

**CRITICAL:** Do not replace the sword's model, texture, animation, right-click ability, NBT, enchantments, or existing behavior.

### Awakened Sword Abilities

**1. Resonant Fracture**
- Sonic attacks temporarily mark enemies.
- A subsequent melee strike detonates the mark for bonus damage.
- Mark duration: 3 seconds.
- Bonus damage: +35%, capped at 12 HP.
- No resonance cost.

**2. Echo of the Fallen**
- A sufficiently charged melee attack creates a delayed secondary damage echo.
- Additional damage: 40% of the original hit, capped at 14 HP.
- Cooldown: 12 seconds.
- Resonance cost: 45.
- No additional summoned entity required.

**3. Skybreaker**
- Activated through an aerial sword attack while the awakened Ring of Ranker is equipped.
- Produces an area-of-effect sonic shockwave.
- Radius: 4.5 blocks.
- Maximum damage: 12 HP per enemy.
- Cooldown: 20 seconds.
- Resonance cost: 75.
- Must not damage terrain.

### Resonance System

- Maximum resonance: 100.
- Valid charged melee hit: +8 resonance.
- Sonic hit: +15 resonance per activation.
- Melee resonance gain limited to once every 0.5 seconds.
- Resonance decay begins after approximately 15 seconds outside combat.
- Protect teammates, pets, friendly NPCs, and other nonhostile entities from unintended attacks.
- Apply appropriate safeguards for boss damage and overlapping effects.

These are approved **initial balance targets**, subject to actual gameplay testing.

## 2. Ring of Ranker

**Item ID:** `kubejs:rankers_ring`

**Existing properties:**
- EPIC rarity.
- Maximum stack size: 1.
- Fire resistant.
- Currently has no implemented special abilities.

Preserve its original artwork and item identity.

### Before Awakening — Guardian's Protection

- Passive defensive protection against dangerous attacks.
- Activates when a single incoming hit would deal at least 30% of the player's maximum health.
- Reduces that hit's final damage by 25%.
- Cooldown: 90 seconds.

### After Awakening — Guardian's Last Stand

- Retains the ordinary dangerous-hit protection.
- Automatically prevents an otherwise fatal hit.
- Restores health to 20% of maximum health, capped at 5 hearts.
- Generates a defensive sonic pulse with a 4-block radius.
- Pulse causes knockback, not damage.
- Emergency protection cooldown: 10 minutes.
- Must be tested with Totems of Undying and other modded death-prevention mechanics.

### Creative-Style Flight

- Unrestricted flight after awakening.
- Double-tap jump to activate, like Creative Mode.
- No fuel or energy requirement.
- Ring must be equipped.
- Flight ends safely when the ring is removed.
- Must coexist with other mods providing flight.
- Do not remove flight permissions granted by unrelated equipment.

### Sword and Ring Synergy

Skybreaker requires **both awakened relics**, belonging to the same player.

## 3. Enchantments, Affixes, and Existing Item Data

- The player is the first person to enchant Tears for Fears.
- Do not automatically add a predetermined enchantment set during awakening.
- Preserve player-applied enchantments.
- Preserve existing NBT, including supported Apotheosis affixes, sockets, gems, or similar item metadata.
- Confirm actual Apotheosis integration and enabled modules before relying on specific mechanics.
- Awakening must add new data without recreating or replacing the original item stack.
- The sword remains indestructible.
- Its existing sonic attack, damage, speed, artwork, and animation remain unchanged.
- No new custom enchantments were approved; the awakened abilities are separate from the enchanting system.

## 4. Soulbinding — The Ranker's Legacy

Upon successful awakening:

- Record the player's UUID on both relics.
- Only the rightful owner can activate awakened abilities.
- Unauthorized players may physically possess the items but cannot use their awakened powers.
- Ordinary sword melee and its original pre-awakening sonic attack remain functional.
- The ring's awakened protection and flight are owner-exclusive.
- UUID ownership persists through logout, death, dimension changes, and server restarts.
- Username changes must not invalidate ownership.
- Existing `keepInventory` modpack rules handle death-related item retention.

## 5. Awakening Ritual — The Unfinished Promise

**Location:** The Ranker's Memorial, a naturally generated Overworld structure.

**Structure generation:**
- Approximately one placement attempt per 10,000 chunks.
- Multiple memorials may exist.
- Discoverable using the existing Explorer's Compass.
- Memorials contain a functional Tier 1 Blood Altar.
- No player upgrades, altar runes, or larger altar tiers required.

### Requirements

Each player must individually:
1. Complete all 12 NPC storylines.
2. Obtain Tears for Fears and Ring of Ranker.
3. Visit The Ranker's Memorial.
4. Complete the three-offering blood ritual.
5. Make the final personal Sacrificial Knife offering.

**No FTB Team sharing for this storyline.**

### Blood Ritual — Three Offerings

**Offering I:** Fill the Tier 1 Blood Altar and sacrifice 10,000 LP.

**Offering II:** Refill the same altar and sacrifice another 10,000 LP.

**Offering III:** Refill the altar, perform the player's own Sacrificial Knife offering as part of the final stage, and sacrifice the final 10,000 LP.

**Total actual LP consumption: 30,000 LP.**

The player must not be able to bypass offerings or complete all three with only 10,000 LP.

The last personal sacrifice must be detected and validated separately from ordinary altar interactions.

### Memorial Anchor and Plaque

- A hidden Memorial Anchor identifies valid memorial altars.
- The altar remains usable for ordinary Blood Magic crafting.
- Ceremony stages are activated through a special memorial plaque.
- Ordinary player-built Blood Altars cannot awaken relics.
- Only one ceremony can actively consume altar LP at a memorial at a time.
- Player progress persists across logout, crashes, and restarts.
- Players may continue remaining stages at another valid memorial.
- Friends may supply materials or LP, but cannot complete another player's individual ritual.

Technical integration must verify actual Blood Magic Tier 1 altar LP consumption, not mistakenly drain the output fluid buffer.

## 6. Cinematic Finale — The Ranker's Ascension

Use The Ranker's exact original Minecraft skin supplied by the modpack creator.

- Sword and ring awaken.
- The Ranker's spectral apparition appears at the memorial.
- He slowly rises approximately two blocks.
- He raises his head and extends both arms outward into a cruciform pose.
- White and golden particles surround him.
- He delivers the final lines:

*"And when the world grows dark again..."*

**"Be the reason someone still believes in tomorrow."**

- A brilliant simulated lightning strike and flash of light engulf him.
- A thunderclap sounds.
- He disappears instantly, leaving drifting particles.
- No real lightning damage, fire, block destruction, or terrain changes.
- Approximate sequence duration: 15 seconds.

Use a noninteractive, nonattackable temporary apparition. Preserve the player's original relic artwork.

## 7. Completion and Postgame Recognition

- Permanent individual achievement: **The Promise Fulfilled**.
- Store completion under the player's UUID.
- Personalized memorial plaque displays the completed player's Minecraft username.
- Other players see their own appropriate inscription.
- All 12 NPCs congratulate a player carrying `kubejs:rankers_sword` anywhere in their normal inventory.
- NPC recognition should not overwrite existing quest dialogue.
- No additional optional Legacy Challenges.

## 8. Relic HUD

Create an optional compact HUD showing:
- Resonance level.
- Sword ability availability and cooldowns.
- Guardian's Vow cooldown.
- Awakening status.
- Soulbound owner in item tooltips.

Allow the player to hide, reposition, or resize the HUD where practical.

All combat calculations and ownership validation remain server-authoritative.

## 9. Implementation Requirements

Implement through the existing Outlandish Compatibility Fixes mod and appropriate existing mod integrations.

- Preserve all original assets and item IDs.
- Do not overwrite completed NPC storylines.
- Avoid constant inventory scanning and expensive world scans.
- Validate dedicated-server compatibility.
- Verify client rendering and multiplayer behavior.
- Test Blood Magic LP consumption and persistence.
- Test all abilities before considering their balance final.

**This document defines the approved design. It does not indicate that these features have already been implemented or tested.**
