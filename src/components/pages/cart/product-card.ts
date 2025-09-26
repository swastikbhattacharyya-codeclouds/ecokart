import { createIcons, icons } from "lucide";
import { db } from "../../../db";
import ProductService from "../../../product";
import { addToCart, removeFromCart } from "../../../cart-service";

class ProductCard extends HTMLElement {
  async connectedCallback() {
    const productId = parseInt(this.getAttribute("data-id")!);

    const product = await ProductService.getProductById(productId);
    if (!product) {
      this.innerHTML = `<div class="p-4 text-red-500">Product not found</div>`;
      return;
    }

    const cartItem = await db.cart.get(productId);
    const qty = cartItem?.qty ?? 1;

    this.innerHTML = `
      <div
        class="flex items-stretch gap-4 rounded-lg border p-4 font-[Karla] shadow-sm"
      >
        <img
          src="${product.imgPath}"
          alt="${product.name}"
          class="h-24 w-24 rounded-md object-cover"
        />
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex flex-col">
            <h2 class="text-sm font-bold">
              ${product.name}
            </h2>
            <p class="text-xs text-gray-600">Category: ${product.categoryName}</p>
          </div>
          <div class="flex w-max items-stretch font-[Karla]">
            <button
              class="qty-decrease-btn flex h-8 w-8 cursor-pointer items-center-safe justify-center-safe rounded-l-full bg-gray-300 font-bold"
            >
              –
            </button>
            <div
              class="qty-value flex w-10 items-center-safe justify-center-safe border border-green-200 text-center font-semibold text-green-900 select-none"
            >
              ${qty}
            </div>
            <button
              class="qty-increase-btn flex h-8 w-8 cursor-pointer items-center-safe justify-center-safe rounded-r-full bg-gray-300 font-bold"
            >
              +
            </button>
          </div>
        </div>
        <div class="flex flex-col items-end-safe gap-4">
          <p class="flex-grow text-sm font-bold">&#8377; <span class="price-val">${product.price * qty}</span></p>
          <button class="remove-btn text-red-500 hover:text-red-700">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;

    createIcons({ icons });

    this.setupQty(product?.id);
    this.setupRemove(product?.id);
    this.setupCartUpdate(product?.id, product?.price);
  }

  private setupQty(productId: number) {
    const qtyValue = this.querySelector(".qty-value");
    const qtyDecreaseBtn = this.querySelector(".qty-decrease-btn");
    const qtyIncreaseBtn = this.querySelector(".qty-increase-btn");
    if (!qtyValue || !qtyIncreaseBtn || !qtyDecreaseBtn) return;

    qtyIncreaseBtn.addEventListener("click", async () => {
      const item = await db.cart.get(productId);
      if (!item) {
        const qty = parseInt(qtyValue!.textContent ?? "1");
        qtyValue.textContent = `${qty + 1}`;
        return;
      }
      await addToCart(productId, 1);
      this.dispatchEvent(new CustomEvent("cart-updated", { bubbles: true }));
    });

    qtyDecreaseBtn.addEventListener("click", async () => {
      const item = await db.cart.get(productId);
      if (!item) return;
      await removeFromCart(productId, 1);
      this.dispatchEvent(new CustomEvent("cart-updated", { bubbles: true }));

      const updated = await db.cart.get(productId);
      if (!updated || updated.qty <= 0) this.remove();
    });
  }

  private setupRemove(productId: number) {
    const removeBtn = this.querySelector(".remove-btn");
    if (!removeBtn) return;

    removeBtn.addEventListener("click", async () => {
      await db.cart.delete(productId);
      this.dispatchEvent(new CustomEvent("cart-updated", { bubbles: true }));
      this.remove();
    });
  }

  private setupCartUpdate(productId: number, price: number) {
    const qtyValue = this.querySelector(".qty-value");
    const priceVal = this.querySelector(".price-val");
    if (!qtyValue || !priceVal) return;

    const updateUI = async () => {
      const item = await db.cart.get(productId);
      if (item) {
        qtyValue.textContent = item.qty.toString();
        priceVal.textContent = (item.qty * price).toString();
      } else qtyValue.textContent = "0";
    };

    updateUI();
    this.addEventListener("cart-updated", updateUI);
  }
}

customElements.define("product-card", ProductCard);
