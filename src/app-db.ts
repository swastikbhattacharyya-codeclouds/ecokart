import Dexie, { type EntityTable } from "dexie";
import Cart from "./cart";

export default class AppDB extends Dexie {
  cart!: EntityTable<Cart, "itemId">;

  constructor() {
    super("AppDB");
    this.version(1).stores({
      cart: "&itemId",
    });
    this.cart.mapToClass(Cart);
  }
}
