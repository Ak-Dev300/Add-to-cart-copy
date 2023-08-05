import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const inputField = document.getElementById('input-field')
const inputPrice = document.getElementById('input-price-field')
const addButton = document.getElementById('add-button')
const shoppingList = document.getElementById('shopping-list')

const appSettings = {
    databaseURL: "https://shoplet-94363-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDatabase = ref(database, "Shop-items");


addButton.addEventListener('click', function(){
    let inputValue = {name: inputField.value, price: inputPrice.value}
    if(inputValue){
        push(itemsInDatabase, inputValue)
    }

})


onValue(itemsInDatabase, function(snapshot){
    

    if(snapshot.exists()){
        resetInputValue()
        let items = Object.entries(snapshot.val())
        
        for( let i = 0; i < items.length; i++){
            let currrentItem = items[i]

            console.log(currrentItem)
            
            listInnerHtml(currrentItem)
        }
    }else{
        shoppingList.innerHTML = `<p class="empty-list">Add Shopping items to list</p>`
    }
   
})

function resetInputValue(){
    inputField.value = ''
    inputPrice.value = ''
    shoppingList.innerHTML = ""
}

function listInnerHtml(iValue){
    let itemsID = iValue[0]
    let itemsValue = iValue[1].name

    let liEl = document.createElement("li");

    liEl.textContent = itemsValue;

    liEl.addEventListener("dblclick", function(){
        let itemLOcationInDatabase = ref(database, `Shop-items/${itemsID}`)
        remove(itemLOcationInDatabase)
    })

    shoppingList.append(liEl)
}

