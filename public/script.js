let palletList =document.getElementById('pallet')
let palletBtn= document.getElementById('pallet-btn')

palletBtn.addEventListener('click', async () => {
    // palletList.style.display='block'
let id = window.location.pathname.split('/warehouses/')[1]
console.log(id)
    
    //fetch the pallet route from express
    let res = await fetch(`/pallet/${id}`)
   
    console.log(res)
    
    let warehouse = await res.json()  
    let pallets = warehouse.Pallets
    console.log(pallets)
    //for each pallet in the list, create a sublist
    palletList.innerText = ""
    for(p of pallets){
        //add a size 3 header for each menu
        let palletLable = document.createElement('h3')
        palletLable.innerText = `Count of Pallet:${p.count_of_pallet} Pallet Capacity:${p.capacity_of_pallet} Pallet Type: ${p.type_of_pallet}`
        palletList.append(palletLable)
        let pallet = document.createElement('ul')
        //for each menu item in that menu, create a list item
        // for(i of p.Boxes){
        //     let item = document.createElement('li')
        //     item.innerText = `Box Count:${i.box_count}: Staging Date:${i.staging_date}`
        //     pallet.append(item)
        // }
        // palletList.append(pallet)
    }

})
deleteBtn.addEventListener('click', async () => {
    //get id from the current url path
   const id = window.location.pathname.split('/warehouses/')[1]
    //fetch the menu route from express for this id
    let res = await fetch(`/warehouses/${id}`, {
        method: 'DELETE',
    })
    console.log(res)
    window.location.assign('/warehouses')
})
