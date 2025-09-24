import ProductService from "../../../product.ts";
import "./product-card.ts";

class ProductsGrid extends HTMLElement {
  private products: {
    id: number;
    name: string;
    categoryId: number;
    category: string;
    imgSrc: string;
    price: number;
  }[];

  constructor() {
    super();
    this.products = [];
  }

  async connectedCallback() {
    const fetchedProducts = await ProductService.getAllProducts();

    const params = new URLSearchParams(window.location.search);
    const filterName = (params.get("name") || "").toLowerCase();
    const filterCategory = params.get("category") || "";

    this.products = fetchedProducts
      .map((product) => ({
        id: product.id,
        name: product.name,
        category: product.categoryName ?? "",
        categoryId: product.categoryId,
        imgSrc: product.imgPath,
        price: product.price,
      }))
      .filter((p) => {
        const matchesName =
          !filterName || p.name.toLowerCase().includes(filterName);
        const matchesCategory =
          !filterCategory || p.categoryId === parseInt(filterCategory);
        return matchesName && matchesCategory;
      });

    this.innerHTML = `
      <div
        id="products-grid"
        class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-300"
      />
    `;

    const bestSellersGrid =
      document.querySelector<HTMLDivElement>("#products-grid");
    if (!bestSellersGrid) return;

    this.products.forEach(function (product) {
      bestSellersGrid.insertAdjacentHTML(
        "beforeend",
        `<product-card data-id="${product.id}" data-name="${product.name}" data-category="${product.category}" data-img="${product.imgSrc}" data-price="${product.price}"><product-card>`,
      );
    });
  }
}

customElements.define("products-grid", ProductsGrid);
