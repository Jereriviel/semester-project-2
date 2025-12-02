import { ListingBase } from "../../types/listings.js";
import { formatEndsIn } from "../../utils/formatters.js";
import { formatDate, startCountdown } from "../../utils/formatters.js";
import { PlaceBid } from "./bid.js";
import { getSingleListing } from "../../services/listings.js";

function ListingDetails(listing: ListingBase) {
  const article = document.createElement("article");
  article.className = "flex flex-col gap-8";

  const isUpdated =
    listing.updated &&
    new Date(listing.updated).getTime() > new Date(listing.created).getTime();

  const sortedBids = listing.bids
    ? [...listing.bids].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      )
    : [];

  article.innerHTML = `
    <div class="flex flex-col gap-4">
        <h1 class="text-4xl sm:text-[40px] capitalize">${listing.title}</h1>
        <p class="text-lg">
        ${listing.description ?? ""}
        </p>
        <div class="flex flex-wrap gap-4">
            ${listing.tags
              .map((tag) => `<div class="btn btn_tag"><p>${tag}</p></div>`)
              .join("")}
        </div>
        <div class="flex w-fit flex-col gap-2">
            <div class="flex gap-4 text-sm">
                <div class="flex w-fit justify-between gap-1">
                    <p>Posted:</p>
                    <p>${formatDate(listing.created)}</p>
                </div>
                ${
                  isUpdated
                    ? `
                        <div class="flex gap-2 text-gray-dark italic">
                            <p>Updated:</p>
                            <p>${formatDate(listing.updated)}</p>
                        </div>
                       `
                    : ""
                }
            </div>
            <div class="flex gap-2">
                <p>Seller:</p>
                <p>${listing.seller?.name ?? "Unknown"}</p>
            </div>
        </div>
    </div>
    <div class="flex w-fit flex-col gap-2">
        <div class="flex w-full justify-between gap-4">
            <p>Number of bids:</p>
            <p class="font-medium">${listing._count?.bids ?? 0}</p>
        </div>
        <div class="flex w-full justify-between gap-4">
            <p>Newest bid:</p>
            <p class="font-medium">              
            ${
              listing.bids?.length
                ? `${sortedBids[0].amount} Credits`
                : "No bids yet"
            }</p>
        </div>
    </div>
    <div class="flex gap-4 text-lg">
        <p>Ends in:</p>
        <p class="font-medium" id="countdown">${formatEndsIn(listing.endsAt)}</p>
    </div>
  `;

  const countdownElement = article.querySelector("#countdown") as HTMLElement;
  if (countdownElement) {
    startCountdown(listing.endsAt, countdownElement);
  }

  return article;
}

export function renderListingDetails(listing: ListingBase) {
  const section = document.getElementById("details-section");
  if (!section) return;

  section.innerHTML = "";
  section.appendChild(ListingDetails(listing));

  section.appendChild(
    PlaceBid(listing.id, async () => {
      const refreshed = await getSingleListing(listing.id);

      renderListingDetails(refreshed.data);
    })
  );
}
