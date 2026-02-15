import { product } from "./product.js";
import { createNavigation } from "../nav.js";



//nedanför har du alla elemt som hämtas från html filen

const productContainer = document.getElementById("product-container");
const cartList = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funktion för att rendera produkter på sidan
function renderProduct() {
    productContainer.innerHTML = "";

    product.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Pris: ${product.price} kr</strong></p>
            <p>kategori: ${product.category}</p>
            <button>Lägg i kundvagn</button>
        
    
        `;
        const button = productCard.querySelector("button");
        button.addEventListener("click", () => addToCart(product.id));

        productContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const foundProduct = product.find(p => p.id === productId);
        cart.push({ ...foundProduct, quantity: 1 });
    };

    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Kundvagnen är tom</p>";
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.name} (${item.quantity} st) - ${item.price * item.quantity} kr`;
        cartList.appendChild(div);

        total += item.price * item.quantity;
    });

    totalElement.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    updateCart();
}
clearCartButton.addEventListener("click", clearCart);
document.addEventListener("DOMContentLoaded", () => {
    createNavigation("inlamningtva"); // 
    renderProduct();
    updateCart();
});