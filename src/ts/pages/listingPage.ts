import { getSingleListing } from "../services/listings.js";
import { updateListingHead } from "../utils/updateHead.js";
import { showErrorModal } from "../components/modals/errorModal.js";
import { renderBreadcrumb } from "../components/singleListing/breadcrumb.js";
import { ImageGallery } from "../components/singleListing/imageGallery.js";
import { renderListingDetails } from "../components/singleListing/listingDetails.js";
import { renderBidHistory } from "../components/singleListing/bidHistory.js";
import { ImageGallerySkeleton } from "../components/loading/ImageGallerySkeleton.js";
import { addSkeletons, fadeOutSkeletons } from "../utils/skeletonUtils.js";
import { handleApiError } from "../errors.ts/handleApiError.js";

async function initListingPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    await showErrorModal(
      "Missing listing ID. Redirecting you back to listings."
    );
    window.location.href = "/index.html";
    return;
  }

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
    await handleApiError(error);
  }
}

initListingPage();
