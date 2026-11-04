# Outlandish Revelations Compatibility Fixes — JAR changelog

Target: Minecraft 1.20.1 / Forge 47.4.28. Current bundled JAR: **1.2.8**.
This is a development update, not a CurseForge release announcement. Install one
compatibility JAR with its matching pack scripts; replace older versions.

## 1.2.8 — Legendary Relics and The World Remembers

### Added

- Native, individual awakening for the existing Tears for Fears and Ring of Ranker.
  Requires the player's own twelve NPC story completions, both relics and a valid
  Ranker's Memorial; shared FTB progress cannot substitute for personal progress.
- Three separate 10,000-LP payments from the actual Tier 1 main basin, totaling
  30,000 LP. The output buffer is not charged as the main basin. Successful final
  self-sacrifice is verified against actual health loss and Blood Magic's selected
  altar, including ordinary and incense-assisted knife paths.
- UUID-addressed progress/payment journal, restart recovery, per-memorial payment
  exclusion and portable paid stages. Both original item bindings are checked in
  the player save before permanent completion is committed.
- In-place soulbinding that preserves original stacks, player enchantments,
  affixes, sockets and other existing data. No automatic enchantment package.
- Ring acquisition from a player-attributed Warden kill. Equipped dormant ring
  reduces a qualifying dangerous hit by 25% on a 90-second cooldown. An owned
  awakened ring adds Last Stand, a non-damaging defensive pulse and Caelus flight.
  Only this ring's flight modifier is removed; temporary landing protection is
  retained through player saves.
- Server-controlled resonance, Resonant Fracture, Echo of the Fallen and Skybreaker,
  with damage caps, cooldowns, ownership checks and recursion/friendly safeguards.
  Skybreaker requires both owned awakened relics and causes no terrain damage.
- Registered Overworld memorial, hidden anchor and personal in-world plaque.
  Placement uses approximately one attempt per 10,000 chunks; actual terrain and
  biome checks can reject attempts. Existing Explorer's Compass is used.
- Permanent personal The Promise Fulfilled advancement/date and integration with
  the existing NPC recognition and display records. Current username is displayed;
  UUID determines ownership. No team-wide awakening award.
- Optional adjustable HUD and owner tooltips. A client-only ascension sequence
  provides the approved pose, particles, lines, simulated lightning and thunder.
  The creator's exact original 64 × 64 classic-arm skin is bundled unchanged.

### Preserved

- Every prior compatibility class/resource and existing coremod mapping, except
  the required version metadata/additive coremod registration.
- Both relic item IDs/artwork, the sword's six-frame animation, original damage,
  speed, indestructibility and original sonic attack script.
- Existing NPC quests, repairs, ordinary altar crafting, boss rewards and team
  dimension gates. No new mod or optional Legacy Challenge was added.

### Validation and availability

Java 17 compilation/SRG mapping, 435 installed API references, 53 rule/journal
checks, 11 production binding-bytecode fixtures, three real coremod transformation
tests, the 13 existing bridge fixtures and 80 mocked script checks passed. Data,
asset hashes, client boundaries and archives were checked. These are offline
checks, not Minecraft, real LP/combat/flight/render or multiplayer acceptance.
Balance targets remain initial values. Repository/export defaults keep native
relic gameplay off; the creator's development instance enables it for testing.

## 1.2.7 — Stable native story bridge

- Move conversation/render listener registration and UUID/username/inventory access
  behind typed native methods to avoid fragile Rhino mapping/reflection paths.
- Recognize the sword in normal inventory or offhand during NPC conversation.
- Replace callbacks safely and prevent duplicate event listeners on reload.
- Keep client rendering registration separate from dedicated-server code.
- Retain editable dialogue, existing personal saved-data keys and original dates.
- Bundle the custom JAR in exports in place of the old CurseForge download.

Earlier live logs showed clean script loading and no recurrence of the old UUID
login error. That observation does not validate the new 1.2.8 gameplay.

## Retained 1.2.6 baseline

The verified original input supplies the existing Draconic Evolution/Additions
creative-tab guards; GCYR/GTEC native-recipe repairs; Load My Resources metadata
fallback; team boss provenance; initial questbook zoom; Untamed Wilds species
handling; Create/Create Addition recipe compatibility; and remaining targeted
warning guards. These fixes were retained following installed-bytecode review.
This is an inventory of inherited functionality, not a reconstruction of every
unrecorded historical release or a claim that upstream issues are now fixed.

Full implementation, exact changed files and pending tests:
[implementation report](../docs/LEGENDARY_RELICS_IMPLEMENTATION.md),
[test checklist](../docs/LEGENDARY_RELICS_TESTING.md).
