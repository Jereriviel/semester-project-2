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
