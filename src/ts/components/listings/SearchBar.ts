import { searchInput } from "../Inputs.js";

export function SearchBar(onSearch: (query: string) => void) {
  const form = document.createElement("Form");
  form.id = "searchForm";

  form.innerHTML = `
  <div>
            ${searchInput({
              type: "text",
              name: "search",
              placeholder: "Search by title or description",
              label: "Search for Listings",
              id: "search",
            })}
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("search");
    const query = input?.value.trim() || "";
    onSearch(query);
  });

  return form;
}
