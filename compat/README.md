# Native story bridge — compatibility mod 1.2.7

This is an additive update of the installed 1.2.6 compatibility mod, not an additional mod. Existing classes, coremods, bundled libraries and resources are byte-identical; only version metadata changes and two bridge classes are added. `native-artifact.json` records the input/output hashes. The root manifest excludes the old compatibility download; the export tool bundles this custom JAR under overrides/mods, so launchers install only one version. Input provenance is recorded in native-artifact.json.

Native code owns canceled-conversation observation, one-time event registration, physical client isolation, UUID/username access and normal-inventory sword detection. Callback replacement prevents duplicate listeners after startup reloads. Rendering dispatch occurs only at AFTER_TRANSLUCENT_BLOCKS. No ticks, timers, background scans, world writes, new packets, ceremony grants or sword changes were introduced.

Scripts still own dialogue/configuration, personal-record persistence, receipt validation, commands and plaque drawing. Their existing keys, dates and per-player rules are preserved. This first migration addresses the fragile API boundary; it does not claim a full Java rewrite or a measured TPS/startup improvement. Existing scripts can still need mapping corrections in other paths; gameplay verification remains required.

## Build and verification

The source deliberately uses production SRG Minecraft names, verified against Forge 1.20.1 / 47.4.28. No remapping step or handwritten Minecraft classes are used for the production build. The build requires the exact 1.2.6 input JAR, installed libraries, Java and an Eclipse compiler JAR (tested ecj 3.38.0).

```
python tools/build_native_bridge.py --instance INSTANCE --install LAUNCHER_INSTALL --java JAVA_EXE --compiler ECJ_JAR --base ORIGINAL_1_2_6_JAR
python tools/test_native_bridge.py --java JAVA_EXE --compiler ECJ_JAR
python tools/validate_pack.py
node tools/tests/world_remembers.mjs
python tools/build_pack.py
```

The JVM fixture test exercises the actual built bridge bytecode against minimal fake API classes; it is not a Minecraft test. It checks inventory boundaries, UUID stability, callback replacement, duplicate prevention, canceled-event subscription, client stage filtering, and a server classpath without the client bridge/render event. Production compilation uses real installed libraries. Regenerating the artifact requires updating its pinned SHA256 after review. Build output/compilers are ignored; only the custom artifact and our source are retained for the batch.

## Deployment / rollback

Close Minecraft first. Back up the old mod and three script files. Replace the old JAR with 1.2.7 and install the matching startup/server/client World Remembers scripts together. Never leave both mod JARs installed. Rolling back requires both the old JAR and old scripts. No saved-data migration or world deletion is required.

On restart verify all startup/client/server scripts load, login has no UUID errors, `/orremembers` reports status without granting completion, and a Quest Scroll conversation while carrying the sword offers recognition without interrupting quests. Check each inventory region and normal NPC deliveries. No live memorial rendering test is possible until an anchor is configured; ceremony integration remains disabled. Dedicated Forge and two-player tests are still pending.

After deployment, use `--base` to point to the preserved original 1.2.6 JAR in the rollback backup; the build verifies its recorded SHA256 before adding anything.
