import {
  addToCart,
  fetchCart,
  getQuantity,
  removeFromCart,
  setQuantity,
} from "../cart";
import { fetchProductDetails } from "../product";

export function renderQtySelector(itemId: number, quantity: number): string {
  return `
    <div
      class="cart-qty-selector relative flex h-[40px] flex-grow items-center rounded-lg overflow-hidden bg-gray-300 font-[Montserrat] font-bold text-black"
      data-id="${itemId}"
    >
      <button
        class="decrement-btn aspect-square w-auto h-full flex items-center justify-center bg-red-600 hover:bg-red-500 rounded-lg transition-[background] duration-200 cursor-pointer"
        type="button"
      >
        −
      </button>
      <input
        type="number"
        min="1"
        value="${quantity}"
        class="max-w-[100px] text-center outline-none h-full quantity-input mx-2 w-full flex-grow"
      />
      <button
        class="increment-btn aspect-square w-auto h-full flex items-center justify-center bg-green-600 hover:bg-green-500 rounded-lg transition-[background] duration-200 cursor-pointer"
        type="button"
      >
        +
      </button>
    </div>
  `;
}

export function renderAddToCartButton(itemId: number): string {
  return `
    <button
      data-id="${itemId}"
      class="add-to-cart-btn cursor-pointer rounded-full bg-orange-600 px-8 py-3 font-[Montserrat] font-bold text-white transition-[background] duration-200 hover:bg-orange-500"
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

  flyingImg.getBoundingClientRect(); // force layout reflow

  flyingImg.style.left = cartRect.left + cartRect.width / 2 + "px";
  flyingImg.style.top = cartRect.top + cartRect.height / 2 + "px";
  flyingImg.style.width = "0px";
  flyingImg.style.height = "0px";
  flyingImg.style.opacity = "0.5";
  flyingImg.style.transform = "rotate(360deg)";

  flyingImg.addEventListener("transitionend", () => {
    flyingImg.remove();

    const cartCount = document.querySelector("#cart-count-badge");
    if (cartCount) {
      cartCount.innerHTML = Object.keys(
        fetchCart()?.items ?? {},
      ).length.toString();
    }
  });
}

async function addProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  if (!idParam) return;

  const id = parseInt(idParam);

  const title = document.querySelector("#title");
  const subtitle = document.querySelector("#subtitle");
  const description = document.querySelector("#description");
  const image = document.querySelector("#image");
  const price = document.querySelector("#price");
  const btnContainer = document.querySelector(
    "main button, main .cart-qty-selector",
  )?.parentElement;
  if (!title || !subtitle || !description || !image || !price || !btnContainer)
    return;

  const product = await fetchProductDetails(id);
  if (!product) return;
  title.innerHTML = product.name;
  subtitle.innerHTML = product.shortDescription;
  description.innerHTML = product.longDescription;
  image.setAttribute("src", product.imagePath);
  price.innerHTML = `&#8377; ${product.price}`;

  const quantity = getQuantity(product.id) ?? 0;
  const isInCart = quantity > 0;

  btnContainer.innerHTML = isInCart
    ? renderQtySelector(product.id, quantity)
    : renderAddToCartButton(product.id);

  if (isInCart) setupQtySelector(product.id);
  else setupAddToCart(product.id);
}

function updateCartCount() {
  const cartCount = document.querySelector("#cart-count-badge");
  if (!cartCount) return;
  cartCount.innerHTML = Object.keys(fetchCart()?.items ?? {}).length.toString();
}

function setupAddToCart(itemId: number) {
  const btn = document.querySelector(".add-to-cart-btn");
  if (!btn) return;

  btn.addEventListener("click", (event) => {
    const quantity = addToCart(itemId);
    const btnContainer = btn.parentElement;
    if (!btnContainer) return;

    const image = document.querySelector("#image");
    if (image instanceof HTMLImageElement && event instanceof MouseEvent)
      animateFlyToCart(event, image);

    btnContainer.innerHTML = renderQtySelector(itemId, quantity);
    setupQtySelector(itemId);
    updateCartCount();
  });
}

function setupQtySelector(itemId: number) {
  const parent = document.querySelector(
    `.cart-qty-selector[data-id="${itemId}"]`,
  );
  if (!parent) return;

  const input = parent.querySelector(".quantity-input") as HTMLInputElement;
  const incBtn = parent.querySelector(".increment-btn");
  const decBtn = parent.querySelector(".decrement-btn");

  let quantity = getQuantity(itemId) ?? 1;

  input.addEventListener("keydown", (e: KeyboardEvent) => {
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

  input.addEventListener("input", () => {
    const val = parseInt(input.value);
    if (isNaN(val)) return;
    quantity = val;
    setQuantity(itemId, quantity);
    updateCartCount();
  });

  input.addEventListener("blur", () => {
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1) {
      input.value = getQuantity(itemId)?.toString() ?? "1";
    }

    if (quantity === 0) {
      parent.outerHTML = renderAddToCartButton(itemId);
      setupAddToCart(itemId);
      removeFromCart(itemId);
      updateCartCount();
    }
  });

  incBtn?.addEventListener("click", () => {
    quantity++;
    input.value = quantity.toString();
    addToCart(itemId);
    updateCartCount();
  });

  decBtn?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      input.value = quantity.toString();
      removeFromCart(itemId);
    } else {
      parent.outerHTML = renderAddToCartButton(itemId);
      setupAddToCart(itemId);
      removeFromCart(itemId);
    }
    updateCartCount();
  });
}

function productPage() {
  addProductDetails();
  updateCartCount();
}

productPage();
