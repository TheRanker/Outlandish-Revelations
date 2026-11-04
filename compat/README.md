# Compatibility mod 1.2.8 — native relics and story bridge

This replaces the existing compatibility JAR, adding the approved relic system
inside the same mod. It adds no mod dependency to the pack. Every prior class and
resource is preserved byte-for-byte except version metadata and the additive
coremods map. The original 1.2.7 artifact is retained for rollback. Only the pinned
1.2.8 is exported; the old CurseForge download is excluded to avoid duplicates.

The existing WorldRemembersBridge still owns stable conversation/render
registration, UUID/username access and normal-inventory sword recognition.
Editable scripts retain character dialogue and the old personal display key.
The new native package owns eligibility, LP transactions/recovery, paired
ownership, combat, equipment flight, personal completion and display networking.
Client rendering is isolated. Full details and exact files are in
[the implementation report](../docs/LEGENDARY_RELICS_IMPLEMENTATION.md).

## Offline build

The input is the hash-verified original 1.2.6 compatibility JAR. Build tools use
installed MC 1.20.1/Forge 47.4.28, Blood Magic 3.3.8-50, Curios 5.14.1, Caelus 3.2.0,
Java and ECJ 3.38.0; no game dependency is downloaded or redistributed. The older
bridge is compiled directly with SRG names. New relic sources use Mojang member
names, a locally remapped compile classpath and our ASM remapper back to SRG.
Official mapping data and Minecraft binaries remain under ignored build output.

Local defaults in `tools/relic_build_env.py` match the creator's installation.
Other machines can set `OR_MC_INSTALL`, `OR_MC_INSTANCE`, `OR_JAVA`, `OR_ECJ`.
They still need the exact installed game/mod libraries. Portable CI checks need
only the checked-in custom artifact, Python and Node; a Codex cloud checkout need
not download the whole game to inspect quests or validate packaging.

```text
python tools/build_relics.py --base ORIGINAL_1_2_6_JAR
python tools/audit_relic_linkage.py
python tools/test_relics.py
python tools/test_native_bridge.py --java JAVA_EXE --compiler ECJ_JAR --jar build/relics/outlandish-compatibility-fixes-1.2.8.jar
python tools/audit_relic_preservation.py
python tools/audit_legendary_relics.py
node tools/tests/world_remembers.mjs
python tools/validate_pack.py
python tools/build_pack.py
python tools/build_relics_test_patch.py
```

After a reviewed rebuild, copy only the custom output into `compat/artifacts`,
update `native-artifact.json` SHA256 and the sole bundled dependency-inventory
entry, then run packaging checks. ZIP metadata can change the hash on rebuild;
the builder checks preservation by entry content.

Production rule/journal tests and actual remapped binding bytecode run in a JVM
with controlled fixtures. The coremod test evaluates the actual JavaScript against
installed Blood Magic method instructions. API linkage and common/client boundary
checks are static. None starts Minecraft. The old bridge's server-only fixture
is not a full dedicated Forge test of the new relic system.

## Installation and rollback

Follow [the test checklist](../docs/LEGENDARY_RELICS_TESTING.md). Install matching
scripts/configuration and exactly one new JAR in a backed-up test copy, with
Minecraft closed. Gameplay ships disabled; enable only `legendary_relics.json`
for testing and leave the obsolete LP-only hook disabled. Native worldgen is
registered even when gameplay is off. There is no world deletion or automatic
progress migration. Rollback uses the matching old JAR/scripts and pre-test save
backup; do not discard a player's journal to reset a cooldown or stage.

The creator's exact 64 × 64 Ranker skin is bundled unchanged with the classic arm
model. `tools/data/ranker_skin.json` pins its checksum, and the portable audit
checks the source/configuration and packaged resource. Dedicated Forge, real LP/save,
combat, rendering and multiplayer acceptance are still pending. No measured
startup or TPS improvement is claimed.
