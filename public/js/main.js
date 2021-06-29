let compareForm = document.getElementById('#compareHotels')

document.querySelector('#compareButton').addEventListener('click', compareHotels)

async function compareHotels() {
    try {
        console.log('I will compare')
        let arrayOfCheckbox = document.querySelectorAll('input[type="checkbox"]:checked')
        console.log(arrayOfCheckbox)

        const response = await fetch('index/compare', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'checkedItemsFromJS':arrayOfCheckbox
            })
        })
    } catch (error) {
        
    }
}