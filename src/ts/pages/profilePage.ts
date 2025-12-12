import { requireAuth } from "../utils/authGuard.js";
import { NewListingButton } from "../components/buttons/NewListingButton.js";
import { ProfileBanner } from "../components/profile/ProfileBanner.js";
import { getUser } from "../store/userStore.js";
import {
  getProfile,
  getProfileListings,
  getProfileBids,
  getProfileWins,
} from "../services/profile.js";
import { profileBannerSkeleton } from "../components/loading/ProfileBannerSkeleton.js";
import { ProfileCredits } from "../components/profile/ProfileCredits.js";
import { ProfileCard } from "../components/profile/ProfileCard.js";
import { profileCardSkeleton } from "../components/loading/ProfileCardSkeleton.js";
import {
  ProfileYourListingCard,
  ProfileActiveBidCard,
  ProfileWonBidCard,
} from "../components/profile/ProfileListingCard.js";
import { ListingCardSkeleton } from "../components/loading/ListingCardSkeleton.js";
import { addSkeletons, fadeOutSkeletons } from "../utils/skeletonUtils.js";
import { profileCreditsSkeleton } from "../components/loading/ProfileCreditsSkeleton.js";
import { profileAddListingSkeleton } from "../components/loading/ProfileAddListingSkeleton.js";
import { showErrorModal } from "../components/modals/errorModal.js";
import { ApiError } from "../errors.ts/ApiError.js";

requireAuth();

async function initProfilePage() {
  const user = getUser();
  if (!user) return;

  //Banner and Profile Card sections

  const bannerSection = document.getElementById("profile-banner-section");
  const profileCardSection = document.getElementById("profile-card-section");
  const creditsSection = document.getElementById("credits-section");
  const newListingSection = document.getElementById("new-listing-section");
  const yourListingsSection = document.getElementById("your-listings-section");
  const activeBidsSection = document.getElementById("active-bids-section");
  const wonBidsSection = document.getElementById("won-bids-section");

  if (
    !bannerSection ||
    !profileCardSection ||
    !creditsSection ||
    !newListingSection ||
    !yourListingsSection ||
    !activeBidsSection ||
    !wonBidsSection
  )
    return;

  addSkeletons(bannerSection, profileBannerSkeleton, 1);
  addSkeletons(profileCardSection, profileCardSkeleton, 1);
  addSkeletons(creditsSection, profileCreditsSkeleton, 1);
  addSkeletons(newListingSection, profileAddListingSkeleton, 1);
  addSkeletons(yourListingsSection, ListingCardSkeleton, 3);

  try {
    const profile = await getProfile(user.name);

    const yourListings = await getProfileListings(user.name);
    const activeBids = await getProfileBids(user.name);
    const wonBids = await getProfileWins(user.name);

    fadeOutSkeletons(bannerSection, () => ProfileBanner(profile));
    fadeOutSkeletons(profileCardSection, () => ProfileCard(profile));
    fadeOutSkeletons(creditsSection, () => ProfileCredits(profile), true);
    fadeOutSkeletons(newListingSection, () => NewListingButton(), true);
    fadeOutSkeletons(
      yourListingsSection,
      () => {
        if (yourListings.data.length === 0) {
          const p = document.createElement("p");
          p.className = "text-lg italic text-primary-dark p-4";
          p.textContent = "You haven't created any listings yet.";
          return p;
        }
        return yourListings.data.map((listing) =>
          ProfileYourListingCard(listing)
        );
      },
      true
    );

    yourListingsSection.insertAdjacentHTML(
      "beforebegin",
      `<div class="mx-auto flex w-full max-w-7xl gap-12 px-4 pt-8 sm:px-12 xl:px-0">
       <h2 class="text-2xl uppercase sm:text-3xl">Your Listings</h2>
     <div>`
    );

    activeBidsSection.insertAdjacentHTML(
      "beforebegin",
      `<div class="mx-auto flex w-full max-w-7xl gap-12 px-4 pt-8 sm:px-12 xl:px-0">
       <h2 class="text-2xl uppercase sm:text-3xl">Active Bids</h2>
    <div>`
    );

    wonBidsSection.insertAdjacentHTML(
      "beforebegin",
      `<div class="mx-auto flex w-full max-w-7xl gap-12 px-4 pt-8 sm:px-12 xl:px-0">
    <h2 class="text-2xl uppercase sm:text-3xl">Won Bids</h2>
    <div>`
    );

    const renderEmptyMessage = (section: HTMLElement, message: string) => {
      const p = document.createElement("p");
      p.className = "text-lg italic p-4";
      p.textContent = message;
      section.appendChild(p);
    };

    if (activeBids.data.length === 0) {
      renderEmptyMessage(activeBidsSection, "No active bids.");
    } else {
      activeBids.data.forEach((bid) => {
        const card = ProfileActiveBidCard(bid);
        if (card) activeBidsSection.appendChild(card);
      });
    }

    if (wonBids.data.length === 0) {
      renderEmptyMessage(wonBidsSection, "No wins yet.");
    } else {
      wonBids.data.forEach((bid) => {
        const card = ProfileWonBidCard(bid);
        if (card) wonBidsSection.appendChild(card);
      });
    }
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

initProfilePage();
