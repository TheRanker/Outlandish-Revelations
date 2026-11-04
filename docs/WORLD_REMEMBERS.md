# The World Remembers

Configuration remains `kubejs/outlandish/world_remembers.json`. All twelve linked
NPCs offer a short personal **[Listen]** prompt on a normal Quest Scroll
conversation when the sword is anywhere in normal inventory/hotbar/offhand.
The optional character-specific reply leaves ordinary quests/rewards usable.
It appears once per NPC; `/orremembers greet <npc_id>` reopens it after speaking
nearby. Carrying the sword never grants awakening.

## Personal completion and native integration

Native compatibility 1.2.8 implements the approved joint ceremony and owner-only
abilities. See [implementation](LEGENDARY_RELICS_IMPLEMENTATION.md) and
[testing](LEGENDARY_RELICS_TESTING.md). Its authoritative records are UUID-addressed
world files in `data/outlandish_relics/`, including the three paid transactions,
final personal sacrifice, paired binding, UTC completion date and cooldowns.
Only real native completion can supply `RelicSystem.completedPlaqueRecord`.

The server script registers a completion callback, validates the native UUID,
LP details and joint-awakening/personal-knife flags, and mirrors the result under
the existing server persistent-data key `or_world_remembers_v1_<player-uuid>`.
The personal advancement is never a team reward. Callback replay/login retain
older version 1/2 records and their original dates. A legacy display record alone
does not unlock native awakened abilities or bypass the real ceremony.

Keep **`ceremonyIntegrationEnabled: false`**. The older
`global.ORWorldRemembers.completeAwakening` LP-receipt interface is retained only
for compatibility and stays disabled. It is not the native ritual entry point.
No public grant/revoke command or serverbound completion packet exists.
Enable native testing only with `legendary_relics.json.enabled: true` in a test
copy, after installing the matching JAR and scripts together.

## Personalized plaque

Native generated memorials are discovered through validated hidden anchors on
chunk-watch/plaque events; they need no manual entries in the legacy `memorials`
array. Keep that array empty to avoid rendering the same location twice.
Each viewer receives only their own state and the current profile username:

> THE RANKER'S MEMORIAL  
> The Promise Fulfilled  
> [current Minecraft username]  
> Bearer of Tears for Fears  
> *A promise once broken, now fulfilled.*

Before completion the original three-line Unfinished Promise inscription is
shown. The client renders near the actual plaque without changing a shared sign
or block inscription. Native `/orritual` reports the caller's stages/date;
right-clicking the native plaque also offers the payment action to ordinary
players. `/orremembers` continues to report the legacy display record.

The older configurable plaque renderer remains reusable for separately authored
memorials, with its required-block/position checks and private-chat fallback.
Native ceremonies additionally require a real generated memorial piece; legacy
manual locations cannot grant awakening.

## Validation limits

Eighty mocked script checks exercise native-result mirroring, old receipt
rejection, records/dates, rename/death/restart reconstruction, independent view
contexts and all twelve optional greetings. These do not run a ceremony or actual
graphics. Native fixtures, API and packaging checks are detailed in the linked
implementation report. Actual dedicated Forge, two players at the same memorial,
restart/death and changed username acceptance remain pending.
