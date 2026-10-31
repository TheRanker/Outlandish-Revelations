// Outlandish Revelations: tab.
StartupEvents.registry('creative_mode_tab', event => {
  event.create('otg:otg').displayName('Outlandishly Gregtech')
    .icon(() => Item.of('gtceu:advanced_circuit_board'))
    .content(showRestrictedItems => {
      const stacks = [];
      Ingredient.of(/^gtceu:(?:hot_)?(?:signalum|enderium|manasteel|terrasteel|elementium|skystone|fluix|pinkslime|copper_alloy|energetic_alloy|vibrant_alloy|redstone_alloy|conductive_alloy|pulsating_alloy|dark_steel|soularium|end_steel|stellar_alloy)(?:_|$)/).stacks.forEach(stack => stacks.push(stack));
      return stacks;
    });
});
