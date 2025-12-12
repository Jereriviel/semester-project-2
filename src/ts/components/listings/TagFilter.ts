import { tagFilterInput } from "../inputs/Inputs.js";

export function TagFilter(onSearch: (tag: string) => void) {
  const form = document.createElement("form");
  form.id = "filterForm";
  form.className = "w-full sm:w-fit";

  const tagInputElement = tagFilterInput({
    type: "text",
    name: "filter",
    placeholder: "Enter tag (single)",
    label: "Filter by Tag",
    id: "filter",
  });

  const wrapper = document.createElement("div");
  wrapper.appendChild(tagInputElement);
  form.appendChild(wrapper);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("#filter");
    const tag = input?.value.trim() || "";
    onSearch(tag);
  });

  return form;
}
