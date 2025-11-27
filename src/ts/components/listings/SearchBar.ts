import { searchInput } from "../Inputs.js";

export function SearchBar(onSearch: (query: string) => void) {
  const form = document.createElement("form");
  form.id = "searchForm";
  form.classList = "w-full sm:w-fit";

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
    const input = form.querySelector<HTMLInputElement>("#search");
    const query = input?.value.trim() || "";
    onSearch(query);
  });

  return form;
}
