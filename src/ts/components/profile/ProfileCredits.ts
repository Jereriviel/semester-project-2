import { Profile } from "../../types/profile.js";

export function ProfileCredits(profile: Profile) {
  const container = document.createElement("div");
  container.className =
    "flex justify-center bg-primary-normal w-full md:w-fit text-primary-dark rounded-xl font-semibold py-1 sm:py-2 px-4 sm:text-lg uppercase";

  const text = document.createElement("p");
  text.textContent = `Available Credits: ${profile.credits}`;

  container.appendChild(text);

  return container;
}
