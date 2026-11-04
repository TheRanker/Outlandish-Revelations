# Loading audit â€” 2026-11-03

Reviewed the live instance latest.log ending at 10:42:20 (the session began at 10:33:52). This is a completed-session audit, not evidence that later on-disk corrections were executed in Minecraft.

## Pack loading

- Startup: 17/17 scripts, zero errors/warnings; reported 4.168 seconds including loader work.
- Client: 17/17 scripts, zero errors/warnings; reported 0.406 seconds.
- Server: 33/33 scripts, zero errors/warnings; reported 0.150 seconds.
- World loaded and player joined. The personal-record login getUUID error is present in this session; the UUID/username property correction was installed afterward. Rejoin/restart verification remains required.
- The earlier A.U.R.A. placement-salt registry failure is absent from this session.
- No further World Remembers render or conversation errors were recorded, but absent errors do not establish those features were exercised.

## Safe local changes

1. Log Begone: suppress only the exact successful Create sliding_door/flywheel block-entity callback registrations (64 + 32 lines). Installed Log Begone 1.0.8 uses full-string regex matching and supplies a logger prefix, so the rule explicitly accommodates that prefix. Tested against the observed messages and unrelated failure examples.
2. Remove the old broad phrases `Channels ` and `Empty height range` so network and worldgen diagnostics remain visible. Other existing filters are preserved.
3. Override Beautify progression/candelabra advancement: correct lamp_candleabra to lamp_candelabra in both display icon and inventory criterion. Confirmed the correct spelling against the installed 2.0.2 recipe and item model. Preserve advancement ID, parent, title, rewards and remaining conditions. The original JAR is untouched.

## Findings left visible

- ShetiPhianCore 1.5 and Sodium Dynamic Lights 1.0.10 register resource-reload listeners from client setup. ModernFix reports the exact offending call stacks. Keep these warnings visible; changing registration requires an upstream correction or a carefully tested native patch, not log suppression. See https://github.com/embeddedt/ModernFix/wiki/registerReloadListener-called-on-wrong-thread.
- Industrial Foregoing transporter inventory model failed to bake under ModernFix dynamic resources. Inspect the item in JEI/creative inventory before changing render settings. Not established as a missing texture by this audit.
- Beautify invalid advancement was a real data error, corrected above.
- JEI emits repeated slow-operation ERROR diagnostics during recipe/runtime registration (including Minecraft, MineColonies, Create, GTCEu, Forge GUI). These report elapsed work, not a demonstrated recipe exception. Keep visible while investigating loading time; suppressing them will not reduce that work.
- Mixin minVersion omissions, optional class/refmap warnings, Embeddium taint/workaround warning, `/things/.mcassetsroot`, Formations template_editor lookup, Structurize warning about ModernFix LazyDataFixer, and furniture library trust-check FATAL messages remain visible. The session continues after them; that alone does not prove harmlessness. No broad ERROR/FATAL or missing-class filter added.

## Compatibility mod retirement audit

Installed outlandish-compatibility-fixes-1.2.6.jar contains native helpers plus nine coremod scripts. Exact installed mod filenames match the existing dependency-inventory snapshot: no added/removed/replaced JAR filename detected. Same-name binary replacements cannot be ruled out because the snapshot has no hashes.

Inspected untransformed installed class bytecode:

| Fix | Evidence | Decision |
|---|---|---|
| Draconic Evolution 3.1.2.621 / Additions 2.4.1.5 creative icons | Original methods still take remainder against list size before fetching an element, without an empty guard | Retain |
| Create 6.0.8 cutting capacity | getMaxOutputCount still returns constant 4 | Retain the existing recipe-specific five-output allowance |
| Create Addition 1.3.3 duration metadata | RollingRecipe still declares no canSpecifyDuration override | Retain |
| GCYR 0.2.9 zero-EU cleanup | Original recipe builder still contains zero-long EUt call path | Retain pending fuller semantic testing |
| PneumaticCraft 6.0.23 fuel world context | Public entry methods retain the original map/lambda lookup without an initial world guard | No evidence sufficient to retire; retain |
| Cyclops test book, LMR metadata, GTEC capacity, Untamed species | Coremod targets/scripts inventoried; no complete upstream-equivalence test performed | Retain; targeted tests needed before removal |
| Team boss provenance and initial quest zoom | Pack behavior rather than obsolete upstream bug fixes | Retain; preserve existing progression |

Do not remove patches merely because startup is clean: successful patches may be the reason it is clean. This audit did not rebuild, replace or disable the compatibility JAR. Some historical sources exist in Downloads; a complete reproducible 1.2.6 source/build was not established.

## Native-code candidates

Best first candidates: World Remembers conversation observer, client plaque renderer/network synchronization, and UUID/date personal-record service. Typed native event handlers avoid Rhino class-filter/mapping issues. Use client-only registration, explicit packet validation and the existing UUID ownership/receipt contract. Preserve existing saved-data keys or provide a tested migration; do not run native and scripted handlers simultaneously. Keep ceremony completion disabled until real integration exists.

Keep dialogue, NPC definitions, rewards, recipes, handbook, structure placement and restoration functions data-driven. Do not migrate the tested sword behavior or progression gates in this cleanup. Native code can improve reliability and hot-path overhead, but these event-driven scripts do not scan every tick and this log does not demonstrate a meaningful startup win from migration. Measure JEI/resource registration separately before promising performance gains. Forge event guidance: https://docs.minecraftforge.net/en/1.20.1/concepts/events/.

## Validation and follow-up

Executed portable pack validation (386 JSON, 89 SNBT, 1,911 quests, 33 reward tables, 81 NPC quests, 12 structures), 57 mocked World Remembers checks, TOML parsing and exact filter match checks (96 observed messages). These are not real Forge codec/render/network or multiplayer tests.

Next full restart: verify no personal-record login error, inspect Beautify advancement and transporter model, talk to a named NPC carrying the sword, and compare the new latest.log for callback noise and remaining resource warnings. All changes remain local for the next batch; nothing pushed during this audit.

## Follow-up: Nether flight session after mod updates

The 19:11–19:45 session contains 3,688 identical `Empty height range: biased[0 above bottom-194 below top inner: 8]` warnings plus one different `[8 above bottom-0 absolute]` warning. Added a full-string Log Begone regex for only the repeated biased-range message, with optional logger prefix; the different warning remains visible. The old broad filter had previously hidden these messages. Filtering reduces log output, not generation work or the underlying placement-range issue. The message alone does not establish Incendium as its source, and no worldgen data was changed.

All three KubeJS script groups loaded with zero errors. Installed Easy NPC is 7.18.0. Accessories is beta48 (not the beta49 candidate reviewed earlier); this session reports a non-public `ContainerMixin.extendHasAnyMatching` interface injection method. It did not stop this session loading, but remains a compatibility concern and is not filtered. No claim that the two updates are fully gameplay-verified.

## Recheck — 2026-11-04 (no new game launch)

The existing 21:40 session retains the exact ShetiPhianCore 1.5 PackTextureOverrideHandler.init and Sodium Dynamic Lights 1.0.10 registerClient call stacks. These were already investigated; no new caller or pack-script cause was identified. No suppression or new coremod patch was introduced.

Transporter: installed Industrial Foregoing 3.5.22 ships blockstates/transporter.json and a minimal models/block/transporter.json, but no models/item/transporter.json. Its installed ModuleTransportStorage.modifyBakingResult wraps matching transporter models in TransporterBlockModel. TransporterBlock$Item.addToTab returns immediately, deliberately omitting the base item from the creative tab. This matches upstream 1.20 source (https://github.com/InnovativeOnlineIndustries/Industrial-Foregoing/blob/1.20/src/main/java/com/buuz135/industrial/module/ModuleTransportStorage.java and its TransporterBlock.java). No installed resource-pack transporter override was found.

Inference: ModernFix is attempting the base transporter inventory model before/alongside the custom rendering path; the exact runtime reason for that lookup was not instrumented. This narrows the warning and does not establish a broken player-facing machine model. Do not add a guessed static cube model or disable dynamic resources globally. Check the usable item/fluid/world transporter components and placed connections in-game later. No renderer fix or successful visual test is claimed.
