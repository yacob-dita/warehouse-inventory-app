


async function deleteBox(id){
  
    let res = await fetch(`/box/${id}` ,{
        method: 'DELETE'
    })
    console.log(res)
 
    
}
async function deletePallet(id){
  
    let res = await fetch(`/pallet/${id}` ,{
        method: 'DELETE'
    })
    console.log(res)
 
  
}

async function deleteWarehouse(id){
  
    let res = await fetch(`/warehouses/${id}` ,{
        method: 'DELETE'
    })
    console.log(res)
 
    
}