
/*
 * OUTLANDISH REVELATIONS
 * Batch 2A - Construction Walkthroughs
 * Forge 1.20.1 / Create 6.0.8 / PonderJS 2.1.0
 *
 * Animated block placement and construction lessons.
 */

Ponder.registry(event => {

  // Common animation helpers.
  // Uses the same PonderJS API as our successful test.
  function start(scene, intro) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(75, intro);
    scene.idle(85);
  }

  function place(scene, block, pos, message) {
    scene.world.setBlock(pos, block, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(15);

    if (message) {
      scene.text(75, message, [
        pos[0] + 0.5,
        pos[1] + 0.8,
        pos[2] + 0.5
      ]);
      scene.idle(85);
    }
  }

  function note(scene, message) {
    scene.text(80, message);
    scene.idle(90);
  }

  // ============================================
  // 01 - TINKERS: FIRST MELTER
  // ============================================
  event.create('tconstruct:seared_melter')
    .scene(
      'outlandish:build_first_melter',
      'Tinkers Workshop: Building Your First Melter',
      (scene, util) => {

        start(scene,
          'Before a full smeltery, construct a compact melting and casting station.'
        );

        place(scene, 'tconstruct:seared_heater', [2,1,2],
          'Step 1: Place a Seared Heater as your foundation.'
        );

        place(scene, 'tconstruct:seared_melter', [2,2,2],
          'Step 2: Place the Seared Melter directly on top of the heater.'
        );

        place(scene, 'tconstruct:seared_table', [3,1,2],
          'Step 3: Position the Casting Table beside the heater, one block lower than the melter.'
        );

        place(scene, 'tconstruct:seared_faucet', [3,2,2],
          'Step 4: Attach a faucet to the melter, facing the Casting Table.'
        );

        note(scene,
          'The heater needs fuel. Insert materials into the melter and use the faucet to pour.'
        );

        note(scene,
          'Create materials are part of our workshop progression. Check JEI before crafting the components.'
        );

        note(scene,
          'Use the casting table for casts and tool parts. A Casting Basin is used for larger castings.'
        );
      }
    );

  // ============================================
  // 02 - CREATE: ROTATIONAL POWER
  // ============================================
  event.create('create:shaft')
    .scene(
      'outlandish:build_power_transmission',
      'Create: Connecting Your First Power Network',
      (scene, util) => {

        start(scene,
          'A Create machine needs a connected source of rotational power.'
        );

        place(scene, 'create:water_wheel', [1,1,2],
          'Step 1: Install a Water Wheel near a suitable flowing-water arrangement.'
        );

        place(scene, 'create:shaft', [2,1,2],
          'Step 2: Connect a Shaft to the axle of the wheel.'
        );

        place(scene, 'create:shaft', [3,1,2],
          'Step 3: Extend the shaft line toward the machinery you want to operate.'
        );

        note(scene,
          'Shafts transfer rotational power in a straight line. Their axis must align.'
        );

        note(scene,
          'Use cogwheels and gearboxes when the power network needs to turn a corner.'
        );

        note(scene,
          'Check both rotational speed and stress capacity. A connected machine can still be overstressed.'
        );

        note(scene,
          'This is your foundation for presses, mixers, crushing equipment and later automation.'
        );
      }
    );

  // ============================================
  // 03 - CREATE: BASIC STEAM BOILER
  // ============================================
  event.create('create:steam_engine')
    .scene(
      'outlandish:build_steam_boiler',
      'Create: Building a Steam Power System',
      (scene, util) => {

        start(scene,
          'Steam engines need a boiler, heat, a steady supply of water and a rotational output.'
        );

        // Four fluid tanks, shown as a 2 x 2 column.
        place(scene, 'create:fluid_tank', [2,2,2],
          'Step 1: Place the first Fluid Tank.'
        );

        place(scene, 'create:fluid_tank', [3,2,2],
          'Step 2: Add another tank alongside it.'
        );

        place(scene, 'create:fluid_tank', [2,3,2],
          'Step 3: Extend the boiler upward.'
        );

        place(scene, 'create:fluid_tank', [3,3,2],
          'Step 4: Complete this four-tank example.'
        );

        note(scene,
          'The boiler requires heat beneath its tank columns. Stronger heat permits greater output.'
        );

        place(scene, 'create:blaze_burner', [2,1,2],
          'Step 5: Position a Blaze Burner beneath a boiler column.'
        );

        place(scene, 'create:blaze_burner', [3,1,2],
          'Step 6: Add heating beneath the other column.'
        );

        note(scene,
          'Supply the boiler with water using pipes and a Mechanical Pump.'
        );

        place(scene, 'create:steam_engine', [2,2,3],
          'Step 7: Attach a Steam Engine to the boiler.'
        );

        note(scene,
          'Click the engine with a Shaft to create its rotational output.'
        );

        note(scene,
          'Engineer Goggles reveal whether boiler size, heat or water supply limits the system.'
        );

        note(scene,
          'Once steam power is established, continue toward the next GTCEu progression milestones.'
        );
      }
    );
});
