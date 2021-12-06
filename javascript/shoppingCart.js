let products = [
  {
    img: "./img/gallery/coffee-chair.jpg",
    inCart: 0,
    itemName: "Slytherine",
    price: 500.00,
  },
  {
    img: "./img/gallery/coffee-table.jpg",
    inCart: 0,
    itemName: "Leviosa",
    price: 120.00,
  },
  {
    img: "./img/gallery/flower-pot.jpg",
    inCart: 0,
    itemName: "Potty",
    price: 40.00,
  },
  { img: "./img/gallery/mug.jpg", inCart: 0, itemName: "Muggo", price: 7.00 },
  {
    img: "./img/gallery/night-light.jpg",
    inCart: 0,
    itemName: "Grifo",
    price: 50.00,
  },
  {
    img: "./img/gallery/sofa.jpg",
    inCart: 0,
    itemName: "Lolito",
    price: 700.00,
  },
  {
    img: "./img/gallery/bed-set.jpg",
    inCart: 0,
    itemName: "Haugsvar",
    price: 100.00,
  },
  {
    img: "./img/gallery/ceiling-fan.jpg",
    inCart: 0,
    itemName: "Respira",
    price: 100.00,
  },
];

const carts = document.querySelectorAll(".cart-button");
const removeButton = document.querySelector(".clear-cart");
const productContainer = document.querySelector(".products-container");
const cartCounter = document.querySelector(".cart-counter");
const cartIcon = document.querySelector(".cart-icon");
const cartContents = document.querySelector(".cart-contents");

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartCount(products[i]);
    totalCost(products[i]);
    displayCart();
    onLoadcartCount();
  });
}

cartIcon.addEventListener("click", () => {
    if (cartContents.style.visibility == "hidden") {
      return (cartContents.style.visibility = "visible");
    } else {
      return (cartContents.style.visibility = "hidden");
    }
});

export function removeAll(e) {
    cartCounter.textContent = "";
    productContainer.innerHTML = "";
    localStorage.clear();
    if (cartContents.style.visibility == "visible") {
      cartContents.style.visibility = "hidden";
    }
}

export function onLoadcartCount() {
  const itemsCountInCart = localStorage.getItem("cartCount");
  if (itemsCountInCart) {
    document.querySelector(".cart-counter").textContent = itemsCountInCart;
  }
}

export function cartCount(product, action) {
  let itemsCountInCart = localStorage.getItem('cartNumbers');
  itemsCountInCart = parseInt(itemsCountInCart);
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if( action == "decrease") {
      localStorage.setItem('cartNumbers', itemsCountInCart - 1);
      document.querySelector('.cart-counter').textContent = itemsCountInCart - 1;
  } else if( itemsCountInCart ) {
      localStorage.setItem("cartNumbers", itemsCountInCart + 1 );
      document.querySelector('.cart-counter').textContent = itemsCountInCart + 1;
  } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart-counter').textContent = 1;
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
  let cartCost = localStorage.getItem('totalCost');
  if( action == "decrease") {
      cartCost = parseFloat(cartCost);
      localStorage.setItem('totalCost',cartCost - product.price);
  } else if(cartCost != null) {
      cartCost = parseFloat(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
  } else {
      localStorage.setItem("totalCost", product.price);
  }
}

export function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  const productContainer = document.querySelector(".products-container");
  const cartCost = localStorage.getItem("totalCost");

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
  qtyModify()
}

export function deleteButtons() {
  let deleteBtn = document.querySelectorAll(".delete-button");
  let productName;
  let itemsCountInCart = localStorage.getItem("cartCount");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");
  //new
  cartCost = parseFloat(cartCost);

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
      productName = deleteBtn[i].parentElement.children[1].textContent.trim();
      localStorage.setItem("cartCount", itemsCountInCart - cartItems[productName].inCart);
      localStorage.setItem("totalCost", cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
      delete cartItems[productName];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
      onLoadcartCount();
    });
  }
}

export function qtyModify() {
  let dercrementBtn = document.querySelectorAll('.decrement')
  let inrcrementBtn = document.querySelectorAll('.increment')
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems)
  let currentQty = 0;
  let currentProduct = "";

  for(let i = 0; i < dercrementBtn.length; i++) {
    dercrementBtn[i].addEventListener('click', () => {
      currentQty = dercrementBtn[i].nextElementSibling.textContent
      currentProduct = dercrementBtn[i].parentElement.children[1].textContent
      
      if(cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1
        cartCount( cartItems[currentProduct], "decrease" );
        totalCost( cartItems[currentProduct], "decrease" );
        localStorage.setItem("productsInCart", JSON.stringify(cartItems))
        displayCart()
      }
    })
  }

  for(let i = 0; i < inrcrementBtn.length; i++) {
    inrcrementBtn[i].addEventListener('click', () => {
      currentQty = inrcrementBtn[i].nextElementSibling.textContent
      currentProduct = inrcrementBtn[i].parentElement.children[1].textContent
      
      cartItems[currentProduct].inCart += 1;
      cartCount( cartItems[currentProduct]);
      totalCost( cartItems[currentProduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();
    })
  }
}

removeButton.addEventListener("click", () => removeAll());

displayCart();
onLoadcartCount();