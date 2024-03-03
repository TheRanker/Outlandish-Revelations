global.armorSets = {
  netherite: "Netherite Armor Set",
  iron: "Iron Armor Set",
  golden: "Golden Armor Set",
  diamond: "Diamond Armor Set",
  leather: "Leather Armor Set",
};

PlayerEvents.inventoryChanged((event) => {
  const { item, player, server, slot } = event;

  if (item.hasTag("forge:armors") && !item?.nbt?.armor_set) {
    item.setNbt({ armor_set: "" });
  }

  for (let key of Object.keys(global.armorSets)) {
    let setName = player.armorSlots.every((armor) => Utils.id(armor.id).path.startsWith(key))
      ? key
      : "";

    player.armorSlots.forEach((eachArmor) => {
      if (!eachArmor.empty) eachArmor.setNbt({ armor_set: setName });
    });
    player.inventory.getStackInSlot(slot).setNbt({ armor_set: setName });
    player.persistentData.putString("armor_set", setName);
  }
});