import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        checkout: "./checkout.html",
        confirmed: "./confirmed.html",
        product: "./product.html",
      },
    },
  },
  plugins: [tailwindcss()],
});
