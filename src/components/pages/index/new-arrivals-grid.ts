import "./product-card.ts";
import { hideGrid, showGrid } from "../../../utils/anim.ts";
import ProductService from "../../../product.ts";

class NewArrivalsGrid extends HTMLElement {
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
    const productIds = [1, 4, 15, 25, 28, 7];
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
        id="new-arrivals-grid"
        class="grid-cols-2 gap-4 lg:grid-cols-3 hidden -translate-x-16 opacity-0 transition-all duration-300"
      />
    `;

    const newArrivalsGrid =
      document.querySelector<HTMLDivElement>("#new-arrivals-grid");
    if (!newArrivalsGrid) return;

    this.products.forEach(function (product) {
      newArrivalsGrid.insertAdjacentHTML(
        "beforeend",
        `<product-card data-id="${product.id}" data-name="${product.name}" data-category="${product.category}" data-img="${product.imgSrc}" data-price="${product.price}"><product-card>`,
      );
    });

    document.addEventListener("featured-select", function (event) {
      const category = (event as CustomEvent<{ category: string }>).detail
        .category;
      if (category === "new-arrivals") showGrid(newArrivalsGrid);
      else hideGrid(newArrivalsGrid);
    });
  }
}

customElements.define("new-arrivals-grid", NewArrivalsGrid);
