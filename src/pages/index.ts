import {
  addToCart,
  fetchCart,
  getQuantity,
  removeFromCart,
  setQuantity,
} from "../cart";
import { fetchProducts } from "../product";

function renderStars(rating: number): string {
  const rounded = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(rounded);
  const halfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let html = "";
  for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star"></i>';
  if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star"></i>';
  return html;
}

function renderQtySelector(itemId: number, quantity: number): string {
  return `
    <div
      class="cart-qty-selector relative flex h-[40px] flex-grow items-center overflow-hidden bg-gray-300 font-[Montserrat] font-bold text-black"
      data-id="${itemId}"
    >
      <button
        class="decrement-btn aspect-square w-auto h-full flex items-center justify-center bg-red-600 hover:bg-red-500 rounded-r-md transition-[background] duration-200 cursor-pointer"
        type="button"
      >
        −
      </button>
      <input
        type="number"
        min="1"
        value="${quantity}"
        class="quantity-input mx-2 h-full w-full flex-grow text-center outline-none"
      />
      <button
        class="increment-btn aspect-square w-auto h-full flex items-center justify-center bg-green-600 hover:bg-green-500 rounded-l-md transition-[background] duration-200 cursor-pointer"
        type="button"
      >
        +
      </button>
    </div>
  `;
}

function renderAddToCartButton(itemId: number): string {
  return `
    <button
      data-id="${itemId}"
      class="add-to-cart-btn h-[40px] cursor-pointer bg-orange-600 font-[Montserrat] font-bold text-white transition-[background] duration-200 hover:bg-orange-500"
    >
      Add to Cart
    </button>
  `;
}

function animateFlyToCart(event: MouseEvent, sourceImage: HTMLImageElement) {
  const cartIcon = document.querySelector("#cart-button");
  if (!cartIcon) return;

  const cartRect = cartIcon.getBoundingClientRect();

  const flyingImg = sourceImage.cloneNode(true) as HTMLImageElement;
  flyingImg.style.position = "fixed";
  flyingImg.style.zIndex = "1000";
  flyingImg.style.left = event.clientX + "px";
  flyingImg.style.top = event.clientY + "px";
  flyingImg.style.width = "50px";
  flyingImg.style.height = "50px";
  flyingImg.style.transition = "all 0.75s ease-in-out";

  document.body.appendChild(flyingImg);

  flyingImg.getBoundingClientRect();

  flyingImg.style.left = cartRect.left + cartRect.width / 2 + "px";
  flyingImg.style.top = cartRect.top + cartRect.height / 2 + "px";
  flyingImg.style.width = "0px";
  flyingImg.style.height = "0px";
  flyingImg.style.opacity = "0.5";
  flyingImg.style.transform = "rotate(360deg)";

  flyingImg.addEventListener("transitionend", () => {
    const cartCount = document.querySelector("#cart-count-badge");
    if (cartCount) {
      cartCount.innerHTML = Object.keys(
        fetchCart()?.items ?? {},
      ).length.toString();
    }
    flyingImg.remove();
  });
}

async function addProductsToGrid() {
  const grid = document.querySelector("#products-grid");
  if (!grid) return;

  const products = await fetchProducts();

  products.forEach((product) => {
    const quantity = getQuantity(product.id) ?? 0;
    const isInCart = quantity > 0;

    const card = document.createElement("div");
    card.className =
      "flex w-full max-w-[325px] flex-col overflow-hidden rounded-md shadow-xl";

    card.innerHTML = `
      <img
        class="h-[250px] w-full object-cover"
        src="${product.imagePath}"
        alt="${product.name}"
      />
      <div class="flex h-full flex-col gap-y-2 pt-4">
        <div class="flex flex-col gap-y-2 px-4">
          <div class="flex flex-col gap-y-1">
            <h1 class="font-[Montserrat] text-xl leading-5 font-bold">${product.name}</h1>
            <p class="font-[Karla] leading-4 text-gray-700">${product.shortDescription}</p>
          </div>
        </div>
        <div class="flex flex-col h-full justify-end">
          <div class="px-4 py-1">
            <div class="flex justify-between items-center">
              <div class="text-yellow-500">
                ${renderStars(product.stars)}
              </div>
              <p class="font-[Montserrat] text-lg font-bold">&#8377; ${product.price}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 w-full">
            ${
              isInCart
                ? renderQtySelector(product.id, quantity)
                : renderAddToCartButton(product.id)
            }
            <a
              class="h-[40px] flex justify-center items-center cursor-pointer bg-stone-700 font-[Montserrat] font-bold text-white transition-[background] duration-200 hover:bg-stone-600"
              href="/product?id=${product.id}"
            >
              View
            </a>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
    if (isInCart) setupQtySelector(product.id);
  });
}

function updateCartCount() {
  const cartCount = document.querySelector("#cart-count-badge");
  if (!cartCount) return;
  cartCount.innerHTML = Object.keys(fetchCart()?.items ?? {}).length.toString();
}

function setupCart() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const dataId = button.getAttribute("data-id");
      if (!dataId) return;
      const itemId = parseInt(dataId);
      if (isNaN(itemId)) return;

      const quantity = addToCart(itemId);

      const card = button.closest(".shadow-xl");
      const image = card?.querySelector("img");
      if (image instanceof HTMLImageElement)
        animateFlyToCart(event as MouseEvent, image);

      button.outerHTML = renderQtySelector(itemId, quantity);
      setupQtySelector(itemId);
    });
  });

  updateCartCount();
}

function setupQtySelector(itemId: number) {
  const parent = document.querySelector(
    `.cart-qty-selector[data-id="${itemId}"]`,
  );
  if (!parent) return;

  let quantity = getQuantity(itemId) ?? 0;

  const decrementBtn = parent.querySelector(".decrement-btn");
  const incrementBtn = parent.querySelector(".increment-btn");
  const quantityInput = parent.querySelector(
    ".quantity-input",
  ) as HTMLInputElement;

  if (!quantityInput) return;

  quantityInput.addEventListener("keydown", (e: KeyboardEvent) => {
    if (
      [
        "Backspace",
        "Tab",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
      ].includes(e.key)
    )
      return;

    if (!/^\d$/.test(e.key)) e.preventDefault();
  });

  quantityInput.addEventListener("input", () => {
    const value = parseInt(quantityInput.value);
    if (isNaN(value)) return;
    quantity = value;
    setQuantity(itemId, quantity);
  });

  quantityInput.addEventListener("blur", () => {
    const value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
      quantityInput.value = getQuantity(itemId)?.toString() ?? "1";
    }

    if (quantity === 0) {
      parent.outerHTML = renderAddToCartButton(itemId);
      setupCart();
      removeFromCart(itemId);
      updateCartCount();
    }
  });

  incrementBtn?.addEventListener("click", () => {
    quantity++;
    quantityInput.value = quantity.toString();
    addToCart(itemId);
  });

  decrementBtn?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity.toString();
      removeFromCart(itemId);
    } else {
      parent.outerHTML = renderAddToCartButton(itemId);
      setupCart();
      removeFromCart(itemId);
      updateCartCount();
    }
  });
}

async function indexPage() {
  await addProductsToGrid();
  setupCart();
}

indexPage();
