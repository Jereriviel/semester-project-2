import { openNewListingModal } from "../modals/newListingModal.js";

export function NewListingButton() {
  const button = document.createElement("button");
  button.id = "new-listing-btn";
  button.className =
    "btn btn_primary flex items-center justify-center gap-2 sm:w-fit";

  button.innerHTML = `
        <span class="material-symbols-outlined"> add </span>
        Create New Listing
  `;

  button.addEventListener("click", () => {
    openNewListingModal();
  });

  return button;
}
