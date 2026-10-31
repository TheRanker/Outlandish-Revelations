// Outlandish Revelations: native recipe cleanup.
ServerEvents.recipes(function(event) {
    if (!Platform.isLoaded('or_creative_guard') || !Platform.isLoaded('gtec')) return;
    event.remove({ id: 'gtceu:chemical_reactor/iridium_chloride_separation' });
});
