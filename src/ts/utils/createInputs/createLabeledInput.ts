import { InputProps } from "../../types/inputs.js";

export function createLabeledInput<
  T extends HTMLInputElement | HTMLTextAreaElement,
>(
  elementFactory: () => T,
  props: InputProps,
  extra?: {
    wrapperClass?: string;
    inputClass?: string;
    afterLabel?: HTMLElement[];
  }
): HTMLDivElement {
  const container = document.createElement("div");
  container.className = extra?.wrapperClass || "flex flex-col gap-1";

  const label = document.createElement("label");
  label.htmlFor = props.id || "";
  label.className = "text-lg font-medium";
  label.textContent = props.label || "";

  const element = elementFactory();
  element.id = props.id || "";
  element.name = props.name;
  if (element instanceof HTMLInputElement && props.type)
    element.type = props.type;
  if (props.required) element.required = true;
  if (props.placeholder) element.placeholder = props.placeholder;
  if (props.minlength) element.minLength = props.minlength;
  if (props.autocomplete)
    element.setAttribute("autocomplete", props.autocomplete);

  element.className =
    extra?.inputClass ||
    "text-lg px-4 py-3 rounded-xl border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-0 transition-colors duration-200";

  const error = document.createElement("p");
  error.id = `${props.id}Error`;
  error.className = "text-red-500 text-sm hidden";

  container.append(label);
  if (extra?.afterLabel)
    extra.afterLabel.forEach((el) => container.appendChild(el));
  container.append(element, error);

  return container;
}
