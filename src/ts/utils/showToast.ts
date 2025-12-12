export function showToast(toastElement: HTMLElement) {
  const toastContainer = document.getElementById("toast-container");

  if (!toastContainer) {
    const div = document.createElement("div");
    div.id = "toast-container";
    div.className =
      "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-50";
    document.body.appendChild(div);

    div.appendChild(toastElement);
  } else {
    toastContainer.appendChild(toastElement);
  }

  toastElement.classList.add("fade-in");

  setTimeout(() => {
    toastElement.classList.remove("fade-in");
    toastElement.classList.add("fade-out");

    setTimeout(() => {
      toastElement.remove();
    }, 500);
  }, 1000);
}
