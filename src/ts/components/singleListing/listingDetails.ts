import { ListingBase } from "../../types/listings.js";
import { formatEndsIn } from "../../utils/formatters.js";
import { formatDate, startCountdown } from "../../utils/formatters.js";
import { PlaceBid } from "./bid.js";
import { getSingleListing } from "../../services/listings.js";
import { renderBidHistory } from "./bidHistory.js";

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
      <h1 class="text-4xl sm:text-[40px] capitalize title"></h1>
      <p class="text-lg description"></p>

      <div class="flex flex-wrap gap-4 tags"></div>

      <div class="flex w-fit flex-col gap-2">
        <div class="flex gap-4 text-sm">
          <div class="flex w-fit justify-between gap-1">
            <p>Posted:</p>
            <p class="created"></p>
          </div>

          <div class="updated-wrapper hidden gap-2 text-gray-dark italic">
            <p>Updated:</p>
            <p class="updated"></p>
          </div>
        </div>

        <div class="flex gap-2">
          <p>Seller:</p>
          <p class="seller"></p>
        </div>
      </div>
    </div>

    <div class="flex w-fit flex-col gap-2">
      <div class="flex w-full justify-between gap-4">
        <p>Number of bids:</p>
        <p class="font-medium bid-count"></p>
      </div>

      <div class="flex w-full justify-between gap-4">
        <p>Newest bid:</p>
        <p class="font-medium newest-bid"></p>
      </div>
    </div>

    <div class="flex gap-4 text-lg">
      <p>Ends in:</p>
      <p class="font-medium" id="countdown"></p>
    </div>
  `;

  article.querySelector(".title")!.textContent = listing.title;
  article.querySelector(".description")!.textContent =
    listing.description ?? "";

  article.querySelector(".created")!.textContent = formatDate(listing.created);

  article.querySelector(".seller")!.textContent =
    listing.seller?.name ?? "Unknown";

  if (isUpdated) {
    const wrapper = article.querySelector(".updated-wrapper") as HTMLElement;
    wrapper.classList.remove("hidden");
    wrapper.classList.add("flex");
    wrapper.querySelector(".updated")!.textContent = formatDate(
      listing.updated!
    );
  }

  article.querySelector(".bid-count")!.textContent = String(
    listing._count?.bids ?? 0
  );

  article.querySelector(".newest-bid")!.textContent = listing.bids?.length
    ? `${sortedBids[0].amount} Credits`
    : "No bids yet";

  const tagContainer = article.querySelector(".tags")!;
  listing.tags.forEach((tag) => {
    const div = document.createElement("div");
    div.className = "btn btn_tag";
    const p = document.createElement("p");
    p.textContent = tag;
    div.appendChild(p);
    tagContainer.appendChild(div);
  });

  const countdownElement = article.querySelector("#countdown") as HTMLElement;
  countdownElement.textContent = formatEndsIn(listing.endsAt);
  startCountdown(listing.endsAt, countdownElement);

  return article;
}

export function renderListingDetails(listing: ListingBase) {
  const section = document.getElementById("details-section");
  if (!section) return;

  section.innerHTML = "";
  section.appendChild(ListingDetails(listing));

  if (listing.seller) {
    section.appendChild(
      PlaceBid(listing.id, listing.seller, listing, async () => {
        const refreshed = await getSingleListing(listing.id);
        renderListingDetails(refreshed.data);
        renderBidHistory(refreshed.data.bids ?? []);
      })
    );
  }
}
