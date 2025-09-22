class DescriptionSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="flex flex-col gap-y-4 px-8 md:px-[5dvw] lg:px-[15dvw]">
        <h3 class="font-[Montserrat] text-2xl font-bold">Description</h3>
        <p class="text-justify font-[Karla] text-xl">
          Say goodbye to single-use plastics and hello to sustainable food
          storage. Our Reusable Beeswax Food Wraps are handcrafted from 100%
          organic cotton, sustainably harvested beeswax, jojoba oil, and tree
          resin. The result is a naturally antibacterial and breathable wrap
          that keeps your food fresher for longer — no harmful chemicals, no
          waste. Perfect for wrapping fruits, vegetables, cheese, sandwiches, or
          covering bowls, these wraps mold effortlessly with the warmth of your
          hands and hold their shape as they cool. They're easy to clean with
          cold water and mild soap, and can be reused for up to 12 months. When
          it’s time to say goodbye, simply compost them — they’re biodegradable
          and zero-waste. Make a simple yet impactful switch in your kitchen.
          Whether you're packing a school lunch, storing leftovers, or keeping
          snacks fresh on the go, our beeswax wraps offer a stylish, sustainable
          solution that aligns with your values. Join the movement toward a
          cleaner planet — one wrap at a time.
        </p>
      </section>
    `;
  }
}

customElements.define("description-section", DescriptionSection);
