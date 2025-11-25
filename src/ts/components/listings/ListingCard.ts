import { ListingBase } from "../../types/listings.js";
import { formatEndsIn } from "../../utils/formatters.js";
import { applyPlaceholderImage } from "../../utils/placeholderImg.js";

export function ListingCard(listing: ListingBase) {
  const article = document.createElement("article");
  article.id = "listing-card";
  article.className =
    "shadow-card bg-secondary-light text-primary-dark hover:bg-secondary-normal w-full overflow-hidden rounded-xl transition-all duration-300 ease-in-out grid grid-rows-[max-content] grid-cols-[minmax(0, 1fr)] cursor-pointer";

  article.addEventListener("click", () => {
    window.location.href = `/listing/index.html?id=${listing.id}`;
  });

  article.innerHTML = `
      <figure>
        <img
          class="h-60 object-cover w-full card-image"
          src="${listing.media?.[0]?.url || "/assets/images/placeholder-img.jpg"}"
          alt="${listing.media?.[0]?.alt || "No Image."}"
        >
      </figure>
      <div class="flex flex-col p-6 gap-4 justify-between">
          <div class="flex flex-col gap-4">
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
            <div class="flex gap-4 flex-wrap">
                ${listing.tags
                  .map((tag) => `<div class="btn btn_tag"><p>${tag}</p></div>`)
                  .join("")}
            </div>
          </div>
        <div class="flex flex-col gap-4 mt-auto">
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
            <p class="text-lg font-semibold">${formatEndsIn(listing.endsAt)}</p>
          </div>
        </div>
      </div>
  `;

  const img = article.querySelector<HTMLImageElement>("img.card-image");
  if (img) applyPlaceholderImage(img);

  return article;
}
