import { getCartTotalPrice } from "../../cart-service.ts";
import { CategoryService } from "../../category.ts";

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
        <a class="flex justify-center-safe" href="/"><img
          class="max-lg:place-self-center-safe"
          src="logo.png"
          width="150"
          height="39"
        /></a>
        <form
          id="header-search-form"
          class="hidden font-[Karla] lg:flex lg:items-stretch lg:justify-center-safe"
        >
          <input
            name="name"
            id="header-name"
            class="flex-1 border border-gray-300 p-2 text-sm outline-none placeholder:text-gray-500"
            placeholder="Search for products"
          />
          <select
            name="category"
            id="header-category"
            class="border border-l-0 border-gray-300 p-2 text-sm text-gray-500"
          >
            <option value="">ALL CATEGORIES</option>
          </select>
          <button
            type="submit"
            class="flex aspect-square h-auto min-w-10 items-center-safe justify-center-safe border border-l-0 border-gray-300"
          >
            <i class="size-5 text-gray-500" data-lucide="search"></i>
          </button>
        </form>
        <div
          class="justify-self-end-safe font-[Karla] lg:flex lg:items-center-safe lg:gap-x-3"
        >
          <div class="hidden text-sm font-bold lg:block">LOGIN / REGISTER</div>
          <a href="/wishlist.html"><i class="lg:size-4" data-lucide="heart"></i></a>
          <i class="hidden size-4 lg:block" data-lucide="shuffle"></i>
          <a href="/cart.html"><i class="lg:size-4" data-lucide="shopping-cart"></i></a>
          <div class="hidden font-bold lg:block">&#8377;<span id="cart-price">0.00</span></div>
        </div>
      </div>
    `;

    const navBtn = this.querySelector<HTMLButtonElement>("#nav-btn");
    navBtn?.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("hamburger-nav-open", { bubbles: true }),
      );
    });

    this.populateCategories().then(() => this.prefillFromUrl());
    this.setupSearchForm();
    this.setupCartPrice();
  }

  private async populateCategories() {
    const select = this.querySelector<HTMLSelectElement>("#header-category");
    if (!select) return;

    const categories = await CategoryService.getCategories();
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id.toString();
      option.textContent = cat.name;
      select.appendChild(option);
    });
  }

  /** Prefill inputs if URL contains ?name=...&category=... */
  private prefillFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    const categoryParam = params.get("category");

    const nameInput = this.querySelector<HTMLInputElement>("#header-name");
    const categorySelect =
      this.querySelector<HTMLSelectElement>("#header-category");

    if (nameParam && nameInput) nameInput.value = nameParam;
    if (categoryParam && categorySelect) categorySelect.value = categoryParam;
  }

  private setupSearchForm() {
    const form = this.querySelector<HTMLFormElement>("#header-search-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = (formData.get("name") as string) || "";
      const category = (formData.get("category") as string) || "";

      const params = new URLSearchParams();
      if (name) params.set("name", name);
      if (category) params.set("category", category);

      window.location.href = `/shop.html${params.toString() ? `?${params.toString()}` : ""}`;
    });
  }

  private setupCartPrice() {
    const cartPrice = this.querySelector("#cart-price");
    if (!cartPrice) return;

    const updatePrice = async () => {
      const price = await getCartTotalPrice();
      cartPrice.textContent = price.toFixed(2);
    };

    updatePrice();
    document.addEventListener("cart-updated", updatePrice);
  }
}

customElements.define("header-bar", HeaderBar);
