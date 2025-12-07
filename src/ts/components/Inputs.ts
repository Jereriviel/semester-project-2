interface InputProps {
  type?: "text" | "email" | "password" | "url" | "number" | "datetime-local";
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  minlength?: number;
  id?: string;
  autocomplete?: string;
  value?: string;
}

function createLabeledInput<T extends HTMLInputElement | HTMLTextAreaElement>(
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
function createInputWithButton(
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
    "btn_search focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200";
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

export function input({ value, ...props }: InputProps & { value?: string }) {
  return createLabeledInput(() => {
    const element = document.createElement("input");
    if (value !== undefined) element.value = value;
    return element;
  }, props);
}

export function textArea({ value, ...props }: InputProps & { value?: string }) {
  return createLabeledInput(() => {
    const element = document.createElement("textarea");
    if (value !== undefined) element.value = value;
    return element;
  }, props);
}

export function searchInput(props: InputProps): HTMLDivElement {
  return createInputWithButton(
    props,
    `<span class="material-symbols-outlined">search</span>`
  );
}

export function tagFilterInput(props: InputProps): HTMLDivElement {
  return createInputWithButton(
    props,
    `<span class="material-symbols-outlined">filter_alt</span>`
  );
}

export function bidInput(props: InputProps): HTMLDivElement {
  return createInputWithButton(
    props,
    "Place bid",
    "flex flex-col gap-4",
    "text-lg px-4 py-3 w-full sm:w-[200px] rounded-s-xl border border-gray-medium focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200"
  );
}

export function dateTimeInput({
  value,
  ...props
}: InputProps & { value?: string; disabled?: boolean }) {
  return createLabeledInput(
    () => {
      const inputEl = document.createElement("input");
      inputEl.type = "datetime-local";
      if (value) inputEl.value = value;
      if (props.disabled) inputEl.disabled = true;
      return inputEl;
    },
    props,
    {
      inputClass:
        "text-lg px-4 py-3 rounded-xl border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-0 transition-colors duration-200",
    }
  );
}
