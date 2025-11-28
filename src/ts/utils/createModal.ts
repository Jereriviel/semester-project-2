export function createModal(
  content: string,
  className = "modal-name"
): HTMLDialogElement {
  const existing = document.querySelector<HTMLDialogElement>(
    `dialog.${className}`
  );
  if (existing) {
    existing.close();
    existing.remove();
  }

  const modal = document.createElement("dialog");
  modal.classList.add(className);

  modal.classList.add(
    "fixed",
    "top-1/2",
    "left-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "rounded-xl",
    "shadow-card",
    "py-8",
    "px-8",
    "w-full",
    "sm:w-fit"
  );

  modal.innerHTML = content;

  modal.addEventListener("close", () => {
    modal.remove();
  });

  return modal;
}
