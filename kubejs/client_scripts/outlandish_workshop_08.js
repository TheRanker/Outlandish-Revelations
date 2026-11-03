
/*
 * OUTLANDISH REVELATIONS
 * PONDER BATCH 08
 * Practical Workshop Tutorials
 *
 * Minecraft 1.20.1 / Forge
 * PonderJS 2.1.0
 */

Ponder.registry(event => {

  function start(scene, message) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(75, message);
    scene.idle(85);
  }

  function put(scene, id, pos, message) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(20);

    if (message) {
      scene.text(70, message, [
        pos[0] + 0.5,
        pos[1] + 0.9,
        pos[2] + 0.5
      ]);
      scene.idle(85);
    }
  }

  function say(scene, message) {
    scene.text(80, message);
    scene.idle(90);
  }

  // ==========================================
  // 01 - TINKERS CASTING
  // ==========================================

  event.create('tconstruct:seared_basin')
    .scene(
      'outlandish:tinkers_casting',
      'Tinkers: Casting Molten Materials',
      (scene, util) => {

        start(scene,
          'Casting turns molten metals into useful components for your workshop.'
        );

        put(scene, 'tconstruct:seared_bricks', [2,1,2],
          'Begin with a Seared Drain in a valid smeltery wall. This block marks its location.'
        );

        put(scene, 'tconstruct:seared_drain', [2,2,2],
          'The Seared Drain allows molten fluids to leave your smeltery.'
        );

        put(scene, 'tconstruct:seared_faucet', [2,2,3],
          'Attach a Seared Faucet to the outside of the drain, facing the casting station.'
        );

        put(scene, 'tconstruct:seared_table', [2,1,3],
          'Position a Casting Table immediately below the faucet.'
        );

        say(scene,
          'Casting Tables use the appropriate casts to produce components such as ingots and tool parts.'
        );

        say(scene,
          'The faucet must point outward from the drain and toward the casting surface.'
        );

        // Separate demonstration casting basin
        put(scene, 'tconstruct:seared_basin', [4,1,3],
          'A Casting Basin is used for larger casting recipes, including compatible metal blocks.'
        );

        say(scene,
          'Move the basin beneath a suitable faucet when you want to use it.'
        );

        say(scene,
          'Right-click the faucet to pour molten material into a valid casting target.'
        );

        say(scene,
          'Allow the material to finish cooling before collecting the result.'
        );

        say(scene,
          'Check JEI for casts, fluid amounts and our modified Tinkers progression recipes.'
        );
      }
    );

  // ==========================================
  // 02 - CREATE MECHANICAL MIXING
  // ==========================================

  event.create('create:mechanical_mixer')
    .scene(
      'outlandish:create_mixing',
      'Create: Mechanical Mixing',
      (scene, util) => {

        start(scene,
          'Mechanical Mixing combines ingredients and unlocks important processing recipes.'
        );

        put(scene, 'create:basin', [2,1,2],
          'Step 1: Place a Basin to hold the mixing ingredients.'
        );

        put(scene, 'create:mechanical_mixer', [2,3,2],
          'Step 2: Install a Mechanical Mixer two blocks above the Basin.'
        );

        say(scene,
          'The mixer head hangs into the space above the Basin during operation.'
        );

        put(scene, 'create:cogwheel', [3,3,2],
          'Step 3: Supply rotational power through the correctly aligned drivetrain.'
        );

        say(scene,
          'This cogwheel is a placement illustration. Confirm the mixer is actually receiving rotation.'
        );

        say(scene,
          'Mixers need enough rotational speed to operate. Gear ratios can increase rotational speed.'
        );

        say(scene,
          'Add the recipe ingredients to the Basin through manual insertion or suitable automation.'
        );

        say(scene,
          'Some recipes require heating. Place a valid heat source below the Basin when JEI specifies one.'
        );

        say(scene,
          'A Blaze Burner is useful for recipes requiring heated or superheated mixing conditions.'
        );

        say(scene,
          'Use JEI to inspect our pack-specific mixing recipes and the required processing conditions.'
        );

        say(scene,
          'Mechanical Mixing is part of the preparation for more advanced industrial components.'
        );
      }
    );

  // ==========================================
  // 03 - BOTANIA RUNIC ALTAR
  // ==========================================

  event.create('botania:runic_altar')
    .scene(
      'outlandish:botania_rune_crafting',
      'Botania: Crafting with the Runic Altar',
      (scene, util) => {

        start(scene,
          'Runic crafting transforms ingredients and mana into magical runes.'
        );

        put(scene, 'botania:mana_pool', [2,1,0],
          'Step 1: Prepare a Mana Pool containing enough mana for the recipe.'
        );

        put(scene, 'botania:mana_spreader', [2,1,1],
          'Step 2: Position a Mana Spreader to transfer mana toward the altar.'
        );

        put(scene, 'botania:runic_altar', [2,1,3],
          'Step 3: Place a Runic Altar where mana bursts can reach it.'
        );

        say(scene,
          'Aim the Mana Spreader at the Runic Altar using the Wand of the Forest.'
        );

        say(scene,
          'Insert or drop the required recipe ingredients onto the altar.'
        );

        say(scene,
          'The Runic Altar consumes mana while processing a valid recipe.'
        );

        say(scene,
          'Watch the altar for the completion effects indicating sufficient mana has been supplied.'
        );

        say(scene,
          'Place or throw Livingrock onto the completed altar, then use the Wand of the Forest.'
        );

        say(scene,
          'The result is your crafted rune. Different runes require different materials.'
        );

        say(scene,
          'Check JEI and the Botania quest chapter for recipes and progression.'
        );
      }
    );

  // ==========================================
  // 04 - AE2 ENERGY AND STORAGE
  // ==========================================

  event.create('ae2:energy_cell')
    .scene(
      'outlandish:ae2_power_storage',
      'AE2: Keeping Your ME Network Running',
      (scene, util) => {

        start(scene,
          'A stable ME Network needs electrical power, storage cells and enough internal energy capacity.'
        );

        put(scene, 'ae2:energy_acceptor', [1,1,2],
          'Step 1: Place an Energy Acceptor and connect an appropriate external power source.'
        );

        put(scene, 'ae2:energy_cell', [2,1,2],
          'Step 2: Add an AE2 Energy Cell to buffer the network against power demand spikes.'
        );

        put(scene, 'ae2:drive', [3,1,2],
          'Step 3: Attach an ME Drive to the network.'
        );

        say(scene,
          'Place suitable ME Storage Cells inside the Drive to provide actual item storage.'
        );

        put(scene, 'ae2:fluix_glass_cable', [3,2,2],
          'Step 4: Run an ME Cable from the Drive toward your terminal.'
        );

        say(scene,
          'Attach an ME Terminal or Crafting Terminal to the cable, facing outward.'
        );

        say(scene,
          'AE2 terminals are cable-mounted parts, so they are not shown here as ordinary full blocks.'
        );

        say(scene,
          'The Energy Cell stores network energy. It does not store items.'
        );

        say(scene,
          'The ME Storage Cells inside the Drive determine the amount and types of items you can store.'
        );

        say(scene,
          'A small network can run without an ME Controller, but its available channels are limited.'
        );

        say(scene,
          'For larger GTCEu factories, expand the network carefully and monitor power, storage and channels.'
        );

        say(scene,
          'An ME Network is a valuable foundation for future automated industrial processing.'
        );
      }
    );

});
