import { confirmDeleteModal } from "../modals/confirmDeleteModal.js";

export function confirmDeleteButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "confirm-delete-btn";
  button.className =
    "btn btn_primary flex items-center justify-center gap-2 sm:w-fit";

  button.innerHTML = `
        Yes, Delete
  `;

  button.addEventListener("click", () => {
    confirmDeleteModal();
  });

  return button;
}
