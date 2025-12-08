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

export function successToastCreate() {
  const container = document.createElement("div");
  container.className =
    "text-success-normal shadow-card flex items-center gap-4 rounded-xl bg-white p-4";

  container.innerHTML = `
          <div
            class="bg-success-light flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span class="material-symbols-outlined"> check </span>
          </div>
          <p class="font-medium">Listing Successfully Created</p>
`;

  return container;
}

export function successToastUpdate() {
  const container = document.createElement("div");
  container.className =
    "text-success-normal shadow-card flex items-center gap-4 rounded-xl bg-white p-4";

  container.innerHTML = `
          <div
            class="bg-success-light flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span class="material-symbols-outlined"> check </span>
          </div>
          <p class="font-medium">Changes Successfully Saved</p>
`;

  return container;
}

export function successToastDelete() {
  const container = document.createElement("div");
  container.className =
    "text-success-normal shadow-card flex items-center gap-4 rounded-xl bg-white p-4";

  container.innerHTML = `
          <div
            class="bg-success-light flex h-8 w-8 items-center justify-center rounded-full"
          >
            <span class="material-symbols-outlined"> check </span>
          </div>
          <p class="font-medium">Listing Successfully Deleted</p>
`;

  return container;
}
