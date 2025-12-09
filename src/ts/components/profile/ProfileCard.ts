import { Profile } from "../../types/profile.js";

export function ProfileCard(profile: Profile) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex items-start gap-4 sm:gap-8";

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = profile.avatar.url;
  img.alt = profile.avatar.alt;
  img.className =
    "h-[60px] w-[60px] rounded-full object-cover sm:h-[90px] sm:w-[90px]";

  figure.appendChild(img);

  const container = document.createElement("div");
  container.className = "flex flex-col gap-2";

  const NameEmail = document.createElement("div");
  NameEmail.className = "flex flex-col gap-1";

  const profileName = document.createElement("h2");
  profileName.className = "text-2xl font-medium sm:text-3xl";
  profileName.innerText = profile.name;

  const profileEmail = document.createElement("p");
  profileEmail.className = "text-gray-dark";
  profileEmail.innerText = profile.email;

  NameEmail.append(profileName, profileEmail);

  const bio = document.createElement("p");
  bio.className = "text-lg";
  bio.innerText = profile.bio;

  container.append(NameEmail, bio);

  wrapper.append(figure, container);

  return wrapper;
}
