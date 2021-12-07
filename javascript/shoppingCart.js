let products = [
  {
    img: "./img/gallery/coffee-chair.jpg",
    inCart: 0,
    itemName: "Slytherine",
    price: 500.0,
  },
  {
    img: "./img/gallery/coffee-table.jpg",
    inCart: 0,
    itemName: "Leviosa",
    price: 120.0,
  },
  {
    img: "./img/gallery/flower-pot.jpg",
    inCart: 0,
    itemName: "Potty",
    price: 40.0,
  },
  { img: "./img/gallery/mug.jpg", inCart: 0, itemName: "Muggo", price: 7.0 },
  {
    img: "./img/gallery/night-light.jpg",
    inCart: 0,
    itemName: "Grifo",
    price: 50.0,
  },
  {
    img: "./img/gallery/sofa.jpg",
    inCart: 0,
    itemName: "Lolito",
    price: 700.0,
  },
  {
    img: "./img/gallery/bed-set.jpg",
    inCart: 0,
    itemName: "Haugsvar",
    price: 100.0,
  },
  {
    img: "./img/gallery/ceiling-fan.jpg",
    inCart: 0,
    itemName: "Respira",
    price: 100.0,
  },
];

let carts = document.querySelectorAll(".cart-button");
const removeButton = document.querySelector(".clear-cart");
const productContainer = document.querySelector(".products-container");
const cartCounter = document.querySelector(".cart-counter");
const cartIcon = document.querySelector(".cart-icon");
const cartContents = document.querySelector(".cart-contents");

removeButton.addEventListener("click", () => removeAll());

cartIcon.addEventListener("click", () => {
  if (cartContents.style.visibility == "hidden") {
    displayCart();
    return cartContents.style.visibility = "visible";
  } else {
    return cartContents.style.visibility = "hidden";
  }
});

cartCounter.addEventListener("change", (e)=> {
  if(e.innerHTML = "") {
    e.style.display = "none"
  }
})

export function removeAll(e) {
  cartCounter.textContent = "";
  cartCounter.style.visibility = "hidden"
  productContainer.innerHTML = "";
  localStorage.clear();
  if (cartContents.style.visibility == "visible") {
    cartContents.style.visibility = "hidden";
    window.location.reload();
  }
}

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartCount(products[i]);
    totalCost(products[i]);
  });
}

export function onLoadcartCount() {
  let itemsCountInCart = localStorage.getItem("cartCount");

  if (itemsCountInCart) {
    document.querySelector(".cart-counter").textContent = itemsCountInCart;
  }
}

export function cartCount(product, action) {
  let itemsCountInCart = localStorage.getItem("cartCount");
  itemsCountInCart = parseInt(itemsCountInCart);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (action == "decrease") {
    localStorage.setItem("cartCount", itemsCountInCart - 1);
    document.querySelector(".cart-counter").textContent = itemsCountInCart - 1;
  } else if (itemsCountInCart) {
    localStorage.setItem("cartCount", itemsCountInCart + 1);
    document.querySelector(".cart-counter").textContent = itemsCountInCart + 1;
  } else {
    cartCounter.style.visibility = "visible"
    localStorage.setItem("cartCount", 1);
    document.querySelector(".cart-counter").textContent = 1;
  }
  addItemsToCart(product);
}
export function addItemsToCart(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.itemName] == undefined) {
      cartItems = {
        ...cartItems,
        [product.itemName]: product,
      };
    }
    cartItems[product.itemName].inCart += 1;
    
  } else {
    product.inCart = 1;
    cartItems = {
      [product.itemName]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

export function totalCost(product, action) {
  let cartCost = localStorage.getItem("totalCost");

  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - product.price);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

export function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products-container");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <img src=${item.img}>
        <span>${item.itemName}</span>
        <div class="price">$${item.price}</div>
        <button class="decrement">-</button>
        <div class="quantity">${item.inCart}</div>
        <button class="increment">+</button>
        <div class="total">$${item.inCart * item.price}</div>
        <button class="delete-button">X</button>
      </div>
    `;
    });
    productContainer.innerHTML += `
    <div class="cartTotalConainer">
      <strong class="">$${cartCost}</strong>
    </div> `;
  }
  deleteButtons();
  qtyModify();
}

export function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete-button");
  let productName;
  let itemsCountInCart = localStorage.getItem("cartCount");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      productName = deleteButtons[i].parentElement.children[1].textContent
      localStorage.setItem( "cartCount", itemsCountInCart - cartItems[productName].inCart);
      localStorage.setItem("totalCost",cartCost - cartItems[productName].price * cartItems[productName].inCart);
      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      if(!deleteButtons[i-1] && !deleteButtons[i+1]){
        removeAll()
      }
      
      displayCart();
      onLoadcartCount();
    });
  }
}

export function qtyModify() {
  let decreaseButtons = document.querySelectorAll(".decrement");
  let increaseButtons = document.querySelectorAll(".increment");
  let cartItems = localStorage.getItem("productsInCart");
  let currentQuantity = 0;
  let currentProduct = "";
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      currentQuantity = decreaseButtons[i].nextElementSibling.textContent;
      currentProduct = decreaseButtons[i].parentElement.children[1].textContent

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartCount(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener("click", () => {
      currentQuantity =
        increaseButtons[i].nextElementSibling.textContent;
      currentProduct = increaseButtons[i].parentElement.children[1].textContent

      cartItems[currentProduct].inCart += 1;
      cartCount(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

onLoadcartCount();
displayCart();