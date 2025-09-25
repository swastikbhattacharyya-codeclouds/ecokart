import { CategoryService } from "../../../category";
import "./products-grid.ts";

class ProductsSection extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <section class="flex flex-col gap-y-4 px-4 md:px-[5dvw] lg:px-[15dvw]">
        <h1 class="text-center font-[Montserrat] text-3xl font-bold">Shop</h1>
        <form
          class="mb-4 flex flex-col justify-center-safe gap-x-4 gap-y-2 font-[Karla] lg:flex-row"
        >
          <input
            name="name"
            type="text"
            placeholder="Search by product name..."
            class="rounded border border-gray-500 p-2 sm:min-w-[350px]"
          />
          <select
            name="category"
            class="rounded border border-gray-500 p-2 sm:min-w-[350px]"
          >
            <option value="">All Categories</option>
          </select>
          <button
            type="submit"
            class="rounded bg-[rgb(131,183,53)] px-3 py-2 text-white"
          >
            SEARCH
          </button>
        </form>
        <products-grid></products-grid>
      </section>
    `;

    const form = this.querySelector("form")!;
    const input = form.querySelector<HTMLInputElement>('input[name="name"]')!;
    const select = form.querySelector<HTMLSelectElement>(
      'select[name="category"]',
    )!;

    const categories = await CategoryService.getCategories();
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id.toString();
      option.textContent = cat.name;
      select.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    if (params.has("name")) input.value = params.get("name") || "";
    if (params.has("category")) select.value = params.get("category") || "";
  }
}

customElements.define("products-section", ProductsSection);
