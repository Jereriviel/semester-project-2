import { Profile } from "../../types/profile.js";

export function ProfileCredits(profile: Profile) {
  const container = document.createElement("div");
  container.className =
    "bg-primary-normal text-primary-dark rounded-xl font-semibold py-2 px-4 sm:text-lg uppercase";

  const text = document.createElement("p");
  text.textContent = `Available Credits: ${profile.credits}`;

  container.appendChild(text);

  return container;
}
