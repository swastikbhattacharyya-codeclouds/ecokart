export interface Product {
  name: string;
  shortDescription: string;
  longDescription: string;
  imagePath: string;
  price: number;
  stars: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("products.json");
  const products = await response.json();
  return products as Product[];
}

export function shuffleProducts(products: Product[]): Product[] {
  const copy = [...products];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
