
/*
 * OUTLANDISH REVELATIONS
 * BATCH 05 - INDUSTRIAL PROGRESSION
 *
 * Forge 1.20.1
 * GTCEu 7.5.3
 * PonderJS 2.1.0
 *
 * LV -> MV -> HV -> EV -> IV
 *
 * Educational diagrams. Use JEI for the
 * actual GTCEu machines, recipes, and
 * multiblock construction.
 */

Ponder.registry(event => {

  function begin(scene, message) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(80, message);
    scene.idle(95);
  }

  function reveal(scene, id, pos, message) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(20);

    scene.text(85, message, [
      pos[0] + 0.5,
      pos[1] + 0.9,
      pos[2] + 0.5
    ]);
    scene.idle(95);
  }

  function explain(scene, message) {
    scene.text(90, message);
    scene.idle(100);
  }

  // =========================================
  // 01 - LV INDUSTRY
  // =========================================
  event.create('minecraft:copper_ingot')
    .scene(
      'outlandish:lv_industry',
      'LV Industry: Your First Electric Factory',
      (scene, util) => {

        begin(scene,
          'Welcome to Low Voltage. You have reached the first stage of electric industry.'
        );

        reveal(scene, 'minecraft:iron_ore', [1,1,2],
          'Begin by organizing the ore and dust processing you established during the Steam Age.'
        );

        reveal(scene, 'minecraft:copper_block', [2,1,2],
          'Create an electrical supply capable of powering LV machines at the correct voltage.'
        );

        reveal(scene, 'minecraft:iron_block', [3,1,2],
          'Your first electric machines expand what you can process and automate.'
        );

        explain(scene,
          'LV operates at a nominal 32 EU/t. Check each recipe for its actual power requirement.'
        );

        explain(scene,
          'Build a reliable supply of cables, circuits, motors and machine components.'
        );

        explain(scene,
          'Separate raw materials, intermediate products and finished components into organized storage.'
        );

        explain(scene,
          'Some recipes still require steam-era equipment. Do not dismantle useful machines too early.'
        );

        explain(scene,
          'Your next objective is to prepare the materials and infrastructure needed for MV.'
        );
      }
    );

  // =========================================
  // 02 - MV INDUSTRY
  // =========================================
  event.create('minecraft:iron_ingot')
    .scene(
      'outlandish:mv_industry',
      'MV Industry: Expanding Production',
      (scene, util) => {

        begin(scene,
          'Medium Voltage expands your factory, but also increases its energy demands.'
        );

        reveal(scene, 'minecraft:iron_block', [1,1,2],
          'Preserve useful LV machinery. Lower-tier recipes may still be economical to run there.'
        );

        reveal(scene, 'minecraft:gold_block', [2,1,2],
          'Introduce correctly rated MV generators, cables and processing equipment.'
        );

        reveal(scene, 'minecraft:chest', [3,1,2],
          'Build dedicated intermediate storage so one processing stage cannot block the entire factory.'
        );

        explain(scene,
          'MV operates at a nominal 128 EU/t, four times the LV voltage.'
        );

        explain(scene,
          'A recipe that requires MV cannot simply be run in an LV machine by supplying more amperage.'
        );

        explain(scene,
          'Expand your chemical and metallurgical processing alongside your electrical infrastructure.'
        );

        explain(scene,
          'Plan fluid transport early. Chemistry increasingly depends on reliable fluid handling.'
        );

        explain(scene,
          'Keep the production chains for circuits and machine components organized for HV.'
        );
      }
    );

  // =========================================
  // 03 - HV INDUSTRY
  // =========================================
  event.create('minecraft:gold_ingot')
    .scene(
      'outlandish:hv_industry',
      'HV Industry: Advanced Metallurgy',
      (scene, util) => {

        begin(scene,
          'High Voltage introduces more demanding materials, recipes and processing systems.'
        );

        reveal(scene, 'minecraft:blast_furnace', [1,1,2],
          'Advanced metallurgy increasingly depends on blast processing and suitable heating conditions.'
        );

        reveal(scene, 'minecraft:gold_block', [2,1,2],
          'Expand your electrical network for correctly rated HV machines and processing equipment.'
        );

        reveal(scene, 'minecraft:hopper', [3,1,2],
          'Prepare input and output automation for processes that consume many intermediate materials.'
        );

        explain(scene,
          'HV operates at a nominal 512 EU/t. A higher tier brings additional energy requirements.'
        );

        explain(scene,
          'For blast processing, sufficient voltage alone may not be enough. Check required coil temperature.'
        );

        explain(scene,
          'Use the GTCEu JEI structure viewer to inspect the required multiblock layout and components.'
        );

        explain(scene,
          'Keep metallurgy and chemistry working together. New metals often require several processing stages.'
        );

        explain(scene,
          'Build reserves of circuits, alloys, fluids and specialized components before advancing to EV.'
        );
      }
    );

  // =========================================
  // 04 - EV INDUSTRY
  // =========================================
  event.create('minecraft:diamond')
    .scene(
      'outlandish:ev_industry',
      'EV Industry: Integrated Processing',
      (scene, util) => {

        begin(scene,
          'Extreme Voltage brings together advanced metallurgy, chemistry and automation.'
        );

        reveal(scene, 'minecraft:diamond_block', [1,1,2],
          'Higher-tier machines require more advanced materials and increasingly expensive components.'
        );

        reveal(scene, 'minecraft:glass', [2,1,2],
          'Fluid handling becomes essential. Store chemicals and byproducts without mixing incompatible streams.'
        );

        reveal(scene, 'minecraft:chest', [3,1,2],
          'Organize intermediate materials for production chains containing many dependent recipes.'
        );

        explain(scene,
          'EV operates at a nominal 2048 EU/t. Upgrade your power infrastructure before connecting EV equipment.'
        );

        explain(scene,
          'Check JEI for the required machine tier, EU/t, duration, fluids and circuit configurations.'
        );

        explain(scene,
          'Do not assume one machine can process every recipe simply because its voltage tier is high enough.'
        );

        explain(scene,
          'Automation should minimize manual transfers and prevent output bottlenecks.'
        );

        explain(scene,
          'Your EV production infrastructure prepares the materials and components for IV.'
        );
      }
    );

  // =========================================
  // 05 - IV INDUSTRY
  // =========================================
  event.create('minecraft:netherite_ingot')
    .scene(
      'outlandish:iv_industry',
      'IV Industry: Preparing for Endgame',
      (scene, util) => {

        begin(scene,
          'Insane Voltage is the advanced industrial milestone on the road toward the endgame.'
        );

        reveal(scene, 'minecraft:netherite_block', [1,1,2],
          'Advanced metallurgy provides specialized materials for the most demanding equipment.'
        );

        reveal(scene, 'minecraft:diamond_block', [2,1,2],
          'Advanced electrical machines require infrastructure capable of delivering IV power.'
        );

        reveal(scene, 'minecraft:beacon', [3,1,2],
          'Late-game technology connects industrial processing with major progression milestones.'
        );

        explain(scene,
          'IV operates at a nominal 8192 EU/t. Plan generation, cables and power demand carefully.'
        );

        explain(scene,
          'Complex recipes may depend on multiple earlier machines, materials and chemical processes.'
        );

        explain(scene,
          'Keep earlier voltage tiers operational. They remain useful for producing lower-tier components.'
        );

        explain(scene,
          'Use JEI to inspect processing requirements and GTCEu multiblock structures.'
        );

        explain(scene,
          'Your industrial infrastructure supports advanced space systems, magic integrations and Draconic Evolution.'
        );

        explain(scene,
          'The final challenges of Outlandish Revelations require more than machinery. Prepare for the ultimate battles.'
        );
      }
    );

});
