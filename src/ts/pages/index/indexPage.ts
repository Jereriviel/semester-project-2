import { ListingCard } from "../../components/listings/ListingCard.js";
import { getAllListings } from "../../services/listings.js";
import { listingCardSkeleton } from "../../components/listings/ListingCardSkeleton.js";
import { initPaginatedList } from "../../utils/pagination.js";
import { SearchBar } from "../../components/listings/searchBar.js";
import { searchListings } from "../../services/listings.js";

async function loadDefaultListings(listingSection: HTMLElement) {
  listingSection.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    listingSection.insertAdjacentHTML("beforeend", listingCardSkeleton());
  }

  await initPaginatedList({
    container: listingSection,
    loadMoreSection: document.getElementById("load-more-section")!,
    fetchItems: (page) => getAllListings(page, 12),
    renderItem: (listing) => ListingCard(listing, { lazy: true }),
  });
}

async function loadSearchResults(listingSection: HTMLElement, query: string) {
  listingSection.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    listingSection.insertAdjacentHTML("beforeend", listingCardSkeleton());
  }

  const items = await searchListings(query, 1, 12);
  const loadMoreSection = document.getElementById("load-more-section");

  if (!items || items.data.length === 0) {
    listingSection.innerHTML = `
      <p class="text-lg">No search results found.</p>
    `;
    if (loadMoreSection) loadMoreSection.style.display = "none";
    return;
  }

  await initPaginatedList({
    container: listingSection,
    loadMoreSection: loadMoreSection!,
    fetchItems: (page) => searchListings(query, page, 12),
    renderItem: (listing) => ListingCard(listing, { lazy: true }),
  });
}

async function init() {
  const listingSection = document.getElementById("listing-section");
  const searchFilterSection = document.getElementById("search-filter-section");
  if (!listingSection || !searchFilterSection) return;

  searchFilterSection.appendChild(
    SearchBar((query) => {
      if (query.length === 0) {
        loadDefaultListings(listingSection);
      } else {
        loadSearchResults(listingSection, query);
      }
    })
  );
  await loadDefaultListings(listingSection);
}

init();
