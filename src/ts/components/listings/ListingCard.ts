import { ListingBase } from "../../types/listings.js";
import { formatEndsIn, startCountdown } from "../../utils/formatters.js";
import { applyPlaceholderImage } from "../../utils/placeholderImg.js";

export function ListingCard(
  listing: ListingBase,
  options: { lazy?: boolean } = { lazy: true }
) {
  const { lazy } = options;

  const article = document.createElement("article");
  article.id = "listing-card";
  article.tabIndex = 0;
  article.className =
    "shadow-card bg-secondary-light text-primary-dark hover:bg-secondary-normal w-full overflow-hidden rounded-xl transition-all duration-300 ease-in-out grid grid-rows-[max-content] grid-cols-[minmax(0, 1fr)] cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:outline-none fade-in";

  const navigate = () =>
    (window.location.href = `/listing/index.html?id=${listing.id}`);
  article.addEventListener("click", navigate);
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter") navigate();
  });

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.className = `h-60 object-cover w-full card-image ${lazy ? "lazy-load" : ""}`;

  const imgUrl =
    listing.media?.[0]?.url ?? "/assets/images/placeholder-img.jpg";

  if (lazy) {
    img.dataset.src = imgUrl;
    img.src = "/assets/images/placeholder-dot.png";
  } else {
    img.src = imgUrl;
  }

  figure.appendChild(img);
  article.appendChild(figure);

  const content = document.createElement("div");
  content.className = "flex flex-col p-6 gap-4 justify-between";

  const topSection = document.createElement("div");
  topSection.className = "flex flex-col gap-4";

  const titleWrap = document.createElement("div");
  titleWrap.className = "flex flex-col gap-2";

  const title = document.createElement("h2");
  title.className = "text-3xl line-clamp-2 capitalize";
  title.textContent = listing.title;

  const seller = document.createElement("p");
  seller.textContent = `By: ${listing.seller?.name ?? "Unknown"}`;

  titleWrap.append(title, seller);

  const description = document.createElement("p");
  description.className = "text-lg line-clamp-3";
  description.textContent = listing.description ?? "";

  const tagsWrap = document.createElement("div");
  tagsWrap.className = "flex gap-4 flex-wrap";

  listing.tags.forEach((tag) => {
    const tagDiv = document.createElement("div");
    tagDiv.className = "btn btn_tag";

    const tagP = document.createElement("p");
    tagP.textContent = tag;

    tagDiv.appendChild(tagP);
    tagsWrap.appendChild(tagDiv);
  });

  topSection.append(titleWrap, description, tagsWrap);

  const bottomSection = document.createElement("div");
  bottomSection.className = "flex flex-col gap-4 mt-auto";

  const bidWrap = document.createElement("div");
  bidWrap.className = "flex flex-col gap-2";

  const bidLabel = document.createElement("p");
  bidLabel.textContent = "Newest bid:";
  const bidValue = document.createElement("p");
  bidValue.className = "text-lg font-semibold";

  bidValue.textContent = listing.bids?.length
    ? `${listing.bids.at(-1)?.amount} Credits`
    : "No bids yet";

  bidWrap.append(bidLabel, bidValue);

  const endsWrap = document.createElement("div");
  endsWrap.className = "flex flex-col gap-2";

  const endsLabel = document.createElement("p");
  endsLabel.textContent = "Ends in:";

  const countdown = document.createElement("p");
  countdown.className = "text-lg font-semibold";
  countdown.id = "countdown";
  countdown.textContent = formatEndsIn(listing.endsAt);

  endsWrap.append(endsLabel, countdown);

  bottomSection.append(bidWrap, endsWrap);

  content.append(topSection, bottomSection);
  article.appendChild(content);

  startCountdown(listing.endsAt, countdown);
  applyPlaceholderImage(img);

  return article;
}
