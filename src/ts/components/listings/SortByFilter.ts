import { sortFilterSelector } from "../Inputs.js";

export function sortFilter(onSortChange: (sort: string) => void) {
  const sortFilter = document.createElement("div");
  sortFilter.id = "sort-filter";
  sortFilter.classList = "w-full sm:w-fit";

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

  return sortFilter;
}
