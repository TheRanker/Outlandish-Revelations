StartupEvents.registry('item', event => {
    let manuals = JsonIO.read('kubejs/custom_wiki_manuals.json')
    manuals.forEach(manual => {
        event.create(manual)
    })
})