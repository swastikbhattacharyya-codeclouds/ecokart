import { Entity } from "dexie";
import type AppDB from "./app-db.ts";

export default class Wishlist extends Entity<AppDB> {
  productId!: number;
}
