class AppNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav
        class="z-50 hidden gap-x-4 border-t border-t-gray-300 bg-white py-3 font-[Montserrat] font-bold shadow-xl md:sticky md:top-0 md:flex md:justify-evenly md:px-[10dvw] lg:px-[25dvw]"
      >
        <a class="cursor-pointer">HOME</a>
        <a class="cursor-pointer">SHOP</a>
        <a class="cursor-pointer">BLOG</a>
        <a class="cursor-pointer">CONTACT US</a>
      </nav>
    `;
  }
}

customElements.define("app-nav", AppNav);
