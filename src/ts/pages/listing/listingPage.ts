import { getSingleListing } from "../../services/listings.js";
import { updateListingHead } from "../../utils/updateHead.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { showErrorModal } from "../../components/modals/errorModal.js";
import { renderBreadcrumb } from "../../components/singleListing/breadcrumb.js";
import { ImageGallery } from "../../components/singleListing/imageGallery.js";
import { renderListingDetails } from "../../components/singleListing/listingDetails.js";
import { renderBidHistory } from "../../components/singleListing/bidHistory.js";
import { ImageGallerySkeleton } from "../../components/skeletons/ImageGallerySkeleton.js";
import { addSkeletons, fadeOutSkeletons } from "../../utils/skeletonUtils.js";

async function initListingPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  try {
    const { data: listing } = await getSingleListing(id);

    //Listing Head and Breadcrumb Sections

    updateListingHead(listing);
    renderBreadcrumb(listing.title);

    //Image Gallery and Listing Details Sections

    const imageGallerySection = document.getElementById(
      "image-gallery-section"
    );
    if (!imageGallerySection) return;

    addSkeletons(imageGallerySection, ImageGallerySkeleton, 1);
    fadeOutSkeletons(imageGallerySection, () => ImageGallery(listing));

    //Listing Details and Bid History Sections

    renderListingDetails(listing);
    renderBidHistory(listing.bids ?? []);
  } catch (error) {
    let message = "Something went wrong. Please try again.";

    if (error instanceof ApiError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    await showErrorModal(message);
    console.error("initPaginatedList error:", error);
  }
}

initListingPage();
