class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer
        class="flex flex-col gap-y-4 px-8 pt-4 pb-20 font-[Karla] md:px-[15dvw] md:pt-8 lg:pb-8"
      >
        <div class="flex flex-col gap-y-8 md:grid md:grid-cols-3 md:gap-x-4">
          <div class="flex flex-col gap-y-2">
            <img
              class="-translate-x-[15px]"
              src="logo.png"
              width="150"
              height="39"
            />
            <p class="text-sm text-gray-600">
              Delivering a Greener Tomorrow, One Eco-Friendly Product at a Time.
            </p>
            <ul class="flex flex-col gap-y-1">
              <li class="flex gap-x-2 text-gray-700">
                <i data-lucide="map-pin-house"></i>
                <p>Plot No. 27, 3rd Floor, Kolkata, India</p>
              </li>
              <li class="flex gap-x-2 text-gray-700">
                <i data-lucide="phone"></i>
                <p>+91 94123 49102</p>
              </li>
              <li class="flex gap-x-2 text-gray-700">
                <i data-lucide="mail"></i>
                <p>contact@ecokart.com</p>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-y-2">
            <h3 class="my-1 font-bold">OUR STORES</h3>
            <ul class="flex flex-col gap-y-2">
              <li><a class="text-gray-700">Kolkata</a></li>
              <li><a class="text-gray-700">New York</a></li>
              <li><a class="text-gray-700">London</a></li>
              <li><a class="text-gray-700">Copenhagen</a></li>
              <li><a class="text-gray-700">Berlin</a></li>
              <li><a class="text-gray-700">Malmo</a></li>
            </ul>
          </div>
          <div class="flex flex-col gap-y-2">
            <h3 class="my-1 font-bold">USEFUL LINKS</h3>
            <ul class="flex flex-col gap-y-2">
              <li><a class="text-gray-700">Privacy Policy</a></li>
              <li><a class="text-gray-700">Returns</a></li>
              <li><a class="text-gray-700">Terms &amp; Conditions</a></li>
              <li><a class="text-gray-700">Contact Us</a></li>
              <li><a class="text-gray-700">Latest News</a></li>
              <li><a class="text-gray-700">Our Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-t-gray-300 pt-4 text-center">
          <b>ECOKART</b> &copy; 2025, All Rights Reserved
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
