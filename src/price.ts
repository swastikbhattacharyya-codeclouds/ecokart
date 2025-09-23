import { db } from "./db.ts";
import ProductService from "./product.ts";

export default class Price {
  static shippingRate = 50;
  static taxRate = 0.18;

  public static async calculate() {
    const cartItems = await db.cart.toArray();
    let cartPrice = 0;

    for (const item of cartItems) {
      const product = await ProductService.getProductById(item.itemId);
      if (product) cartPrice += product.price * item.qty;
    }

    const shipping = cartItems.length > 0 ? this.shippingRate : 0;
    const tax = cartPrice * this.taxRate;
    const total = cartPrice + shipping + tax;

    return {
      cartPrice,
      shipping,
      tax,
      total,
    };
  }
}
