class BottomBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside
        class="fixed bottom-0 z-40 grid w-full grid-cols-4 bg-white py-2.5 font-[Karla] shadow-[-2px_-2px_8px_rgba(0,0,0,0.1)] lg:hidden"
      >
        <div class="flex flex-col items-center-safe">
          <i class="size-6" data-lucide="store"></i>
          <p class="text-xs">Shop</p>
        </div>
        <div class="flex flex-col items-center-safe">
          <i class="size-6" data-lucide="heart"></i>
          <p class="text-xs">Wishlist</p>
        </div>
        <div class="flex flex-col items-center-safe">
          <i class="size-6" data-lucide="user"></i>
          <p class="text-xs">My Account</p>
        </div>
        <div class="flex flex-col items-center-safe">
          <i class="size-6" data-lucide="shuffle"></i>
          <p class="text-xs">Compare</p>
        </div>
      </aside>
    `;
  }
}

customElements.define("bottom-bar", BottomBar);
