import "./testimonial-card.ts";

class TestimonialsSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="flex flex-col items-center-safe pt-4 pb-8">
        <div class="flex flex-col items-center-safe gap-y-1">
          <h3 class="text-center font-[Montserrat] text-2xl font-bold">
            Testimonials
          </h3>
          <p class="text-center font-[Karla]">
            What our customers say about us
          </p>
        </div>
        <div
          class="grid gap-4 px-4 py-8 max-md:grid-rows-3 sm:grid-cols-2 md:px-[5dvw] lg:grid-cols-3 lg:px-[15dvw]"
        >
          <testimonial-card
            data-quote="I’ve been slowly switching to a zero-waste lifestyle, and EcoKart made it so easy. Their packaging is minimal and plastic-free, and every product I’ve tried has been durable and well-made. I especially love the reusable straws—they even come with a cleaning brush!"
            data-name="Jason Roberts"
            data-img="testimonials/jason-roberts.jpg"
          ></testimonial-card>
          <testimonial-card
            data-quote="What I love most about EcoKart is their commitment to the planet. The bamboo toothbrushes are soft on my gums and the beeswax wraps keep my food fresh longer than cling film ever did. I’ve recommended EcoKart to all my friends who want to make simple, impactful eco-swaps!"
            data-name="Sarah Connor"
            data-img="testimonials/sarah-connor.jpg"
          ></testimonial-card>
          <testimonial-card
            data-quote="EcoKart has completely changed the way I shop for everyday essentials. The beeswax wraps are a game-changer in my kitchen—no more plastic wrap! Plus, the quality of their bamboo toothbrushes and metal straws is top-notch. It feels good to make sustainable choices without compromising on style or function."
            data-name="Reed Johnson"
            data-img="testimonials/reed-johnson.jpg"
          ></testimonial-card>
        </div>
      </section>
    `;
  }
}

customElements.define("testimonials-section", TestimonialsSection);
