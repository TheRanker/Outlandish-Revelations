if (Platform.isClientEnvironment()) {
    let CLIENTRAWINPUTEVENT = Java.loadClass('dev.architectury.event.events.client.ClientRawInputEvent');
    let RESULT = Java.loadClass("dev.architectury.event.EventResult");

    ArchEvents.registry(event => {
        event.register('ClientRawInputEvent.MouseScrolled', CLIENTRAWINPUTEVENT, 'MOUSE_SCROLLED');
    });

    ArchEvents.handle('ClientRawInputEvent.MouseScrolled', event => {
        if (Client.player.mainHandItem == 'create:create_manual' &&
            (Client.player.isCrouching() || Client.isShiftDown())) { //isCrouching() doesn't work if player is flying.
            Client.player.sendData('create_manual_change_screen', {})
            event.setResult(RESULT.interruptFalse()) //Cancel event.
            return;
        }
        event.setResult(RESULT.pass()) //Don't cancel event.
    })
}

StartupEvents.registry('item', event => {
    event.create('create:create_manual')
})