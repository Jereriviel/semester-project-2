import { PaginatedResponse } from "../../types/listings.js";
import { toggleButtonLoading } from "../../utils/toggleButtonLoading.js";

export function loadMoreButton<T>(options: {
  container: HTMLElement;
  fetchItems: (page: number) => Promise<PaginatedResponse<T>>;
  renderItem: (item: T) => HTMLElement;
  onAfterRender?: (newItems: T[]) => void;
  initialPage?: number;
  initialIsLastPage?: boolean;
}): HTMLButtonElement {
  const {
    container,
    fetchItems,
    renderItem,
    onAfterRender,
    initialPage = 1,
    initialIsLastPage = false,
  } = options;

  const button = document.createElement("button");
  button.id = "load-more-btn";
  button.textContent = "Load More";
  button.classList.add("btn", "btn_primary", "w-full", "sm:w-fit");

  let currentPage = initialPage;
  let isFetching = false;

  if (initialIsLastPage) {
    button.style.display = "none";
  }

  async function fetchAndRender(page: number) {
    if (isFetching) return;
    isFetching = true;
    toggleButtonLoading(button, true);
    button.disabled = true;

    try {
      const response = await fetchItems(page);
      const items = response.data;
      const meta = response.meta;

      const htmlPromises = items.map((item) =>
        Promise.resolve(renderItem(item))
      );

      const htmlArray = await Promise.all(htmlPromises);

      htmlArray.forEach((el) => container.appendChild(el));

      if (onAfterRender) onAfterRender(items);

      const pageSize = items.length || 12;
      const isLastPageNow = meta?.isLastPage ?? items.length < pageSize;

      button.style.display = isLastPageNow ? "none" : "";
      if (!isLastPageNow) button.disabled = false;
    } catch (error) {
      console.error("Failed to load items:", error);
      button.textContent = "Failed to load. Try again?";
      button.disabled = false;
    } finally {
      isFetching = false;
      toggleButtonLoading(button, false);
    }
  }

  button.addEventListener("click", () => {
    if (isFetching) return;
    currentPage++;
    void fetchAndRender(currentPage);
  });

  return button;
}
