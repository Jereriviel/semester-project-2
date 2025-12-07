import { searchInput } from "../Inputs.js";

export function SearchBar(onSearch: (query: string) => void): HTMLFormElement {
  const form = document.createElement("form");
  form.id = "searchForm";
  form.className = "w-full sm:w-fit";

  const searchInputElement = searchInput({
    type: "text",
    name: "search",
    placeholder: "Search by title or description",
    label: "Search for Listings",
    id: "search",
  });

  const wrapper = document.createElement("div");
  wrapper.appendChild(searchInputElement);

  form.appendChild(wrapper);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("#search");
    const query = input?.value.trim() || "";
    onSearch(query);
  });

  return form;
}
