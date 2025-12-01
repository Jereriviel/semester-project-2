import { getSingleListing } from "../../services/listings.js";
import { updateListingHead } from "../../utils/updateHead.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { showErrorModal } from "../../components/modals/errorModal.js";
import { renderBreadcrumb } from "../../components/singleListing/breadcrumb.js";
import { renderImageGallery } from "../../components/singleListing/imageGallery.js";

async function initListingPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  try {
    const { data: listing } = await getSingleListing(id);

    updateListingHead(listing);
    renderBreadcrumb(listing.title);
    renderImageGallery(listing);
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
