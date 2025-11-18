export function Header() {
  return `
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <a href="index.html">
          <picture>
            <source
              media="(min-width: 640px)"
              srcset="assets/images/logo-primary-48.png"
              type="image/webp"
            />
            <img
              src="assets/images/logo-primary-36.png"
              alt="Trove logo"
            /> </picture
        ></a>
        <a href="/login/index.html" class="btn btn_round sm:hidden">
          <span class="material-symbols-outlined"> login </span>
        </a>
        <a
          href="/login/index.html"
          class="btn btn_primary hidden items-center gap-2 sm:inline-flex"
        >
          <span class="material-symbols-outlined"> login </span>
          <p>Log in</p>
        </a>
      </div>
    `;
}

export function HeaderLoggedIn() {
  return `
<div class="mx-auto flex max-w-7xl items-center justify-between">
        <a href="index.html">
          <picture>
            <source
              media="(min-width: 640px)"
              srcset="assets/images/logo-primary-48.png"
              type="image/webp"
            />
            <img
              src="assets/images/logo-primary-36.png"
              alt="Trove logo"
            /> </picture
        ></a>

        <div class="flex items-center gap-3 sm:gap-4">
          <div
            class="bg-primary-normal text-primary-dark rounded-xl px-2 py-1 text-sm font-semibold sm:px-3 sm:py-2"
          >
            <p>CREDITS: 1000</p>
          </div>
          <figure>
            <div class="bg-gray-medium h-12 w-12 rounded-full"></div>
          </figure>
        </div>
      </div>
    `;
}
