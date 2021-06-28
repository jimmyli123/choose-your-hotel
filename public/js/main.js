
document.querySelector('#compareButton').addEventListener('click', compareHotels)

async function compareHotels() {

    // for (let i = 0; i < x.length; i++) {
    //     if (x[i].checked) { console.log(`I am checked: ${x[i].id}`)}
    // }
    try {
        console.log('I will compare')
        let arrayOfCheckbox = document.querySelectorAll('.checkbox')
        console.log(arrayOfCheck[0].id)
        console.log(`Array is: ${arrayOfCheckbox}`)
        let checkedItems = arrayOfCheckbox.filter(item => {item.checked})
        console.log(`Checked items is ${checkedItems}`)
        alert('hi')
        let x = document.querySelectorAll('.checkbox')
        const response = await fetch('index/compare', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'checkedItemsFromJS':checkedItems
            })
        })
    } catch (error) {
        
    }
}