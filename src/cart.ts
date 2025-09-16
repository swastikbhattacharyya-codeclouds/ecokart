export interface Cart {
  items: Record<number, number>;
  discountCode: string;
}

export function fetchCart() {
  const cart = localStorage.getItem("cart");
  if (!cart) return;
  const parsed = JSON.parse(cart);
  return parsed as Cart;
}

export function saveCart(cart: Cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getQuantity(item: number) {
  const cart = fetchCart();
  if (!cart) return;

  if (cart.items[item] !== undefined) return cart.items[item];
  else return null;
}

export function setQuantity(item: number, quantity: number) {
  const cart = fetchCart();
  if (!cart) return;
  cart.items[item] = quantity;
  saveCart(cart);
}

export function addToCart(item: number) {
  const cart = fetchCart() ?? {
    items: {},
    discountCode: "",
  };

  cart.items[item] = (cart.items[item] ?? 0) + 1;
  saveCart(cart);

  return cart.items[item];
}

export function removeFromCart(item: number) {
  const cart = fetchCart();
  if (!cart) return;

  if (cart.items[item] !== undefined) {
    if (cart.items[item] > 1) cart.items[item]--;
    else delete cart.items[item];
  }

  saveCart(cart);
}
