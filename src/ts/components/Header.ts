import { isLoggedIn, getUser, clearUser } from "../store/userStore.js";
import { getProfile } from "../services/profile.js";
import { toggleDropdown } from "../utils/toggleDropdown.js";

async function Header() {
  const container = document.createElement("div");
  container.className =
    "relative mx-auto flex max-w-7xl items-center justify-between";

  const logoLink = document.createElement("a");
  logoLink.href = "/index.html";

  const logoImg = document.createElement("img");
  logoImg.src = "/assets/logos/logo-primary-96.png";
  logoImg.alt = "Trove logo";
  logoImg.className = "w-[109px] sm:w-[145px]";

  logoLink.appendChild(logoImg);
  container.appendChild(logoLink);

  const loggedIn = isLoggedIn();

  if (loggedIn) {
    const user = getUser();
    if (user) {
      const profile = await getProfile(user.name);

      const avatarUrl = profile.avatar?.url;
      const avatarAlt = profile.name;
      const credits = profile.credits;
      const userName = profile.name;

      const profileContainer = document.createElement("div");
      profileContainer.className = "flex items-center gap-3 sm:gap-4";

      const creditsBox = document.createElement("div");
      creditsBox.className =
        "bg-primary-normal text-primary-dark rounded-xl px-2 py-1 text-sm font-semibold sm:px-3 sm:py-2";

      const creditsText = document.createElement("p");
      creditsText.textContent = `CREDITS: ${credits}`;
      creditsBox.appendChild(creditsText);

      const profileFigure = document.createElement("figure");
      profileFigure.id = "profile-img";
      profileFigure.tabIndex = 0;
      profileFigure.className =
        "rounded-full cursor-pointer focus-visible:ring-2 focus-visible:outline-none";

      const profileImg = document.createElement("img");
      profileImg.src = avatarUrl;
      profileImg.alt = avatarAlt;
      profileImg.className = "h-12 w-12 rounded-full object-cover";

      profileFigure.appendChild(profileImg);

      profileContainer.appendChild(creditsBox);
      profileContainer.appendChild(profileFigure);

      const dropdown = document.createElement("div");
      dropdown.id = "dropdown";
      dropdown.className =
        "shadow-dropdown absolute top-18 right-0 block max-h-0 w-full overflow-hidden rounded-xl bg-white transition-all duration-500 ease-in-out sm:w-[300px]";

      const dropdownHeader = document.createElement("div");
      dropdownHeader.className = "p4-4 flex justify-between p-4";

      const headerInfoWrapper = document.createElement("div");
      headerInfoWrapper.className = "flex items-center gap-2";

      const headerAvatarFig = document.createElement("figure");
      const headerAvatarImg = document.createElement("img");
      headerAvatarImg.src = avatarUrl;
      headerAvatarImg.alt = avatarAlt;
      headerAvatarImg.className = "h-12 w-12 rounded-full object-cover";
      headerAvatarFig.appendChild(headerAvatarImg);

      const headerName = document.createElement("p");
      headerName.textContent = userName;

      headerInfoWrapper.appendChild(headerAvatarFig);
      headerInfoWrapper.appendChild(headerName);

      const closeBtn = document.createElement("button");
      closeBtn.id = "menu-close";
      closeBtn.className = "btn_close";

      const closeIcon = document.createElement("span");
      closeIcon.className = "material-symbols-outlined cursor-pointer";
      closeIcon.textContent = "close";

      closeBtn.appendChild(closeIcon);

      dropdownHeader.appendChild(headerInfoWrapper);
      dropdownHeader.appendChild(closeBtn);

      const divider = document.createElement("hr");
      divider.className = "bg-gray-medium h-px border-0";

      const dropdownLinks = document.createElement("div");
      dropdownLinks.id = "dropdown-links";

      const profileLink = document.createElement("a");
      profileLink.href = "/profile/index.html";
      profileLink.className =
        "hover:bg-primary-light flex items-center gap-2 p-4 hover:font-semibold transition-all duration-300 ease-in-out";

      const profileIcon = document.createElement("span");
      profileIcon.className = "material-symbols-outlined";
      profileIcon.textContent = "account_circle";

      const profileText = document.createElement("p");
      profileText.textContent = "Profile";

      profileLink.appendChild(profileIcon);
      profileLink.appendChild(profileText);

      const logoutBtn = document.createElement("button");
      logoutBtn.id = "logout-btn";
      logoutBtn.type = "button";
      logoutBtn.className =
        "hover:bg-primary-light flex w-full items-center gap-2 p-4 hover:font-semibold transition-all duration-300 ease-in-out";

      const logoutIcon = document.createElement("span");
      logoutIcon.className = "material-symbols-outlined";
      logoutIcon.textContent = "logout";

      const logoutText = document.createElement("span");
      logoutText.textContent = "Log Out";

      logoutBtn.appendChild(logoutIcon);
      logoutBtn.appendChild(logoutText);

      dropdownLinks.appendChild(profileLink);
      dropdownLinks.appendChild(logoutBtn);

      dropdown.appendChild(dropdownHeader);
      dropdown.appendChild(divider);
      dropdown.appendChild(dropdownLinks);

      container.appendChild(profileContainer);
      container.appendChild(dropdown);
    }
  } else {
    const loginBtnMobile = document.createElement("a");
    loginBtnMobile.href = "/login/index.html";
    loginBtnMobile.className = "btn btn_round sm:hidden";

    const mobileIcon = document.createElement("span");
    mobileIcon.className = "material-symbols-outlined";
    mobileIcon.textContent = "login";

    loginBtnMobile.appendChild(mobileIcon);

    const loginBtnDesktop = document.createElement("a");
    loginBtnDesktop.href = "/login/index.html";
    loginBtnDesktop.className =
      "btn btn_primary hidden items-center gap-2 sm:inline-flex";

    const desktopIcon = document.createElement("span");
    desktopIcon.className = "material-symbols-outlined";
    desktopIcon.textContent = "login";

    const desktopText = document.createElement("p");
    desktopText.textContent = "Log in";

    loginBtnDesktop.appendChild(desktopIcon);
    loginBtnDesktop.appendChild(desktopText);

    container.appendChild(loginBtnMobile);
    container.appendChild(loginBtnDesktop);
  }

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

  profileImg?.addEventListener("click", () => toggleDropdown());

  profileImg?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") toggleDropdown();
  });

  document.getElementById("menu-close")?.addEventListener("click", () => {
    toggleDropdown();
  });
}
