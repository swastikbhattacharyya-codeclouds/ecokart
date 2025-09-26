import ProductService from "../../../product.ts";
import { hideGrid, showGrid } from "../../../utils/anim.ts";
import "../../ui/product-card.ts";

class BestSellersGrid extends HTMLElement {
  private readonly products: {
    id: number;
  }[];

  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    const productIds = [2, 5, 9, 13, 17, 26];
    const fetchedProducts = await ProductService.getAllProducts();

    const shownProducts = fetchedProducts.filter((product) =>
      productIds.includes(product.id),
    );

    shownProducts.forEach((product) => {
      this.products.push({
        id: product.id,
      });
    });

    this.innerHTML = `
      <div
        id="best-sellers-grid"
        class="grid grid-cols-2 gap-4 lg:grid-cols-3 transition-all duration-300"
      />
    `;

    const bestSellersGrid =
      document.querySelector<HTMLDivElement>("#best-sellers-grid");
    if (!bestSellersGrid) return;

    this.products.forEach(function (product) {
      bestSellersGrid.insertAdjacentHTML(
        "beforeend",
        `<product-card data-id="${product.id}"><product-card>`,
      );
    });

    document.addEventListener("featured-select", function (event) {
      const category = (event as CustomEvent<{ category: string }>).detail
        .category;
      if (category === "best-sellers") showGrid(bestSellersGrid);
      else hideGrid(bestSellersGrid);
    });
  }
}

customElements.define("best-sellers-grid", BestSellersGrid);
