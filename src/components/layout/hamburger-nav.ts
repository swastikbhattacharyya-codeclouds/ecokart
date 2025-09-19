class HamburgerNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside
        id="hamburger-nav"
        class="z-50 fixed overflow-y-auto top-0 left-0 hidden h-dvh w-[80dvw] max-w-[300px] -translate-x-full flex-col bg-white shadow-xl transition-all duration-200 lg:hidden"
        data-state="closed"
      >
        <div class="flex items-center-safe p-4">
          <input
            class="flex-1 border-none font-[Karla] text-sm outline-none placeholder:text-gray-500"
            placeholder="Search for products"
          />
          <i class="size-6 text-gray-500" data-lucide="search"></i>
        </div>
        <nav class="flex flex-col font-[Karla]">
          <a
            class="border-t border-b border-t-gray-300 border-b-gray-300 px-4 py-2"
            >Home</a
          >
          <a class="border-b border-b-gray-300 px-4 py-2">Shop</a>
          <a class="border-b border-b-gray-300 px-4 py-2">Blog</a>
          <a class="border-b border-b-gray-300 px-4 py-2">Contact Us</a>
          <a
            class="flex items-center-safe gap-x-2 border-b border-b-gray-300 px-4 py-2"
          >
            <i class="size-4" data-lucide="heart"></i>
            <p>WISHLIST</p>
          </a>
          <a
            class="flex items-center-safe gap-x-2 border-b border-b-gray-300 px-4 py-2"
          >
            <i class="size-4" data-lucide="shuffle"></i>
            <p>COMPARE</p>
          </a>
          <a
            class="flex items-center-safe gap-x-2 border-b border-b-gray-300 px-4 py-2"
          >
            <i class="size-4" data-lucide="user"></i>
            <p>LOGIN / REGISTER</p>
          </a>
        </nav>
      </aside>
    `;

    const hamburgerNav = document.querySelector("#hamburger-nav");
    if (!hamburgerNav) return;

    document.addEventListener("hamburger-nav-open", function () {
      hamburgerNav.classList.remove("hidden");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          hamburgerNav.classList.add("flex");
          hamburgerNav.classList.remove("-translate-x-full");
          hamburgerNav.setAttribute("data-state", "open");
        });
      });
    });

    document.addEventListener("click", function (event) {
      if (hamburgerNav.getAttribute("data-state") !== "open") return;
      if (!event.target) return;

      const isClickInside = hamburgerNav.contains(event.target as Node);
      const isVisible = !hamburgerNav.classList.contains("hidden");

      if (!isClickInside && isVisible) {
        hamburgerNav.classList.add("-translate-x-full");

        function handleTransitionEnd() {
          if (!hamburgerNav) return;
          hamburgerNav.classList.add("hidden");
          hamburgerNav.classList.remove("flex");
          hamburgerNav.setAttribute("data-state", "closed");
          hamburgerNav.removeEventListener(
            "transitionend",
            handleTransitionEnd,
          );
        }

        hamburgerNav.addEventListener("transitionend", handleTransitionEnd);
      }
    });
  }
}

customElements.define("hamburger-nav", HamburgerNav);
