# Memorial ceremony integration — 2026-11-04

Source of truth: [approved relic specification](LEGENDARY_RELICS_SPECIFICATION.md).
There is one joint awakening for the two original relics, requiring twelve
personal story completions, three actual 10,000-LP main-basin charges and a
successful personal Sacrificial Knife offering during the last stage. No extra
offering items, ring LP cost, altar runes or higher altar tiers were added.

The native 1.2.8 implementation and its limits are recorded in
[the implementation report](LEGENDARY_RELICS_IMPLEMENTATION.md). Gameplay remains
disabled in defaults pending [manual testing](LEGENDARY_RELICS_TESTING.md).

## Installed Blood Magic findings

Blood Magic 3.3.8-50 has a 10,000-LP main basin and 1,000-LP transfer buffers.
`BloodAltar.drain` drains the output buffer. Native code instead accesses the
actual TileAltar bloodAltar and calls `setMainFluid`, checking the main amount.
TileAltar serializes the basin under `bloodAltar`; its `Amount` is verified as
zero alongside the payment marker before a new payment can commit. Its base
serialization calls the Forge block-entity save method, retaining ForgeData.

`SacrificeKnifeUsedEvent` is posted before the health deduction and has no altar
position. It cannot establish success. The native observer records intent and
then verifies the actual recipient through `TileAltar.sacrificialDaggerCall` and
actual health loss after the original knife operation. Blood Magic passes false
for self-sacrifice and true for mob sacrifice. Ordinary and incense-assisted
knife return observers retain the original instructions. Canceled, failed,
other-player, wrong-altar and mob sacrifices do not qualify. The personal knife
may be used after fully refilling the basin; excess LP is not counted as payment.

## Transaction sequence

1. Check the caller's real twelve advancements, living Survival state, both
   unambiguously selected original relics, ownership, valid generated memorial,
   nearby plaque and actual idle Tier 1 altar.
2. Resolve any previous prepared payment; exclude another active player's debit
   at this altar. Write the caller's prepared UUID/transaction journal atomically.
3. Debit exactly 10,000 main-basin LP. Serialize/flush/read back the single altar
   chunk with the zero basin and the transaction/owner marker before stage credit.
4. Commit the separate transaction ID and personal stage atomically. A failed
   journal write restores the pending in-memory state for recovery. A durable
   matching marker can finish that stage after restart; no marker gives no credit.
5. After all three distinct payments and verified personal knife evidence, mutate
   only our namespaced data on both original item stacks. Save and inspect the
   player's actual data file to confirm both UUID/transaction bindings. Then
   commit the permanent dated record and award only that player.
6. Mirror the record to the existing plaque/NPC integration and play client-only
   cosmetics. Disconnecting during cosmetics cannot undo a committed completion.

Portable stages belong to UUIDs. Moving to another valid memorial retains paid
stages but requires fresh final knife evidence there. A shared altar's consumed
charge cannot credit another player. Ordinary altar recipes are retained, and
payment refuses a crafting item or active recipe progress. The decorative
plinths have no offering inventories or extra ingredient requirement.

## Structure and test status

The approved 31 × 22 × 35 prototype was copied into native resources, with only
its hidden anchor changed from lodestone to a tagged, locked barrel. The original
prototype remains outside the pack untouched. A native memorial requires the
anchor to be within an actual generated `outlandish:ranker_memorial` piece.
An ordinary player-built altar or a standalone `/place template` copy cannot
awaken relics. The Overworld placement grid has one attempt per 100 × 100 chunks;
biome/terrain checks can reject attempts. Explorer's Compass integration uses the
existing structure registry, without adding a mod.

Production journal/binding fixtures and actual coremod instruction-preservation
tests passed. They do not exercise real world saves, LP, timing or multiplayer.
No actual ritual has been performed during development. Dedicated Forge,
crash/restart, multi-viewer and real combat acceptance remain mandatory before
release. The creator's original PNG is now bundled unchanged; the classic-arm
apparition still needs an actual visual test.
