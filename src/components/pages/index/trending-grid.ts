import "./product-card.ts";

class TrendingGrid extends HTMLElement {
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
        id="trending-grid"
        class="grid-cols-2 gap-4 lg:grid-cols-3 hidden"
      />
    `;

    const bestSellersGrid =
      document.querySelector<HTMLDivElement>("#trending-grid");
    if (!bestSellersGrid) return;

    this.products.forEach(function (product) {
      bestSellersGrid.insertAdjacentHTML(
        "beforeend",
        `<product-card data-name="${product.name}" data-category="${product.category}" data-img="${product.imgSrc}" data-price="${product.price}"><product-card>`,
      );
    });
  }
}

customElements.define("trending-grid", TrendingGrid);
