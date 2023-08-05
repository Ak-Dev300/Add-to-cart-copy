import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shoplet-94363-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDatabase = ref(database, "Shop-items")

const opens = document.querySelector(".open");
const listItems = document.querySelector("#list-items");
const totalPrice = document.querySelector(".total");
const openCalc = document.querySelector(".open-calc")

opens.addEventListener("click", function(){
    openCalc.classList.toggle("opens")
})

onValue(itemsInDatabase, function(snapshot){
    

    if(snapshot.exists()){
        let items = Object.entries(snapshot.val())

        listItems.innerHTML = ""

        let priceArray = []
        
        for( let i = 0; i < items.length; i++){
            let currrentItem = items[i]

            priceArray.push(currrentItem[1].price)

            let priceArray2 = priceArray.map(toNumber)

            let sum = priceArray2.reduce((a, b) => a + b, 0);
            totalPrice.innerHTML = `Total:  $${sum}`
                    
            listInnerHtml(currrentItem)
        }
    }
   
})

function listInnerHtml(iValue){
    let itemsID = iValue[0]
    let itemsValue = iValue[1].price
    let itemsValue2 = iValue[1].name

    let liEl = document.createElement("li");

    liEl.textContent = `${itemsValue2} - $${itemsValue}`;

    liEl.addEventListener("dblclick", function(){
        let itemLOcationInDatabase = ref(database, `Shop-items/${itemsID}`)
        remove(itemLOcationInDatabase)
    })


    listItems.append(liEl)
}

function toNumber(value){
    return Number(value)
}

