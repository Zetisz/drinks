let drinksList = [
  {name: "Coca-Cola", price: 500},
  {name: "Coca-Cola Zero", price: 550},
  {name: "Fanta", price: 500},
  {name: "Sprite", price: 500},
  {name: "Jeges tea", price: 600},
];

// Init
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

// Add Drink Form
const form = document.getElementById("form");

form.addEventListener('submit', function(event){
    event.preventDefault()

    const result = validate(true);

    if (result){
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
    }
})

const fields = ['dname', 'price'];

fields.forEach(id => {
    const element = document.getElementById(id);
    element.dataset.touched = 'false';

    element.addEventListener('input', () => {
        element.dataset.touched = 'true';
        validate();
    });

    element.addEventListener('change', () => {
        element.dataset.touched = 'true';
        validate();
    });
});

// set msg & border for validation
function setMsg(id, text, ok = false) {
    const span = document.getElementById(id + 'Msg');
    const input = document.getElementById(id);

    span.textContent = text;
    span.classList.remove('error', 'success');
    span.classList.add(ok ? 'success' : 'error');

    input.classList.remove('error-border', 'success-border');
    input.classList.add(ok ? 'success-border' : 'error-border');
}

// Removes previous validation after submit
function Reset() {
    fields.forEach(id => {
        const span = document.getElementById(id + 'Msg');
        const input = document.getElementById(id);
        span.textContent = '';
        span.classList.remove('error', 'success');
        input.classList.remove('error-border', 'success-border');
    })
}

function validate(submit = false) {
    let valid = true;

    const data = new FormData(form);
    const dname = data.get('dname')?.trim();
    const price = Number(data.get('price'));

    // Name
    if (submit || document.getElementById('dname').dataset.touched === 'true') {
        let msg;
        if (dname.length === 0) {
            msg = "can't be empty";
            valid = false;
        } 
        else if (dname.length > 20) {
            msg = 'name too long';
            valid = false;
        }
        else {
            msg = 'OK';
        }

        setMsg('dname', msg, valid);
    }

    // Price
    if (submit || document.getElementById('price').dataset.touched === 'true') {
        let msg;
        if (price < 1) {
            msg = 'has to be positive';
            valid = false;
        } 
        else if (price % 10 !== 0) {
            msg = 'has to be divisible by 10';
            valid = false;
        } 
        else if (price > 5000) {
            msg = 'has to be under 5000';
            valid = false;
        }
        else {
            msg = 'OK';
        }

        setMsg('price', msg, valid)
    }

    if (submit) {
        Reset();
    }

    return valid;
}