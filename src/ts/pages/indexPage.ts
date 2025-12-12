import { ListingCard } from "../components/listings/ListingCard.js";
import { getAllListings } from "../services/listings.js";
import { ListingCardSkeleton } from "../components/loading/ListingCardSkeleton.js";
import { initPaginatedList } from "../utils/pagination.js";
import { SearchBar } from "../components/listings/searchBar.js";
import { searchListings } from "../services/listings.js";
import { TagFilter } from "../components/listings/TagFilter.js";
import { filterListingsByTag } from "../services/listings.js";
import { sortFilter } from "../components/listings/SortByFilter.js";
import { Switch } from "../components/listings/Switch.js";
import { addSkeletons, fadeOutSkeletons } from "../utils/skeletonUtils.js";
import { Hero } from "../components/listings/Hero.js";
import { showErrorModal } from "../components/modals/errorModal.js";
import { ApiError } from "../errors.ts/ApiError.js";

let currentSortOrder: "asc" | "desc" = "desc";
let currentActiveOnly: boolean = true;

async function loadDefaultListings(
  listingSection: HTMLElement,
  activeOnly = currentActiveOnly
) {
  addSkeletons(listingSection, ListingCardSkeleton, 6);

  await initPaginatedList({
    container: listingSection,
    loadMoreSection: document.getElementById("load-more-section")!,
    fetchItems: (page) =>
      getAllListings(page, 12, currentSortOrder, activeOnly),
    renderItem: (listing) => {
      fadeOutSkeletons(listingSection, () => ListingCard(listing));
      return ListingCard(listing, { lazy: true });
    },
  });
}

async function loadSearchResults(
  listingSection: HTMLElement,
  query: string,
  activeOnly = currentActiveOnly
) {
  addSkeletons(listingSection, ListingCardSkeleton, 6);

  const items = await searchListings(
    query,
    1,
    12,
    currentSortOrder,
    activeOnly
  );
  const loadMoreSection = document.getElementById("load-more-section");

  if (!items || items.data.length === 0) {
    listingSection.innerHTML = `<p class="text-lg">No search results found.</p>`;
    if (loadMoreSection) loadMoreSection.style.display = "none";
    return;
  }

  await initPaginatedList({
    container: listingSection,
    loadMoreSection: loadMoreSection!,
    fetchItems: (page) =>
      searchListings(query, page, 12, currentSortOrder, activeOnly),
    renderItem: (listing) => {
      fadeOutSkeletons(listingSection, () => ListingCard(listing));
      return ListingCard(listing, { lazy: true });
    },
  });
}

async function loadFilteredListings(
  listingSection: HTMLElement,
  tag: string,
  activeOnly = currentActiveOnly
) {
  addSkeletons(listingSection, ListingCardSkeleton, 6);

  const items = await filterListingsByTag(
    tag,
    1,
    12,
    currentSortOrder,
    activeOnly
  );
  const loadMoreSection = document.getElementById("load-more-section");

  if (!items || items.data.length === 0) {
    listingSection.innerHTML = `<p class="text-lg">No listings found for this tag.</p>`;
    if (loadMoreSection) loadMoreSection.style.display = "none";
    return;
  }

  await initPaginatedList({
    container: listingSection,
    loadMoreSection: loadMoreSection!,
    fetchItems: (page) =>
      filterListingsByTag(tag, page, 12, currentSortOrder, activeOnly),
    renderItem: (listing) => {
      fadeOutSkeletons(listingSection, () => ListingCard(listing));
      return ListingCard(listing, { lazy: true });
    },
  });
}

async function init() {
  const heroSection = document.getElementById("hero-section");
  const headingSection = document.getElementById("heading-section");
  const listingSection = document.getElementById("listing-section");
  const searchFilterSection = document.getElementById("search-filter-section");
  if (
    !heroSection ||
    !headingSection ||
    !listingSection ||
    !searchFilterSection
  )
    return;

  try {
    heroSection.appendChild(Hero());

    headingSection.innerHTML = `<h2 class="text-3xl uppercase sm:text-4xl">Listings</h2>`;

    searchFilterSection.appendChild(
      SearchBar((query) => {
        if (query.length === 0) {
          loadDefaultListings(listingSection);
        } else {
          loadSearchResults(listingSection, query);
        }
      })
    );

    searchFilterSection.appendChild(
      TagFilter((tag) => {
        if (tag.length === 0) {
          loadDefaultListings(listingSection);
        } else {
          loadFilteredListings(listingSection, tag);
        }
      })
    );

    searchFilterSection.appendChild(
      sortFilter((sortValue) => {
        currentSortOrder = sortValue === "asc" ? "asc" : "desc";

        const searchInput = document.querySelector("#search");
        const tagInput = document.querySelector("#filter");

        const searchQuery =
          searchInput instanceof HTMLInputElement ? searchInput.value : "";
        const tagQuery =
          tagInput instanceof HTMLInputElement ? tagInput.value : "";

        if (searchQuery) {
          loadSearchResults(listingSection, searchQuery);
        } else if (tagQuery) {
          loadFilteredListings(listingSection, tagQuery);
        } else {
          loadDefaultListings(listingSection);
        }
      })
    );

    searchFilterSection.appendChild(
      Switch((activeOnly) => {
        currentActiveOnly = activeOnly;

        const searchInput = document.querySelector(
          "#search"
        ) as HTMLInputElement;
        const tagInput = document.querySelector("#filter") as HTMLInputElement;

        const searchQuery = searchInput?.value || "";
        const tagQuery = tagInput?.value || "";

        if (searchQuery) {
          loadSearchResults(listingSection, searchQuery);
        } else if (tagQuery) {
          loadFilteredListings(listingSection, tagQuery);
        } else {
          loadDefaultListings(listingSection);
        }
      })
    );

    await loadDefaultListings(listingSection);
  } catch (error) {
    let message = "Something went wrong. Please try again.";

    if (error instanceof ApiError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    await showErrorModal(message);
    console.error("initPaginatedList error:", error);
  }
}

init();
