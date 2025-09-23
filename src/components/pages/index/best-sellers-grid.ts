import ProductService from "../../../product.ts";
import { hideGrid, showGrid } from "../../../utils/anim.ts";
import "./product-card.ts";

class BestSellersGrid extends HTMLElement {
  private readonly products: {
    id: number;
    name: string;
    category: string;
    imgSrc: string;
    price: number;
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
        name: product.name,
        category: product.categoryName ?? "",
        imgSrc: product.imgPath,
        price: product.price,
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
        `<product-card data-id="${product.id}" data-name="${product.name}" data-category="${product.category}" data-img="${product.imgSrc}" data-price="${product.price}"><product-card>`,
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
