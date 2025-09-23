import { Entity } from "dexie";
import type AppDB from "./app-db.ts";

export default class Cart extends Entity<AppDB> {
  itemId!: number;
  qty!: number;
}
