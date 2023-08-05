const opens = document.querySelector(".open");
const listItems2 = document.querySelector(".list-items2");
const clearList = document.getElementById("clear-list");
const totals = document.querySelector(".total")

opens.addEventListener("click", function(){
    listItems2.classList.toggle("close")
})

clearList.addEventListener('click', function(){
    localStorage.clear()
    renderItemsOnLIst(listArray)
    totals.innerHTML = `<p>Wow</p>`
})
