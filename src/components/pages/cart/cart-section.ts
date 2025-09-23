import "./product-card.ts";
import type Cart from "../../../cart.ts";
import { db } from "../../../db.ts";

class CartSection extends HTMLElement {
  async connectedCallback() {
    const cartItems: Cart[] = await db.cart.toArray();

    this.innerHTML = `
      <div id="cart-section" class="flex flex-col items-stretch gap-4">
        <p id="empty-cart" class="hidden text-center text-gray-600 font-[Karla]">Your cart is empty</p>
      </div>
    `;

    const container = this.querySelector("#cart-section")!;
    const emptyCart = this.querySelector("#empty-cart")!;

    cartItems.forEach((item) => {
      const card = document.createElement("product-card");
      card.setAttribute("data-id", String(item.itemId));
      container.appendChild(card);
    });

    if (cartItems.length === 0) emptyCart.classList.remove("hidden");

    this.addEventListener("cart-updated", async () => {
      const cartItems: Cart[] = await db.cart.toArray();
      if (cartItems.length === 0) emptyCart.classList.remove("hidden");
    });
  }
}

customElements.define("cart-section", CartSection);
