interface SelectorProps {
  name: string;
  label?: string;
  id?: string;
  defaultValue?: string;
}

export function sortFilterSelector(props: SelectorProps): HTMLDivElement {
  const defaultValue = props.defaultValue ?? "desc";

  const container = document.createElement("div");
  container.className = "flex flex-col gap-1";

  if (props.label) {
    const label = document.createElement("label");
    label.htmlFor = props.id ?? props.name;
    label.className = "text-lg font-medium";
    label.textContent = props.label;
    container.appendChild(label);
  }

  const selectWrapper = document.createElement("div");
  selectWrapper.className =
    "relative flex items-center text-lg px-4 py-3 w-full sm:w-fit rounded-xl border border-gray-medium transition-colors duration-200";

  const select = document.createElement("select");
  select.id = props.id ?? props.name;
  select.name = props.name;
  select.className = "appearance-none w-full pr-6 bg-transparent outline-none";

  const optionNewest = document.createElement("option");
  optionNewest.value = "desc";
  optionNewest.textContent = "Newest first";
  if (defaultValue === "desc") optionNewest.selected = true;

  const optionOldest = document.createElement("option");
  optionOldest.value = "asc";
  optionOldest.textContent = "Oldest first";
  if (defaultValue === "asc") optionOldest.selected = true;

  select.append(optionNewest, optionOldest);

  const arrow = document.createElement("span");
  arrow.className =
    "material-symbols-outlined pointer-events-none absolute right-3";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "keyboard_arrow_down";

  selectWrapper.append(select, arrow);
  container.appendChild(selectWrapper);

  return container;
}
