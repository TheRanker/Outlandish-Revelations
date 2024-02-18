const $PonderRegistry = Java.loadClass('com.simibubi.create.foundation.ponder.PonderRegistry')
const $PonderTagIndexScreen = Java.loadClass('com.simibubi.create.foundation.ponder.ui.PonderTagIndexScreen')
const $PonderTagScreen = Java.loadClass('com.simibubi.create.foundation.ponder.ui.PonderTagScreen')
const $Create = Java.loadClass('com.simibubi.create.Create')
const $AllItems = Java.loadClass('com.simibubi.create.AllItems')
const $ScreenOpener = Java.loadClass('com.simibubi.create.foundation.gui.ScreenOpener')
const $PauseScreen = Java.loadClass('net.minecraft.client.gui.screens.PauseScreen')
const $EventResult = Java.loadClass("dev.architectury.event.EventResult");


let check_ponder_tag_closed = false
let check_ponder_index_closed = false
let no_recursion_create_manual = false
let ponder_tag_tmp = null

function add_item(ponder_tag, item) {
    if (Platform.isForge()) {
        $PonderRegistry.TAGS.forTag(ponder_tag)['add(net.minecraft.resources.ResourceLocation)'](item);
    } else {
        $PonderRegistry.TAGS.forTag(ponder_tag).add(item);
    }
}

function get_private_field(cls, field) {
    let cls_field = cls.class.getDeclaredField(field);
    cls_field.setAccessible(true)
    return cls_field.get(cls);
}

function remove_ponder_tag(ponder_tag) {
    let tags = get_private_field($PonderRegistry.TAGS, 'tags') // 'tags' is a private field of the PonderTagRegistry class that has no public deletion methods.
    for (const x of tags.entries()) {
        if (x.getValue() == ponder_tag) {
            tags.remove(x.getKey(), x.getValue())
        }
    }
}

NetworkEvents.dataReceived('open_multi_ponder', event => {
    let ponders = event.data['ponders']
    let location = $Create.asResource('current_blocks')
    let $PonderTag = Java.loadClass('com.simibubi.create.foundation.ponder.PonderTag') // If we import this class at the beginning, then at the loading stage, minecraft will crash for unknown reasons.
    let ponder_tag = new $PonderTag(location).item($AllItems.GOGGLES.get(), true, false)
    for (const ponder of ponders) {
        add_item(ponder_tag, ponder.getAsString())
    }

    let screen = new $PonderTagScreen(ponder_tag)
    Client.setCurrentScreen(screen)

    check_ponder_tag_closed = true
    ponder_tag_tmp = ponder_tag

    Client.player.sendData('check_client_every_tick', {})
})

NetworkEvents.dataReceived('check_client', event => {
    if (check_ponder_tag_closed && Client.currentScreen == null) {
        remove_ponder_tag(ponder_tag_tmp)
        check_ponder_tag_closed = false
    }
    if (check_ponder_index_closed && (Client.currentScreen instanceof $PauseScreen || Client.currentScreen == null)) {
        check_ponder_index_closed = false
        Client.setCurrentScreen(null)
    }
    if (!check_ponder_tag_closed && !check_ponder_index_closed) {
        Client.player.sendData('stop_checking_client_every_tick', {})
    }
})


NetworkEvents.dataReceived('openPonderTagIndexScreen', event => {
    let screen = new $PonderTagIndexScreen()
    Client.setCurrentScreen($PauseScreen(true)) //A workaround that allows exit button to work correctly again.
    $ScreenOpener.open(screen)
    check_ponder_index_closed = true
    Client.player.sendData('check_client_every_tick', {})
})

ItemEvents.tooltip(tooltip => {
    let myMessage = Text.yellow(`Right click to item from create, you want to get help, or non create to open page with all items. Works up to 64 blocks! Shift + scroll to change screen mode!`)
    tooltip.add('create:create_manual', [myMessage])
})

ClientEvents.loggedIn(event => {
    let current = JsonIO.read('kubejs/ponder.json')
    let updated_ponder = String($PonderRegistry.ALL.keySet()).replace('[', '').replace(']', '').split(', ')
    if (current == null) {
        current = {}
    }
    if (!("page_type" in current)) {
        current["page_type"] = "PonderTagIndexScreen"
    }
    current["ponder"] = updated_ponder
    JsonIO.write('kubejs/ponder.json', current)
})

ArchEvents.handleClient('ClientRawInputEvent.MouseScrolled', event => {
    if (Client.player.mainHandItem == 'create:create_manual' &&
        (Client.player.isCrouching() || Client.isShiftDown())) { //isCrouching() doesn't work if player is flying.
        Client.player.sendData('create_manual_change_screen', {})
        event.setResult($EventResult.interruptFalse()) //Cancel event.
        return;
    }
    event.setResult($EventResult.pass()) //Don't cancel event.
})

ClientEvents.highPriorityAssets(e => {
    e.addLang('create.ponder.tag.current_blocks', 'Current Blocks')
    e.addLang('create.ponder.tag.current_blocks.description', 'The item you clicked on, has several Ponder pages:')
})