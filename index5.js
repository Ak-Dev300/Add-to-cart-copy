const inputField = document.getElementById('input-field');
const inputPrice = document.getElementById('input-price-field');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');
const listItems = document.querySelector("#list-items");
const totals = document.querySelector(".total");

let listArray = JSON.parse(localStorage.getItem("test")) || [];

if (listArray.length > 0) {
  renderItemsOnList(listArray);
}

addButton.addEventListener('click', function() {
  if (inputField.value && inputPrice.value) {
    listArray.push({ name: inputField.value, price: inputPrice.value });
    localStorage.setItem("test", JSON.stringify(listArray));
    renderItemsOnList(listArray);
  }
});

function toNumber(value) {
  return Number(value);
}

function renderItemsOnList(array) {
//   listItems.textContent = "";
    shoppingList.textContent = ""
  let priceArr = [];

  array.forEach((item) => {
    let liEl = document.createElement("li");
    liEl.textContent = `${item.name} - ${item.price}`;
    // listItems.append(liEl);
    shoppingList.append(liEl)
    priceArr.push(toNumber(item.price));
  });

  let sum = priceArr.reduce((a, b) => a + b, 0);
  totals.innerHTML = `Total: $${sum}`;
}