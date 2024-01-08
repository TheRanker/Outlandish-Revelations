// priority: 0

//Server Gamerules
ServerEvents.loaded(e => {
    e.server.gameRules.set("keepInventory", true)
    e.server.gameRules.set("playersSleepingPercentage", 45)
})

//Player Logout
PlayerEvents.loggedOut(event => {
    const { player, server, player: { username } } = event
    console.log(`Outlandish Revelations: Player ${player.username} logged out(${player.level.dimension}). ${Math.floor(player.x)} ${Math.floor(player.y)} ${Math.floor(player.z)}!`)

    let serverannouncement = Text.of(`${username} `).green().bold()
      .append(Text.of(`just left.`).green());
    server.tell(serverannouncement);
})

//Player login
PlayerEvents.loggedIn(event => {

    //First time player login
    if (!event.player.stages.has('new_join')) {
      event.player.stages.add('new_join');
      
      event.entity.setItemSlot(0, 'minecraft:wooden_sword');
      event.entity.setItemSlot(1, 'minecraft:shield');
      event.entity.setItemSlot(2, 'minecraft:leather_boots');
      event.entity.setItemSlot(3, 'minecraft:leather_leggings');
      event.entity.setItemSlot(4, 'minecraft:leather_chestplate');
      event.entity.setItemSlot(5, 'minecraft:leather_helmet');
      event.server.runCommandSilent('give @p minecraft:bread 16');
      event.server.runCommandSilent('give @p eccentrictome:tome');
      event.server.runCommandSilent('give @p comforts:sleeping_bag_black');
      event.server.runCommandSilent('give @p multibeds:bed_kit');
      event.server.runCommandSilent('give @p jackseconomy:basic_wallet');
    }

    //Everytime player login
    const { player, server, player: { username } } = event
    console.log(`Outlandish Revelations: Player ${player.username} logged in(${player.level.dimension}). ${Math.floor(player.x)} ${Math.floor(player.y)} ${Math.floor(player.z)}!`)
    
    let message = Text.of("Hello, ").green().bold()
      .append(Text.of(`${username} `).yellow())
      .append(Text.of(`and welcome to Outlandish Revelations!`).green());
    player.tell(message);
    let serverannouncement = Text.of(`${username} `).green().bold()
      .append(Text.of(`just joined!`).green());
    server.tell(serverannouncement);
  
  });
  

//Stuck on nether roof
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const $RhinoPropertiesImpl = Java.loadClass('dev.latvian.mods.rhino.mod.util.forge.RhinoPropertiesImpl')

ServerEvents.commandRegistry(event => {
    const {commands: Commands, arguments: Arguments} = event;
    event.register(
        Commands.literal("rankersmp")
            .then(Commands.literal("stuck_on_nether_roof")
                .executes(ctx => {
                    let player = ctx.source.player


                    let world_name = Utils.server.storageSource.getLevelId()
                    let world_path = Utils.server.storageSource.getWorldDir()["resolve(java.lang.String)"](world_name)
                    let game_path = $RhinoPropertiesImpl.getGameDir()
                    let kjs_path = game_path.relativize(world_path)

                    let nether_roof_json_path = kjs_path["resolve(java.lang.String)"]("nether_roof_fix.json")


                    let success = true
                    if (player.level.dimension != 'minecraft:the_nether') {
                        success = false
                    }
                    if (player.y <= 255) {
                        success = false
                    }
                    if (!can_player_build(player, Item.of('minecraft:dirt'), player.z, player.y, player.z)) {
                        success = false
                    }
                    if (!success) {
                        player.tell(Component.red("You must be on the nether roof at chunk, where you can build to execute this command!"))
                        return 1
                    }

                    let current = JsonIO.read(nether_roof_json_path)
                    if (current == null) {
                        current = {}
                    }
                    if (!("portals" in current)) {
                        current["portals"] = []
                    }

                    JsonIO.write(nether_roof_json_path, current)

                    let player_block_pos = player.blockPosition()
                    let x = Math.round(player.x)
                    let z = Math.round(player.z)

                    success = true
                    let near_portal = null

                    current["portals"].forEach(pos => {
                        let portal_pos = new $BlockPos(pos[0], 255, pos[1])
                        let dist = Math.sqrt(player_block_pos.distSqr(portal_pos))
                        if (dist <= 100) {
                            success = false
                            near_portal = portal_pos
                        }
                    })

                    if (!success) {
                        player.tell(Component.red(`You can't open portal here because where other portal in < 100 blocks from you: ${near_portal}`))
                        return 1
                    }

                    current["portals"].push([x, z])
                    JsonIO.write(nether_roof_json_path, current)

                    Utils.server.runCommandSilent(`execute in minecraft:the_nether run fill ${x + 2} 255 ${z - 3} ${x - 3} 250 ${z + 2} minecraft:bedrock`)
                    Utils.server.runCommandSilent(`execute in minecraft:the_nether run fill ${x + 1} 255 ${z - 2} ${x - 2} 251 ${z + 1} minecraft:air`)

                    Utils.server.runCommandSilent(`effect give ${player.username} minecraft:slow_falling 3`)

                    return 1
                })
            ))
})


// Register radiation damage Type
  ServerEvents.highPriorityData(event => {
    event.addJson("kubejs:damage_type/radiation", {
      "effects": "hurt",
      "exhaustion": 0.5,
      "message_id": "radiationKill",
      "scaling": "when_caused_by_living_non_player"
    })
})

EntityEvents.hurt(event => {
    if (!(event.entity.age % 10 == 0)) return
    if (event.source.getType().toString() == 'radiationKill') {
      event.entity.invulnerableTime = 1
    }
})
ServerEvents.tags('item', event => {
    //Gives Rankers Ring Cruios Ring Tag
    event.add('curios:ring', 'kubejs:rankers_ring'),
    //Gives Tome Cruios magic Book Tag
    event.add('curios:magic_book', 'eccentrictome:tome')
})

//Right click harvest crops
let Block = Java.loadClass('net.minecraft.world.level.block.Block')
BlockEvents.rightClicked(event => {
    const {block,player,server,level} = event
    if (block.hasTag('minecraft:crops')) {
        let mcLevel = level
        let blockState = mcLevel.getBlockState(block.pos)
        let mcBlock = blockState.block
        let mcPlayer = player
        if (mcBlock.isMaxAge(blockState)) {
            let loot = Block.getDrops(blockState, mcLevel, block.pos, null, mcPlayer, mcPlayer.getMainHandItem())
            let seedYeeted = false
            for (let i in loot) {
                if (loot[i].id == mcBlock.getCloneItemStack(mcLevel, block.pos, blockState).id) {
                    loot[i].count--
                    seedYeeted = true
                    break
                }
            }
            loot.forEach(item => {
                Block.popResource(mcLevel, block.pos, item)
            })
            if (seedYeeted) {
                block.set(block.id, {age: '0'})
                server.runCommandSilent(`playsound minecraft:block.crop.break block @a ${block.x} ${block.y} ${block.z}`)
            } else { //if no seed was dropped for some odd reason
                mcLevel.destroyBlock(block.pos, true, null, 32)
            }
            player.swing()
            event.cancel()
        }
    }
})

// Remove meat from animal mob drops
LootJS.modifiers((event) => {
    event.addEntityLootModifier("minecraft:sheep").removeLoot("minecraft:mutton")
    event.addEntityLootModifier("minecraft:cow").removeLoot("minecraft:beef")
    event.addEntityLootModifier("minecraft:pig").removeLoot("minecraft:porkchop");
    event.addEntityLootModifier("minecraft:chicken").removeLoot("minecraft:chicken")
    event.addEntityLootModifier("minecraft:rabbit").removeLoot("minecraft:rabbit");
});

//Function to notify players for boss kill
function entityDeathNotify(
    entityId,
    itemIcon,
    titleColor,
    backgroundColor,
    borderColor
) {
    EntityEvents.death(entityId, (event) => {
      const {
        server,
        source: { player: $player },
      } = event;
      if (!$player) return;
      const notification = Notification.make((notification) => {
        Object.assign(notification, {
          itemIcon: itemIcon,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          outlineColor: borderColor,
          textShadow: false,
          text: [
            Text.of("World Notify - Boss Has Been Killed！\n")
              .color(titleColor)
              .bold(),
            Text.translate(
              `entity.${entityId.namespace}.${entityId.path}`
            ).green(),
            Text.of(" has been killed by "),
            Text.of($player.displayName).gold(),
          ],
        });
      });
      for (const player of server.players) {
        player.notify(notification);
      }
    });
  }
 
  //Enderdragon
  entityDeathNotify(
    "minecraft:ender_dragon",
    "minecraft:dragon_head",
    "darkPurple",
    0xd9e4ac,
    0x5d1d96
  
  );
  
  //Wither
  entityDeathNotify(
    "minecraft:wither",
    "minecraft:wither_skeleton_skull",
    0xd81e3d,
    0x372027,
    0x1d1316
  );
  
  //Warden
  entityDeathNotify(
    "minecraft:warden",
    "minecraft:reinforced_deepslate",
    "darkAqua",
    0x525255,
    0x0c1116
  
  );
  
  //Elder Guardian
  entityDeathNotify(
    "minecraft:elder_guardian",
    "minecraft:sponge",
    "darkBlue",
    0x67ada8,
    0x243a34
  );


let juices = ['pamhc2foodextended:pawpawjuiceitem', 'pamhc2foodextended:soursopjuiceitem', 'pamhc2foodextended:apricotjuiceitem', 'pamhc2foodextended:bananajuiceitem', 'pamhc2foodextended:datejuiceitem', 'pamhc2foodextended:dragonfruitjuiceitem', 'pamhc2foodextended:figjuiceitem', 'pamhc2foodextended:grapefruitjuiceitem', 'pamhc2foodextended:mangojuiceitem', 'pamhc2foodcore:applejuiceitem', 'pamhc2foodcore:melonjuiceitem', 'pamhc2foodcore:sweetberryjuiceitem', 'pamhc2foodcore:glowberryjuiceitem', 'pamhc2foodcore:p8juiceitem', 'pamhc2foodextended:carrotjuiceitem', 'pamhc2foodextended:blackberryjuiceitem', 'pamhc2foodextended:blueberryjuiceitem', 'pamhc2foodextended:cactusfruitjuiceitem', 'pamhc2foodextended:candleberryjuiceitem', 'pamhc2foodextended:cranberryjuiceitem', 'pamhc2foodextended:elderberryjuiceitem', 'pamhc2foodextended:huckleberryjuiceitem', 'pamhc2foodextended:juniperberryjuiceitem', 'pamhc2foodextended:mulberryjuiceitem', 'pamhc2foodextended:raspberryjuiceitem', 'pamhc2foodextended:strawberryjuiceitem', 'pamhc2foodextended:cantaloupejuiceitem', 'pamhc2foodextended:grapejuiceitem', 'pamhc2foodextended:greengrapejuiceitem', 'pamhc2foodextended:kiwijuiceitem', 'pamhc2foodextended:pineapplejuiceitem', 'pamhc2foodextended:cherryjuiceitem', 'pamhc2foodextended:orangejuiceitem', 'pamhc2foodextended:peachjuiceitem', 'pamhc2foodextended:pearjuiceitem', 'pamhc2foodextended:plumjuiceitem', 'pamhc2foodextended:papayajuiceitem', 'pamhc2foodextended:persimmonjuiceitem', 'pamhc2foodextended:pomegranatejuiceitem', 'pamhc2foodextended:starfruitjuiceitem', 'pamhc2foodextended:breadfruitjuiceitem', 'pamhc2foodextended:jackfruitjuiceitem', 'pamhc2foodextended:guavajuiceitem', 'pamhc2foodextended:lycheejuiceitem', 'pamhc2foodextended:passionfruitjuiceitem', 'pamhc2foodextended:rambutanjuiceitem', 'pamhc2foodextended:tamarindjuiceitem', 'pamhc2foodextended:gooseberryjuiceitem', 'pamhc2foodextended:durianjuiceitem', 'pamhc2foodextended:lemonjuiceitem', 'pamhc2foodextended:limejuiceitem']

//Fix Sophisticated Backpacks with Curios
const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')

function throw_item(player, item, msg) {
    player.tell(msg)
    let itemEntity = player.drop(item, false, true)
    itemEntity.noGravity = true
    itemEntity.setInvulnerable(true)
    itemEntity.setGlowing(true)
    itemEntity.setPickUpDelay(100)
    setDeltaMovement(itemEntity, 0, -0.02, 0)
}

function throw_from_inv_include_curious(player, item_list, max_count, msg) {
    if (!player.isAlive()) return
    if (!player.gameMode.isSurvival()) return
    let curious_counter = 0
    let targets = []
    item_list.forEach(item => {
        targets.push(Ingredient.of(item))
    })
    const api = new CuriosApi();
    const curios = api.getCuriosHelper().getEquippedCurios(player).resolve().get();
    for (let slot = 0; slot < curios.getSlots(); slot++) {
        var itemstack = Item.of(curios.getStackInSlot(slot))
        targets.forEach(target => {
            if (target.test(itemstack)) {
                curious_counter++
                if (curious_counter > max_count) {
                    curios.setStackInSlot(slot, "minecraft:air")
                    throw_item(player, itemstack, msg)
                    curious_counter--
                }
                return; // exit from forEach
            }
        })
    }
    let counter = player.inventory.count(item_list)
    while (curious_counter + counter > max_count) {
        console.log(Ingredient.of('#forge:ores').itemIds)
        console.log("43476rhfn8hf487")
        let item = player.inventory.extractItem(player.inventory.find(item_list), 1, false)
        throw_item(player, item, msg)
        counter = player.inventory.count(item_list)
    }
    return curious_counter + counter
}

function check_inv(player) {
    throw_from_inv_include_curious(player, ['sophisticatedbackpacks:backpack', 'sophisticatedbackpacks:iron_backpack', 'sophisticatedbackpacks:gold_backpack', 'sophisticatedbackpacks:diamond_backpack', 'sophisticatedbackpacks:netherite_backpack'], 1, "You can have only one backpack in your inventory! You can create a backpack of higher level or use upgrades to be able to carry more items. One of the backpacks was thrown to the ground!")
    throw_from_inv_include_curious(player, ['supplementaries:sack'], 3, "Too much sacks in inventory! One of the sacks was thrown to the ground!")
} 

//Add Seal Piece to mob drops
const netherremastered = ['minecraft:creeper', 'minecraft:skeleton', 'minecraft:spider', 'minecraft:zombie', 'minecraft:slime']
LootJS.modifiers((event) => {
    event
        .addEntityLootModifier(netherremastered)
        .addWeightedLoot(
            [ 
                Item.of("nether_remastered:seal_piece_1").withChance(100)
            ]);

});

ServerEvents.recipes(event => {

  juices.forEach(juice => {

    event.remove({output: juice})

    let name = juice.split(":")[1]

    let fluid_name = name.replace("item", "_fluid")

    let clear_name = juice.split(":")[1].replace("item", "").split("juice")[0]

    //Press fruits into fluids
    event.custom({
      "type": "create:compacting",
      "ingredients": [
        {
         "tag": `forge:fruits/${clear_name}`
        }
      ],
      "results": [
        {
          "amount": 50,
          "fluid": `kubejs:${fluid_name}`,
          "nbt": {}
        }
      ]
    })

    //Fill fluids into bottles
    event.custom({
      "type": "create:filling",
      "ingredients": [
        {
          "item": "minecraft:glass_bottle"
        },
        {
          "amount": 250,
          "fluid": `kubejs:${fluid_name}`
        }
      ],
      "results": [
        {
          "item": juice
        }
      ]
    })
  })
})

juices.forEach(juice => {
  ItemEvents.foodEaten(juice, event => {
    event.player.giveInHand('minecraft:glass_bottle')
  })
})