import { CategoryService } from "./category.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  imgPath: string;
  sku: string;
  categoryId: number;
  categoryName?: string;
}

export default class ProductService {
  private static products: Product[] = [];

  private static async loadProducts(): Promise<Product[]> {
    if (this.products.length === 0) {
      const response = await fetch("/products.json");
      const data: Product[] = await response.json();

      const productsWithCategoryNames = await Promise.all(
        data.map(async (product) => {
          const categoryName = await CategoryService.getCategoryNameById(
            product.categoryId,
          );
          return {
            ...product,
            categoryName,
          };
        }),
      );

      this.products = productsWithCategoryNames;
    }

    return this.products;
  }

  public static async getAllProducts(): Promise<Product[]> {
    return await this.loadProducts();
  }

  public static async getProductById(id: number): Promise<Product | undefined> {
    const products = await this.loadProducts();
    return products.find((product) => product.id === id);
  }
}
