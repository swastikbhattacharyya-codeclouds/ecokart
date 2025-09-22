import "./product-card.ts";
import { hideGrid, showGrid } from "../../../utils/anim.ts";

class NewArrivalsGrid extends HTMLElement {
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
        name: "Reusable Beeswax Food Wraps",
        category: "Home Goods",
        imgSrc: "products/reusable-beeswax-food-wraps.jpg",
        price: 250,
      },
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
      {
        name: "Stainless Steel Straws",
        category: "Home Goods",
        imgSrc: "products/stainless-steel-straws.jpg",
        price: 100,
      },
      {
        name: "Eco Laundry Cleaning Sheets",
        category: "Home Goods",
        imgSrc: "products/eco-laundry-cleaning-sheets.jpg",
        price: 125,
      },
    ];
  }

  connectedCallback() {
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
        `<product-card data-name="${product.name}" data-category="${product.category}" data-img="${product.imgSrc}" data-price="${product.price}"><product-card>`,
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
