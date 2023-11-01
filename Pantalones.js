const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "Pantalón Formal | Liso | Slim Fit",
        "image":"p1.webp",
        "price": 450
    },
    {
        "id": 2,
        "name": "Pantalón Casual |Liso | Slim Fit",
        "image":"p2.webp",
        "price": 600
    },
    {
        "id": 3,
        "name": "Pantalon formal a cuadros para hombre | Gris | Slim fit",
        "image":"p3.webp",
        "price": 800
    },
    {
        "id": 4,
        "name": "Pantalón formal para hombre | Oxford | Slim Fit",
        "image":"p4.webp",
        "price": 800
    },
    {
        "id": 5,
        "name": "Pantalon De Vestir Formal | Liso |Slim-Fit",
        "image":"p5.webp",
        "price": 600
    },
    {
        "id": 6,
        "name": "Pantalón para hombre | Negro | Slim Fit",
        "image":"p6.webp",
        "price": 800
    }
]


let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "imgTienda/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()} MXN</div>
            <button onclick = "addToCard(${key})">Agregar al Carrito</button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()


const addToCard = key => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice= 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity;

        if(value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "imgTienda/${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}