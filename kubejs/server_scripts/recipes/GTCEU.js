ServerEvents.recipes(event => {
    function basic_alt(id, su, rpm, eu){
        event.recipes.gtceu.basic_alternator(id)
            .inputStress(su)
            .rpm(rpm)
            .duration(2)
            .EUt(eu)
    }
    basic_alt('lv_1_amp', 256, 32, -32)
})