# Replacement scroll quest repair

Quest 5A34DFABE4AC44E0 had a completed checkmark and claimed reward in the test world, but no repeat tracking entry. Normalize the supported can_repeat setting to native boolean 1b, retain its existing five-unit cooldown and remove the unsupported repeatable field. Existing quest/task/reward IDs, reward item and optional behavior are preserved. Add instructions to complete the checkmark and claim the reward again after the cooldown.

The stopped test world's repair clears only this quest's task progress, started/completed entries and scroll reward claim, plus started/completed caches for its one-quest parent chapter. Eight entries are removed; every other saved field was compared and preserved. Full original quest definition and progress backups are retained. No NPC quest history, personal advancement or World Remembers records are edited.

Installed FTB Quests 2001.4.22 and FTB Library APIs were inspected: canRepeat is a Tristate reading a native NBT boolean; repeatable is not a Quest readData setting. Claiming the last reward invokes Quest.checkRepeatable, which resets the quest and establishes its cooldown through TeamData. The normalization and stale-state reset address both configuration ambiguity and already-claimed state; a new in-game claim is required to verify repeat behavior. No per-tick script was added.

Manual check: open A Traveler's Invitation, tick The Scroll and claim the item reward; after cooldown tick it again and claim a second scroll. Repeat once after relog. Story quests remain one-time. This fixes the test-world save locally; do not ship player progress in pack exports.
