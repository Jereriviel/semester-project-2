import { isLoggedIn, getUser, clearUser } from "../store/userStore.js";
import { getProfile } from "../services/profile.js";
import { toggleDropdown } from "../utils/toggleDropdown.js";

async function Header() {
  const container = document.createElement("div");
  container.className =
    "relative mx-auto flex max-w-7xl items-center justify-between";

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

          <figure class="rounded-full cursor-pointer focus-visible:ring-2 focus-visible:outline-none" id="profile-img" tabindex = "0">
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
            <button id="menu-close" class="btn_close">
              <span
                class="material-symbols-outlined cursor-pointer">
                close
              </span>
            </button>
          </div>
          <hr class="bg-gray-medium h-px border-0" />
          <div id="dropdown-links">
            <a
              href="/profile/index.html"
              class="hover:bg-primary-light flex items-center gap-2 p-4 hover:font-semibold transition-all duration-300 ease-in-out"
            >
              <span class="material-symbols-outlined"> account_circle </span>
              <p>Profile</p>
            </a>
            <button
              id="logout-btn"
              type="button"
              class="hover:bg-primary-light flex w-full items-center gap-2 p-4 hover:font-semibold transition-all duration-300 ease-in-out"
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

  container.innerHTML = `
        <a href="/index.html">
            <img
              src="/assets/logos/logo-primary-96.png"
              alt="Trove logo"
              class="w-[109px] sm:w-[145px]"
            />
        </a>

        ${loggedIn ? profileHTML : loginHTML}
  `;

  return container;
}

export async function renderHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  const headerContent = await Header();
  header.innerHTML = "";
  header.appendChild(headerContent);

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    clearUser();
    window.location.href = "/index.html";
  });

  const profileImg = document.getElementById("profile-img");

  profileImg?.addEventListener("click", () => {
    toggleDropdown();
  });

  profileImg?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      toggleDropdown();
    }
  });

  document.getElementById("menu-close")?.addEventListener("click", () => {
    toggleDropdown();
  });
}
