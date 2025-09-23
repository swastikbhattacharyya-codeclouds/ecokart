import { db } from "../../../db.ts";
import Price from "../../../price.ts";
import ProductService from "../../../product.ts";

class ConfirmSection extends HTMLElement {
  async connectedCallback() {
    const params = new URLSearchParams(window.location.search);
    const billingData = {
      name: params.get("name") ?? "",
      email: params.get("email") ?? "",
      address: params.get("address") ?? "",
    };

    const cartItems = await db.cart.toArray();
    const { cartPrice, shipping, tax, total } = await Price.calculate();

    this.innerHTML = `
      <section class="w-full py-8 px-8 md:px-[5dvw] lg:px-[15dvw] font-[Karla]">
        <h1 class="text-2xl font-bold text-center mb-8">Order Confirmation</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max">
          
          <div class="flex flex-col gap-2 bg-gray-50 rounded-lg p-6">
            <h2 class="text-lg font-semibold">Billing Details</h2>
            <p><strong>Name:</strong> ${billingData.name}</p>
            <p><strong>Email:</strong> ${billingData.email}</p>
            <p><strong>Address:</strong> ${billingData.address}</p>
          </div>

          <div class="flex flex-col gap-2 bg-gray-50 rounded-lg p-6">
            <h2 class="text-lg font-semibold">Order Details</h2>
            <div id="order-items" class="flex flex-col gap-2 text-sm"></div>
            <div class="mt-4 pt-2 text-sm">
              <div class="flex justify-between"><span>Cart Price</span> <span>₹${cartPrice.toFixed(2)}</span></div>
              <div class="flex justify-between"><span>Shipping</span> <span>₹${shipping.toFixed(2)}</span></div>
              <div class="flex justify-between"><span>Tax</span> <span>₹${tax.toFixed(2)}</span></div>
              <div class="flex justify-between font-bold text-base mt-2"><span>Total</span> <span>₹${total.toFixed(2)}</span></div>
            </div>
          </div>

          <div class="lg:col-span-2 flex flex-col items-center text-center gap-3 text-green-700 bg-green-50 rounded-lg p-6">
            <p class="text-lg font-semibold">Thank you for shopping sustainably!</p>
            <p>🌱 Your order helped save <strong>2.4 kg</strong> of CO₂</p>
            <p>🌳 That's equivalent to saving <strong>0.15 trees</strong></p>
            <button id="ok-btn" class="mt-4 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700">
              OK
            </button>
          </div>

        </div>
      </section>
    `;

    const orderItems = this.querySelector("#order-items")!;
    for (const item of cartItems) {
      const product = await ProductService.getProductById(item.itemId);
      if (!product) continue;
      const div = document.createElement("div");
      div.className = "flex justify-between";
      div.innerHTML = `
        <span>${product.name} (x${item.qty})</span>
        <span>₹${(product.price * item.qty).toFixed(2)}</span>
      `;
      orderItems.appendChild(div);
    }

    this.querySelector("#ok-btn")?.addEventListener("click", async () => {
      await db.cart.clear();
      window.location.href = "/";
    });
  }
}

customElements.define("confirm-section", ConfirmSection);
