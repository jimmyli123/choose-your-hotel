let compareForm = document.getElementById('#compareButton')

// document.querySelector('#compareButton').addEventListener('click', compareHotels)
let buttonItem = document.querySelector('#compareButton')

if (buttonItem) {
    buttonItem.addEventListener('click', compareHotels)
}
async function compareHotels() {
    try {
        console.log('I will compare')
        let arrayOfCheckbox = document.querySelectorAll('input[type="checkbox"]:checked')
        let test = Array.prototype.slice.call(arrayOfCheckbox)
        console.log(`Test: ${test}`)
        console.log(arrayOfCheckbox)
        console.log('We are comparing baby')

        const response = await fetch('index/compare', {
            method: 'get',
            headers: {'Content-type': 'application/json'},  // application/json
            body: JSON.stringify({
                'checkedItemsFromJS': arrayOfCheckbox[0]
            })
        })
        
    } catch (error) {
        
    }
}