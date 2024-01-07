NetworkEvents.dataReceived('open_tome', event => {
    Client.player.getItemInHand(event.data['hand']).use(Client.player.level, Client.player, event.data['hand'])
})

NetworkEvents.dataReceived('resetScreen', event => {
    Client.setCurrentScreen(null)
})