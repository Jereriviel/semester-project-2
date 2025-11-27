import { searchInput } from "../Inputs";

export async function searchBar(onSearch: (query: string) => void) {
  const form = document.createElement("Form");
  form.id = "searchForm";

  form.innerHTML = `
  <div class="flex">
            ${searchInput({
              type: "text",
              name: "search",
              placeholder: "Search by title or description",
              label: "Search for Listings",
              id: "search",
            })}
            <button type="submit" class="btn btn_search">
                <span class="material-symbols-outlined">search</span>
            </button>
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
