import { addToCart, fetchCart, getQuantity } from "../cart";
import { fetchProducts } from "../product";

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

function renderAddToCartButton(itemId: number, inCart: boolean): string {
  return `
    <button
      data-id="${itemId}"
      class="add-to-cart-btn h-[40px] cursor-pointer bg-orange-600 font-[Montserrat] font-bold text-white transition-[background] duration-200 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed"
      ${inCart && "disabled"}
    >
      ${inCart ? "Added" : "Add to Cart"}
    </button>
  `;
}

function animateFlyToCart(event: MouseEvent, sourceImage: HTMLImageElement) {
  const cartIcon = document.querySelector("#cart-button");
  if (!cartIcon) return;

  const cartRect = cartIcon.getBoundingClientRect();

  const flyingImg = sourceImage.cloneNode(true) as HTMLImageElement;
  flyingImg.style.position = "fixed";
  flyingImg.style.zIndex = "1000";
  flyingImg.style.left = event.clientX + "px";
  flyingImg.style.top = event.clientY + "px";
  flyingImg.style.width = "50px";
  flyingImg.style.height = "50px";
  flyingImg.style.transition = "all 0.75s ease-in-out";

  document.body.appendChild(flyingImg);

  flyingImg.getBoundingClientRect();

  flyingImg.style.left = cartRect.left + cartRect.width / 2 + "px";
  flyingImg.style.top = cartRect.top + cartRect.height / 2 + "px";
  flyingImg.style.width = "0px";
  flyingImg.style.height = "0px";
  flyingImg.style.opacity = "0.5";
  flyingImg.style.transform = "rotate(360deg)";

  flyingImg.addEventListener("transitionend", () => {
    const cartCount = document.querySelector("#cart-count-badge");
    if (cartCount) {
      cartCount.innerHTML = Object.keys(
        fetchCart()?.items ?? {},
      ).length.toString();
    }
    flyingImg.remove();
  });
}

async function addProductsToGrid() {
  const grid = document.querySelector("#products-grid");
  if (!grid) return;

  const products = await fetchProducts();

  products.forEach((product) => {
    const quantity = getQuantity(product.id) ?? 0;
    const isInCart = quantity > 0;

    const card = document.createElement("div");
    card.className =
      "product-card flex w-full max-w-[325px] flex-col overflow-hidden rounded-md shadow-xl";
    card.setAttribute("data-category", product.category);

    card.innerHTML = `
      <a href="/product.html?id=${product.id}">
        <img
          class="h-[250px] w-full object-cover"
          src="${product.imagePath}"
          width="250"
          height="250"
          sizes="(max-width: 768px) 100vw, 250px"
          alt="${product.name}"
          loading="lazy"
          decoding="async"
        />
      </a>   
      <div class="flex h-full flex-col gap-y-2 pt-4">
        <div class="flex flex-col gap-y-2 px-4">
          <div class="flex flex-col gap-y-1">
            <a href="/product.html?id=${product.id}" class="hover:underline">
              <h1 class="font-[Montserrat] text-xl leading-5 font-bold">
                ${product.name}
              </h1>
            </a>
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
          <div class="grid grid-cols-2 w-full">
            ${renderAddToCartButton(product.id, isInCart)}
            <a
              class="h-[40px] flex justify-center items-center cursor-pointer bg-stone-700 font-[Montserrat] font-bold text-white transition-[background] duration-200 hover:bg-stone-600"
              href="/product.html?id=${product.id}"
            >
              View
            </a>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function updateCartCount() {
  const cartCount = document.querySelector("#cart-count-badge");
  if (!cartCount) return;
  cartCount.innerHTML = Object.keys(fetchCart()?.items ?? {}).length.toString();
}

function setupCart() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const dataId = button.getAttribute("data-id");
      if (!dataId) return;
      const itemId = parseInt(dataId);
      if (isNaN(itemId)) return;

      addToCart(itemId);

      const card = button.closest(".shadow-xl");
      const image = card?.querySelector("img");
      if (image instanceof HTMLImageElement)
        animateFlyToCart(event as MouseEvent, image);
      button.setAttribute("disabled", "true");
      button.innerHTML = "Added";
    });
  });

  updateCartCount();
}

function setupFilters() {
  const input = document.querySelector<HTMLInputElement>("#search-input");
  const select = document.querySelector<HTMLSelectElement>("#category-select");
  const productCards =
    document.querySelectorAll<HTMLDivElement>(".product-card");

  if (!input || !select) return;

  const applyFilters = () => {
    const searchTerm = input.value.trim().toLowerCase();
    const selectedCategory = select.value;
    let flag = false;

    productCards.forEach((card) => {
      const name = card.querySelector("h1")?.textContent?.toLowerCase() || "";
      const category = card.getAttribute("data-category") || "";

      const matchesSearch = name.includes(searchTerm);
      const matchesCategory =
        !selectedCategory || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        card.classList.remove("hidden");
        flag = true;
      } else {
        card.classList.add("hidden");
      }
    });
    const noProducts = document.querySelector("#no-products");
    if (!noProducts) return;

    if (!flag) {
      noProducts.classList.remove("hidden");
      noProducts.classList.add("flex");
    } else {
      noProducts.classList.add("hidden");
      noProducts.classList.remove("flex");
      noProducts.classList.add("hidden");
      noProducts.classList.remove("flex");
    }
  };

  input.addEventListener("input", applyFilters);
  select.addEventListener("change", applyFilters);

  applyFilters();
}

function setupClearFilters() {
  const clearButton =
    document.querySelector<HTMLButtonElement>("#clear-filters-btn");
  const input = document.querySelector<HTMLInputElement>("#search-input");
  const select = document.querySelector<HTMLSelectElement>("#category-select");

  if (!clearButton || !input || !select) return;

  clearButton.addEventListener("click", () => {
    console.log("Click");
    input.value = "";
    select.value = "";

    const event = new Event("input");
    input.dispatchEvent(event);

    const changeEvent = new Event("change");
    select.dispatchEvent(changeEvent);
  });
}

async function indexPage() {
  await addProductsToGrid();
  setupCart();
  setupFilters();
  setupClearFilters();
}

indexPage();
