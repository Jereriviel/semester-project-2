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

    const allImages = listing.media;

    allImages.forEach((mediaItem) => {
      const thumbWrapper = document.createElement("figure");
      thumbWrapper.className = "overflow-hidden rounded-xl";

      const thumbImg = document.createElement("img");
      thumbImg.src = mediaItem.url;
      thumbImg.alt = mediaItem.alt ?? listing.title;
      thumbImg.tabIndex = 0;
      thumbImg.className =
        "rounded-xl cursor-pointer w-full aspect-[4/3] object-cover transition-all focus:border-primary-dark focus:border-2 focus:outline-none hover:scale-104";

      applyPlaceholderImage(thumbImg);

      function updateMainImage() {
        mainImg.classList.add("fade-out");

        mainImg.addEventListener(
          "animationend",
          () => {
            mainImg.src = thumbImg.src;
            mainImg.alt = thumbImg.alt;

            mainImg.classList.remove("fade-out");
            mainImg.classList.add("fade-in");

            mainImg.addEventListener(
              "animationend",
              () => {
                mainImg.classList.remove("fade-in");
              },
              { once: true }
            );
          },
          { once: true }
        );
      }

      thumbImg.addEventListener("click", () => {
        updateMainImage();
      });

      thumbImg.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          updateMainImage();
        }
      });

      thumbWrapper.appendChild(thumbImg);
      thumbnailGrid.appendChild(thumbWrapper);
    });

    container.appendChild(thumbnailGrid);
  }

  return container;
}
