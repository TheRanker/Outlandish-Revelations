const $Util = Java.loadClass('net.minecraft.Util')
const $ConfirmLinkScreen = Java.loadClass('net.minecraft.client.gui.screens.ConfirmLinkScreen')
const manuals = JsonIO.read('kubejs/custom_wiki_manuals.json')

ItemEvents.rightClicked(event => {
    if (manuals.containsKey(event.item.id)) {
        let screen = Client.currentScreen
        let link = manuals[event.item.id]["link"]
        let name = manuals[event.item.id]["name"]
        Client.setScreen(new $ConfirmLinkScreen((confirm) => {
            if (confirm) {
                $Util.getPlatform().openUri(link)
                event.player.tell(`Opened ${name}! Check your browser!`)
            } else {
                event.player.tell(`You cancelled open request of ${name}! Try again!`)
            }
            Client.setScreen(screen)
        }, link, false))
    }
})