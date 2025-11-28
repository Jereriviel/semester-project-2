//Original code from: https://flowbite.com/docs/forms/toggle/

export function Switch(onToggle: (activeOnly: boolean) => void) {
  const Switch = document.createElement("label");
  Switch.classList = "inline-flex items-center cursor-pointer self-end";
  Switch.innerHTML = `
  <input id="toggle-active" type="checkbox" class="sr-only peer" checked>
  <div class="
      relative w-9 h-5 
      bg-gray-medium rounded-full 
      peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-dark
      peer-checked:bg-primary-dark
      after:content-[''] after:absolute after:top-0.5 after:left-0.5
      after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-all
      peer-checked:after:translate-x-full
      "></div>
  <span class="select-none ms-3 font-medium">Show Active Listings Only</span>
`;

  const checkbox = Switch.querySelector<HTMLInputElement>("#toggle-active");

  checkbox?.addEventListener("change", () => {
    onToggle(checkbox.checked);
  });

  return Switch;
}
