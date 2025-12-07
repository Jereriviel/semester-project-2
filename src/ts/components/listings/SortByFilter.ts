import { sortFilterSelector } from "../Selectors.js";

export function sortFilter(
  onSortChange: (sort: string) => void
): HTMLDivElement {
  const container = document.createElement("div");
  container.id = "sort-filter";
  container.tabIndex = 0;
  container.className =
    "w-fit focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:outline-none rounded-xl";

  const selector = sortFilterSelector({
    name: "sort",
    label: "Sort by",
    id: "sort",
    defaultValue: "desc",
  });

  container.appendChild(selector);

  const select = selector.querySelector<HTMLSelectElement>("#sort");

  select?.addEventListener("change", () => {
    onSortChange(select.value);
  });

  container.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && select) {
      event.preventDefault();
      select.focus();
      select.click();
    }
  });

  return container;
}
