import { ListingBase } from "../../types/listings.js";
import { ProfileBid } from "../../types/profile.js";
import { formatEndsIn, startCountdown } from "../../utils/formatters.js";
import { applyPlaceholderImage } from "../../utils/placeholderImg.js";
import { editListingButton } from "../buttons/editListingButton.js";

interface BaseCardOptions {
  showEndsAt?: boolean;
  showBidCount?: boolean;
  yourBid?: number | null;
  newestBid?: number | null;
}

export function ProfileListingCardBase(
  listing: ListingBase,
  options: BaseCardOptions = {}
) {
  const {
    showEndsAt = true,
    showBidCount = false,
    yourBid = null,
    newestBid = null,
  } = options;

  const article = document.createElement("article");
  article.className =
    "shadow-card bg-secondary-light text-primary-dark w-full overflow-hidden rounded-xl transition-all duration-300 ease-in-out grid focus-visible:ring-2 focus-visible:ring-primary-dark fade-in";
  article.tabIndex = 0;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.className = "h-60 object-cover w-full card-image";
  img.src = listing.media?.[0]?.url ?? "/assets/images/placeholder-img.jpg";

  figure.appendChild(img);
  article.appendChild(figure);

  const content = document.createElement("div");
  content.className = "flex flex-col p-6 gap-4 justify-between";

  const topSection = document.createElement("div");
  topSection.className = "flex flex-col gap-2";

  const title = document.createElement("h2");
  title.className = "text-3xl line-clamp-2 capitalize";
  title.textContent = listing.title;
  topSection.appendChild(title);

  const bottomSection = document.createElement("div");
  bottomSection.className = "bottom-section flex flex-col gap-4 mt-auto";

  if (showBidCount) {
    const bidWrap = document.createElement("div");
    bidWrap.className = "flex flex-col";

    const label = document.createElement("p");
    label.textContent = "Total bids:";

    const value = document.createElement("p");
    value.className = "text-lg font-semibold";
    value.textContent = `${listing._count?.bids ?? 0}`;

    bidWrap.append(label, value);
    bottomSection.appendChild(bidWrap);
  }

  if (newestBid !== null) {
    const newestWrap = document.createElement("div");
    newestWrap.className = "flex flex-col";

    const label = document.createElement("p");
    label.textContent = "Newest bid:";

    const value = document.createElement("p");
    value.className = "text-lg font-semibold";
    value.textContent = `${newestBid} Credits`;

    newestWrap.append(label, value);
    bottomSection.appendChild(newestWrap);
  }

  if (yourBid !== null) {
    const yourBidWrap = document.createElement("div");
    yourBidWrap.className = "flex flex-col";

    const label = document.createElement("p");
    label.textContent = "Your bid:";

    const value = document.createElement("p");
    value.className = "text-lg font-semibold";
    value.textContent = `${yourBid} Credits`;

    yourBidWrap.append(label, value);
    bottomSection.appendChild(yourBidWrap);
  }

  if (showEndsAt) {
    const endsWrap = document.createElement("div");
    endsWrap.className = "flex flex-col gap-1";

    const label = document.createElement("p");
    label.textContent = "Ends in:";

    const countdown = document.createElement("p");
    countdown.className = "text-lg font-semibold";
    countdown.id = "countdown";
    countdown.textContent = formatEndsIn(listing.endsAt);

    endsWrap.append(label, countdown);
    bottomSection.appendChild(endsWrap);

    startCountdown(listing.endsAt, countdown);
  }

  content.append(topSection, bottomSection);
  article.appendChild(content);
  applyPlaceholderImage(img);

  return article;
}

export function ProfileYourListingCard(listing: ListingBase) {
  const newestBid =
    listing.bids && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : null;

  const card = ProfileListingCardBase(listing, {
    showBidCount: true,
    newestBid,
  });

  const bottomSection = card.querySelector(".bottom-section") as HTMLElement;

  if (bottomSection) {
    const wrapper = document.createElement("div");
    wrapper.className = "flex flex-col gap-4";

    const viewLink = document.createElement("a");
    viewLink.href = `/listing/index.html?id=${listing.id}`;
    viewLink.className = "btn btn_secondary sm:w-fit text-center";
    viewLink.innerText = "View Listing Page";

    const editBtn = editListingButton(listing);

    wrapper.append(viewLink, editBtn);
    bottomSection.appendChild(wrapper);
  }

  return card;
}

export function ProfileActiveBidCard(bid: ProfileBid) {
  const listing = bid.listing;
  if (!listing) return null;

  const hasEnded = new Date(listing.endsAt) <= new Date();
  if (hasEnded) return null;

  const newestBid =
    listing.bids && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : null;

  const card = ProfileListingCardBase(listing, {
    yourBid: bid.amount,
    newestBid,
    showBidCount: false,
  });

  const bottomSection = card.querySelector(".bottom-section") as HTMLElement;

  if (bottomSection) {
    const bidLink = document.createElement("a");
    bidLink.href = `/listing/index.html?id=${listing.id}`;
    bidLink.className = "btn btn_primary sm:w-fit text-center";
    bidLink.innerText = "Place Another Bid";

    bottomSection.appendChild(bidLink);
  }

  return card;
}

export function ProfileWonBidCard(listing: ListingBase) {
  const yourBid =
    listing.bids && listing.bids.length > 0
      ? listing.bids[listing.bids.length - 1].amount
      : null;

  const card = ProfileListingCardBase(listing, {
    yourBid,
    showEndsAt: true,
  });

  const bottomSection = card.querySelector(".bottom-section") as HTMLElement;

  if (bottomSection) {
    const detailsLink = document.createElement("a");
    detailsLink.href = `/listing/index.html?id=${listing.id}`;
    detailsLink.className = "btn btn_primary sm:w-fit text-center";
    detailsLink.innerText = "View Details";

    bottomSection.appendChild(detailsLink);
  }

  return card;
}
