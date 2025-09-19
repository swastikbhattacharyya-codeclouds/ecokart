class HeroSection extends HTMLElement {
  private readonly products;

  constructor() {
    super();
    this.products = [
      {
        category: "Kitchen & Dining",
        name: "Reusable Bamboo Cutlery Set",
        description:
          "Lightweight and portable bamboo cutlery for everyday and travel use. Ditch disposables for good.",
        price: "₹299",
        image: "hero-1.png",
      },
      {
        category: "Eco Bathroom",
        name: "Bamboo Toothbrush",
        description:
          "Sustainable bamboo handle toothbrush with soft bristles. Gentle on teeth, kind to Earth.",
        price: "₹99",
        image: "hero-2.png",
      },
      {
        category: "On-the-Go",
        name: "Stainless Steel Straw Set",
        description:
          "Reusable and travel-friendly straw set with cleaning brush and pouch.",
        price: "₹199",
        image: "hero-3.png",
      },
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <section
        class="relative flex h-[600px] items-center-safe justify-center-safe overflow-hidden"
      >
        <img
          class="absolute -z-10 h-full w-full object-cover brightness-30"
          src="hero.jpg"
        />
        <div
          class="flex flex-col items-center-safe justify-center-safe gap-y-6 px-4 text-white md:grid md:grid-cols-2 md:content-center md:items-start md:px-[15dvw]"
        >
          <div
            class="flex flex-col gap-y-2 max-md:items-center-safe md:h-full md:max-w-[400px] md:justify-center-safe"
          >
            <h3
              id="hero-category"
              class="translate-y-8 font-[Karla] font-bold text-gray-300 opacity-0 transition-all delay-100 duration-700 max-md:text-center"
            >
              Kitchen &amp; Dining
            </h3>
            <h1
              id="hero-name"
              class="translate-y-8 font-[Montserrat] text-3xl font-bold opacity-0 transition-all delay-300 duration-700 max-md:text-center md:text-5xl"
            >
              Reusable Bamboo Cutlery Set
            </h1>
            <p
              id="hero-description"
              class="translate-y-8 font-[Karla] opacity-0 transition-all delay-500 duration-700 max-md:text-center"
            >
              Lightweight and portable bamboo cutlery for everyday and travel
              use. Ditch disposables for good.
            </p>
            <p
              id="hero-price"
              class="translate-y-8 font-[Karla] text-2xl font-bold opacity-0 transition-all delay-700 duration-700 max-md:text-center"
            >
              &#8377;299
            </p>
          </div>
          <img
            id="hero-img"
            class="translate-x-10 text-lg opacity-0 transition-all delay-500 duration-700 max-md:max-w-[300px]"
            src="hero-1.png"
          />
        </div>
      </section>
    `;
    const category = this.querySelector("#hero-category");
    const name = this.querySelector("#hero-name");
    const description = this.querySelector("#hero-description");
    const price = this.querySelector("#hero-price");
    const img = this.querySelector("#hero-img");

    const products = this.products;

    let currentIndex = 0;

    function updateContent(index: number) {
      const product = products[index];
      category!.textContent = product.category;
      name!.textContent = product.name;
      description!.textContent = product.description;
      price!.textContent = product.price;
      img!.setAttribute("src", product.image);
    }

    function animateIn() {
      category?.classList.remove("translate-y-8", "opacity-0");
      name?.classList.remove("translate-y-8", "opacity-0");
      description?.classList.remove("translate-y-8", "opacity-0");
      price?.classList.remove("translate-y-8", "opacity-0");
      img?.classList.remove("translate-x-10", "opacity-0");
    }

    function animateOut() {
      category?.classList.add("translate-y-8", "opacity-0");
      name?.classList.add("translate-y-8", "opacity-0");
      description?.classList.add("translate-y-8", "opacity-0");
      price?.classList.add("translate-y-8", "opacity-0");
      img?.classList.add("translate-x-10", "opacity-0");
    }

    updateContent(currentIndex);
    setTimeout(animateIn, 50);

    setInterval(function () {
      animateOut();
      setTimeout(function () {
        currentIndex = (currentIndex + 1) % products.length;
        updateContent(currentIndex);
        animateIn();
      }, 1600);
    }, 5000);
  }
}

customElements.define("hero-section", HeroSection);
