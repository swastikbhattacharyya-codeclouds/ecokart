import "./more-products-grid.ts";

class MoreProductsSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col gap-y-4 px-8 py-4 sm:px-[5dvw] lg:px-[15dvw]"
      >
        <div class="flex flex-col gap-y-1">
          <h2 class="font-[Montserrat] text-2xl font-bold">
            More Products
          </h2>
        </div>
        <more-products-grid></more-products-grid>
      </section>
    `;
  }
}

customElements.define("more-products-section", MoreProductsSection);
