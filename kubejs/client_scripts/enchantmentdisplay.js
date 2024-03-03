const ForgeRegistries = Java.loadClass("net.minecraftforge.registries.ForgeRegistries");
const EnchHooks = Java.loadClass("shadows.apotheosis.ench.asm.EnchHooks");

ClientEvents.highPriorityAssets(event => {
  const enchantedBooks = [];
  let totalRemoved = 0;

  ForgeRegistries.ENCHANTMENT.getEntries().forEach(entry => {
    const id = entry.key.location();
    const maxLevel = EnchHooks.getMaxLevel(entry.value);

    for (let level = 0; level < maxLevel; level++) {
      enchantedBooks.push({
        type: "item",
        id: "minecraft:enchanted_book",
        nbt: `{StoredEnchantments:[{id:"${id}",lvl:${level}s}]}`
      });

      totalRemoved++;
    }
  });

  event.add("emi:index/stacks/enchanted_books", {removed: enchantedBooks});
  console.log(`Removed ${totalRemoved} enchanted book stacks`);
});