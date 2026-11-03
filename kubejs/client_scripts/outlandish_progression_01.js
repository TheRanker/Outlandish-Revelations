
/*
 * OUTLANDISH REVELATIONS
 * Custom Ponder Walkthroughs - Batch 01
 * Minecraft 1.20.1 / Forge / PonderJS 2.1.0
 *
 * Introductory progression scenes.
 * Machine construction tutorials will use
 * dedicated schematics in later batches.
 */

Ponder.registry(event => {

  function begin(scene, introduction) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(80, introduction);
    scene.idle(90);
  }

  function reveal(scene, block, position, message) {
    scene.world.setBlock(position, block, false);
    scene.world.showSection(position, 'UP');
    scene.idle(20);
    scene.text(85, message, [
      position[0] + 0.5,
      position[1] + 1.3,
      position[2] + 0.5
    ]);
    scene.idle(100);
  }

  function ending(scene, message) {
    scene.text(100, message);
    scene.idle(110);
  }

  // 01 - The beginning
  event.create('minecraft:crafting_table')
    .scene(
      'outlandish:the_beginning',
      'Outlandish Revelations: Your First Steps',
      (scene, util) => {
        begin(scene,
          'Welcome! Progression here is built around mastering tools, machinery, magic and exploration.'
        );

        reveal(scene, 'minecraft:cobblestone', [1,1,2],
          'Begin with basic resources. Stone and ore processing lay the foundation.'
        );

        reveal(scene, 'minecraft:iron_ore', [2,1,2],
          'Gather ores carefully. Your first processing methods will lead into steam technology.'
        );

        reveal(scene, 'minecraft:crafting_table', [3,1,2],
          'Use JEI to study recipes and follow the questbook for your next objectives.'
        );

        ending(scene,
          'Your first goal: establish a workshop and prepare for mechanical and steam power.'
        );
      }
    );

  // 02 - Tinkers' Workshop
  event.create('minecraft:lava_bucket')
    .scene(
      'outlandish:tinkers_workshop',
      'Tinkers: From Tools to Casting',
      (scene, util) => {
        begin(scene,
          'Tinkers is your main early and midgame path for crafting and improving tools.'
        );

        reveal(scene, 'minecraft:stone', [1,1,2],
          'Start with the basic workshop and tool-building systems.'
        );

        reveal(scene, 'minecraft:lava_bucket', [2,1,2],
          'Melting and casting open the way to more advanced equipment.'
        );

        reveal(scene, 'minecraft:andesite', [3,1,2],
          'The casting workshop uses materials tied to Create progression.'
        );

        ending(scene,
          'Follow the Tinkers Workshop quests. Use JEI for the exact casting and tool recipes.'
        );
      }
    );

  // 03 - Create mechanical power
  event.create('create:water_wheel')
    .scene(
      'outlandish:create_first_power',
      'Create: Your First Mechanical Power',
      (scene, util) => {
        begin(scene,
          'Create introduces rotational power. This is your first major step into automation.'
        );

        reveal(scene, 'create:water_wheel', [1,1,2],
          'Water wheels can generate rotational power from flowing water.'
        );

        reveal(scene, 'create:shaft', [2,1,2],
          'Shafts transmit that rotation between connected components.'
        );

        reveal(scene, 'create:cogwheel', [3,1,2],
          'Cogwheels transfer and redirect rotational power through machinery.'
        );

        ending(scene,
          'Watch rotational speed and stress capacity. Your machines need enough power to run.'
        );
      }
    );

  // 04 - Create steam power
  event.create('create:steam_engine')
    .scene(
      'outlandish:create_steam',
      'Create: Harnessing Steam',
      (scene, util) => {
        begin(scene,
          'Steam power is a major milestone on the road toward industrial technology.'
        );

        reveal(scene, 'create:fluid_tank', [1,1,2],
          'Steam engines rely on a boiler setup with an adequate water supply.'
        );

        reveal(scene, 'minecraft:campfire', [2,1,2],
          'Heating supports boiler operation. Larger setups demand stronger heat sources.'
        );

        reveal(scene, 'create:steam_engine', [3,1,2],
          'Steam engines convert boiler output into rotational power.'
        );

        ending(scene,
          'Steam and mechanical progression support your transition toward GTCEu industry.'
        );
      }
    );

  // 05 - GTCEu steam stage
  event.create('minecraft:furnace')
    .scene(
      'outlandish:gt_steam',
      'GTCEu: The Steam Age',
      (scene, util) => {
        begin(scene,
          'Your first GTCEu technology uses steam before electrical machines take over.'
        );

        reveal(scene, 'minecraft:coal', [1,1,2],
          'Fuel and water are essential resources for producing steam.'
        );

        reveal(scene, 'minecraft:iron_block', [2,1,2],
          'Steam machinery introduces more structured material processing.'
        );

        reveal(scene, 'minecraft:blast_furnace', [3,1,2],
          'Processing efficiency and material preparation become increasingly important.'
        );

        ending(scene,
          'The questbook explains your steam boiler and machine sequence. JEI shows exact recipes.'
        );
      }
    );

  // 06 - Electrical progression
  event.create('minecraft:redstone')
    .scene(
      'outlandish:voltage_ladder',
      'GTCEu: From LV to IV',
      (scene, util) => {
        begin(scene,
          'Electric machinery introduces voltage tiers, cable limits, and energy management.'
        );

        reveal(scene, 'minecraft:copper_block', [1,1,2],
          'LV and MV establish the foundation of your electrical industry.'
        );

        reveal(scene, 'minecraft:gold_block', [2,1,2],
          'HV and EV unlock more demanding processing and chemistry.'
        );

        reveal(scene, 'minecraft:diamond_block', [3,1,2],
          'IV brings the advanced machinery needed for later progression.'
        );

        ending(scene,
          'Match your generators, cables and machines to the correct voltage. Higher is not automatically safer!'
        );
      }
    );

  // 07 - The dimensional gates
  event.create('minecraft:ender_eye')
    .scene(
      'outlandish:dimensional_gates',
      'Outlandish: Unlocking the Dimensions',
      (scene, util) => {
        begin(scene,
          'Dimension access in Outlandish Revelations is earned through boss progression.'
        );

        reveal(scene, 'minecraft:sculk_shrieker', [1,1,2],
          'Summon and defeat the Warden to earn Nether access for your FTB team.'
        );

        reveal(scene, 'minecraft:nether_star', [2,1,2],
          'Later, summon and defeat the Wither to unlock the End for your team.'
        );

        reveal(scene, 'minecraft:ender_eye', [3,1,2],
          'Entering the End unlocks the path toward Twilight Forest.'
        );

        ending(scene,
          'These are team progression milestones. Follow the Dimensionality quests for each unlock.'
        );
      }
    );
});
