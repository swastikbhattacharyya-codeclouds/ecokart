import Dexie, { type EntityTable } from "dexie";
import Cart from "./cart";
import type Wishlist from "./wishlist";

export default class AppDB extends Dexie {
  cart!: EntityTable<Cart, "itemId">;
  wishlist!: EntityTable<Wishlist, "productId">;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      cart: "&itemId",
      wishlist: "&productId",
    });
    this.cart.mapToClass(Cart);
  }
}
