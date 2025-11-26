import { loadMoreButton } from "../components/LoadMoreButton.js";
import { PaginatedResponse } from "../types/listings.js";
import { lazyLoadImages } from "./lazyLoad.js";
import { showErrorModal } from "../components/modals/errorModal.js";

function fadeOutSkeletons(container: HTMLElement) {
  const skeletons = container.querySelectorAll("[data-skeleton]");
  skeletons.forEach((skeleton) => {
    skeleton.classList.add("fade-out");
    skeleton.addEventListener("animationend", () => skeleton.remove());
  });
}

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

    fadeOutSkeletons(container);

    container.innerHTML = "";
    htmlArray.forEach((el) => container.appendChild(el));

    if (onAfterRender) onAfterRender(items);
    lazyLoadImages();

    if (!meta?.isLastPage) {
      const btnContainer =
        loadMoreSection ?? container.parentElement ?? container;

      const existingButton = btnContainer.querySelector("#load-more-btn");
      if (existingButton) existingButton.remove();

      const loadMoreBtn = loadMoreButton({
        container,
        fetchItems,
        renderItem,
        onAfterRender: async (newItems) => {
          lazyLoadImages();
          if (onAfterRender) onAfterRender(newItems);
        },
      });

      btnContainer.appendChild(loadMoreBtn);
    }
  } catch (error) {
    await showErrorModal();
    console.error("initPaginatedList error:", error);
  }
}
