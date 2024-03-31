if (Platform.isClientEnvironment()) {
    let CLIENTRAWINPUTEVENT = Java.loadClass('dev.architectury.event.events.client.ClientRawInputEvent');
    ArchEvents.registry(event => {
        event.register('ClientRawInputEvent.MouseScrolled', CLIENTRAWINPUTEVENT, 'MOUSE_SCROLLED');
    });
}

StartupEvents.registry('item', event => {
    event.create('create:create_manual')
		.displayName('Create Manual')
		.rarity("rare")
})