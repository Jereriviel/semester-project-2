import { tagFilterInput } from "../Inputs.js";

export function TagFilter(onSearch: (query: string) => void) {
  const form = document.createElement("form");
  form.id = "filterForm";
  form.classList = "w-full sm:w-fit";

  form.innerHTML = `
  <div>
            ${tagFilterInput({
              type: "text",
              name: "filter",
              placeholder: "Enter tags (comma separated)",
              label: "Filter By Tags",
              id: "filter",
            })}
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("#filter");
    const query = input?.value.trim() || "";
    onSearch(query);
  });

  return form;
}
