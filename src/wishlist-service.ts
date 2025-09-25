import { db } from "./db.ts";

export async function addToWishlist(productId: number) {
  const existing = await db.wishlist.get(productId);
  if (existing) return;
  else await db.wishlist.add({ productId });
}

export async function removeFromWishlist(productId: number) {
  const existing = await db.wishlist.get(productId);
  if (!existing) return;
  await db.wishlist.delete(productId);
}
