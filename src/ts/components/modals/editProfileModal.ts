import { createModal } from "../../utils/createModal.js";
import { input, textArea } from "../../components/Inputs.js";
import { getProfile, updateProfile } from "../../services/profile.js";
import { showToast, successToastUpdate } from "../Toasts.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { showErrorModal } from "./errorModal.js";
import { UpdateProfileRequest } from "../../types/profile.js";

export async function openEditProfileModal(username: string) {
  try {
    const response = await getProfile(username);
    const profile = response;

    const form = document.createElement("form");
    const modal = createModal(form);
    form.id = "edit-profile-form";
    form.className = "edit-listing-modal flex flex-col gap-8 sm:w-[600px]";
    form.method = "dialog";

    const header = document.createElement("div");
    header.className = "flex items-start justify-between";

    const title = document.createElement("h4");
    title.textContent = "Edit Profile";
    title.className = "text-2xl";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.id = "close-edit-listing-btn";
    closeBtn.className = "btn_close";
    closeBtn.innerHTML = `<span class="material-symbols-outlined"> close </span>`;
    closeBtn.addEventListener("click", () => modal.close());

    header.append(title, closeBtn);

    const bioInput = textArea({
      name: "bio",
      label: "Bio",
      id: "bio",
      required: false,
      value: profile.bio ?? "",
      placeholder: "Write a text about yourself",
    });

    const avatarURLInput = input({
      type: "url",
      name: "avatarUrl",
      label: "Avatar Image URL",
      id: "avatarURL",
      required: false,
      value: profile.avatar?.url ?? "",
      placeholder: "Ex: https://picsum.photos/seed/picsum/200/300",
    });

    const avatarAltInput = input({
      type: "text",
      name: "avatarAlt",
      label: "Avatar Image Alt Text",
      id: "avatarAlt",
      required: false,
      value: profile.avatar?.alt ?? "",
      placeholder: "Enter name or/and description",
    });

    const bannerURLInput = input({
      type: "url",
      name: "bannerUrl",
      label: "Banner Image URL",
      id: "bannerURL",
      required: false,
      value: profile.banner?.url ?? "",
      placeholder: "Ex: https://picsum.photos/seed/picsum/200/300",
    });

    const bannerAltInput = input({
      type: "text",
      name: "bannerAlt",
      label: "Banner Image Alt Text",
      id: "bannerAlt",
      required: false,
      value: profile.banner?.alt ?? "",
      placeholder: "Enter a description for the image",
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.id = "save-changes-btn";
    submitBtn.className = "btn btn_primary sm:self-end";
    submitBtn.textContent = "Save Changes";

    form.append(
      header,
      bioInput,
      avatarURLInput,
      avatarAltInput,
      bannerURLInput,
      bannerAltInput,
      submitBtn
    );

    document.body.appendChild(modal);
    modal.showModal();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      const bio = formData.get("bio") as string;
      const avatarUrl = formData.get("avatarUrl") as string;
      const avatarAlt = formData.get("avatarAlt") as string;
      const bannerUrl = formData.get("bannerUrl") as string;
      const bannerAlt = formData.get("bannerAlt") as string;

      const body: UpdateProfileRequest = {
        bio: bio || undefined,
        avatar:
          avatarUrl || avatarAlt
            ? { url: avatarUrl, alt: avatarAlt }
            : undefined,
        banner:
          bannerUrl || bannerAlt
            ? { url: bannerUrl, alt: bannerAlt }
            : undefined,
      };

      try {
        await updateProfile(body, profile.name);
        showToast(successToastUpdate());
        modal.close();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        let message = "Something went wrong. Please try again.";

        if (error instanceof ApiError) {
          message = error.message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        await showErrorModal(message);
        console.error("Error creating listing:", error);
      }
    });

    modal.addEventListener("close", () => modal.remove());
  } catch (error) {
    console.error(error);
    await showErrorModal("Failed to fetch profile data.");
  }
}
