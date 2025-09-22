class ProductOnFireSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="mb-8 flex flex-col items-center-safe gap-y-4 px-8 md:px-[5dvw] lg:px-[15dvw]"
      >
        <h3 class="text-center font-[Montserrat] text-3xl font-bold">
          Product on Fire
        </h3>
        <div
          class="flex-co flex gap-8 max-md:items-center-safe md:grid md:grid-cols-2"
        >
          <div
            class="max-w-[300px] overflow-hidden rounded-md md:justify-self-end-safe"
          >
            <img src="products/reusable-beeswax-food-wraps.jpg" />
          </div>
          <div
            class="flex max-w-[400px] flex-col gap-y-2 max-md:items-center-safe md:justify-center-safe"
          >
            <h3 class="font-[Karla] text-2xl font-bold max-md:text-center">
              Reusable Beeswax Food Wraps
            </h3>
            <p class="font-[Karla] max-md:text-center">
              Say goodbye to plastic wrap and hello to sustainability! Our
              Reusable Beeswax Food Wraps are flying off the shelves — and for
              good reason.
            </p>
            <p class="font-[Karla]">
              Don’t miss out! Grab your set now and join the movement towards a
              greener, cleaner kitchen.
            </p>

            <div class="font-[Karla] text-lg max-md:text-center">
              <span class="text-gray-500 line-through">&#8377; 250</span>
              <span class="ml-2 font-bold text-green-700">&#8377; 150</span>
            </div>

            <button
              class="rounded-full bg-[rgb(131,183,53)] px-3 py-2 font-[Karla] text-white md:max-w-[200px] md:px-6"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("product-on-fire-section", ProductOnFireSection);
