let drinksList = [
  {name: "Coca-Cola", price: 500},
  {name: "Coca-Cola Zero", price: 550},
  {name: "Fanta", price: 500},
  {name: "Sprite", price: 500},
  {name: "Jeges tea", price: 600},
];

const table = document.getElementById("table")
for (const drink of drinksList){
  const tr = document.createElement("tr");
  const dname = document.createElement("td");
  const price = document.createElement("td");

  dname.innerText = drink.name;
  price.innerText = drink.price;

  tr.appendChild(dname);
  tr.appendChild(price);
  table.appendChild(tr)
}

document.getElementById("form").addEventListener('submit', function(event){
    event.preventDefault()

    const tr = document.createElement("tr");
    const dname = document.createElement("td");
    const price = document.createElement("td");

    dname.innerText = document.getElementById("dname").value;
    price.innerText = document.getElementById("price").value;
    document.getElementById("dname").value = "";
    document.getElementById("price").value = "";
    
    tr.appendChild(dname);
    tr.appendChild(price);
    table.appendChild(tr)
})