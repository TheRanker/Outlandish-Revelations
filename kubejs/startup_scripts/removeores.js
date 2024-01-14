WorldgenEvents.remove(event => {
    event.removeOres(props => {
      props.blocks = ['k_turrets:titanium_ore', 'create:zinc_ore', 'create:deepslate_zinc_ore']
    })
})