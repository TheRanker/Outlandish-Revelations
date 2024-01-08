StartupEvents.registry('mob_effect', event => {

	event.create('rankers_power').modifyAttribute('minecraft:generic.attack_damage',
		'e0f4e796-3d3d-11ee-be56-0242ac120002',
		1,
		"multiply_base").color(Color.GREEN);

     event.create('radiation')
        .displayName("Radiation")
        .effectTick((entity, lvl) => global.radiationEffect(entity, lvl))
        .color(Color.GREEN)
        .harmful();
})

const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
const DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type")
global.radiationEffect = (entity, lvl) => {
    const damageSource = getDamageSource(entity.level(), "kubejs:radiation");
    if (entity.level().clientSide) return;
    entity.attack(damageSource, (lvl - 0.2) + 1);
}
function getDamageSource(/** @type {Internal.Level}*/ level, /** @type {Internal.DamageType_}*/ damageType) {
    const resourceKey = $ResourceKey.create(DAMAGE_TYPE, Utils.id(damageType))
    const holder = level.registryAccess().registryOrThrow(DAMAGE_TYPE).getHolderOrThrow(resourceKey)
    return new DamageSource(holder)
}
