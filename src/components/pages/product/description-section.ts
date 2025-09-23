import ProductService from "../../../product";

class DescriptionSection extends HTMLElement {
  async connectedCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id") as string;
    const productId = parseInt(idParam, 10);
    const product = await ProductService.getProductById(productId);

    this.innerHTML = `
      <section class="flex flex-col gap-y-4 px-8 md:px-[5dvw] lg:px-[15dvw]">
        <h3 class="font-[Montserrat] text-2xl font-bold">Description</h3>
        <p class="text-justify font-[Karla] text-xl">
          ${product?.longDescription}
        </p>
      </section>
    `;
  }
}

customElements.define("description-section", DescriptionSection);
