import { getAllListings } from "../../services/listings.js";
import { renderListingCard } from "../../components/listings/ListingCard.js";

async function init() {
  const { data } = await getAllListings(1, 10);

  const container = document.getElementById("listing-section");
  if (!container) return;

  container.innerHTML = "";

  for (const listing of data) {
    await renderListingCard(listing);
  }
}

init();
