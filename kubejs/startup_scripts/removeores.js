WorldgenEvents.remove(event => {
    event.removeOres(props => {
      props.blocks = ['create:zinc_ore', 'create:deepslate_zinc_ore', 'k_turrets:titanium_ore', 'k_turrets:deepslate_titanium_ore']
    })
})