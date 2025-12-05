import { editListingModal } from "./modals/editListingModal.js";

function editListingButton() {
  const button = document.createElement("button");
  button.id = "edit-listing-btn";
  button.className =
    "btn btn_primary flex items-center justify-center gap-2 sm:w-fit";

  button.innerHTML = `
        <span class="material-symbols-outlined"> edit </span>
        Edit Listing
  `;

  button.addEventListener("click", () => {
    editListingModal();
  });

  return button;
}

export function renderEditListingButton() {
  const newListingSection = document.getElementById("test-section");
  if (!newListingSection) return;

  const sectionContent = editListingButton();
  newListingSection.innerHTML = "";
  newListingSection.appendChild(sectionContent);
}
