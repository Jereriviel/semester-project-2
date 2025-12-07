interface InputProps {
  type?: "text" | "email" | "password" | "url" | "number" | "datetime-local";
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  minlength?: number;
  id?: string;
  autocomplete?: string;
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

export function input(props: InputProps): HTMLDivElement {
  return createLabeledInput(() => document.createElement("input"), props);
}

export function textArea(props: InputProps): HTMLDivElement {
  return createLabeledInput(() => document.createElement("textarea"), props, {
    inputClass:
      "text-lg min-h-25 border border-gray-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:border-0 focus:ring-primary-dark transition-colors duration-200",
  });
}

export function searchInput(props: InputProps): HTMLDivElement {
  const button = document.createElement("button");
  button.type = "submit";
  button.className =
    "btn_search focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200";
  button.innerHTML = `<span class="material-symbols-outlined">search</span>`;

  const wrapper = document.createElement("div");
  wrapper.className = "flex";
  wrapper.appendChild(
    createLabeledInput(
      () => document.createElement("input"),
      props
    ).querySelector("input")!
  );
  wrapper.appendChild(button);

  return createLabeledInput(() => document.createElement("input"), props, {
    afterLabel: [wrapper],
  });
}

export function tagFilterInput(props: InputProps): HTMLDivElement {
  const button = document.createElement("button");
  button.type = "submit";
  button.className =
    "btn_search focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200";
  button.innerHTML = `<span class="material-symbols-outlined">filter_alt</span>`;

  const wrapper = document.createElement("div");
  wrapper.className = "flex";
  wrapper.appendChild(
    createLabeledInput(
      () => document.createElement("input"),
      props
    ).querySelector("input")!
  );
  wrapper.appendChild(button);

  return createLabeledInput(() => document.createElement("input"), props, {
    afterLabel: [wrapper],
  });
}

export function bidInput(props: InputProps): HTMLDivElement {
  const button = document.createElement("button");
  button.type = "submit";
  button.className =
    "btn_search focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200 w-fit px-4 whitespace-nowrap";
  button.textContent = "Place bid";

  const wrapper = document.createElement("div");
  wrapper.className = "flex";
  wrapper.appendChild(
    createLabeledInput(
      () => document.createElement("input"),
      props
    ).querySelector("input")!
  );
  wrapper.appendChild(button);

  return createLabeledInput(() => document.createElement("input"), props, {
    wrapperClass: "flex flex-col gap-4",
    afterLabel: [wrapper],
  });
}

export function dateTimeInput(props: InputProps): HTMLDivElement {
  const note = document.createElement("p");
  note.className = "text-xs italic pb-2";
  note.textContent = "Note: Expiration date cannot be changed after listing.";

  return createLabeledInput(() => document.createElement("input"), props, {
    afterLabel: [note],
  });
}
