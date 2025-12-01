import { ListingBase } from "../types/listings.js";

export function updateListingHead(listing: ListingBase) {
  const title = document.querySelector("title");
  if (title) {
    title.textContent = `Trove | ${listing.title}`;
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      `Bid on this Listing: ${listing.description}`
    );
  }
}
