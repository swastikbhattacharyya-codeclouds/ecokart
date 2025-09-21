class TestimonialCard extends HTMLElement {
  connectedCallback() {
    const quote = this.getAttribute("data-quote");
    const name = this.getAttribute("data-name");
    const imgSrc = this.getAttribute("data-img");

    this.innerHTML = `
      <div
        class="flex h-full flex-col justify-between rounded-md bg-white p-8"
      >
        <div class="flex flex-grow flex-col items-center-safe gap-y-3">
          <i
            class="fill-yellow-500 text-yellow-500"
            data-lucide="quote"
          ></i>
          <p class="text-center font-[Karla]">
            ${quote}
          </p>
        </div>
        <div class="flex flex-col items-center-safe gap-y-2 pt-4">
          <div class="h-[75px] w-[75px] overflow-hidden rounded-full">
            <img src="${imgSrc}" />
          </div>
          <p class="text-center font-[Karla] font-bold">${name}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("testimonial-card", TestimonialCard);
