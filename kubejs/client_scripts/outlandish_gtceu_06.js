
/*
 * OUTLANDISH REVELATIONS
 * BATCH 06 - GTCEu PROCESSING & AUTOMATION
 *
 * Minecraft 1.20.1 / Forge
 * GTCEu 7.5.3 / PonderJS 2.1.0
 *
 * Workflow tutorials.
 * JEI remains authoritative for exact recipes.
 */

Ponder.registry(event => {

  function begin(scene, message) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(80, message);
    scene.idle(95);
  }

  function place(scene, id, pos, message) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(20);

    if (message) {
      scene.text(85, message, [
        pos[0] + 0.5,
        pos[1] + 1,
        pos[2] + 0.5
      ]);
      scene.idle(95);
    }
  }

  function say(scene, message) {
    scene.text(85, message);
    scene.idle(95);
  }

  // ========================================
  // 01 - ORE PROCESSING
  // ========================================

  event.create('gtceu:lv_macerator')
    .scene(
      'outlandish:ore_processing',
      'GTCEu: Processing Your Ores',
      (scene, util) => {

        begin(scene,
          'Ore processing is one of the foundations of industrial progression.'
        );

        place(scene, 'minecraft:iron_ore', [1,1,2],
          'Begin by collecting ores. Different materials have different processing chains.'
        );

        place(scene, 'gtceu:lv_macerator', [2,1,2],
          'The LV Macerator processes compatible materials into dusts and other products.'
        );

        place(scene, 'minecraft:chest', [3,1,2],
          'Collect processed materials and leave enough room for additional outputs.'
        );

        say(scene,
          'The machine arrangement shown here illustrates workflow. Configure the real input and output connections.'
        );

        say(scene,
          'Open JEI to discover the correct macerating recipe for your ore.'
        );

        say(scene,
          'Some processing chains include additional crushing, washing or separation stages.'
        );

        say(scene,
          'More advanced machines can improve recovery or unlock different byproducts.'
        );

        say(scene,
          'Automate frequently used ores first. Iron, copper and other common materials are constantly needed.'
        );
      }
    );

  // ========================================
  // 02 - ALLOY PRODUCTION
  // ========================================

  event.create('gtceu:lv_alloy_smelter')
    .scene(
      'outlandish:alloy_production',
      'GTCEu: Making Industrial Alloys',
      (scene, util) => {

        begin(scene,
          'Alloys combine materials into metals and compounds needed for advanced machines.'
        );

        place(scene, 'minecraft:copper_block', [1,1,2],
          'Gather the required base materials. The ingredients depend on your chosen alloy.'
        );

        place(scene, 'gtceu:lv_alloy_smelter', [2,1,2],
          'The Alloy Smelter combines compatible ingredients into new products.'
        );

        place(scene, 'minecraft:chest', [3,1,2],
          'Store finished alloys separately from raw materials.'
        );

        say(scene,
          'Use JEI to select the exact alloy recipe and check its required machine tier.'
        );

        say(scene,
          'Some materials are made by mixing dusts, while other products need blast processing or additional machines.'
        );

        say(scene,
          'An Alloy Smelter cannot replace every metallurgy machine.'
        );

        say(scene,
          'Create and Tinkers remain part of our early workshop progression. Follow the questbook before changing processing methods.'
        );

        say(scene,
          'Prepare alloy reserves before advancing to new voltage tiers.'
        );
      }
    );

  // ========================================
  // 03 - CIRCUIT ASSEMBLY
  // ========================================

  event.create('gtceu:lv_circuit_assembler')
    .scene(
      'outlandish:circuit_manufacturing',
      'GTCEu: Building Better Circuits',
      (scene, util) => {

        begin(scene,
          'Circuits are essential for advancing into more powerful GTCEu equipment.'
        );

        place(scene, 'minecraft:redstone_block', [1,1,2],
          'Circuit manufacturing starts with the components specified by your recipe.'
        );

        place(scene, 'gtceu:lv_circuit_assembler', [2,1,2],
          'The Circuit Assembler combines multiple ingredients into electronic components.'
        );

        place(scene, 'minecraft:chest', [3,1,2],
          'Keep completed circuits and intermediate materials organized.'
        );

        say(scene,
          'Check JEI for the ingredients, required voltage, machine configuration and any fluid inputs.'
        );

        say(scene,
          'The Circuit Assembler accepts recipes with several item inputs. Prepare reliable ingredient delivery.'
        );

        say(scene,
          'Some advanced circuits require components from chemical processing or other machines.'
        );

        say(scene,
          'Do not automatically upgrade every production line when a higher voltage tier becomes available.'
        );

        say(scene,
          'Our Blood Magic integration also introduces special circuit-related materials. Follow its dedicated quests.'
        );
      }
    );

  // ========================================
  // 04 - CHEMICAL PROCESSING
  // ========================================

  event.create('gtceu:lv_chemical_reactor')
    .scene(
      'outlandish:chemical_processing',
      'GTCEu: Understanding Chemical Production',
      (scene, util) => {

        begin(scene,
          'Chemical processing becomes increasingly important as your factory develops.'
        );

        place(scene, 'minecraft:glass', [1,1,2],
          'Chemical recipes can require item ingredients and measured quantities of fluids.'
        );

        place(scene, 'gtceu:lv_chemical_reactor', [2,1,2],
          'The Chemical Reactor handles compatible reactions at its supported voltage tier.'
        );

        place(scene, 'minecraft:cauldron', [3,1,2],
          'Plan separate storage for fluid products. This cauldron is only a visual marker.'
        );

        say(scene,
          'Read the JEI recipe carefully. Check all ingredients, fluid quantities, duration and EU/t.'
        );

        say(scene,
          'Different processing stages may require electrolyzers, centrifuges, distilleries or other machines.'
        );

        say(scene,
          'Never assume a chemical reaction produces only one output. Byproducts may need extraction.'
        );

        say(scene,
          'A full output tank or slot can prevent a production line from continuing.'
        );

        say(scene,
          'Some advanced chemistry processes require higher-tier machinery or multiblocks.'
        );

        say(scene,
          'The LV through IV chemistry quest chapters guide you toward progressively more complex materials.'
        );
      }
    );

  // ========================================
  // 05 - AUTOMATED PRODUCTION LINE
  // ========================================

  event.create('minecraft:hopper')
    .scene(
      'outlandish:factory_automation',
      'GTCEu: Organizing an Automated Factory',
      (scene, util) => {

        begin(scene,
          'A good factory connects many processing stages into one reliable system.'
        );

        place(scene, 'minecraft:chest', [1,1,2],
          'Start by organizing raw materials in accessible storage.'
        );

        place(scene, 'gtceu:lv_macerator', [2,1,2],
          'Step 1: Send suitable materials into the correct processing machine.'
        );

        place(scene, 'gtceu:lv_alloy_smelter', [3,1,2],
          'Step 2: Route compatible intermediates into later processing stages.'
        );

        say(scene,
          'This is a processing diagram, not a direct machine-to-machine transfer connection.'
        );

        say(scene,
          'Use proper item transport, machine auto-output settings and filters to prevent incorrect routing.'
        );

        say(scene,
          'Keep fluid transport separate from item transport and provide sufficient output storage.'
        );

        say(scene,
          'Plan each stage around its actual recipe speed. A slow machine can hold up the whole production line.'
        );

        say(scene,
          'AE2 becomes particularly useful once large numbers of components and recipes must be managed.'
        );

        say(scene,
          'Always leave a way to access machines manually for repairs, upgrades and troubleshooting.'
        );
      }
    );

});
