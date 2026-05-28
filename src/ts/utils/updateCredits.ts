import { getUser } from "../store/userStore.js";
import { getProfile } from "../services/profile.js";

export async function updateCredits() {
  const user = getUser();

  if (!user) return;

  try {
    const profile = await getProfile(user.name);

    const creditsText =
      document.querySelector<HTMLParagraphElement>(".credits-text");

    if (!creditsText) return;

    creditsText.textContent = `CREDITS: ${profile.credits}`;
  } catch (error) {
    console.error("Failed to update credits:", error);
  }
}
