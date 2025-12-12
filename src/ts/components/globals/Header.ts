import { isLoggedIn, getUser, clearUser } from "../../store/userStore.js";
import { getProfile } from "../../services/profile.js";
import { toggleDropdown } from "../../utils/toggleDropdown.js";
import { addSkeletons, fadeOutSkeletons } from "../../utils/skeletonUtils.js";
import { HeaderSkeleton } from "../loading/HeaderSkeleton.js";
import { showToast } from "../../utils/showToast.js";
import { successToastLogOut } from "../toasts/SuccessLogOut.js";
import { applyPlaceholderImage } from "../../utils/placeholderImg.js";

export async function renderHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  header.innerHTML = "";

  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    const container = document.createElement("div");
    container.className =
      "relative mx-auto flex max-w-7xl items-center justify-between";
    container.innerHTML = `
      <a href="/index.html">
        <img src="/assets/logos/logo-primary-96.png" alt="Trove logo" class="w-[109px] sm:w-[145px]" />
      </a>
      <div class="flex items-center gap-3">
        <a href="/login/index.html" class="btn btn_round sm:hidden">
          <span class="material-symbols-outlined"> login </span>
        </a>
        <a href="/login/index.html" class="btn btn_primary hidden items-center gap-2 sm:inline-flex">
          <span class="material-symbols-outlined"> login </span>
          <p>Log in</p>
        </a>
      </div>
    `;
    header.appendChild(container);
    return;
  }

  const skeletonContainer = document.createElement("div");
  header.appendChild(skeletonContainer);
  addSkeletons(skeletonContainer, HeaderSkeleton, 1);

  const user = getUser();
  if (!user) return;

  const profile = await getProfile(user.name);
  fadeOutSkeletons(
    skeletonContainer,
    () => {
      const container = document.createElement("div");
      container.className =
        "relative mx-auto flex max-w-7xl items-center justify-between";

      container.innerHTML = `
        <a href="/index.html">
          <img src="/assets/logos/logo-primary-96.png" alt="Trove logo" class="w-[109px] sm:w-[145px]" />
        </a>

        <div class="user-section flex items-center gap-3 sm:gap-4">
          <div class="credits bg-primary-normal text-primary-dark rounded-xl px-2 py-1 text-sm font-semibold sm:px-3 sm:py-2">
            <p class="credits-text"></p>
          </div>

          <figure id="profile-img" tabindex="0" class="rounded-full cursor-pointer focus-visible:ring-2 focus-visible:outline-none">
            <img class="avatar-img h-12 w-12 rounded-full object-cover" />
          </figure>

          <div id="dropdown" class="shadow-dropdown absolute top-18 right-0 block max-h-0 w-full overflow-hidden rounded-xl bg-white transition-all duration-500 ease-in-out sm:w-[300px]">
            <div class="p4-4 flex justify-between p-4">
              <div class="flex items-center gap-2">
                <figure>
                  <img class="dropdown-avatar h-12 w-12 rounded-full object-cover" />
                </figure>
                <p class="username"></p>
              </div>
              <button id="menu-close" class="btn_close">
                <span class="material-symbols-outlined cursor-pointer"> close </span>
              </button>
            </div>

            <hr class="bg-gray-medium h-px border-0" />

            <div id="dropdown-links">
              <a href="/profile/index.html" class="hover:bg-primary-light flex items-center gap-2 p-4 hover:font-semibold transition-all duration-300 ease-in-out">
                <span class="material-symbols-outlined"> account_circle </span>
                <p>Profile</p>
              </a>
              <button id="logout-btn" type="button" class="hover:bg-primary-light flex w-full items-center gap-2 p-4 hover:font-semibold transition-all duration-300 ease-in-out">
                <span class="material-symbols-outlined"> logout </span> Log Out
              </button>
            </div>
          </div>
        </div>

        <div class="login-section flex items-center gap-3">
          <a href="/login/index.html" class="btn btn_round sm:hidden">
            <span class="material-symbols-outlined"> login </span>
          </a>
          <a href="/login/index.html" class="btn btn_primary hidden items-center gap-2 sm:inline-flex">
            <span class="material-symbols-outlined"> login </span>
            <p>Log in</p>
          </a>
        </div>
      `;

      const creditsText =
        container.querySelector<HTMLParagraphElement>(".credits-text");
      if (creditsText) creditsText.textContent = `CREDITS: ${profile.credits}`;

      const avatarImg =
        container.querySelector<HTMLImageElement>(".avatar-img");
      if (avatarImg) {
        avatarImg.src =
          profile.avatar?.url || "/assets/images/placeholder-avatar.jpg";
        avatarImg.alt = profile.avatar?.alt || profile.name;
        applyPlaceholderImage(avatarImg);
      }

      const dropdownAvatar =
        container.querySelector<HTMLImageElement>(".dropdown-avatar");
      if (dropdownAvatar) {
        dropdownAvatar.src =
          profile.avatar?.url || "/assets/images/placeholder-avatar.jpg";
        dropdownAvatar.alt = profile.avatar?.alt || profile.name;
        applyPlaceholderImage(dropdownAvatar);
      }

      const usernameText =
        container.querySelector<HTMLParagraphElement>(".username");
      if (usernameText) usernameText.textContent = profile.name;

      const loginSection = container.querySelector(".login-section");
      if (loginSection) loginSection.classList.add("hidden");

      const profileImg = container.querySelector("#profile-img");
      const closeBtn = container.querySelector("#menu-close");
      const logoutBtn = container.querySelector("#logout-btn");

      profileImg?.addEventListener("click", () => toggleDropdown());
      profileImg?.addEventListener("keydown", (evt: Event) => {
        const e = evt as KeyboardEvent;
        if (e.key === "Enter") toggleDropdown();
      });

      closeBtn?.addEventListener("click", () => toggleDropdown());
      logoutBtn?.addEventListener("click", () => {
        clearUser();
        showToast(successToastLogOut());
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 1500);
      });

      return container;
    },
    true
  );
}
