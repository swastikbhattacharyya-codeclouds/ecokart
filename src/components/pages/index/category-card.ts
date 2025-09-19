class CategoryCard extends HTMLElement {
  connectedCallback() {
    const imgSrc = this.getAttribute("data-img");
    const icon = this.getAttribute("data-icon");
    const category = this.getAttribute("data-category");

    this.innerHTML = `
      <div
        class="group relative flex min-h-[300px] min-w-[300px] items-center-safe justify-center-safe overflow-hidden rounded-lg bg-[#e1e1e1] select-none"
      >
        <img
          src="${imgSrc}"
          class="pointer-events-none absolute h-full w-full scale-80 transition-[scale] duration-600 ease-in-out group-hover:scale-100"
          width="300"
          height="300"
        />
        <button
          class="z-40 flex w-[200px] items-center-safe justify-center-safe gap-x-2 rounded-full bg-white py-3 font-[Karla] shadow-md"
        >
          <i class="size-6" data-lucide="${icon}"></i>
          <p>${category}</p>
        </button>
      </div>
    `;
  }
}

customElements.define("category-card", CategoryCard);
