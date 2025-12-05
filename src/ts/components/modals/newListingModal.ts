import { createModal } from "../../utils/createModal.js";

export function openNewListingModal() {
  const modal = createModal(
    `
    <p>New Listing</p>
    `
  );

  document.body.appendChild(modal);
  modal.showModal();

  const addImageBtn = modal.querySelector<HTMLButtonElement>("#add-image-btn")!;

  addImageBtn.addEventListener("click", () => console.log("Add new image"));

  const addListingBtn =
    modal.querySelector<HTMLButtonElement>("#add-listing-btn")!;

  addListingBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit New Listing)");
  });

  const closeBtn = modal.querySelector<HTMLButtonElement>(
    "#close-new-listing-btn"
  )!;

  closeBtn.addEventListener("click", () => modal.close());

  modal.addEventListener("close", () => {
    modal.remove();
  });
}
