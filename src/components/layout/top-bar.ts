class TopBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div
        class="bg-[rgb(131,183,53)] font-[Karla] text-white lg:grid lg:grid-cols-2 lg:px-[5dvw] xl:px-[15dvw]"
      >
        <div class="hidden lg:flex">
          <div
            class="hidden items-center-safe justify-center-safe gap-x-2.5 border-r border-l border-r-white border-l-white px-2 lg:flex"
          >
            <p class="text-xs">ENGLISH</p>
            <i class="size-4" data-lucide="chevron-down"></i>
          </div>
          <div
            class="hidden items-center-safe justify-center-safe gap-x-2.5 border-r border-r-white px-2 lg:flex"
          >
            <p class="text-xs">COUNTRY</p>
            <i class="size-4" data-lucide="chevron-down"></i>
          </div>
          <div
            class="hidden items-center-safe justify-center-safe gap-x-2.5 px-2 lg:flex"
          >
            <p class="text-xs font-bold">
              FREE SHIPPING ON ORDERS ABOVE &#8377;500
            </p>
          </div>
        </div>
        <div
          class="flex h-10 gap-x-2 max-lg:items-center-safe max-lg:justify-center-safe lg:place-self-end"
        >
          <div
            class="flex items-center-safe justify-center-safe gap-x-2.5 pr-2 lg:border-r lg:border-r-white"
          >
            <i class="size-4" data-lucide="facebook"></i>
            <i class="size-4" data-lucide="twitter"></i>
            <i class="size-4" data-lucide="instagram"></i>
            <i class="size-4" data-lucide="youtube"></i>
          </div>
          <div
            class="hidden items-center-safe justify-center-safe gap-x-2.5 border-r border-r-white pr-2 lg:flex"
          >
            <i class="size-4" data-lucide="mail"></i>
            <p class="text-xs">NEWSLETTER</p>
          </div>
          <div
            class="hidden items-center-safe justify-center-safe gap-x-2.5 border-r border-r-white pr-2 lg:flex"
          >
            <p class="text-xs">CONTACT US</p>
          </div>
          <div
            class="hidden items-center-safe justify-center-safe gap-x-2.5 pr-2 lg:flex"
          >
            <p class="text-xs">FAQS</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("top-bar", TopBar);
