# Pre-update compatibility review — 2026-11-03

No live instance mods were changed. Candidate JARs were downloaded only into ignored build/update-review and checked against publisher SHA512 hashes.

## Recommendations

- Accessories: installed beta.46; reviewed Forge 1.20.1 beta.49. Suitable for a backed-up single-update test; no identified static incompatibility with our development or installed CCLayer beta.18.
- Easy NPC Core: installed 7.17.1; live Modrinth feed confirms Forge 1.20.1 7.18.0, published 2026-11-02. Cached CurseForge/GitHub pages still listed 7.17.1 when checked. Suitable for a separate backed-up test.

## Dependencies and integration

- Accessories beta.49 actual mods.toml requires Forge 47+, Minecraft 1.20.1+, Cloth Config 11+. Installed Forge 47.4.28 and Cloth Config 11.1.136 satisfy this. Its filename says neoforge, but this exact 1.20.1 binary explicitly declares Forge dependencies; do not choose a different Minecraft branch.
- Installed CCLayer 7.4.0-beta.18 requires Accessories beta36 or newer. Compared its 48 referenced Accessories classes and 143 field/method references against beta46 and beta49: no referenced classes or directly declared referenced members were removed. This is a linkage screen, not a proof of mixin/runtime behavior.
- Easy NPC 7.18.0 requires Forge 47.4.10+; optional Easy Model Entities range remains 2.6.0 to below 3.0.0. Easy Model Entities/Armourers Workshop are not installed.
- All twelve story structure NBTs (including Garrick in Paxi) contain minecraft:villager NPCs and minecraft:marker anchors. None uses easy_npc entity IDs. Quests and recognition use Quest Giver, not Easy NPC dialog APIs.
- Current story scripts/native bridge do not reference Accessories APIs. Sword recognition deliberately scans vanilla inventory/offhand only. Ring of Ranker integration remains deferred. No compatibility-coremod target for these two mods was found.

## Published changes relevant to us

Accessories beta49 fixes an owner-offline dog interaction crash and accessory reset synchronization. The intervening beta48 published notes cover inventory predicate matching, Sodium support and unregistered enchantment-ID crash protection. No published story/quest or slot-format migration identified.

Easy NPC 7.18.0 changes Easy NPC entity persistence/loading, combat AI, boss bars, per-player visibility and skin screens. Survival preset items are now consumed when spawning an NPC. These are relevant to separately authored Easy NPC content, but our twelve Quest Giver villagers do not use that preset spawn path. No published Quest Giver completion or FTB progression change identified.

## Manual acceptance before adoption

Back up the save and related configs, update only one mod at a time and keep matching client/server versions. For Accessories: open slots, equip/unequip current Curios-compatible equipment, check effects, save/relog and verify item retention; test the relevant accessory/death recovery path in a disposable save. Keep the Curios compatibility layer installed. For Easy NPC: inspect any Easy NPC entities actually placed manually, save/reload their chunks, and check any presets/dialogs in use. Confirm a normal Quest Scroll conversation, a material delivery/repair and one-time story completion continue to work.

This review ran static metadata, structure and binary-reference checks only. Neither candidate was launched in Minecraft, and no assurance of zero runtime regressions or TPS impact is claimed. No files were pushed to GitHub.

## Primary sources

- Accessories beta49 release: https://www.curseforge.com/minecraft/mc-mods/accessories/files/9217258
- Live Accessories metadata: https://api.modrinth.com/v2/version/HkgYoWJH
- Live Easy NPC 7.18.0 metadata: https://api.modrinth.com/v2/version/ImevV8k9
- Easy NPC changelog: https://github.com/MarkusBordihn/BOs-Easy-NPC/blob/1.20.1/CHANGELOG.md

## Follow-up: beta48 ContainerMixin investigation

Compared the actually installed Accessories beta48 JAR against the publisher-hash-verified beta49 candidate: `io/wispforest/accessories/mixin/ContainerMixin.class` is byte-for-byte identical. Beta49 does not fix this particular issue. No mod installation was changed during investigation.

The sole method is private `extendHasAnyMatching(Predicate, CallbackInfoReturnable)`, injected at TAIL into vanilla Container.hasAnyMatching. It checks whether the container is a player Inventory, gets that player's AccessoriesCapability, and sets a true return value when an equipped accessory matches the predicate. Mixin 0.8.5 rejects non-public, non-synthetic interface mixin methods. Its postInitialise validation catches InvalidMixinException, logs it and removes that mixin. This is a rejected optional behavior extension in this session, not proof that all Accessories functionality has failed.

Practical scope: generic Container.hasAnyMatching callers may not count an equipped accessory as an inventory match. Main-inventory matching remains vanilla. Separate InventoryMixin contains/clear hooks are distinct. No evidence in this hook of item serialization, equipping, stat ticking or worldgen changes; do not infer full item-retention validation from that alone. Our NPC deliveries, normal-inventory/offhand sword checks, UUID records and dimension gates do not call this hook or AccessoriesCapability. The rejected hook introduces no repeated callback/tick workload.

Decision: continue current development on beta48 with this limited compatibility issue recorded and the error visible. Do not call beta48 entirely error-free or claim every third-party accessory detection path is verified. Before release, test accessory equip/effects, save/relog retention, and mod mechanics that expect equipped items to satisfy inventory predicates. No new compatibility patch or log suppression was added.

Primary Mixin 0.8.5 sources: https://github.com/SpongePowered/Mixin/blob/0.8.5/src/main/java/org/spongepowered/asm/mixin/transformer/MixinPreProcessorInterface.java and https://github.com/SpongePowered/Mixin/blob/0.8.5/src/main/java/org/spongepowered/asm/mixin/transformer/MixinConfig.java.
