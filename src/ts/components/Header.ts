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
    <header class="top-0 px-4 py-4 sm:px-12 sm:py-6">
      <div class="relative mx-auto flex max-w-7xl items-center justify-between">
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
          <figure class="cursor-pointer" onclick="toggleDropdown()">
            <div class="bg-gray-medium h-12 w-12 rounded-full"></div>
          </figure>
        </div>
        <div
          id="dropdown"
          class="shadow-dropdown absolute top-18 right-0 block max-h-0 w-full overflow-hidden rounded-xl bg-white transition-all duration-500 ease-in-out sm:w-[300px]"
        >
          <div class="p4-4 flex justify-between p-4">
            <div class="flex items-center gap-2">
              <figure>
                <div class="bg-gray-medium h-12 w-12 rounded-full"></div>
              </figure>
              <p>Carina M. Pedersen</p>
            </div>
            <span
              class="material-symbols-outlined cursor-pointer"
              onclick="toggleDropdown()"
            >
              close
            </span>
          </div>
          <hr class="bg-gray-medium h-px border-0" />
          <div id="dropdown-links">
            <a
              href="/profile/index.html"
              class="hover:bg-primary-light flex items-center gap-2 p-4 hover:font-semibold"
              ><span class="material-symbols-outlined"> account_circle </span>
              <p>Profile</p></a
            >
            <button
              type="button"
              class="hover:bg-primary-light flex w-full items-center gap-2 p-4 hover:font-semibold"
            >
              <span class="material-symbols-outlined"> logout </span> Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
    `;
}
