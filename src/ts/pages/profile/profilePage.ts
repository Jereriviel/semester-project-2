import { requireAuth } from "../../utils/authGuard.js";
import { NewListingButton } from "../../components/buttons/NewListingButton.js";
import { ProfileBanner } from "../../components/profile/ProfileBanner.js";
import { getUser } from "../../store/userStore.js";
import { getProfile } from "../../services/profile.js";

requireAuth();
initProfilePage();

async function initProfilePage() {
  const user = getUser();
  if (!user) return;

  const profile = await getProfile(user.name);

  const bannerSection = document.getElementById("profile-banner-section");
  if (!bannerSection) return;
  bannerSection.appendChild(ProfileBanner(profile));

  const newListingSection = document.getElementById("new-listing-section");
  if (!newListingSection) return;
  newListingSection.appendChild(NewListingButton());
}
