
/*
 * OUTLANDISH REVELATIONS
 * Batch 2B - Machinery & Construction
 * MC 1.20.1 / Forge / PonderJS 2.1.0
 */

Ponder.registry(event => {

  function intro(scene, text) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(70, text);
    scene.idle(80);
  }

  function block(scene, id, pos) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(5);
  }

  function explain(scene, text, pos) {
    scene.idle(15);
    if (pos) scene.text(75, text, pos);
    else scene.text(75, text);
    scene.idle(85);
  }

  // ==========================================
  // 01 - TINKERS' SMELTERY
  // ==========================================
  event.create('tconstruct:smeltery_controller')
    .scene(
      'outlandish:smeltery_construction',
      'Tinkers: Constructing a Smeltery',
      (scene, util) => {

        intro(scene,
          'Your Seared Melter was only the beginning. Build a larger smeltery to melt and cast materials.'
        );

        // Solid 3x3 floor
        for (let x = 1; x <= 3; x++) {
          for (let z = 1; z <= 3; z++) {
            block(scene, 'tconstruct:seared_bricks', [x,1,z]);
          }
        }

        explain(scene,
          'Step 1: Build a solid floor from valid Seared blocks.'
        );

        // One hollow wall layer
        for (let x = 1; x <= 3; x++) {
          for (let z = 1; z <= 3; z++) {
            if (x === 1 || x === 3 || z === 1 || z === 3) {
              block(scene, 'tconstruct:seared_bricks', [x,2,z]);
            }
          }
        }

        explain(scene,
          'Step 2: Build walls around the perimeter. Leave the center hollow.'
        );

        block(scene, 'tconstruct:smeltery_controller', [1,2,2]);
        explain(scene,
          'Step 3: Put the Smeltery Controller into an exterior wall.'
        );

        block(scene, 'tconstruct:seared_fuel_tank', [3,2,2]);
        explain(scene,
          'Step 4: Install a Seared Fuel Tank in the wall. Supply the appropriate fuel.'
        );

        block(scene, 'tconstruct:seared_drain', [2,2,1]);
        explain(scene,
          'Step 5: Replace another wall block with a Seared Drain.'
        );

        block(scene, 'tconstruct:seared_faucet', [2,2,0]);
        block(scene, 'tconstruct:seared_table', [2,1,0]);

        explain(scene,
          'Step 6: Attach a faucet to the drain and put a Casting Table underneath it.'
        );

        explain(scene,
          'This demonstration shows the basic shell. Check the controller for valid structure formation.'
        );

        explain(scene,
          'As you progress, expand the smeltery and add more casting stations.'
        );
      }
    );

  // ==========================================
  // 02 - CREATE MECHANICAL WORKSHOP
  // ==========================================
  event.create('create:mechanical_press')
    .scene(
      'outlandish:mechanical_workshop',
      'Create: Your First Mechanical Workshop',
      (scene, util) => {

        intro(scene,
          'Learn how rotational power moves from a generator into mechanical processing.'
        );

        block(scene, 'create:water_wheel', [1,1,2]);
        explain(scene,
          'Step 1: Begin with a Water Wheel. Add flowing water in the real build.'
        );

        block(scene, 'create:shaft', [2,1,2]);
        block(scene, 'create:shaft', [3,1,2]);

        explain(scene,
          'Step 2: Connect aligned shafts to distribute rotational power.'
        );

        block(scene, 'create:cogwheel', [3,1,3]);

        explain(scene,
          'Step 3: Cogwheels are useful when redirecting rotation into other components.'
        );

        block(scene, 'create:depot', [4,1,3]);
        block(scene, 'create:mechanical_press', [4,3,3]);

        explain(scene,
          'Step 4: A Mechanical Press operates over a Depot or compatible processing setup.'
        );

        explain(scene,
          'A press must also receive rotational power through a correctly aligned drive.'
        );

        explain(scene,
          'Use JEI to find your pack-specific pressing recipes, especially plates and early components.'
        );

        explain(scene,
          'You can extend this workshop with mixers, belts, crushers and automated item handling.'
        );
      }
    );

  // ==========================================
  // 03 - GTCEU: FIRST STEAM BOILER
  // ==========================================
  event.create('gtceu:lp_steam_solid_boiler')
    .scene(
      'outlandish:gtceu_steam_boiler',
      'GTCEu: Starting the Steam Age',
      (scene, util) => {

        intro(scene,
          'GTCEu introduces steam machinery before the electrical voltage ladder.'
        );

        block(scene, 'gtceu:lp_steam_solid_boiler', [2,1,2]);

        explain(scene,
          'Step 1: Position a Low Pressure Solid Fuel Boiler.'
        );

        block(scene, 'minecraft:water', [1,1,2]);

        explain(scene,
          'Step 2: The boiler needs a continuous water supply. This water block is only a visual reminder.'
        );

        block(scene, 'minecraft:coal_block', [3,1,2]);

        explain(scene,
          'Step 3: Solid-fuel boilers require suitable fuel. Supply it through the boiler interface.'
        );

        block(scene, 'minecraft:copper_block', [2,1,3]);

        explain(scene,
          'Step 4: Connect compatible fluid pipes to move generated steam toward machines.'
        );

        explain(scene,
          'The copper block marks where a pipe connection belongs; it is not itself a pipe.'
        );

        explain(scene,
          'Steam machines need sufficient steam supply to keep processing materials.'
        );

        explain(scene,
          'Once you can reliably generate steam, begin ore grinding, forging and material processing.'
        );
      }
    );

  // ==========================================
  // 04 - GTCEU: TRANSITION TO ELECTRICITY
  // ==========================================
  event.create('minecraft:redstone_block')
    .scene(
      'outlandish:gtceu_lv_power',
      'GTCEu: Entering the Electrical Age',
      (scene, util) => {

        intro(scene,
          'The next milestone is Low Voltage electricity. Steam and electric machinery use different power systems.'
        );

        block(scene, 'minecraft:iron_block', [1,1,2]);

        explain(scene,
          'Step 1: Build an appropriate LV power generator using the current pack recipes.'
        );

        block(scene, 'minecraft:copper_block', [2,1,2]);

        explain(scene,
          'Step 2: Route energy through GTCEu cables rated for the voltage and amperage.'
        );

        block(scene, 'minecraft:redstone_block', [3,1,2]);

        explain(scene,
          'Step 3: Connect a compatible LV machine to the power network.'
        );

        explain(scene,
          'The three blocks shown here are markers, not functional GTCEu machines or cables.'
        );

        explain(scene,
          'Always verify the output voltage of the generator and the input rating of the machine.'
        );

        explain(scene,
          'GTCEu voltage progression continues through MV, HV, EV and IV.'
        );

        explain(scene,
          'The industrial quest chapters guide which machine tiers become available next.'
        );
      }
    );
});
