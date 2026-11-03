
/*
 * OUTLANDISH REVELATIONS
 * PONDER BATCH 09
 *
 * Toolmaking, Bulk Processing,
 * Mana Infusion and AE2 Processors
 *
 * Minecraft 1.20.1 / Forge
 * PonderJS 2.1.0
 */

Ponder.registry(event => {

  function begin(scene, message) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(75, message);
    scene.idle(90);
  }

  function add(scene, id, pos, message) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(20);

    if (message) {
      scene.text(80, message, [
        pos[0] + 0.5,
        pos[1] + 1.0,
        pos[2] + 0.5
      ]);
      scene.idle(90);
    }
  }

  function tell(scene, message) {
    scene.text(85, message);
    scene.idle(95);
  }

  // =========================================
  // 01 - TINKERS TOOLMAKING
  // =========================================

  event.create('tconstruct:part_builder')
    .scene(
      'outlandish:tinkers_toolmaking',
      'Tinkers: From Parts to Tools',
      (scene, util) => {

        begin(scene,
          'Tinkers tools are assembled from parts. The material of each part affects the finished tool.'
        );

        add(scene, 'tconstruct:part_builder', [1,1,2],
          'Step 1: Use a Part Builder to manufacture compatible tool parts from appropriate materials.'
        );

        tell(scene,
          'Select the part pattern and provide the required materials.'
        );

        tell(scene,
          'Different tool types require different combinations of parts.'
        );

        add(scene, 'tconstruct:tinker_station', [3,1,2],
          'Step 2: Use a Tinker Station to assemble supported tools from the parts you have prepared.'
        );

        tell(scene,
          'Choose the tool you want to assemble and insert the matching parts.'
        );

        tell(scene,
          'A tool can combine materials with different properties, letting you balance durability and performance.'
        );

        tell(scene,
          'As you advance, molten-metal casting provides another way to manufacture tool components.'
        );

        tell(scene,
          'Our pack uses Tinkers as the main early and midgame toolmaking system.'
        );

        tell(scene,
          'Check JEI and the Tinkers Workshop quests for our custom progression and available tools.'
        );
      }
    );

  // =========================================
  // 02 - CREATE BULK PROCESSING
  // =========================================

  event.create('create:encased_fan')
    .scene(
      'outlandish:create_bulk_processing',
      'Create: Understanding Bulk Processing',
      (scene, util) => {

        begin(scene,
          'An Encased Fan can process multiple items using airflow and the correct processing medium.'
        );

        add(scene, 'create:encased_fan', [1,1,2],
          'Step 1: Place an Encased Fan with its airflow directed toward your processing area.'
        );

        add(scene, 'create:shaft', [0,1,2],
          'Step 2: Supply rotational power to the fan through a correctly aligned drivetrain.'
        );

        tell(scene,
          'The fan must be rotating. Use a rotational power source and confirm the airflow direction.'
        );

        add(scene, 'minecraft:water', [2,1,2],
          'Step 3: Water in the airflow path enables compatible bulk-washing recipes.'
        );

        tell(scene,
          'Place eligible items in the processing airflow using a Depot, Belt or other suitable method.'
        );

        tell(scene,
          'Bulk washing recipes are different from ordinary crafting and smelting recipes.'
        );

        // Replace water with a schematic marker.
        scene.world.setBlock(
          [2,1,2],
          'minecraft:magma_block',
          false
        );

        scene.idle(20);

        tell(scene,
          'Heated airflow supports different processing methods, including smoking or blasting with the appropriate medium.'
        );

        tell(scene,
          'The Magma Block shown here is only a visual marker. Use the correct fire or lava arrangement for the desired recipe.'
        );

        tell(scene,
          'Check JEI for the exact bulk-processing method and ingredients.'
        );

        tell(scene,
          'Fans are excellent for automating repeated material-processing tasks before and alongside GTCEu machinery.'
        );
      }
    );

  // =========================================
  // 03 - BOTANIA MANA INFUSION
  // =========================================

  event.create('botania:mana_pool')
    .scene(
      'outlandish:botania_mana_infusion',
      'Botania: Transforming Materials with Mana',
      (scene, util) => {

        begin(scene,
          'A Mana Pool stores mana and can transform suitable ingredients through mana infusion.'
        );

        add(scene, 'minecraft:grass_block', [1,1,2],
          'Begin by preparing an area for mana generation.'
        );

        add(scene, 'botania:endoflame', [1,2,2],
          'Generating flowers such as Endoflames convert their appropriate fuel into mana.'
        );

        add(scene, 'botania:mana_spreader', [2,1,2],
          'A Mana Spreader collects nearby generated mana and sends it as mana bursts.'
        );

        add(scene, 'botania:mana_pool', [4,1,2],
          'Position your Mana Pool where it can receive mana from the spreader.'
        );

        tell(scene,
          'Use the Wand of the Forest to aim the spreader at the pool and check mana connections.'
        );

        tell(scene,
          'Once mana is stored, drop a valid infusion ingredient into the Mana Pool.'
        );

        tell(scene,
          'If the pool contains sufficient mana and the recipe is valid, the ingredient transforms.'
        );

        tell(scene,
          'Some advanced infusion recipes require a special catalyst beneath the Mana Pool.'
        );

        tell(scene,
          'Use JEI to determine which ingredients, catalysts and mana requirements apply.'
        );

        tell(scene,
          'Mana infusion supports magical crafting, but does not replace the industrial progression in Outlandish Revelations.'
        );
      }
    );

  // =========================================
  // 04 - AE2 INSCRIBER AND PROCESSORS
  // =========================================

  event.create('ae2:inscriber')
    .scene(
      'outlandish:ae2_processor_crafting',
      'AE2: Manufacturing Processors',
      (scene, util) => {

        begin(scene,
          'AE2 uses processors to craft many network components. The Inscriber is an essential manufacturing machine.'
        );

        add(scene, 'ae2:inscriber', [2,1,2],
          'Step 1: Place an Inscriber and supply compatible electrical power.'
        );

        tell(scene,
          'Insert the appropriate Inscriber Press and its matching material.'
        );

        tell(scene,
          'Logic, Calculation and Engineering processors each require their own corresponding printed component.'
        );

        tell(scene,
          'A Silicon Press is used to prepare Printed Silicon.'
        );

        add(scene, 'minecraft:redstone_block', [3,1,2],
          'Step 2: Redstone is one of the ingredients used when assembling standard AE2 processors.'
        );

        tell(scene,
          'Combine the appropriate printed component, Printed Silicon and Redstone in the Inscriber.'
        );

        tell(scene,
          'The Redstone Block is only an ingredient reminder, not a machine connection.'
        );

        tell(scene,
          'Use JEI to inspect the exact press arrangement and ingredients for each processor.'
        );

        tell(scene,
          'The Inscriber supports automation through configured item insertion and extraction.'
        );

        tell(scene,
          'When automating processors, make sure printed components are routed to the correct inputs.'
        );

        tell(scene,
          'Build a reliable processor supply before expanding AE2 storage, terminals and autocrafting.'
        );
      }
    );

});
