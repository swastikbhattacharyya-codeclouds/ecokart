import "./best-sellers-grid.ts";
import "./new-arrivals-grid.ts";
import "./trending-grid.ts";

class FeaturedProductsSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col gap-y-4 px-8 py-4 sm:px-[5dvw] lg:px-[15dvw]"
      >
        <div class="flex flex-col gap-y-1">
          <h2 class="text-center font-[Montserrat] text-2xl font-bold">
            Featured Products
          </h2>
          <p class="text-center font-[Karla]">
            Visit our shop to see amazing creations from our designers
          </p>
        </div>
        <div class="mb-4 flex justify-center-safe gap-x-4">
          <button
            id="best-sellers-btn"
            class="cursor-pointer font-[Karla] leading-none font-bold hover:underline md:text-lg"
          >
            BEST SELLERS
          </button>
          <button
            id="new-arrivals-btn"
            class="cursor-pointer font-[Karla] leading-none font-bold hover:underline md:text-lg"
          >
            NEW ARRIVALS
          </button>
          <button
            id="trending-btn"
            class="cursor-pointer font-[Karla] leading-none font-bold hover:underline md:text-lg"
          >
            TRENDING
          </button>
        </div>
        <best-sellers-grid></best-sellers-grid>
        <new-arrivals-grid></new-arrivals-grid>
        <trending-grid></new-arrivals-grid>
      </section>
    `;

    const bestSellersBtn = document.querySelector(
      "#best-sellers-btn",
    ) as HTMLButtonElement;
    const newArrivalsBtn = document.querySelector(
      "#new-arrivals-btn",
    ) as HTMLButtonElement;
    const trendingBtn = document.querySelector(
      "#trending-btn",
    ) as HTMLButtonElement;

    const buttons = [bestSellersBtn, newArrivalsBtn, trendingBtn];
    bestSellersBtn.classList.add("underline");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("underline");
        });
        btn.classList.add("underline");
        const category = btn.textContent
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, "-");
        this.dispatchEvent(
          new CustomEvent("featured-select", {
            bubbles: true,
            detail: { category },
          }),
        );
      });
    });
  }
}

customElements.define("featured-products-section", FeaturedProductsSection);
