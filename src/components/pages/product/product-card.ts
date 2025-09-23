class ProductCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute("data-id");
    const imgSrc = this.getAttribute("data-img");
    const name = this.getAttribute("data-name");
    const category = this.getAttribute("data-category");
    const price = this.getAttribute("data-price");

    this.innerHTML = `
      <div class="flex flex-col items-center-safe gap-y-2">
        <a href="/product?id=${id}" class="max-h-[300px] max-w-[300px] overflow-hidden rounded-md">
          <img class="cursor-pointer" src="${imgSrc}" />
        </a>
        <div class="flex flex-col items-center-safe">
          <a href="/product?id=${id}" class="text-center font-[Montserrat] font-bold">
            ${name}
          </a>
          <p class="text-center font-[Karla] text-sm text-gray-500">
            ${category}
          </p>
          <p class="text-center font-[Karla] text-lg font-bold">
            &#8377; <span>${price}</span>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("product-card", ProductCard);
