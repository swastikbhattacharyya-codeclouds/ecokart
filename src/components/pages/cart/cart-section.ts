import "./product-card.ts";
import type Cart from "../../../cart.ts";
import { db } from "../../../db.ts";
import Price from "../../../price.ts";

class CartSection extends HTMLElement {
  async connectedCallback() {
    const cartItems: Cart[] = await db.cart.toArray();
    const { cartPrice, shipping, tax, total } = await Price.calculate();

    this.innerHTML = `
      <div id="cart-section" class="my-4 flex flex-col items-stretch gap-4">
        <p id="empty-cart" class="hidden text-center text-gray-600 text-lg font-[Karla]">Your cart is empty</p>
      </div>
      <div class="my-4 flex flex-col gap-2 rounded-lg border p-4 font-[Karla] shadow-sm">
        <h2 class="text-lg font-bold">Order Summary</h2>
        <div class="flex justify-between text-sm">
          <span>Cart Price</span>
          <span>&#8377; <span id="cart-price">${cartPrice.toFixed(2)}</span></span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Shipping</span>
          <span id="shipping-price">&#8377; <span id="shipping-price">${shipping.toFixed(2)}</span></span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Tax</span>
          <span>&#8377; <span id="tax-price">${tax.toFixed(2)}</span></span>
        </div>
        <hr class="my-2" />
        <div class="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>&#8377; <span id="total-price">${total.toFixed(2)}</span></span>
        </div>
        <button id="checkout-btn" class="mt-4 w-full rounded-lg bg-green-600 py-2 text-white cursor-pointer hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed" ${cartItems.length === 0 && "disabled"}>
          Proceed to Checkout
        </button>
      </div>
    `;

    const container = this.querySelector("#cart-section")!;
    const emptyCart = this.querySelector("#empty-cart")!;
    const checkoutBtn = this.querySelector("#checkout-btn");

    cartItems.forEach((item) => {
      const card = document.createElement("product-card");
      card.setAttribute("data-id", String(item.itemId));
      container.appendChild(card);
    });

    if (cartItems.length === 0) emptyCart.classList.remove("hidden");

    this.addEventListener("cart-updated", async () => {
      const cartItems: Cart[] = await db.cart.toArray();

      if (cartItems.length === 0) {
        emptyCart.classList.remove("hidden");
        checkoutBtn?.setAttribute("disabled", "true");
      } else emptyCart.classList.add("hidden");

      const { cartPrice, shipping, tax, total } = await Price.calculate();

      (this.querySelector("#cart-price") as HTMLElement).textContent =
        cartPrice.toFixed(2);
      (this.querySelector("#shipping-price") as HTMLElement).textContent =
        shipping.toFixed(2);
      (this.querySelector("#tax-price") as HTMLElement).textContent =
        tax.toFixed(2);
      (this.querySelector("#total-price") as HTMLElement).textContent =
        total.toFixed(2);
    });

    checkoutBtn?.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("checkout-pressed", { bubbles: true }),
      );
    });
  }
}

customElements.define("cart-section", CartSection);
