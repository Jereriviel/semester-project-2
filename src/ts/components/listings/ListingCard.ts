import { ListingBase } from "../../types/listings.js";
import { formatEndsIn } from "../../utils/formatters.js";

export async function ListingCard(listing: ListingBase) {
  const firstImage = listing.media?.[0];

  return `
       <div class="mx-auto grid max-w-7xl px-4 py-12 sm:px-12 xl:px-0">
          <article
            id="listing-card"
            class="shadow-card bg-secondary-light text-primary-dark hover:bg-secondary-normal w-full overflow-hidden rounded-xl transition-all duration-300 ease-in-out sm:w-[395px]"
          >
            <a href="/listing/index.html?id=${listing.id}">
              <figure>
                <img
                  class="h-[263px] object-cover w-full"
                  src="${firstImage?.url}"
                  alt="${firstImage?.alt}"
                >
              </figure>
              <div class="flex flex-col gap-4 px-8 py-6">
                <div class="flex flex-col gap-2">
                  <h2 class="text-3xl">${listing.title}</h2>
                  <p>By: ${listing.seller?.name ?? "Unknown"}</p>
                </div>
                <p class="text-lg">
                    ${
                      listing.description
                        ? listing.description.length > 50
                          ? listing.description.slice(0, 110) + "..."
                          : listing.description
                        : ""
                    }
                </p>
                <div class="flex gap-4">
                ${listing.tags
                  .map((tag) => `<div class="btn btn_tag"><p>${tag}</p></div>`)
                  .join("")}
                </div>
                <div class="flex flex-col gap-2">
                  <p>Newest bid:</p>
                  <p class="text-lg font-semibold">
                    ${
                      listing.bids?.length
                        ? `${listing.bids.at(-1)?.amount} Credits`
                        : "No bids yet"
                    }
                  </p>
                </div>
                <div class="flex flex-col gap-2">
                  <p>Ends in:</p>
                  <p class="text-lg font-semibold">${formatEndsIn(listing.endsAt)}
                  </p>
                </div>
              </div></a
            >
          </article>
        </div>`;
}

export async function renderListingCard(listing: ListingBase) {
  const listingSection = document.getElementById("listing-section");
  if (!listingSection) return;

  listingSection.innerHTML = await ListingCard(listing);
}
