import { getCartTotalPrice } from "../../cart-service.ts";

class HeaderBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div
        class="grid grid-cols-[1fr_3fr_1fr] items-center-safe px-2 py-2.5 shadow-sm lg:grid lg:grid-cols-[1fr_5fr_3fr] lg:gap-x-4 lg:px-[5dvw] xl:px-[15dvw]"
      >
        <button id="nav-btn" class="flex items-center-safe gap-x-1 lg:hidden">
          <i data-lucide="menu"></i>
          <p class="hidden font-[Karla] font-bold lg:block">MENU</p>
        </button>
        <img
          class="max-lg:place-self-center-safe"
          src="logo.png"
          width="150"
          height="39"
        />
        <div
          class="hidden font-[Karla] lg:flex lg:items-stretch lg:justify-center-safe"
        >
          <input
            class="flex-1 border border-gray-300 p-2 text-sm outline-none placeholder:text-gray-500"
            placeholder="Search for products"
          />
          <select
            class="border border-l-0 border-gray-300 p-2 text-sm text-gray-500"
          >
            <option value="" disabled selected hidden>SELECT CATEGORY</option>
            <option value="all">All Products</option>
            <option value="essentials">Eco-Friendly Essentials</option>
            <option value="personal-care">Natural Personal Care</option>
            <option value="kitchen">Kitchen &amp; Cleaning</option>
            <option value="clothing">Sustainable Fashion</option>
            <option value="baby-kids">Baby &amp; Kids</option>
            <option value="garden">Garden &amp; Outdoors</option>
            <option value="pets">Eco Pet Products</option>
            <option value="storage">Reusable Bags &amp; Storage</option>
          </select>
          <div
            class="flex aspect-square h-auto min-w-10 items-center-safe justify-center-safe border border-l-0 border-gray-300"
          >
            <i class="size-5 text-gray-500" data-lucide="search"></i>
          </div>
        </div>
        <div
          class="justify-self-end-safe font-[Karla] lg:flex lg:items-center-safe lg:gap-x-3"
        >
          <div class="hidden text-sm font-bold lg:block">LOGIN / REGISTER</div>
          <i class="hidden size-4 lg:block" data-lucide="heart"></i>
          <i class="hidden size-4 lg:block" data-lucide="shuffle"></i>
          <i class="lg:size-4" data-lucide="shopping-cart"></i>
          <div class="hidden font-bold lg:block">&#8377;<span id="cart-price">0.00</span></div>
        </div>
      </div>
    `;

    const navBtn = this.querySelector<HTMLButtonElement>("#nav-btn");
    if (!navBtn) return;

    navBtn.addEventListener("click", function () {
      this.dispatchEvent(
        new CustomEvent("hamburger-nav-open", { bubbles: true }),
      );
    });

    this.setupCartPrice();
  }

  private setupCartPrice() {
    const cartPrice = document.querySelector("#cart-price");
    if (!cartPrice) return;

    const updatePrice = async () => {
      const price = await getCartTotalPrice();
      cartPrice.textContent = price.toString();
    };

    updatePrice();
    document.addEventListener("cart-updated", updatePrice);
  }
}

customElements.define("header-bar", HeaderBar);
