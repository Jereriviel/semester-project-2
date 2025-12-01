import { sortFilterSelector } from "../Selectors.js";

export function sortFilter(onSortChange: (sort: string) => void) {
  const sortFilter = document.createElement("div");
  sortFilter.id = "sort-filter";
  sortFilter.tabIndex = 0;
  sortFilter.classList =
    "w-fit focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:outline-none rounded-xl";

  sortFilter.innerHTML = sortFilterSelector({
    name: "sort",
    label: "Sort by",
    id: "sort",
    defaultValue: "desc",
  });

  const select = sortFilter.querySelector<HTMLSelectElement>("#sort");

  select?.addEventListener("change", () => {
    onSortChange(select.value);
  });

  sortFilter.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && select) {
      event.preventDefault();
      select.focus();
      select.click();
    }
  });

  return sortFilter;
}
