ServerEvents.recipes(event => {

event.shaped('jackseconomy:intermediate_wallet', [
    'ABA', 
    'BCB', 
    'ABA'  
  ], {
    A: 'jackseconomy:ten_dollar_bill', 
    B: 'minecraft:leather', 
    C: 'jackseconomy:basic_wallet'   
  })
})