class DealSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col items-center-safe gap-4 bg-green-700 p-8 text-white md:grid md:grid-cols-2 md:px-[5dvw] lg:px-[15dvw]"
      >
        <div class="flex flex-col gap-y-1 max-md:items-center-safe">
          <h3 class="font-[Montserrat] text-2xl font-bold max-md:text-center">
            This Week’s Eco-Saver!
          </h3>
          <p class="font-[Karla] font-bold max-md:text-center">
            Save 20% on our Eco Essentials Bundle!
          </p>
          <p class="font-[Karla] max-md:text-center">
            Switch to a greener lifestyle with our best-selling set of bamboo
            toothbrushes, beeswax wraps, and metal straws—all in one
            eco-friendly bundle. This week only, enjoy 20% off and free shipping
            on your order!
          </p>
          <button
            class="mt-2 cursor-pointer rounded-full bg-[rgb(131,183,53)] px-3 py-2 font-[Karla] shadow-md md:max-w-[200px]"
          >
            Shop Now
          </button>
        </div>
        <img
          class="max-h-[200px] max-w-[200px] md:max-h-[300px] md:max-w-[300px] md:justify-self-end-safe"
          src="deal.png"
        />
      </section>
    `;
  }
}

customElements.define("deal-section", DealSection);
