
/*
 * OUTLANDISH REVELATIONS
 * BATCH 04 - GTCEu INDUSTRIAL WALKTHROUGHS
 *
 * Minecraft 1.20.1 / Forge
 * GTCEu Modern 7.5.3
 * PonderJS 2.1.0
 *
 * Teaches machine operation and progression.
 * The actual multiblock layouts remain in JEI.
 */

Ponder.registry(event => {

  function start(scene, message) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(80, message);
    scene.idle(90);
  }

  function place(scene, id, pos, message) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(15);

    if (message) {
      scene.text(80, message, [
        pos[0] + 0.5,
        pos[1] + 1,
        pos[2] + 0.5
      ]);
      scene.idle(90);
    }
  }

  function explain(scene, message) {
    scene.text(85, message);
    scene.idle(95);
  }

  // -------------------------------------------
  // 01: STEAM TO ELECTRICITY
  // -------------------------------------------
  event.create('gtceu:lp_steam_solid_boiler')
    .scene(
      'outlandish:gt_steam_to_electric',
      'GTCEu: From Steam to Electricity',
      (scene, util) => {

        start(scene,
          'Steam power begins your industrial journey. Electrical machinery is the next major milestone.'
        );

        place(scene, 'gtceu:lp_steam_solid_boiler', [1,1,2],
          'A steam boiler converts fuel and water into steam for compatible machines.'
        );

        place(scene, 'minecraft:copper_block', [2,1,2],
          'Steam needs suitable fluid pipes. This copper block marks the connection.'
        );

        place(scene, 'minecraft:iron_block', [3,1,2],
          'Your steam-powered workshop prepares the materials and components for electricity.'
        );

        explain(scene,
          'Electric machines do not accept steam as their normal EU power supply.'
        );

        explain(scene,
          'Build the generators, cables and electrical machines required by your LV quest progression.'
        );

        explain(scene,
          'Check JEI for Outlandish Revelations recipes. Some prerequisites differ from standard GTCEu.'
        );

        explain(scene,
          'Create mechanical and steam technology are part of this transition. Neither replaces your GTCEu progression.'
        );
      }
    );

  // -------------------------------------------
  // 02: VOLTAGE AND AMPERAGE
  // -------------------------------------------
  event.create('minecraft:redstone_block')
    .scene(
      'outlandish:gt_voltage_safety',
      'GTCEu: Voltage and Electrical Safety',
      (scene, util) => {

        start(scene,
          'GTCEu electricity is based on voltage tiers and amperage. Both must be considered.'
        );

        place(scene, 'minecraft:copper_block', [1,1,2],
          'Low Voltage: LV machines are your first electrical processing stage.'
        );

        place(scene, 'minecraft:iron_block', [2,1,2],
          'Medium Voltage: MV unlocks more demanding equipment and processes.'
        );

        place(scene, 'minecraft:gold_block', [3,1,2],
          'High Voltage: HV introduces higher electrical requirements.'
        );

        explain(scene,
          'Progression continues through EV and IV. Each tier requires properly rated electrical infrastructure.'
        );

        explain(scene,
          'Voltage is the electrical potential delivered to a machine. Amperage represents the amount of current transferred.'
        );

        explain(scene,
          'A cable must tolerate both the voltage and the amperage moving through it.'
        );

        explain(scene,
          'Excessive voltage can destroy equipment. Overloaded cables may also fail.'
        );

        explain(scene,
          'Transformers change voltage and available amperage. They do not create free energy.'
        );

        explain(scene,
          'Always inspect machine tooltips, cable ratings and generator outputs before connecting power.'
        );
      }
    );

  // -------------------------------------------
  // 03: MACHINE INPUTS AND OUTPUTS
  // -------------------------------------------
  event.create('minecraft:hopper')
    .scene(
      'outlandish:gt_machine_io',
      'GTCEu: Building a Processing Line',
      (scene, util) => {

        start(scene,
          'Industrial automation combines item transport, fluid handling and electrical power.'
        );

        place(scene, 'minecraft:chest', [1,1,2],
          'Start with materials waiting to enter your processing system.'
        );

        place(scene, 'minecraft:hopper', [2,1,2],
          'Move materials toward your machine using compatible transport and configured input sides.'
        );

        place(scene, 'minecraft:furnace', [3,1,2],
          'This furnace represents a processing machine. Use the actual GTCEu machine in your factory.'
        );

        explain(scene,
          'Open a GTCEu machine interface to inspect its item slots, fluid tanks and power requirements.'
        );

        explain(scene,
          'Configure automatic item input and output where supported by the machine.'
        );

        explain(scene,
          'For fluid recipes, connect compatible pipes or tanks to the correct fluid input and output.'
        );

        explain(scene,
          'Some recipes produce byproducts. Provide storage or extraction so outputs cannot block processing.'
        );

        explain(scene,
          'If a machine refuses to run, check its recipe, energy supply, input items, fluid amounts and output space.'
        );
      }
    );

  // -------------------------------------------
  // 04: INDUSTRIAL CHEMISTRY
  // -------------------------------------------
  event.create('minecraft:brewing_stand')
    .scene(
      'outlandish:gt_chemistry',
      'GTCEu: Understanding Industrial Chemistry',
      (scene, util) => {

        start(scene,
          'Chemistry transforms basic resources into increasingly complex industrial materials.'
        );

        place(scene, 'minecraft:water', [1,1,2],
          'Fluids are essential processing ingredients. Their type and amount must match the recipe.'
        );

        place(scene, 'minecraft:iron_block', [2,1,2],
          'Chemical reactors combine materials and fluids under specific processing conditions.'
        );

        place(scene, 'minecraft:gold_block', [3,1,2],
          'Electrolyzers and other processing machines can separate or transform materials.'
        );

        explain(scene,
          'The displayed blocks are teaching markers, not a working chemical production line.'
        );

        explain(scene,
          'JEI shows which machine processes a chemical recipe and which inputs are required.'
        );

        explain(scene,
          'Follow the chemistry quest chapters through LV, MV, HV, EV and IV.'
        );

        explain(scene,
          'Some processes depend on materials or circuits that require earlier metallurgy milestones.'
        );

        explain(scene,
          'Plan fluid storage, intermediate products and byproduct extraction before automating complex chains.'
        );

        explain(scene,
          'Chemistry becomes important for advanced machinery, circuits and our cross-mod progression systems.'
        );
      }
    );

  // -------------------------------------------
  // 05: MULTIBLOCK OPERATIONS
  // -------------------------------------------
  event.create('minecraft:blast_furnace')
    .scene(
      'outlandish:gt_multiblock_operation',
      'GTCEu: Operating a Multiblock',
      (scene, util) => {

        start(scene,
          'A multiblock is more than a controller. It needs a correctly formed structure and operational connections.'
        );

        place(scene, 'minecraft:iron_block', [1,1,2],
          'The controller determines which multiblock machine you are building.'
        );

        place(scene, 'minecraft:stone_bricks', [2,1,2],
          'Casings and internal components form the required structure.'
        );

        place(scene, 'minecraft:gold_block', [3,1,2],
          'Hatches and buses provide ways for power, items and fluids to enter or leave.'
        );

        explain(scene,
          'These blocks illustrate component roles. They are not a valid GTCEu multiblock structure.'
        );

        explain(scene,
          'Use the GTCEu multiblock viewer in JEI for the exact structure and permitted component locations.'
        );

        explain(scene,
          'Energy hatches accept electrical power. Item buses and fluid hatches manage ingredients and products.'
        );

        explain(scene,
          'The machine must form correctly before processing. Check controller status if it fails.'
        );

        explain(scene,
          'Some multiblocks require special coils, temperature limits or other operating conditions.'
        );

        explain(scene,
          'Recipe requirements and power demand can exceed those of a lower-tier multiblock.'
        );

        explain(scene,
          'For troubleshooting, check structure formation, recipe inputs, voltage, amperage and output capacity.'
        );
      }
    );

});
