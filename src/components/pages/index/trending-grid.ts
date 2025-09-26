import ProductService from "../../../product.ts";
import { hideGrid, showGrid } from "../../../utils/anim.ts";
import "../../ui/product-card.ts";

class TrendingGrid extends HTMLElement {
  private readonly products: {
    id: number;
  }[];

  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    const productIds = [6, 13, 30, 22, 11, 20];
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
        id="trending-grid"
        class="grid-cols-2 gap-4 lg:grid-cols-3 hidden -translate-x-16 opacity-0 transition-all duration-300"
      />
    `;

    const trendingGrid =
      document.querySelector<HTMLDivElement>("#trending-grid");
    if (!trendingGrid) return;

    this.products.forEach(function (product) {
      trendingGrid.insertAdjacentHTML(
        "beforeend",
        `<product-card data-id="${product.id}"><product-card>`,
      );
    });
    document.addEventListener("featured-select", function (event) {
      const category = (event as CustomEvent<{ category: string }>).detail
        .category;
      if (category === "trending") showGrid(trendingGrid);
      else hideGrid(trendingGrid);
    });
  }
}

customElements.define("trending-grid", TrendingGrid);
