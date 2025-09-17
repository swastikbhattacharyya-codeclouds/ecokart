import type { Cart } from "./cart";
import type { Product } from "./product";

interface Costs {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

interface DiscountCode {
  code: string;
  discount: number;
}

async function getDiscountCodes() {
  const response = await fetch("discount-codes.json");
  const codes = await response.json();
  return codes as DiscountCode[];
}

export async function calculateCartCosts(
  cart: Cart,
  products: Product[],
): Promise<Costs> {
  let subtotal = 0;

  if (Object.entries(cart.items).length === 0)
    return { subtotal: 0, tax: 0, shipping: 0, discount: 0, total: 0 };

  for (const [idStr, quantity] of Object.entries(cart.items)) {
    const id = Number(idStr);
    const product = products.find((p) => p.id === id);
    if (!product) continue;

    subtotal += product.price * quantity;
  }

  const taxRate = 0.18;
  const shipping = 50;
  let discount = 0;

  if (cart.discountCode) {
    const discountCodes = await getDiscountCodes();
    const matchedCode = discountCodes.find(
      (d) => d.code.toLowerCase() === cart.discountCode!.toLowerCase(),
    );
    if (matchedCode) discount = matchedCode.discount;
  }

  const discountAmount = subtotal * discount;

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(discountedSubtotal * taxRate);
  const total = discountedSubtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    discount: discountAmount,
    total,
  };
}
