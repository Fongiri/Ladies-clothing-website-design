/// ==================== IMAGE SLIDER ====================
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

if (next && prev) {
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
  setInterval(nextSlide, 4000);
  showSlide(currentIndex);
}

// ==================== ADD TO CART ====================
function addToCart(name, price, image) {
  const product = { name, price, image };
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Attach event listeners to Add to Cart buttons
const addButtons = document.querySelectorAll(".product button");

addButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");
    const name = product.querySelector("h3").textContent;
    const price = parseFloat(product.querySelector("p").textContent.replace("$", ""));
    const image = product.querySelector("img").getAttribute("src");
    addToCart(name, price, image);
  });
});

// ==================== DISPLAY CART ITEMS ====================
function renderCartItems() {
  const cartContainer = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");
  if (!cartContainer || !cartSummary) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
    total += item.price;
  });

  cartSummary.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

// Call render function only on cart page
window.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
});
