import { createModal } from "../../utils/createModal.js";

export function showErrorModal(message: string): Promise<void> {
  return new Promise((resolve) => {
    const modal = createModal(`
      <div class="flex flex-col gap-4 error-modal sm:w-[300px]">
        <div class="flex justify-between items-start">
          <div class="flex gap-4 items-center">
            <img class="w-12" src="/assets/icons/exclamation.png" alt="Error icon">
            <h4 class="text-2xl">Error</h4>
          </div>
          <button type="button" id="close-error-btn"><span class="material-symbols-outlined"> close </span></button>
        </div>
        <hr class="bg-gray-medium h-px border-0" />
        <div class="text-lg flex flex-col gap-2">
          <p>Oops, something went wrong!</p>
          <p>${message}</p>
        </div>
        <button id="go-back-btn" class="btn btn_primary sm:w-fit self-end">Go Back</button>
      </div>
    `);

    document.body.appendChild(modal);
    modal.showModal();

    const backBtn = modal.querySelector<HTMLButtonElement>("#go-back-btn")!;
    backBtn.addEventListener("click", () => modal.close());

    const closeBtn =
      modal.querySelector<HTMLButtonElement>("#close-error-btn")!;
    closeBtn.addEventListener("click", () => modal.close());

    modal.addEventListener("close", () => {
      modal.remove();
      resolve();
    });
  });
}
