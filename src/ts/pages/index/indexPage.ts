import { ListingCard } from "../../components/listings/ListingCard.js";
import { getAllListings } from "../../services/listings.js";
import { listingCardSkeleton } from "../../components/listings/ListingCardSkeleton.js";

async function init() {
  const container = document.getElementById("listing-section");
  if (!container) return;

  container.innerHTML = Array.from({ length: 12 })
    .map(() => listingCardSkeleton())
    .join("");

  const { data } = await getAllListings(1, 12);

  const skeletons = container.querySelectorAll("[data-skeleton]");
  skeletons.forEach((skeleton) => skeleton.classList.add("fade-out"));

  container.innerHTML = "";

  data.forEach((listing) => {
    const card = ListingCard(listing);

    card.classList.add("fade-in");

    container.appendChild(card);
  });
}

init();
