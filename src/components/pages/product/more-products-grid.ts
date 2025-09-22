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
    this.products = [
      {
        name: "Bamboo Toothbrushes",
        category: "Personal Care",
        imgSrc: "products/bamboo-toothbrushes.jpg",
        price: 150,
      },
      {
        name: "Compostable Trash Bags",
        category: "Home Goods",
        imgSrc: "products/compostable-trash-bags.jpg",
        price: 50,
      },
      {
        name: "Refillable Cleaning Products",
        category: "Home Goods",
        imgSrc: "products/refillable-cleaning-products.jpg",
        price: 75,
      },
    ];
  }

  connectedCallback() {
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
