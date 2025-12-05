import { createModal } from "../../utils/createModal.js";

export function editListingModal() {
  const modal = createModal(
    `
    <p>Edit Listing</p>
    `
  );

  document.body.appendChild(modal);
  modal.showModal();

  const addImageBtn = modal.querySelector<HTMLButtonElement>("#add-image-btn")!;

  addImageBtn.addEventListener("click", () => console.log("Add new image"));

  const saveChangesBtn =
    modal.querySelector<HTMLButtonElement>("#save-changes-btn")!;

  saveChangesBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit Changes)");
  });

  ///Delete Listing button here

  const closeBtn = modal.querySelector<HTMLButtonElement>(
    "#close-edit-listing-btn"
  )!;

  closeBtn.addEventListener("click", () => modal.close());

  modal.addEventListener("close", () => {
    modal.remove();
  });
}
