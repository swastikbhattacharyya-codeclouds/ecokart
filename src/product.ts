export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  imagePath: string;
  price: number;
  stars: number;
  category: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("products.json");
  const products = await response.json();
  return products as Product[];
}

export async function fetchProductDetails(id: number): Promise<Product | null> {
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);
  return product || null;
}
