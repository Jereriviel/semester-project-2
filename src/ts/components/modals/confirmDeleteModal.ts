import { createModal } from "../../utils/createModal.js";
import { deleteListing } from "../../services/listings.js";

export function confirmDeleteModal(listingId: string) {
  const modal = createModal(`
      <div class="flex flex-col gap-4 confirm-delete-modal sm:w-[300px]">
        <div class="flex justify-between items-start">
          <div class="flex gap-4 items-center">
            <img class="w-12" src="/assets/icons/warning.png" alt="Warning icon">
            <h4 class="text-2xl">Delete?</h4>
          </div>
          <button type="button" id="close-delete-btn" class="btn_close"><span class="material-symbols-outlined"> close </span></button>
        </div>
        <hr class="bg-gray-medium h-px border-0" />
        <div class="text-lg flex flex-col gap-2">
          <p>Are you sure you want to delete this listing? This action is permanent and cannot be undone.</p>
        </div>
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <button id="delete-btn" class="btn btn_delete sm:w-fit">Yes, Delete</button>
          <button id="cancel-delete-btn" class="btn btn_secondary sm:w-fit">Cancel</button>
        </div>
      </div>
    `);

  document.body.appendChild(modal);
  modal.showModal();

  const deleteBtn = modal.querySelector<HTMLButtonElement>("#delete-btn")!;
  deleteBtn.addEventListener("click", async () => {
    try {
      await deleteListing(listingId);
      modal.close();
      window.location.href = "/index.html";
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Something went wrong while deleting the listing.");
    }
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
