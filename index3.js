const inputField = document.getElementById('input-field')
const inputPrice = document.getElementById('input-price-field')
const addButton = document.getElementById('add-button')
const shoppingList = document.getElementById('shopping-list')
// const opens = document.querySelector(".open");
const listItems = document.querySelector("#list-items");
// const listItems2 = document.querySelector(".list-items2");
const totals = document.querySelector(".total")



let listArray = []

const storedTest = JSON.parse(localStorage.getItem("test"))


if(storedTest){
    listArray = storedTest

    renderItemsOnLIst(listArray)
}



addButton.addEventListener('click', function(){
   
    if(inputField.value && inputPrice.value){
        listArray.push({name: inputField.value, price: inputPrice.value})
        console.log(listArray)
        localStorage.setItem("test", JSON.stringify(listArray))
    }
    
    renderItemsOnLIst(listArray)
    
})

// opens.addEventListener("click", function(){
//     console.log('work')
//     listItems2.classList.toggle("close")
//     opens.classList.toggle(changeCloseToOpen())
// })

function toNumber(value){
    return Number(value)
}

function renderItemsOnLIst(array){

    listItems.textContent = ""
    
    

    if(storedTest){

        let pricearr = []

        for(let i = 0; i < array.length; i++ ){

            let liEl = document.createElement("li")
            liEl.textContent = `${array[i].name}  -  ${array[i].price}`
            listItems.append(liEl)

            pricearr.push(listArray[i].price)

            let pricearr2 = pricearr.map(toNumber)

            let sum = pricearr2.reduce((a, b) => a + b, 0);
            totals.innerHTML = `Total:  $${sum}`
        }
        
        
    }

  

}







