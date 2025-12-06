export function AddImageButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.id = "add-img-btn";
  button.className =
    "btn btn_secondary flex items-center justify-center gap-2 sm:w-fit";

  button.innerHTML = `
        <span class="material-symbols-outlined"> add </span>
        Add Another Image
  `;
  return button;
}
