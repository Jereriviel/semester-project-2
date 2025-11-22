import { loadingSpinner } from "../components/LoadingSpinner.js";

export function toggleButtonLoading(
  button: HTMLButtonElement,
  isLoading: boolean
) {
  let buttonText = button.querySelector(".button-text");
  let spinner = button.querySelector(".spinner");

  if (!buttonText) {
    const text = document.createElement("span");
    text.className = "button-text";
    text.textContent = button.textContent || "";
    button.textContent = "";
    button.appendChild(text);
    buttonText = text;
  }

  if (!spinner) {
    const span = document.createElement("span");
    span.className = "spinner hidden";
    span.innerHTML = loadingSpinner();
    button.appendChild(span);
    spinner = span;
  }

  if (isLoading) {
    button.disabled = true;
    button.classList.add(".btn_disabled");
    buttonText.classList.add("hidden");
    spinner.classList.remove("hidden");
    button.setAttribute("aria-busy", "true");
    button.setAttribute("aria-label", "Loading...");
  } else {
    button.disabled = false;
    button.classList.remove("btn_disabled");
    buttonText.classList.remove("hidden");
    spinner.classList.add("hidden");
    button.removeAttribute("aria-busy");
    button.removeAttribute("aria-label");
  }
}
