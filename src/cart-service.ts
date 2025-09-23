import { db } from "./db.ts";
import ProductService from "./product.ts";

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export async function addToCart(itemId: number, qty: number) {
  const existing = await db.cart.get(itemId);
  if (existing) {
    const newQty = clamp(existing!.qty + qty, 1, 10);
    await db.cart.update(itemId, { qty: newQty });
  } else await db.cart.add({ itemId, qty });
}

export async function removeFromCart(itemId: number, qty: number) {
  const existing = await db.cart.get(itemId);
  if (!existing) return;
  const newQty = clamp(existing!.qty - qty, 0, 10);
  if (newQty === 0) await db.cart.delete(itemId);
  await db.cart.update(itemId, { qty: newQty });
}

export async function getCartTotalPrice(): Promise<number> {
  const cartItems = await db.cart.toArray();
  let total = 0;

  for (const item of cartItems) {
    const product = await ProductService.getProductById(item.itemId);
    if (product) total += product.price * item.qty;
  }

  return total;
}
