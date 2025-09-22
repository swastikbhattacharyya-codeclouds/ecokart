class ProductSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col gap-4 px-8 md:grid md:grid-cols-2 md:gap-12 md:px-[5dvw] lg:px-[15dvw]"
      >
        <a
          href="javascript:history.back()"
          class="inline-block w-max rounded-full border border-green-500 bg-green-100 px-4 py-2 font-[Karla] text-sm font-medium text-green-700 transition md:hidden"
        >
          ← Go Back
        </a>
        <div class="relative max-md:h-[400px] max-md:w-full">
          <img
            class="absolute h-full w-full rounded-md object-cover"
            src="products/reusable-beeswax-food-wraps.jpg"
          />
        </div>
        <div class="flex flex-col gap-y-4">
          <a
            href="javascript:history.back()"
            class="hidden w-max rounded-full border border-green-500 bg-green-100 px-4 py-2 font-[Karla] text-sm font-medium text-green-700 transition md:inline-block"
          >
            ← Go Back
          </a>
          <h1 class="font-[Montserrat] text-3xl font-bold md:text-4xl">
            Reusable Beeswax Food Wraps
          </h1>
          <p class="font-[Karla] text-3xl font-bold">&#8377; 150</p>
          <p class="font-[Karla] text-xl">
            Wrap your food the eco-friendly way with our Reusable Beeswax Food
            Wraps — made from organic cotton and natural beeswax. These
            breathable, antibacterial wraps keep your food fresh longer and are
            reusable for up to a year, helping you reduce plastic waste without
            sacrificing convenience.
          </p>
          <div class="flex items-center-safe gap-x-4">
            <div class="flex w-max items-stretch py-1 font-[Karla]">
              <button
                class="flex h-8 w-8 items-center-safe justify-center-safe rounded-l-full bg-gray-300 font-bold"
              >
                –
              </button>
              <div
                class="flex w-10 items-center-safe justify-center-safe border border-green-200 text-center font-semibold text-green-900 select-none"
              >
                1
              </div>
              <button
                class="flex h-8 w-8 items-center-safe justify-center-safe rounded-r-full bg-gray-300 font-bold"
              >
                +
              </button>
            </div>
            <button
              class="max-w-[300px] flex-1 rounded-full bg-[rgb(131,183,53)] p-3 font-[Karla] text-white"
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
            <div class="flex items-center-safe gap-x-2">
              <i class="size-4" data-lucide="heart"></i>
              <p>Add to Wishlist</p>
            </div>
          </div>
          <div class="font-[Karla]">
            <p><b>SKU:</b> MRV-4040</p>
            <p><b>Categories:</b> Home Goods</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("product-section", ProductSection);
