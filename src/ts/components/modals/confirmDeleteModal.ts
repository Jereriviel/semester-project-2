import { createModal } from "../../utils/createModal.js";

export function confirmDeleteModal() {
  const modal = createModal(
    `
    <p>Confirm Delete</p>
    `
  );

  document.body.appendChild(modal);
  modal.showModal();

  const confirmDeleteBtn = modal.querySelector<HTMLButtonElement>(
    "#confirm-delete-btn"
  )!;

  confirmDeleteBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Delete Listing");
  });

  const cancelBtn =
    modal.querySelector<HTMLButtonElement>("#cancel-delete-btn")!;

  cancelBtn.addEventListener("click", () => modal.close());

  const closeBtn = modal.querySelector<HTMLButtonElement>("#close-delete-btn")!;

  closeBtn.addEventListener("click", () => modal.close());

  modal.addEventListener("close", () => {
    modal.remove();
  });
}
