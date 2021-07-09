let compareForm = document.getElementById('#compareButton')
let removeBtn = document.querySelectorAll('.remove')

Array.from(removeBtn).forEach( ele => {
    ele.addEventListener('click', removeHotelFromList)
})

// document.querySelector('#compareButton').addEventListener('click', compareHotels)
let buttonItem = document.querySelector('#compareButton')
if (buttonItem){
    buttonItem.addEventListener('click', compareHotels)
}


async function removeHotelFromList() {
    try {
        const hotelId = this.dataset.id
        console.log(hotelId)
        const response = await fetch('/remove', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'idToRemove': hotelId
        })
    })
    const data = await response.json()
    console.log(`We deleted ${data}.`)
    location.reload()
    } catch (error) {
        
    }
    
}

// if (buttonItem) {
//     buttonItem.addEventListener('click', compareHotels)
// }
// async function compareHotels() {
//     try {

//         const response = await fetch('index/compare', {
//             method: 'post',
//             headers: {'Content-type': 'application/json'},  // application/json
//             body: JSON.stringify({
//                 'checkedItemsFromJS': arr
//             })
//         })
//         const data = await response.json()
//         console.log('I am back')
        
        
        
//     } catch (error) {
        
//     }
// }