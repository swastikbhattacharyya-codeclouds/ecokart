import { db } from "../../../db.ts";
import Price from "../../../price.ts";
import ProductService from "../../../product.ts";

class CheckoutDialog extends HTMLElement {
  private dialog!: HTMLDialogElement;
  private currentTab = 0;
  private billingData: { name: string; email: string; address: string } | null =
    null;

  connectedCallback() {
    this.innerHTML = `
      <dialog class="rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 shadow-xl w-full max-w-lg backdrop:bg-black/60 backdrop:backdrop-blur-lg">
        <div class="flex flex-col font-[Karla]">
          <div class="tab tab-billing p-6 ${this.currentTab === 0 ? "" : "hidden"}">
            <h2 class="mb-4 text-lg font-bold">Billing Information</h2>
            <form id="billing-form" class="flex flex-col gap-3">
              <input name="name" type="text" placeholder="Full Name" required
                class="rounded border p-2"/>
              <input name="email" type="email" placeholder="Email Address" required
                class="rounded border p-2"/>
              <textarea name="address" placeholder="Address" required
                class="rounded border p-2"></textarea>
              <button type="button" id="to-review"
                class="mt-4 rounded bg-green-600 py-2 text-white hover:bg-green-700">
                Continue to Review
              </button>
            </form>
          </div>

          <div class="tab tab-review p-6 ${this.currentTab === 1 ? "" : "hidden"}">
            <h2 class="mb-4 text-lg font-bold">Order Review</h2>

            <div id="billing-summary" class="mb-4 rounded border p-3 text-sm bg-gray-50">
            </div>

            <div id="review-items" class="flex flex-col gap-2 text-sm"></div>

            <div class="mt-4 border-t pt-2 text-sm">
              <div class="flex justify-between"><span>Cart Price</span> <span id="review-cart"></span></div>
              <div class="flex justify-between"><span>Shipping</span> <span id="review-shipping"></span></div>
              <div class="flex justify-between"><span>Tax</span> <span id="review-tax"></span></div>
              <div class="flex justify-between font-bold text-base mt-2"><span>Total</span> <span id="review-total"></span></div>
            </div>

            <div class="mt-4 flex gap-2">
              <button type="button" id="back-to-billing"
                class="flex-1 rounded border py-2 hover:bg-gray-100">Back</button>
              <button type="button" id="place-order"
                class="flex-1 rounded bg-green-600 py-2 text-white hover:bg-green-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </dialog>
    `;

    this.dialog = this.querySelector("dialog")!;
    this.setupEventListeners();

    document.addEventListener("checkout-pressed", () => {
      this.open();
    });
  }

  private setupEventListeners() {
    const toReviewBtn = this.querySelector("#to-review") as HTMLButtonElement;
    const backBtn = this.querySelector("#back-to-billing") as HTMLButtonElement;
    const placeOrderBtn = this.querySelector(
      "#place-order",
    ) as HTMLButtonElement;

    toReviewBtn?.addEventListener("click", async () => {
      const form = this.querySelector("#billing-form") as HTMLFormElement;
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      this.billingData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
      };

      this.currentTab = 1;
      await this.renderReview();
      this.switchTab();
    });

    backBtn?.addEventListener("click", () => {
      this.currentTab = 0;
      this.switchTab();
    });

    placeOrderBtn?.addEventListener("click", () => {
      if (this.billingData) {
        const params = new URLSearchParams(this.billingData);
        window.location.href = `/confirm.html?${params.toString()}`;
      }
      this.dialog.close();
    });
  }

  private switchTab() {
    this.querySelector(".tab-billing")?.classList.toggle(
      "hidden",
      this.currentTab !== 0,
    );
    this.querySelector(".tab-review")?.classList.toggle(
      "hidden",
      this.currentTab !== 1,
    );
  }

  private async renderReview() {
    const cartItems = await db.cart.toArray();
    const { cartPrice, shipping, tax, total } = await Price.calculate();

    const billingSummary = this.querySelector("#billing-summary")!;
    if (this.billingData) {
      billingSummary.innerHTML = `
        <p><strong>Name:</strong> ${this.billingData.name}</p>
        <p><strong>Email:</strong> ${this.billingData.email}</p>
        <p><strong>Address:</strong> ${this.billingData.address}</p>
      `;
    }

    const reviewItems = this.querySelector("#review-items")!;
    reviewItems.innerHTML = "";

    for (const item of cartItems) {
      const product = await ProductService.getProductById(item.itemId);
      if (!product) continue;
      const div = document.createElement("div");
      div.className = "flex justify-between";
      div.innerHTML = `
        <span>${product.name} (x${item.qty})</span>
        <span>&#8377; ${(product.price * item.qty).toFixed(2)}</span>
      `;
      reviewItems.appendChild(div);
    }

    (this.querySelector("#review-cart") as HTMLElement).textContent =
      `₹${cartPrice.toFixed(2)}`;
    (this.querySelector("#review-shipping") as HTMLElement).textContent =
      `₹${shipping.toFixed(2)}`;
    (this.querySelector("#review-tax") as HTMLElement).textContent =
      `₹${tax.toFixed(2)}`;
    (this.querySelector("#review-total") as HTMLElement).textContent =
      `₹${total.toFixed(2)}`;
  }

  open() {
    this.currentTab = 0;
    this.switchTab();
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }
}

customElements.define("checkout-dialog", CheckoutDialog);
