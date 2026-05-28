import { PaginatedResponse } from "../../types/listings.js";
import { toggleButtonLoading } from "../../utils/toggleButtonLoading.js";

export function loadMoreButton<T>(options: {
  container: HTMLElement;
  fetchItems: (page: number) => Promise<PaginatedResponse<T>>;
  renderItem: (item: T) => HTMLElement;
  onAfterRender?: (newItems: T[]) => void;
  onError?: (error: unknown) => void; // optional improvement
  initialPage?: number;
  initialIsLastPage?: boolean;
}): HTMLButtonElement {
  const {
    container,
    fetchItems,
    renderItem,
    onAfterRender,
    onError,
    initialPage = 1,
    initialIsLastPage = false,
  } = options;

  const button = document.createElement("button");
  button.id = "load-more-btn";
  button.textContent = "Load More";
  button.classList.add("btn_primary", "btn_base", "sm:w-[118px]");

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

      const htmlArray = await Promise.all(
        items.map((item) => Promise.resolve(renderItem(item)))
      );

      htmlArray.forEach((el) => container.appendChild(el));

      onAfterRender?.(items);

      const pageSize = items.length || 12;
      const isLastPageNow = meta?.isLastPage ?? items.length < pageSize;

      button.style.display = isLastPageNow ? "none" : "";
      if (!isLastPageNow) button.disabled = false;
    } catch (error) {
      button.textContent = "Failed to load. Try again?";
      button.disabled = false;

      onError?.(error);
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
