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

let carts = document.querySelectorAll("[data-cart-button]");
const productContainer = document.querySelector(".product-container");
const cartCounter = document.querySelector(".cart-counter");
const cartIcon = document.querySelector(".cart-icon");
const cartContents = document.querySelector(".cart-contents");

//Click on cart icon to toggle visibility
cartIcon.addEventListener("click", () => {
  if (cartContents.style.visibility == "hidden") {
    displayCart();
    return cartContents.style.visibility = "visible";
  } else {
    return cartContents.style.visibility = "hidden";
  }
});

//Function to close cart when clicked on !cart
function closeCart(e) {
  let containsActiveClass = false;
  let reviewNode = e.target;
  while (reviewNode.nodeName !== 'BODY') {
    if (reviewNode.classList.contains('active')) {
      containsActiveClass = true;
      break;
    } 
    reviewNode = reviewNode.parentNode;
  } 
  if (containsActiveClass === false) {
    cartContents.style.visibility = "hidden"
  }
}
document.body.addEventListener('click', closeCart, false);

//General cart cleanup function
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

//Cart items loop
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartCount(products[i]);
    totalCost(products[i]);
  });
}

//function to display cart count
export function onLoadcartCount() {
  let itemsCountInCart = localStorage.getItem("cartCount");
  if (itemsCountInCart) {
    document.querySelector(".cart-counter").textContent = itemsCountInCart;
    cartCounter.style.visibility = "visible"
  }
}

//Increment or decrement of cart count
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

//Adds purchased items to cart & localStorage
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

//Calculate total cost
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

//Display cart items function. Populates all selected items
export function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".product-container");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product active">
        <img src=${item.img} class="active">
        <span class="active">${item.itemName}</span>
        <div class="price active">$${item.price}</div>
        <button class="decrement cart-btns button active">-</button>
        <div class="quantity active">${item.inCart}</div>
        <button class="increment cart-btns button active">+</button>
        <div class="total active">$${item.inCart * item.price}</div>
        <button class="delete-button cart-btns button active">X</button>
      </div>
    `;
    });
    productContainer.innerHTML += `
    <div class="cart-total-container active">
    <button class="clear-cart button active">Remove all</button>
    <button class="checkout button active">Checkout</button>
      <strong class="active">Grand Total: $${cartCost}</strong>
    </div> `;
  }
  deleteButtons();
  qtyModify();
}

//Deletes the selected item from cart
export function deleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete-button");
  //The remove-all button
  //placed inside function to be available on load
  if(document.querySelector(".clear-cart") != null) {
    const removeButton = document.querySelector(".clear-cart");
    removeButton.addEventListener("click", () => removeAll());
  }
  //
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

//buttons to increase or decrease units from item
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