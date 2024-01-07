StartupEvents.registry('mob_effect', event => {
    // Register radiation effect
    event.create('radiation')
        // Change the name to be "Radiation", in green
        .displayName("Radiation")
        // Set a tick event to apply the action
        .effectTick((entity, lvl) => global.radiationEffect(entity, lvl))
        // Set the color of the effect
        .color(Color.GREEN)
        // Set whether the effect is harmful
        .harmful();
})
const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
const DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type")
global.radiationEffect = (entity, lvl) => {
    // Create damage source
    const damageSource = getDamageSource(entity.level(), "kubejs:radiation");
    // Check if the global is run on the client. If so, return
    if (entity.level().clientSide) return;
    // Damage based on level 
    entity.attack(damageSource, (lvl - 0.2) + 1);
}
function getDamageSource(/** @type {Internal.Level}*/ level, /** @type {Internal.DamageType_}*/ damageType) {
    const resourceKey = $ResourceKey.create(DAMAGE_TYPE, Utils.id(damageType))
    const holder = level.registryAccess().registryOrThrow(DAMAGE_TYPE).getHolderOrThrow(resourceKey)
    return new DamageSource(holder)
}