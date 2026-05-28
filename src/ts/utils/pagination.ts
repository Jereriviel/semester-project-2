import { loadMoreButton } from "../components/buttons/LoadMoreButton.js";
import { PaginatedResponse } from "../types/listings.js";
import { lazyLoadImages } from "./lazyLoad.js";
import { handleApiError } from "../errors.ts/handleApiError.js";

export async function initPaginatedList<T>(options: {
  container: HTMLElement;
  fetchItems: (page: number) => Promise<PaginatedResponse<T>>;
  renderItem: (item: T) => HTMLElement;
  onAfterRender?: (items: T[]) => void;
  loadMoreSection?: HTMLElement;
}) {
  const { container, fetchItems, renderItem, onAfterRender, loadMoreSection } =
    options;

  try {
    const response = await fetchItems(1);
    const items = response.data;
    const meta = response.meta;

    const htmlArray = await Promise.all(
      items.map((item) => Promise.resolve(renderItem(item)))
    );

    container.innerHTML = "";
    htmlArray.forEach((el) => container.appendChild(el));

    if (onAfterRender) onAfterRender(items);
    lazyLoadImages();

    const pageSize = 12;
    const isLastPageStart = meta?.isLastPage ?? items.length < pageSize;
    const btnContainer =
      loadMoreSection ?? container.parentElement ?? container;
    const existingButton = btnContainer.querySelector("#load-more-btn");

    if (existingButton) existingButton.remove();
    if (!isLastPageStart) {
      const loadMoreBtn = loadMoreButton({
        container,
        fetchItems,
        renderItem,
        initialPage: 1,
        initialIsLastPage: false,
        onAfterRender: async (newItems) => {
          lazyLoadImages();
          if (onAfterRender) onAfterRender(newItems);
        },
      });

      btnContainer.appendChild(loadMoreBtn);

      if (loadMoreSection) loadMoreSection.style.display = "";
    } else if (loadMoreSection) {
      loadMoreSection.style.display = "none";
    }
  } catch (error) {
    await handleApiError(error);
  }
}
