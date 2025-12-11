import { editProfileButtons } from "../buttons/editProfileButton.js";
import { Profile } from "../../types/profile.js";

export function ProfileBanner(profile: Profile) {
  const container = document.createElement("div");
  container.className = "relative";

  const figure = document.createElement("figure");
  figure.className = "max-h-[150px] overflow-hidden rounded-xl";

  const image = document.createElement("img");
  image.className = "h-auto w-full object-cover";
  image.src = profile.banner?.url ?? "";
  image.alt = profile.banner?.alt || `${profile.name}'s banner`;
  image.onerror = () => {
    image.src = "/assets/images/placeholder-img.jpg";
  };

  figure.appendChild(image);

  const { btnMobile, btnDesktop } = editProfileButtons(profile.name);
  const btnWrapper = document.createElement("div");
  btnWrapper.className = "absolute top-4 right-4 flex";

  btnWrapper.append(btnMobile, btnDesktop);

  container.append(figure, btnWrapper);

  return container;
}
