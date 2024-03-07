ItemEvents.tooltip((event) => {
  event.addAdvancedToAll((item, isAdvanced, tooltip) => {
    if (item.hasTag("forge:armors") && item?.nbt?.armor_set !== undefined) {
      /** @type {{ armor_set: string }} */
      const { armor_set } = item.nbt;

      if (global.armorSets[armor_set] !== undefined) {
        tooltip.add(1, ["Active Armor Set: ", Text.green(global.armorSets[armor_set])]);
      } else {
        tooltip.add(1, ["Active Armor Set: ", Text.red("No Active")]);
      }
    }
  });
});