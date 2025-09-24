class AppNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav
        class="hidden gap-x-4 border-t border-t-gray-300 py-3 font-[Montserrat] font-bold md:flex md:justify-evenly md:px-[10dvw] lg:px-[25dvw]"
      >
        <a href="/index.html" class="cursor-pointer">HOME</a>
        <a href="/shop.html" class="cursor-pointer">SHOP</a>
        <a class="cursor-pointer">BLOG</a>
        <a class="cursor-pointer">CONTACT US</a>
      </nav>
    `;
  }
}

customElements.define("app-nav", AppNav);
