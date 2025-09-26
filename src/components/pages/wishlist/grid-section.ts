import { db } from "../../../db.ts";
import "./product-card.ts";

class GridSection extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col items-center-safe px-4 md:px-[5dvw] lg:px-[15dvw]"
      >
        <h1 class="text-center font-[Montserrat] text-3xl font-bold">
          Wishlist
        </h1>
        <div
          id="wishlist-grid"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-4"
        >
        </div>
        <div id="wishlist-empty" class="hidden font-[Karla] text-center text-gray-600 justify-center-safe items-center-safe text-lg">
          Your Wishlist is Empty
        </div>
      </section>
    `;

    const wishlist = await db.wishlist.toArray();
    const wishlistGrid = this.querySelector("#wishlist-grid")!;
    const wishlistEmpty = this.querySelector("#wishlist-empty")!;

    if (wishlist.length === 0) {
      wishlistEmpty.classList.remove("hidden");
      wishlistEmpty.classList.add("flex");
    }

    wishlist.forEach((product) => {
      const element = document.createElement("product-card");
      element.setAttribute("data-id", product.productId.toString());
      wishlistGrid.append(element);
    });

    document.addEventListener("wishlist-updated", async () => {
      const wishlist = await db.wishlist.toArray();
      if (wishlist.length === 0) {
        wishlistEmpty.classList.remove("hidden");
        wishlistEmpty.classList.add("flex");
      }
    });
  }
}

customElements.define("grid-section", GridSection);
