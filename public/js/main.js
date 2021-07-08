let compareForm = document.getElementById('#compareButton')


// document.querySelector('#compareButton').addEventListener('click', compareHotels)
let buttonItem = document.querySelector('#compareButton').addEventListener('click', compareHotels)


// if (buttonItem) {
//     buttonItem.addEventListener('click', compareHotels)
// }
async function compareHotels() {
    try {
        // let compareItems = document.querySelectorAll('.checkbox')
        
        console.log('I will compare')
        let checkedNodeList = document.querySelectorAll('input[type="checkbox"]:checked')
        let arr = []
        for (let i =0; i < checkedNodeList.length; i++) {
            console.log(checkedNodeList[i].id)
            arr.push(checkedNodeList[i].id)
        }
        console.log(arr)
        console.log('We are comparing baby')

        const response = await fetch('index/compare', {
            method: 'post',
            headers: {'Content-type': 'application/json'},  // application/json
            body: JSON.stringify({
                'checkedItemsFromJS': arr
            })
        })
        const data = await response.json()
        console.log('I am back')
        
        
        
    } catch (error) {
        
    }
}