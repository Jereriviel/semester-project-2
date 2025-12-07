import { openEditListingModal } from "../modals/editListingModal.js";
import { ListingBase } from "../../types/listings.js";

export function editListingButton(listing: ListingBase) {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "edit-listing-btn";
  button.className =
    "btn btn_primary flex items-center justify-center gap-2 sm:w-fit";

  button.innerHTML = `
        <span class="material-symbols-outlined"> edit </span>
        Edit Listing
  `;

  button.addEventListener("click", () => {
    openEditListingModal(listing);
  });

  return button;
}
