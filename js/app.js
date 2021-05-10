const options = {"numToppings" : 0};

document.addEventListener('DOMContentLoaded', () => {
    const allToppings = ["mozzarella", "mixed herbs", "pepperoni",
        "basil", "garlic", "bacon", "parmesan", "red onion", "white onion",
        "salsiccia", "pineapple", "tomato chunks", "mushroom", "roast chicken",
        "crushed chillies", "jalape\xf1os", "ham", "french fries", 
        "green pepper", "red pepper", "olives", "chorizo", 
        "sun-dried tomato", "feta", "anchovies", "artichoke", "sweetcorn", 
        "capers", "rocket", "spinach", "broccoli", "meatballs"].sort();
    
    const dropdownList = document.querySelector(".toppings");
    populateToppingsList(allToppings, dropdownList); 

    const pizzaForm = document.querySelector(".new-pizza-form");
    pizzaForm.addEventListener('submit', handleNewEntry);
});

/* 
    Helper functions
*/

const populateToppingsList = function(toppings, container) {
    toppings.forEach(topping => {
        // create a link element, set attributes then append to container
        const item = document.createElement('a');
        item.innerHTML = topping;
        item.setAttribute('id', 'a-topping');
        item.setAttribute('data-selected', "false");
        item.setAttribute('style','color: white; padding: 12px 16px; text-decoration: none; width: 124px; display: block; background-color: rgb(193, 193, 193)');
        
        // add 3 event listeners for each element:
        item.addEventListener('mouseenter', handleHover);
        item.addEventListener('mouseleave', handleLeave)
        item.addEventListener('click', handleClick);

        container.appendChild(item);
    });
};

// highlight selected items (user can choose 5 max)
const handleClick = function(event) {
    const item = event.target;
    if (item.dataset.selected === "false") {
        if (options.numToppings < 5) {
            item.dataset.selected = "true";
            options.numToppings += 1;
        }  
    } else {
        item.dataset.selected = "false";
        options.numToppings -= 1;
        console.log(options.numToppings);
    };
    // dispatch a new mouseenter event to update background colour correctly
    let hover = new Event('mouseenter');
    item.dispatchEvent(hover);
    
};

const handleLeave = function(event) {
    event.target.style.backgroundColor = event.target.dataset.selected === "false" ? 'rgb(193, 193, 193)' : 'rgb(210, 0, 0)';
};

const handleHover = function(event) {
    event.target.style.backgroundColor = event.target.dataset.selected === "false" ? 'rgb(177, 177, 177)' : 'rgb(120, 0, 0)';
};

// capture form submit event, create item and reset form
const handleNewEntry = function(event) {
    event.preventDefault();
    const newPizza = createNewPizza(event);
    const displayArea = document.querySelector('#pizzas');
    displayArea.appendChild(newPizza);

    // reset form and options object
    options.numToppings = 0;
    document.querySelector('.new-pizza-form').reset();
};

// create a new pizza item from entry form HERE
const createNewPizza = function(event) {
    const pizza = document.createElement('div');
    pizza.setAttribute('class', 'pizza-item');

    // create elements and assign form data
    const name = document.createElement('h1');
    name.textContent = event.target.name.value;
    const author = document.createElement('h3');

    // insert placeholder if created_by is blank
    const creator = event.target.created_by.value === "" ? "anon" : event.target.created_by.value;
    author.textContent = `created by ${creator}`;

    const base = document.createElement('p');
    base.setAttribute("style", "padding-left: 10px; margin-bottom: 0px; margin-top: 0px; text-align: left");
    base.textContent = `base: ${event.target.base.value}`;

    const sauce = document.createElement('p');
    sauce.setAttribute("style", "padding-left: 10px; margin-bottom: 0px; margin-top: 0px; text-align: left")
    sauce.textContent = `sauce: ${event.target.sauce.value}`;

    const toppingsTitle = document.createElement('h4');
    toppingsTitle.setAttribute("style", "margin-bottom: 5px; margin-top: 8px;")
    toppingsTitle.textContent = "Toppings"


    const innerDiv = document.createElement('div');
    innerDiv.setAttribute("style", "width: 85%; height: 100px; margin: 5%; overflow-x: auto;")
    const toppingsList = document.createElement('ul');
    toppingsList.setAttribute("style", "margin-top: 5px;");

    // retrieve toppings div and populate list
    const toppings = document.querySelectorAll(".toppings > a");

    toppings.forEach((topping) => {
        if (topping.dataset.selected === "true") {
            topping.dataset.selected = "false";
            topping.style.backgroundColor = 'rgb(193, 193, 193)';
            const newTopping = document.createElement('li');
            newTopping.textContent = topping.innerHTML;
            toppingsList.appendChild(newTopping);
        };
    });
    innerDiv.appendChild(toppingsList);

    pizza.append(name);
    pizza.append(author);
    pizza.append(base);
    pizza.append(sauce);
    pizza.append(toppingsTitle);
    pizza.append(innerDiv);
    return pizza;
};

