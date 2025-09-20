import "./category-card.ts";

class CategorySection extends HTMLElement {
  private readonly categories: {
    category: string;
    imgSrc: string;
    icon: string;
  }[];

  constructor() {
    super();
    this.categories = [
      {
        category: "Home Goods",
        imgSrc: "categories/home-goods.png",
        icon: "brush-cleaning",
      },
      {
        category: "Personal Care",
        imgSrc: "categories/personal-care.png",
        icon: "spray-can",
      },
      {
        category: "Clothing",
        imgSrc: "categories/clothing.png",
        icon: "shirt",
      },
      {
        category: "Kids",
        imgSrc: "categories/kids.png",
        icon: "baby",
      },
      {
        category: "Garden",
        imgSrc: "categories/garden.png",
        icon: "flower-2",
      },
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <section
        class="flex flex-col gap-y-4 px-8 pt-16 pb-4 sm:px-[5dvw] lg:px-[15dvw]"
      >
        <h2 class="text-center font-[Montserrat] text-2xl font-bold">
          Shop by Category
        </h2>
        <div
          id="category-carousel"
          class="flex flex-nowrap gap-x-2 overflow-x-scroll py-3 md:gap-x-4"
          style="scroll-behavior: smooth; cursor: grab"
        />
      </section>
    `;

    const categoryCarousel =
      document.querySelector<HTMLDivElement>("#category-carousel");
    if (!categoryCarousel) return;

    this.categories.forEach(function (category) {
      categoryCarousel.insertAdjacentHTML(
        "beforeend",
        `<category-card data-category="${category.category}" data-img="${category.imgSrc}" data-icon="${category.icon}"></category-card>`,
      );
    });

    this.setupDrag(categoryCarousel);
  }

  setupDrag(categoryCarousel: HTMLDivElement) {
    if (!categoryCarousel) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    categoryCarousel.addEventListener("mousedown", (e) => {
      isDown = true;
      categoryCarousel.classList.add("active");
      startX = e.pageX - categoryCarousel.offsetLeft;
      scrollLeft = categoryCarousel.scrollLeft;
      categoryCarousel.style.cursor = "grabbing";
    });

    categoryCarousel.addEventListener("mouseleave", () => {
      isDown = false;
      categoryCarousel.style.cursor = "grab";
    });

    categoryCarousel.addEventListener("mouseup", () => {
      isDown = false;
      categoryCarousel.style.cursor = "grab";
    });

    categoryCarousel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - categoryCarousel.offsetLeft;
      const walk = (x - startX) * 1.5; // Adjust scroll speed here
      categoryCarousel.scrollLeft = scrollLeft - walk;
    });
  }
}

customElements.define("category-section", CategorySection);
