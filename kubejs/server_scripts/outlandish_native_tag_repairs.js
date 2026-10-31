// Outlandish Revelations: native tag repairs.
ServerEvents.tags('item', function(event) {
  if (!Item.exists('apotheosis:common_material')) {
    event.remove('alexscaves:ferromagnetic_items', 'apotheosis:common_material');
  }
  if (!Item.exists('ruthless_beings:ghostly_love_after_death')) {
    event.remove('minecraft:music_discs', 'ruthless_beings:ghostly_love_after_death');
  }
});
