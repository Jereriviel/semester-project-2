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

requireAuth();
initProfilePage();

async function initProfilePage() {
  const user = getUser();
  if (!user) return;

  //Banner and Profile Card sections

  const bannerSection = document.getElementById("profile-banner-section");
  const profileCardSection = document.getElementById("profile-card-section");
  if (!bannerSection || !profileCardSection) return;

  addSkeletons(bannerSection, profileBannerSkeleton, 1);
  addSkeletons(profileCardSection, profileCardSkeleton, 1);

  const profile = await getProfile(user.name);

  fadeOutSkeletons(bannerSection, () => ProfileBanner(profile));
  fadeOutSkeletons(profileCardSection, () => ProfileCard(profile));

  // Credits and New Listing sections

  const creditsSection = document.getElementById("credits-section");
  const newListingSection = document.getElementById("new-listing-section");
  if (!creditsSection || !newListingSection) return;

  addSkeletons(creditsSection, profileCreditsSkeleton, 1);
  addSkeletons(newListingSection, profileAddListingSkeleton, 1);

  fadeOutSkeletons(creditsSection, () => ProfileCredits(profile), true);
  fadeOutSkeletons(newListingSection, () => NewListingButton(), true);

  // Your Listings, Active Bids and Won bids sections

  const yourListingsSection = document.getElementById("your-listings-section");
  const activeBidsSection = document.getElementById("active-bids-section");
  const wonBidsSection = document.getElementById("won-bids-section");
  if (!yourListingsSection || !activeBidsSection || !wonBidsSection) return;

  addSkeletons(yourListingsSection, ListingCardSkeleton, 3);

  const yourListings = await getProfileListings(user.name);
  const activeBids = await getProfileBids(user.name);
  const wonBids = await getProfileWins(user.name);

  const renderEmptyMessage = (section: HTMLElement, message: string) => {
    const p = document.createElement("p");
    p.className = "text-lg italic p-4";
    p.textContent = message;
    section.appendChild(p);
  };

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
}
