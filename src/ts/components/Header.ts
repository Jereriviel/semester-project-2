import { isLoggedIn, getUser } from "../store/userStore.js";
import { getProfile } from "../services/profile.js";

export async function Header() {
  const loggedIn = isLoggedIn();
  let profileHTML = "";

  if (loggedIn) {
    const user = getUser();
    if (user) {
      const profile = await getProfile(user.name);

      const avatarUrl = profile.avatar?.url;
      const avatarAlt = profile.name;
      const credits = profile.credits;
      const userName = profile.name;

      profileHTML = `
        <div class="flex items-center gap-3 sm:gap-4">
          <div
            class="bg-primary-normal text-primary-dark rounded-xl px-2 py-1 text-sm font-semibold sm:px-3 sm:py-2"
          >
            <p>CREDITS: ${credits}</p>
          </div>

          <figure class="cursor-pointer" onclick="toggleDropdown()">
            <img 
              src="${avatarUrl}" 
              alt="${avatarAlt}" 
              class="h-12 w-12 rounded-full object-cover"
            />
          </figure>
        </div>

        <div
          id="dropdown"
          class="shadow-dropdown absolute top-18 right-0 block max-h-0 w-full overflow-hidden rounded-xl bg-white transition-all duration-500 ease-in-out sm:w-[300px]"
        >
          <div class="p4-4 flex justify-between p-4">
            <div class="flex items-center gap-2">
              <figure>
                <img 
                  src="${avatarUrl}" 
                  alt="${avatarAlt}" 
                  class="h-12 w-12 rounded-full object-cover"
                />
              </figure>
              <p>${userName}</p>
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
            >
              <span class="material-symbols-outlined"> account_circle </span>
              <p>Profile</p>
            </a>
            <button
              id="logout-btn"
              type="button"
              class="hover:bg-primary-light flex w-full items-center gap-2 p-4 hover:font-semibold"
            >
              <span class="material-symbols-outlined"> logout </span> Log Out
            </button>
          </div>
        </div>
      `;
    }
  }

  const loginHTML = `
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
  `;

  return `
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
            />
          </picture>
        </a>

        ${loggedIn ? profileHTML : loginHTML}
      </div>
  `;
}

export async function renderHeader() {
  const headers = document.querySelectorAll("header");

  for (const header of headers) {
    header.innerHTML = await Header();
  }
}
