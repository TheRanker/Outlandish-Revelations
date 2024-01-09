WorldgenEvents.remove(event => {
    event.removeOres(props => {

        props.worldgenLayer = 'underground_ores'

        props.blocks = [
            
            'create:zinc_ore',
           
        ]

    });
})