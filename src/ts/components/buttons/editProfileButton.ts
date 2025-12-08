import { openEditProfileModal } from "../modals/editProfileModal.js";

export function editProfileButtons() {
  const btnMobile = document.createElement("button");
  btnMobile.type = "button";
  btnMobile.id = "edit-profile-btn-mobile";
  btnMobile.className = "btn_round sm:hidden border-white border-2";
  btnMobile.innerHTML = `
        <span class="material-symbols-outlined"> edit </span>
  `;

  btnMobile.addEventListener("click", () => {
    openEditProfileModal();
  });

  const btnDesktop = document.createElement("button");
  btnDesktop.type = "button";
  btnDesktop.id = "edit-profile-btn-desktop";
  btnDesktop.className =
    "hidden btn btn_primary sm:flex items-center justify-center gap-2 w-fit border-white border-2";
  btnDesktop.innerHTML = `
        <span class="material-symbols-outlined"> edit </span>
        Edit Profile
  `;

  btnDesktop.addEventListener("click", () => {
    openEditProfileModal();
  });

  return { btnMobile, btnDesktop };
}
