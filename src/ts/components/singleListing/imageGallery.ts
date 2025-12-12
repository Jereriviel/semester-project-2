import { ListingBase } from "../../types/listings.js";
import { applyPlaceholderImage } from "../../utils/placeholderImg.js";

export function ImageGallery(listing: ListingBase) {
  const container = document.createElement("div");
  container.className = "grid gap-4 grid-rows[max-content]";

  const mainWrapper = document.createElement("figure");
  const mainImg = document.createElement("img");

  const hasImages = listing.media && listing.media.length > 0;

  if (hasImages) {
    mainImg.src = listing.media[0].url;
    mainImg.alt = listing.media[0].alt ?? listing.title;
  } else {
    mainImg.src = "/assets/images/placeholder-img.jpg";
    mainImg.alt = listing.title;
  }

  mainWrapper.className = "w-full max-w-[520px]";
  mainImg.className = "rounded-xl w-full";

  mainWrapper.appendChild(mainImg);
  container.appendChild(mainWrapper);

  applyPlaceholderImage(mainImg);

  if (hasImages && listing.media.length > 1) {
    const thumbnailGrid = document.createElement("div");
    thumbnailGrid.className = "grid grid-cols-3 gap-4 w-full max-w-[520px]";

    listing.media.slice(1).forEach((mediaItem) => {
      const thumbWrapper = document.createElement("figure");
      const thumbImg = document.createElement("img");

      thumbImg.src = mediaItem.url;
      thumbImg.alt = mediaItem.alt ?? listing.title;
      thumbImg.className =
        "rounded-xl cursor-pointer w-full aspect-[4/3] object-cover";

      applyPlaceholderImage(thumbImg);

      thumbImg.addEventListener("click", () => {
        const oldMainSrc = mainImg.src;
        const oldMainAlt = mainImg.alt;

        mainImg.src = thumbImg.src;
        mainImg.alt = thumbImg.alt;

        thumbImg.src = oldMainSrc;
        thumbImg.alt = oldMainAlt;
      });

      thumbWrapper.appendChild(thumbImg);
      thumbnailGrid.appendChild(thumbWrapper);
    });

    container.appendChild(thumbnailGrid);
  }
  return container;
}
