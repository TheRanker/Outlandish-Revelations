
/*
 * OUTLANDISH REVELATIONS
 * PONDER BATCH 07
 * Custom progression and integration tutorials
 *
 * Forge 1.20.1 / PonderJS 2.1.0
 *
 * Scenes explain pack progression.
 * They do not grant advancements or unlock dimensions.
 */

Ponder.registry(event => {

  function start(scene, message) {
    scene.showBasePlate();
    scene.idle(20);
    scene.text(75, message);
    scene.idle(85);
  }

  function place(scene, id, pos, message) {
    scene.world.setBlock(pos, id, false);
    scene.world.showSection(pos, 'UP');
    scene.idle(20);

    if (message) {
      scene.text(75, message, [
        pos[0] + 0.5,
        pos[1] + 0.9,
        pos[2] + 0.5
      ]);
      scene.idle(85);
    }
  }

  function tell(scene, message) {
    scene.text(85, message);
    scene.idle(95);
  }

  // ========================================
  // 01 - CREATE TO GTCEU
  // ========================================

  event.create('create:steam_engine')
    .scene(
      'outlandish:create_to_gtceu',
      'From Mechanical Power to Industry',
      (scene, util) => {

        start(scene,
          'Outlandish Revelations connects your Create workshop to the beginnings of GTCEu industry.'
        );

        place(scene, 'create:water_wheel', [1,1,2],
          'Create introduces rotational power and mechanical automation.'
        );

        place(scene, 'create:steam_engine', [2,1,2],
          'Create steam technology is an important progression milestone.'
        );

        place(scene, 'gtceu:lp_steam_solid_boiler', [3,1,2],
          'GTCEu uses its own steam boilers to power compatible steam machinery.'
        );

        tell(scene,
          'The machines shown are progression milestones, not a connected power network.'
        );

        tell(scene,
          'Create rotational stress and GTCEu steam are different power systems.'
        );

        tell(scene,
          'Use the Create workshop to prepare components required by the pack-specific progression.'
        );

        tell(scene,
          'A GTCEu boiler needs fuel and a water supply. Connect its steam output to suitable machines.'
        );

        tell(scene,
          'Check JEI for the exact components required to establish your first GTCEu processing line.'
        );

        tell(scene,
          'Progress through steam processing, then prepare the equipment needed for LV electrical power.'
        );
      }
    );

  // ========================================
  // 02 - BLOOD MAGIC + GTCEU
  // ========================================

  event.create('bloodmagic:altar')
    .scene(
      'outlandish:bloodmagic_gtceu',
      'Blood and Machinery: Connected Progression',
      (scene, util) => {

        start(scene,
          'Blood Magic in Outlandish Revelations is connected to Create and GTCEu technology.'
        );

        place(scene, 'bloodmagic:altar', [1,1,2],
          'The Blood Altar is the center of your ritual crafting.'
        );

        place(scene, 'create:steam_engine', [2,1,2],
          'Create steam is an early technological milestone for the magic progression.'
        );

        place(scene, 'gtceu:lv_macerator', [3,1,2],
          'GTCEu processing and electrical tiers support later Blood Magic advancements.'
        );

        tell(scene,
          'The blocks represent connected progression systems. They are not meant to touch in an actual build.'
        );

        tell(scene,
          'Some Blood Magic recipes require specially prepared industrial components.'
        );

        tell(scene,
          'These may include infused circuits, ritual control components and chemical catalysts.'
        );

        tell(scene,
          'Your altar still needs Life Essence for applicable recipes. Technology does not replace LP.'
        );

        tell(scene,
          'Check the Blood Magic quest chapter for your current unlock requirements.'
        );

        tell(scene,
          'As your GTCEu voltage progression advances, additional ritual materials and crafting stages become available.'
        );

        tell(scene,
          'Use JEI for exact recipes rather than assuming standard Blood Magic ingredients.'
        );
      }
    );

  // ========================================
  // 03 - AE2 + INDUSTRIAL AUTOMATION
  // ========================================

  event.create('ae2:drive')
    .scene(
      'outlandish:ae2_gtceu_automation',
      'Digital Storage Meets Industrial Processing',
      (scene, util) => {

        start(scene,
          'AE2 can help manage the large number of materials produced by your industrial factory.'
        );

        place(scene, 'minecraft:chest', [1,1,2],
          'Early factories often rely on manual inventory management.'
        );

        place(scene, 'ae2:drive', [2,1,2],
          'An ME Drive stores ME cells that hold items within your network.'
        );

        place(scene, 'ae2:energy_acceptor', [3,1,2],
          'Provide compatible electrical energy to power the network.'
        );

        tell(scene,
          'The blocks illustrate the move from ordinary storage to a powered ME system.'
        );

        tell(scene,
          'Attach compatible AE2 cables and terminals to access the network.'
        );

        tell(scene,
          'Once you establish stable power and storage, begin planning industrial automation.'
        );

        tell(scene,
          'A storage network does not automatically control GTCEu machines.'
        );

        tell(scene,
          'For automated crafting and processing, use the appropriate AE2 patterns and interfaces with compatible machine connections.'
        );

        tell(scene,
          'GTCEu machinery still requires correct electrical power, item routing and fluid handling.'
        );

        tell(scene,
          'Keep intermediate materials available so your processing network does not run out of essential components.'
        );
      }
    );

  // ========================================
  // 04 - WARDEN GATE
  // ========================================

  event.create('minecraft:echo_shard')
    .scene(
      'outlandish:nether_warden_gate',
      'Dimensional Progression: Unlocking the Nether',
      (scene, util) => {

        start(scene,
          'The Nether is not immediately accessible in Outlandish Revelations.'
        );

        place(scene, 'minecraft:sculk', [1,1,2],
          'Prepare for a dangerous encounter in the Deep Dark.'
        );

        place(scene, 'minecraft:sculk_shrieker', [2,1,2],
          'Your progression requires summoning and defeating the Warden.'
        );

        tell(scene,
          'The Warden is extremely dangerous. Prepare equipment and supplies before attempting the fight.'
        );

        tell(scene,
          'The pack uses a progression condition that requires the Warden to be summoned and killed by a qualifying team member.'
        );

        place(scene, 'minecraft:obsidian', [3,1,2],
          'Defeating the Warden satisfies the intended prerequisite for unlocking Nether access.'
        );

        tell(scene,
          'The blocks are progression symbols, not a Warden summoning structure or a functional portal.'
        );

        tell(scene,
          'The Nether unlock is designed to apply to your FTB team after the required kill is recorded.'
        );

        tell(scene,
          'Visit the Nether progression chapter to confirm your objective. With native relic testing enabled, a player-attributed Warden kill also yields the lost Ring of Ranker. Its flight remains sealed until the personal memorial awakening.'
        );

        tell(scene,
          'Incendium expands the Nether with additional biomes, structures and powerful enemies.'
        );
      }
    );


  // ========================================
  // 05 - WITHER, END AND FINAL BOSS
  // ========================================

  event.create('minecraft:wither_skeleton_skull')
    .scene(
      'outlandish:end_and_final_boss',
      'Dimensional Progression: The Final Challenges',
      (scene, util) => {

        start(scene,
          'After unlocking the Nether, your next dimensional challenge is the Wither.'
        );

        // Bottom center of the T
        place(scene, 'minecraft:soul_sand', [2,1,2],
          'Step 1: Place one Soul Sand block at the bottom center.'
        );

        // Horizontal crossbar
        scene.world.setBlock(
          [1,2,2], 'minecraft:soul_sand', false
        );
        scene.world.setBlock(
          [2,2,2], 'minecraft:soul_sand', false
        );
        scene.world.setBlock(
          [3,2,2], 'minecraft:soul_sand', false
        );

        scene.world.showSection(
          [1,2,2,3,2,2], 'UP'
        );
        scene.idle(25);

        tell(scene,
          'Step 2: Add three Soul Sand blocks horizontally across the top to form a T.'
        );

        // First Wither Skeleton skull
        place(
          scene,
          'minecraft:wither_skeleton_skull[rotation=0]',
          [1,3,2],
          'Step 3: Place a Wither Skeleton Skull above the left arm.'
        );

        // Second Wither Skeleton skull
        place(
          scene,
          'minecraft:wither_skeleton_skull[rotation=0]',
          [3,3,2],
          'Step 4: Place another skull above the right arm.'
        );

        tell(scene,
          'The third skull completes the structure and summons the Wither. Make sure you are prepared!'
        );

        // Final skull is added last
        scene.world.setBlock(
          [2,3,2],
          'minecraft:wither_skeleton_skull[rotation=0]',
          false
        );
        scene.world.showSection([2,3,2], 'UP');

        scene.idle(30);

        tell(scene,
          'This is the correct Wither summoning formation: four Soul Sand blocks and three Wither Skeleton Skulls.'
        );

        tell(scene,
          'In Outlandish Revelations, a qualifying FTB team member must summon and defeat the Wither to unlock End access.'
        );

        tell(scene,
          'Summon it in a safe, open area with enough room for the Wither to form and fight.'
        );

        tell(scene,
          'The Ender Dragon awaits after the Wither milestone. In the story, The Ranker captured its flight in his ring; your own dragon victory does not awaken that ring.'
        );

        tell(scene,
          'Entering the End unlocks your path to the Twilight Forest.'
        );

        tell(scene,
          'Draconic Evolution provides powerful late-game equipment for the challenges ahead.'
        );

        tell(scene,
          'Your ultimate challenge is the Hovering Inferno in the Incendium Nether.'
        );

        tell(scene,
          'Use a Nether Star at an Infernal Altar in the Infernal Dunes to summon the Hovering Inferno. There is no extra NPC story gate.'
        );
      }
    );

});
