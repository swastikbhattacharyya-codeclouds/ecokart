import { fetchProducts, shuffleProducts } from "./product";

function renderStars(rating: number): string {
  const rounded = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(rounded);
  const halfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let html = "";
  for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star"></i>';
  if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
  for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star"></i>';

  return html;
}

async function addProductsToGrid() {
  const grid = document.querySelector("#products-grid");
  const products = shuffleProducts(await fetchProducts());

  products.forEach(function (product) {
    const card = document.createElement("div");
    card.className =
      "flex w-full max-w-[300px] flex-col overflow-hidden rounded-md shadow-xl";

    card.innerHTML = `
      <img
        class="h-[250px] w-full object-cover"
        src="${product.imagePath}"
        alt="${product.name}"
      />
      <div class="flex h-full flex-col gap-y-2 pt-4">
        <div class="flex flex-col gap-y-2 px-4">
          <div class="flex flex-col gap-y-1">
            <h1 class="font-[Montserrat] text-xl leading-5 font-bold">${product.name}</h1>
            <p class="font-[Karla] leading-4 text-gray-700">${product.shortDescription}</p>
          </div>
        </div>
        <div class="flex flex-col h-full justify-end">
          <div class="px-4 py-1">
            <div class="flex justify-between items-center">
              <div class="text-yellow-500">
                ${renderStars(product.stars)}
              </div>
              <p class="font-[Montserrat] text-lg font-bold">&#8377; ${product.price}</p>
            </div>
          </div>
          <button
            class="w-full h-[40px] cursor-pointer bg-orange-600 font-[Montserrat] font-bold text-white transition-[background] duration-200 hover:bg-orange-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    `;

    grid?.appendChild(card);
  });
}

addProductsToGrid();
