import { requireAuth } from "../../utils/authGuard.js";
import { NewListingButton } from "../../components/buttons/NewListingButton.js";
import { ProfileBanner } from "../../components/profile/ProfileBanner.js";
import { getUser } from "../../store/userStore.js";
import { getProfile } from "../../services/profile.js";
import { profileBannerSkeleton } from "../../components/profile/ProfileBannerSkeleton.js";
import { ProfileCredits } from "../../components/profile/ProfileCredits.js";
import { ProfileCard } from "../../components/profile/ProfileCard.js";
import { profileCardSkeleton } from "../../components/profile/ProfileCardSkeleton.js";

requireAuth();
initProfilePage();

async function initProfilePage() {
  const user = getUser();
  if (!user) return;

  const bannerSection = document.getElementById("profile-banner-section");
  if (!bannerSection) return;

  const bannerSkeleton = profileBannerSkeleton();
  bannerSection.appendChild(bannerSkeleton);

  const profileCardSection = document.getElementById("profile-card-section");
  if (!profileCardSection) return;

  const profileSkeleton = profileCardSkeleton();
  profileCardSection.appendChild(profileSkeleton);

  const profile = await getProfile(user.name);

  bannerSection.replaceChild(ProfileBanner(profile), bannerSkeleton);
  profileCardSection.replaceChild(ProfileCard(profile), profileSkeleton);

  const creditsSection = document.getElementById("credits-section");
  if (!creditsSection) return;
  creditsSection.appendChild(ProfileCredits(profile));

  const newListingSection = document.getElementById("new-listing-section");
  if (!newListingSection) return;
  newListingSection.appendChild(NewListingButton());
}
