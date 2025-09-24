import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        product: "./product.html",
        cart: "./cart.html",
        confirm: "./confirm.html",
        shop: "./shop.html",
      },
    },
  },
});
