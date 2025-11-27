import { tagFilterInput } from "../Inputs.js";

export function TagFilter(onSearch: (tag: string) => void) {
  const form = document.createElement("form");
  form.id = "filterForm";
  form.classList = "w-full sm:w-fit";

  form.innerHTML = `
  <div>
            ${tagFilterInput({
              type: "text",
              name: "filter",
              placeholder: "Enter tag (single)",
              label: "Filter by Tag",
              id: "filter",
            })}
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("#filter");
    const tag = input?.value.trim() || "";
    onSearch(tag);
  });

  return form;
}
