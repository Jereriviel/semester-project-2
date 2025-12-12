export function Hero() {
  const hero = document.createElement("div") as HTMLDivElement;
  hero.classList =
    "text-secondary-ultra-light mx-auto grid max-w-7xl grid-cols-2 px-4 py-8 sm:p-12 xl:px-0";

  hero.innerHTML = `
          <h1 class="self-end text-4xl uppercase sm:text-[40px]">
            Explore. <br class="sm:hidden" />Bid. <br class="sm:hidden" />Win.
          </h1>
          <figure class="row-span-2 self-center justify-self-end">
            <img
              src="/assets/images/gavel.png"
              alt="Illustration of a gavel"
              class="w-[150px] sm:w-[260px]"
            />
          </figure>
          <p
            class="col-span-2 max-w-[600px] pt-4 text-lg font-extralight sm:col-span-1 sm:pt-2 sm:text-xl"
          >
            Welcome to Trove, a place where you can find and trade valuable and
            unique items - all from one hand to another!
          </p>
    `;

  return hero;
}
