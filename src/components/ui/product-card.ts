import { createIcons, icons } from "lucide";
import ProductService from "../../product.ts";
import { addToCart } from "../../cart-service.ts";
import { addToWishlist, removeFromWishlist } from "../../wishlist-service.ts";
import { db } from "../../db.ts";

class ProductCard extends HTMLElement {
  async connectedCallback() {
    const id = this.getAttribute("data-id")!;
    const product = await ProductService.getProductById(parseInt(id));

    this.innerHTML = `
      <div class="flex flex-col items-center-safe gap-y-2">
        <div class="relative max-h-[300px] max-w-[300px] overflow-hidden rounded-md">
          <a href="/product.html?id=${id}">
            <img class="cursor-pointer" src="${product?.imgPath}" />
          </a>
          <div class="absolute top-2 right-2 flex flex-col gap-2">
            <button class="product-add-to-wishlist-btn hidden p-2 z-10 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer">
              <i data-lucide="heart"></i>
            </button>
            <button class="product-remove-from-wishlist-btn hidden p-2 z-10 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer">
              <i data-lucide="heart-off"></i>
            </button>
            <button class="product-add-to-cart-btn p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer">
              <i data-lucide="shopping-cart"></i>
            </button>
          </div>
        </div>
        <div class="flex flex-col items-center-safe">
          <a href="/product.html?id=${id}" class="text-center font-[Montserrat] font-bold">
            ${product?.name}
          </a>
          <p class="text-center font-[Karla] text-sm text-gray-500">
            ${product?.categoryName}
          </p>
          <p class="text-center font-[Karla] text-lg font-bold">
            &#8377; <span>${product?.price}</span>
          </p>
        </div>
      </div>
    `;

    createIcons({ icons });

    const productId = product?.id;

    const addToCartBtn = this.querySelector(".product-add-to-cart-btn")!;
    addToCartBtn.addEventListener("click", async () => {
      await addToCart(productId!, 1);
      this.dispatchEvent(new CustomEvent("cart-updated", { bubbles: true }));
    });

    this.setupWishlist(productId!);
  }

  private async setupWishlist(productId: number) {
    const addToWishlistBtn = this.querySelector(
      ".product-add-to-wishlist-btn",
    )!;
    const removeFromWishlistBtn = this.querySelector(
      ".product-remove-from-wishlist-btn",
    )!;

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

    if (!productId) return;
    const exists = await db.wishlist.get(productId);

    if (exists) {
      removeFromWishlistBtn.classList.add("block");
      removeFromWishlistBtn.classList.remove("hidden");
    } else {
      addToWishlistBtn.classList.add("block");
      addToWishlistBtn.classList.remove("hidden");
    }
  }
}

customElements.define("product-card", ProductCard);
