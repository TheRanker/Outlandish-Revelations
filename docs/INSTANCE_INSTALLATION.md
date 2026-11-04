# Development instance installation — 2026-11-04

Installed the approved development batch into the creator's existing Outlandish
Revelations (1) instance while Minecraft was closed. Replaced compatibility
1.2.7 with the pinned **1.2.8** JAR and installed fourteen matching quest,
script/configuration and handbook files. Verification matched every installed
file to its planned checksum; exactly one compatibility JAR remains installed.
The original Ranker skin is present in the installed JAR unchanged.

Native relic testing is **enabled in this instance only**. Repository and export
defaults remain disabled pending gameplay acceptance. The obsolete LP-only
World Remembers completion hook remains disabled. Handbook revision 5 explains
the ceremony requirements and experimental availability.

Valen and A.U.R.A. retain their live FTB chapter/quest/task IDs and extra editor
settings. Original relic textures/animation/sonic script retain their approved
checksums. No saves, player records, quest completion data, other mods, hardware
settings or unrelated files were changed. Minecraft was not launched: startup,
real ritual/combat/flight/render and multiplayer testing remain pending.

## Rollback

The rollback snapshot is outside the repository and is not exported or pushed:
`backups/native_relics_1.2.8_20261104_083305_656072/` under the shared workspace.
It contains every replaced original file, the old JAR and `INSTALL-MANIFEST.json`
with pre/post hashes and which files were new. Close Minecraft before restoring
matching old files/JAR and removing the new files identified by that manifest.
No world rollback is needed for this file-only installation; future gameplay
requires its own pre-test world backup.

## Packaging verification follow-up

The installed 1.2.8 JAR was refreshed after canonicalizing eight native text
resource line endings to match Git/Linux checkouts. All native class bytes,
resource values and binary assets remain unchanged. The earlier 1.2.8 JAR is
additionally backed up under `backups/native_relics_1.2.8_20261104_084653_118043/`.
The original full rollback snapshot above still restores pre-installation 1.2.7
and its matching files. All fifteen final installed checksums were reverified.

## Changelogs and testing

- [Compatibility JAR history](../compat/CHANGELOG.md).
- [Modpack changes since 5.0](MODPACK_CHANGELOG_SINCE_5.0.md).
- [Minecraft acceptance checklist](LEGENDARY_RELICS_TESTING.md).

No CurseForge release has been published. Source is prepared for the requested
GitHub development-branch push, separate from release publication.
