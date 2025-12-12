import { InputProps } from "../../types/inputs.js";

export function createInputWithButton(
  props: InputProps,
  buttonContent: string | HTMLElement,
  wrapperClass = "flex flex-col gap-1",
  inputClass = "text-lg px-4 py-3 w-full sm:w-[300px] rounded-s-xl border border-gray-medium focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200",
  containerClass = "flex"
): HTMLDivElement {
  const container = document.createElement("div");
  container.className = wrapperClass;

  const label = document.createElement("label");
  label.htmlFor = props.id || "";
  label.className = "text-lg font-medium";
  label.textContent = props.label || "";
  container.appendChild(label);

  const inputWrapper = document.createElement("div");
  inputWrapper.className = containerClass;

  const inputEl = document.createElement("input");
  inputEl.id = props.id || "";
  inputEl.name = props.name;
  inputEl.type = props.type || "text";
  if (props.required) inputEl.required = true;
  if (props.minlength) inputEl.minLength = props.minlength;
  if (props.placeholder) inputEl.placeholder = props.placeholder;
  inputEl.className = inputClass;

  const button = document.createElement("button");
  button.type = "submit";
  button.className =
    "btn_search w-fit px-4 text-nowrap focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200";
  if (typeof buttonContent === "string") button.innerHTML = buttonContent;
  else button.appendChild(buttonContent);

  inputWrapper.append(inputEl, button);
  container.appendChild(inputWrapper);

  const error = document.createElement("p");
  error.id = `${props.id}Error`;
  error.className = "text-red-500 text-sm hidden";
  container.appendChild(error);

  return container;
}
