import { requireAuth } from "../../utils/authGuard.js";
import { NewListingButton } from "../../components/buttons/NewListingButton.js";
import { ProfileBanner } from "../../components/profile/ProfileBanner.js";
import { getUser } from "../../store/userStore.js";
import { getProfile } from "../../services/profile.js";
import { profileBannerSkeleton } from "../../components/profile/ProfileBannerSkeleton.js";

requireAuth();
initProfilePage();

async function initProfilePage() {
  const user = getUser();
  if (!user) return;

  const bannerSection = document.getElementById("profile-banner-section");
  if (!bannerSection) return;

  const skeleton = profileBannerSkeleton();
  bannerSection.appendChild(skeleton);

  const profile = await getProfile(user.name);

  bannerSection.replaceChild(ProfileBanner(profile), skeleton);

  const newListingSection = document.getElementById("new-listing-section");
  if (!newListingSection) return;
  newListingSection.appendChild(NewListingButton());
}
