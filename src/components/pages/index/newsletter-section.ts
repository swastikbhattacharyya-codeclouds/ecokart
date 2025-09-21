class NewsletterSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col items-center-safe gap-y-2 border-y border-y-gray-300 bg-stone-900 px-4 py-8 text-white"
      >
        <h3 class="font-[Karla] text-2xl text-center font-bold">JOIN OUR NEWSLETTER NOW</h3>
        <div
          class="flex w-[90dvw] max-w-[500px] flex-col gap-2 md:flex-row md:justify-center-safe"
        >
          <input
            class="border border-gray-300 p-2 font-[Karla] outline-none placeholder:text-center"
            type="email"
            placeholder="Your email address"
          />
          <button
            class="bg-[rgb(131,183,53)] px-3 py-2 font-[Karla] text-white md:px-6"
          >
            SIGN UP
          </button>
        </div>
        <p class="text-center font-[Karla]">
          Get the latest news on new offers and discounts
        </p>
      </section>
    `;
  }
}

customElements.define("newsletter-section", NewsletterSection);
