import ProductService from "../../../product.ts";
import { hideGrid, showGrid } from "../../../utils/anim.ts";
import "./product-card.ts";

class MoreProductsGrid extends HTMLElement {
  private readonly products: {
    name: string;
    category: string;
    imgSrc: string;
    price: number;
  }[];

  constructor() {
    super();
    this.products = [];
  }

  private getRandomUniqueIds(
    count: number,
    min: number,
    max: number,
  ): number[] {
    const set = new Set<number>();
    while (set.size < count) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      set.add(rand);
    }
    return Array.from(set);
  }

  async connectedCallback() {
    const randomIds = this.getRandomUniqueIds(3, 1, 30);

    for (const id of randomIds) {
      const product = await ProductService.getProductById(id);
      if (product) {
        this.products.push({
          name: product.name,
          category: product.categoryName ?? "",
          imgSrc: product.imgPath,
          price: product.price,
        });
      }
    }

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
        `<product-card data-name="${product.name}" data-category="${product.category}" data-img="${product.imgSrc}" data-price="${product.price}"><product-card>`,
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

customElements.define("more-products-grid", MoreProductsGrid);
