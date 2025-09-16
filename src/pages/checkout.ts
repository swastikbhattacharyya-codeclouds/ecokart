import { clearCart, fetchCart, removeFromCart, setQuantity } from "../cart";
import { calculateCartCosts } from "../costs";
import { fetchProducts } from "../product";

function renderProduct(
  id: number,
  name: string,
  description: string,
  image: string,
  quantity: number,
  price: number,
) {
  return `
    <div data-id=${id} class="flex gap-4 rounded-md bg-white p-4 shadow">
      <img
        src="${image}"
        alt="Product"
        class="h-20 w-20 rounded-md object-cover"
      />
      <div class="flex flex-1 flex-col justify-between">
        <div>
          <h3 class="font-[Montserrat] text-lg font-bold text-gray-900">
            ${name}
          </h3>
          <p class="text-sm text-gray-600">
            ${description}
          </p>
        </div>
        <div class="mt-2 flex items-center justify-between">
          <div
            class="flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1"
          >
            <button
              type="button"
              class="decrement-btn text-gray-600 hover:text-orange-600 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <i class="fas fa-minus"></i>
            </button>
            <input
              readonly
              type="number"
              value="${quantity}"
              min="1"
              class="w-10 border-none text-center text-sm text-gray-800 focus:outline-none cursor-default"
            />
            <button
              type="button"
              class="increment-btn text-gray-600 hover:text-orange-600"
              aria-label="Increase quantity"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="font-bold text-orange-600">&#8377; <span>${price * quantity}</span></div>
        </div>
      </div>
    </div>
  `;
}

function setupQuantityHandlers(id: number, unitPrice: number) {
  const productElement = document.querySelector(`[data-id="${id}"]`);
  if (!productElement) return;

  const input = productElement.querySelector(
    "input[type='number']",
  ) as HTMLInputElement;
  const incrementBtn = productElement.querySelector(".increment-btn");
  const decrementBtn = productElement.querySelector(".decrement-btn");

  if (!input || !incrementBtn || !decrementBtn) return;

  incrementBtn.addEventListener("click", () => {
    const current = parseInt(input.value);
    const newQuantity = current + 1;
    input.value = newQuantity.toString();
    setQuantity(id, newQuantity);
    updateProductPrice(id, unitPrice);
    updateCartPrices();
  });

  decrementBtn.addEventListener("click", () => {
    const current = parseInt(input.value);
    if (current > 1) {
      const newQuantity = current - 1;
      input.value = newQuantity.toString();
      setQuantity(id, newQuantity);
      updateProductPrice(id, unitPrice);
    } else {
      removeFromCart(id);
      const productElement = document.querySelector(`[data-id="${id}"]`);
      productElement?.remove();
    }
    updateCartPrices();
  });
}

function updateProductPrice(id: number, unitPrice: number) {
  const productElement = document.querySelector(`[data-id="${id}"]`);
  if (!productElement) return;

  const input = productElement.querySelector(
    "input[type='number']",
  ) as HTMLInputElement;
  const priceDisplay = productElement.querySelector("div.font-bold span");

  if (!input || !priceDisplay) return;

  const quantity = parseInt(input.value);
  const total = unitPrice * quantity;

  priceDisplay.textContent = total.toString();
}

async function updateCartPrices() {
  const cart = fetchCart() ?? { items: [], discountCode: "" };
  const products = await fetchProducts();
  const costs = calculateCartCosts(cart, products);

  const emptyContainer = document.getElementById("empty-cart");
  if (!emptyContainer) return;

  if (Object.entries(cart.items).length === 0)
    emptyContainer.classList.remove("hidden");

  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const shippingEl = document.getElementById("cart-shipping");
  const totalEl = document.getElementById("cart-total");

  if (subtotalEl) subtotalEl.textContent = costs.subtotal.toString();
  if (taxEl) taxEl.textContent = costs.tax.toString();
  if (shippingEl) shippingEl.textContent = costs.shipping.toString();
  if (totalEl) totalEl.textContent = costs.total.toString();
}

function openOrderReviewDialog() {
  const form = document.querySelector("form") as HTMLFormElement;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const dialog = document.getElementById(
    "order-review-dialog",
  ) as HTMLDialogElement;
  const content = document.getElementById("order-review-content");

  if (!dialog || !content) return;

  const cart = fetchCart();
  if (!cart || !cart.items) return;

  fetchProducts().then((products) => {
    const costs = calculateCartCosts(cart, products);

    const cartItemsHTML = Object.entries(cart.items)
      .map(([idStr, qty]) => {
        const id = Number(idStr);
        const product = products.find((p) => p.id === id);
        if (!product) return "";
        return `
          <div class="flex justify-between items-start">
            <div>
              <div class="font-bold">${product.name}</div>
              <div class="text-xs text-gray-500">Qty: ${qty}</div>
            </div>
            <div class="font-semibold">&#8377; ${qty * product.price}</div>
          </div>
        `;
      })
      .join("");

    const name =
      (document.getElementById("name") as HTMLInputElement)?.value || "-";
    const email =
      (document.getElementById("email") as HTMLInputElement)?.value || "-";
    const phone =
      (document.getElementById("phone") as HTMLInputElement)?.value || "-";
    const address =
      (document.getElementById("address") as HTMLTextAreaElement)?.value || "-";

    content.innerHTML = `
      <div>
        <h3 class="font-bold mb-2 text-gray-900">Items</h3>
        <div class="space-y-3">${cartItemsHTML}</div>
      </div>
      <div>
        <h3 class="font-bold mb-2 text-gray-900">Billing Info</h3>
        <p><span class="font-semibold">Name:</span> ${name}</p>
        <p><span class="font-semibold">Name:</span> ${email}</p>
        <p><span class="font-semibold">Phone:</span> ${phone}</p>
        <p><span class="font-semibold">Address:</span> ${address}</p>
      </div>
      <div>
        <h3 class="font-bold mb-2 text-gray-900">Summary</h3>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between"><span>Subtotal</span><span>&#8377; ${costs.subtotal}</span></div>
          <div class="flex justify-between"><span>Tax</span><span>&#8377; ${costs.tax}</span></div>
          <div class="flex justify-between"><span>Shipping</span><span>&#8377; ${costs.shipping}</span></div>
          <div class="flex justify-between font-bold text-gray-900"><span>Total</span><span>&#8377; ${costs.total}</span></div>
        </div>
      </div>
    `;

    dialog.showModal();
  });
}

async function setupCart() {
  const products = await fetchProducts();
  const cart = fetchCart();

  const container = document.getElementById("cart-items");
  const emptyContainer = document.getElementById("empty-cart");
  if (!container || !emptyContainer) return;

  container.innerHTML = "";

  if (!cart || !cart.items) return;

  if (Object.entries(cart.items).length > 0)
    emptyContainer.classList.add("hidden");

  for (const [idStr, quantity] of Object.entries(cart.items)) {
    const id = Number(idStr);
    const product = products.find((p) => p.id === id);
    if (!product) continue;

    container.insertAdjacentHTML(
      "beforeend",
      renderProduct(
        product.id,
        product.name,
        product.shortDescription,
        product.imagePath,
        quantity,
        product.price,
      ),
    );

    setupQuantityHandlers(product.id, product.price);
  }

  updateCartPrices();

  document
    .querySelector("#checkout-form-button")
    ?.addEventListener("click", openOrderReviewDialog);

  document
    .querySelector("#close-order-dialog")
    ?.addEventListener("click", () => {
      const dialog = document.getElementById(
        "order-review-dialog",
      ) as HTMLDialogElement;
      dialog.close();
    });

  document
    .getElementById("place-order-btn")
    ?.addEventListener("click", async () => {
      const name =
        (document.getElementById("name") as HTMLInputElement)?.value || "";
      const email =
        (document.getElementById("email") as HTMLInputElement)?.value || "";
      const phone =
        (document.getElementById("phone") as HTMLInputElement)?.value || "";
      const address =
        (document.getElementById("address") as HTMLTextAreaElement)?.value ||
        "";

      const cart = fetchCart() || {
        items: [],
        discountCode: "",
      };
      const products = await fetchProducts();
      const costs = calculateCartCosts(cart, products);
      const total = costs.total;

      const params = new URLSearchParams({
        name,
        email,
        phone,
        address,
        total: total.toString(),
      });

      clearCart();

      window.location.href = `/confirmed?${params.toString()}`;
    });
}

setupCart();
