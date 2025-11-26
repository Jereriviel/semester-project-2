import { ListingCard } from "../../components/listings/ListingCard.js";
import { getAllListings } from "../../services/listings.js";
import { listingCardSkeleton } from "../../components/listings/ListingCardSkeleton.js";
import { initPaginatedList } from "../../utils/pagination.js";

async function init() {
  const listingSection = document.getElementById("listing-section");
  if (!listingSection) return;

  listingSection.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    listingSection.insertAdjacentHTML("beforeend", listingCardSkeleton());
  }

  await initPaginatedList({
    container: listingSection,
    loadMoreSection: document.getElementById("load-more-section")!,
    fetchItems: (page) => getAllListings(page, 12),
    renderItem: (listing) => ListingCard(listing, { lazy: true }),
  });
}

init();
