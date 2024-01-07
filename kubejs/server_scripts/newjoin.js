PlayerEvents.loggedIn(event => {
  if (!event.player.stages.has('new_join')) {
    event.player.stages.add('new_join');
    //this is a one time command that only runs once when a new player joins

    event.entity.setItemSlot(0, 'minecraft:wooden_sword');
    event.entity.setItemSlot(1, 'minecraft:shield');
    event.entity.setItemSlot(2, 'minecraft:leather_boots');
    event.entity.setItemSlot(3, 'minecraft:leather_leggings');
    event.entity.setItemSlot(4, 'minecraft:leather_chestplate');
    event.entity.setItemSlot(5, 'minecraft:leather_helmet');
  //  event.entity.setCuriosSlot(wallet, 'jackseconomy:basic_wallet');
  //  event.entity.setInventory(9, '16x minecraft:fish')
    event.server.runCommandSilent('give @p minecraft:bread 16');
    event.server.runCommandSilent('give @p eccentrictome:tome');
    event.server.runCommandSilent('give @p comforts:sleeping_bag_black');
    event.server.runCommandSilent('give @p multibeds:bed_kit');
    event.server.runCommandSilent('give @p jackseconomy:basic_wallet');
  }

// this is a command that will run every time a player joins
// event.server.runCommandSilent(`execute as ${e.entity.username} run give @s dirt`);
});


PlayerEvents.loggedIn(event => {
  // Define the player as well as the username to the event
  const { player, server, player: { username } } = event
  //Multiple colors version
  let message = Text.of("Hello, ").green().bold()
    .append(Text.of(`${username} `).yellow())
    .append(Text.of(`and welcome to Outlandish Revelations!`).green());
  player.tell(message);

  //Simple version
  //player.tell(`Hello, ${username} and welcome to minecraft!`)

  //You can also tell the whole server the message if you wanted to
  //Multiple colors version
  let serverannouncement = Text.of(`${username} `).green().bold()
    //we .append to add another text.of to change the color
    .append(Text.of(`just joined!`).green());
  server.tell(serverannouncement);
});

// Event listener for player leaving
PlayerEvents.loggedOut(event => {
  // Define the player as well as the username to the event
  const { player, server, player: { username } } = event
  //Tells server the player left
  let serverannouncement = Text.of(`${username} `).green().bold()
    //we .append to add another text.of to change the color
    .append(Text.of(`just left.`).green());
  server.tell(serverannouncement);
});