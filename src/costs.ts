import type { Cart } from "./cart";
import type { Product } from "./product";

interface Costs {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export function calculateCartCosts(cart: Cart, products: Product[]): Costs {
  let subtotal = 0;

  if (Object.entries(cart.items).length === 0)
    return { subtotal: 0, tax: 0, shipping: 0, total: 0 };

  for (const [idStr, quantity] of Object.entries(cart.items)) {
    const id = Number(idStr);
    const product = products.find((p) => p.id === id);
    if (!product) continue;

    subtotal += product.price * quantity;
  }

  const taxRate = 0.18;
  const tax = Math.round(subtotal * taxRate);

  const shipping = 50;

  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
}
