import { createIcons, icons } from "lucide";
import ProductService from "../../../product";
import { db } from "../../../db";
import { addToCart, removeFromCart } from "../../../cart-service.ts";
import { goBackWithRefresh } from "../../../utils/go-back-with-refresh.ts";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../wishlist-service.ts";

class ProductSection extends HTMLElement {
  async connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id") as string;
    const productId = parseInt(idParam, 10);
    const product = await ProductService.getProductById(productId);

    const productInCart = await db.cart.get(product!.id);

    this.innerHTML = `
      <section
        class="flex flex-col gap-4 px-8 md:grid md:grid-cols-2 md:gap-12 md:px-[5dvw] lg:px-[15dvw]"
      >
        <button
          class="back-button inline-block w-max rounded-full border border-green-500 bg-green-100 px-4 py-2 font-[Karla] text-sm font-medium text-green-700 cursor-pointer transition md:hidden"
        >
          ← Go Back
        </button>
        <div class="relative max-md:h-[400px] max-md:w-full">
          <img
            class="absolute h-full w-full rounded-md object-cover"
            src="${product?.imgPath}"
          />
        </div>
        <div class="flex flex-col gap-y-4">
          <button
            class="back-button hidden w-max rounded-full border border-green-500 bg-green-100 px-4 py-2 font-[Karla] text-sm font-medium text-green-700 cursor-pointer transition md:inline-block"
          >
            ← Go Back
          </button>
          <h1 class="font-[Montserrat] text-3xl font-bold md:text-4xl">
            ${product?.name}
          </h1>
          <p class="font-[Karla] text-3xl font-bold">&#8377; 150</p>
          <p class="font-[Karla] text-xl">
            ${product?.shortDescription}
          </p>
          <div class="flex items-center-safe gap-x-4">
            <div class="flex w-max items-stretch py-1 font-[Karla]">
              <button
                id="qty-decrease-btn"
                class="flex h-8 w-8 items-center-safe justify-center-safe rounded-l-full bg-gray-300 font-bold cursor-pointer"
              >
                –
              </button>
              <div
                id="qty-value"
                class="flex w-10 items-center-safe justify-center-safe border border-green-200 text-center font-semibold text-green-900 select-none"
              >
                1
              </div>
              <button
                id="qty-increase-btn"
                class="flex h-8 w-8 items-center-safe justify-center-safe rounded-r-full bg-gray-300 font-bold cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              id="add-to-cart-btn"
              class="max-w-[300px] flex-1 rounded-full bg-[rgb(131,183,53)] p-3 font-[Karla] text-white cursor-pointer hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              ${productInCart && "disabled"}
            >
              ADD TO CART
            </button>
          </div>
          <div
            class="flex items-center-safe gap-x-4 border-b border-b-gray-600 py-2 font-[Karla]"
          >
            <div class="flex items-center-safe gap-x-2">
              <i class="size-4" data-lucide="shuffle"></i>
              <p>Add to Compare</p>
            </div>
            <button id="add-to-wishlist-btn" class="items-center-safe cursor-pointer gap-x-2 hidden">
              <i class="size-4" data-lucide="heart"></i>
              <p>Add to Wishlist</p>
            </button>
            <button id="remove-from-wishlist-btn" class="items-center-safe cursor-pointer gap-x-2 hidden">
              <i class="size-4" data-lucide="heart"></i>
              <p>Remove from Wishlist</p>
            </button>
          </div>
          <div class="font-[Karla]">
            <p><b>SKU:</b> ${product?.sku}</p>
            <p><b>Categories:</b> ${product?.categoryName}</p>
          </div>
        </div>
      </section>
    `;

    createIcons({ icons });

    const qtyValue = document.querySelector("#qty-value");
    if (!qtyValue) return;

    if (productInCart)
      qtyValue.textContent = (await db.cart.get(product!.id))!.qty.toString();
    else qtyValue.textContent = "0";

    document.querySelectorAll(".back-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        goBackWithRefresh();
        return false;
      });
    });

    this.setupQty(product!.id);
    this.setupCartUpdate(product!.id);
    this.setupWishlist(product!.id);
  }

  private setupQty(productId: number) {
    const qtyValue = this.querySelector("#qty-value");
    const addToCartBtn = document.querySelector("#add-to-cart-btn");
    const qtyDecreaseBtn = document.querySelector("#qty-decrease-btn");
    const qtyIncreaseBtn = document.querySelector("#qty-increase-btn");
    if (!qtyValue || !addToCartBtn || !qtyIncreaseBtn || !qtyDecreaseBtn)
      return;

    addToCartBtn.addEventListener("click", async () => {
      let qty = parseInt(qtyValue!.textContent ?? "1");
      if (qty == 0) qty = 1;
      await addToCart(productId, qty);
      this.dispatchEvent(new CustomEvent("cart-updated", { bubbles: true }));
    });

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
      if (!item) {
        const qty = parseInt(qtyValue!.textContent ?? "1");
        qtyValue.textContent = `${qty - 1}`;
        return;
      }
      await removeFromCart(productId, 1);
      this.dispatchEvent(new CustomEvent("cart-updated", { bubbles: true }));
    });
  }

  private setupCartUpdate(productId: number) {
    const addToCartBtn = this.querySelector("#add-to-cart-btn");
    const qtyValue = this.querySelector("#qty-value");

    if (!addToCartBtn || !qtyValue) return;

    const updateUI = async () => {
      const item = await db.cart.get(productId);
      if (item) {
        addToCartBtn.setAttribute("disabled", "true");
        qtyValue.textContent = item.qty.toString();
      } else {
        addToCartBtn.removeAttribute("disabled");
        qtyValue.textContent = "0";
      }
    };

    updateUI();
    this.addEventListener("cart-updated", updateUI);
  }

  private async setupWishlist(productId: number) {
    const addToWishlistBtn = this.querySelector("#add-to-wishlist-btn");
    const removeFromWishlistBtn = this.querySelector(
      "#remove-from-wishlist-btn",
    );
    if (!addToWishlistBtn || !removeFromWishlistBtn) return;

    addToWishlistBtn.addEventListener("click", function () {
      addToWishlist(productId);
      addToWishlistBtn.classList.remove("flex");
      addToWishlistBtn.classList.add("hidden");

      removeFromWishlistBtn.classList.add("flex");
      removeFromWishlistBtn.classList.remove("hidden");
    });
    removeFromWishlistBtn.addEventListener("click", function () {
      removeFromWishlist(productId);

      removeFromWishlistBtn.classList.remove("flex");
      removeFromWishlistBtn.classList.add("hidden");

      addToWishlistBtn.classList.add("flex");
      addToWishlistBtn.classList.remove("hidden");
    });

    const exists = await db.wishlist.get(productId);

    if (exists) {
      removeFromWishlistBtn.classList.add("flex");
      removeFromWishlistBtn.classList.remove("hidden");
    } else {
      addToWishlistBtn.classList.add("flex");
      addToWishlistBtn.classList.remove("hidden");
    }
  }
}

customElements.define("product-section", ProductSection);
