import { createModal } from "../../utils/createModal.js";
import { input, textArea, dateTimeInput } from "../inputs/Inputs.js";
import { AddImageButton } from "../buttons/AddImageButton.js";
import { createImageInputGroup } from "../../utils/createInputs/createImageInputGroup.js";
import { updateListing } from "../../services/listings.js";
import { confirmDeleteModal } from "./confirmDeleteModal.js";
import { ListingBase, UpdateListingRequest } from "../../types/listings.js";
import { showToast } from "../../utils/showToast.js";
import { successToastUpdate } from "../toasts/SuccessUpdate.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { showErrorModal } from "./errorModal.js";
import { loadingSpinner } from "../loading/LoadingSpinner.js";
import { toggleButtonLoading } from "../../utils/toggleButtonLoading.js";

export function openEditListingModal(listing: ListingBase) {
  const form = document.createElement("form");
  const modal = createModal(form);
  form.id = "edit-listing-form";
  form.className = "edit-listing-modal sm:w-[600px]";
  form.method = "dialog";

  const fieldset = document.createElement("fieldset");
  fieldset.id = "edit-listing-fieldset";
  fieldset.className = "flex flex-col gap-8";

  const header = document.createElement("div");
  header.className = "flex items-start justify-between";

  const title = document.createElement("h4");
  title.textContent = "Edit Listing";
  title.className = "text-2xl";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.id = "close-edit-listing-btn";
  closeBtn.className = "btn_close";
  closeBtn.innerHTML = `<span class="material-symbols-outlined"> close </span>`;
  closeBtn.addEventListener("click", () => modal.close());

  header.append(title, closeBtn);

  const titleInput = input({
    type: "text",
    name: "title",
    label: "Title",
    id: "title",
    required: true,
    value: listing.title,
  });

  const descriptionInput = textArea({
    name: "description",
    label: "Description",
    id: "description",
    required: true,
    value: listing.description,
  });

  const tagsInput = input({
    type: "text",
    name: "tags",
    label: "Category Tags",
    id: "tags",
    required: false,
    value: listing.tags?.join(", ") || "",
  });

  const imageContainer = document.createElement("div");
  imageContainer.id = "image-inputs";
  imageContainer.className = "flex flex-col gap-4";

  let imageCount = 0;
  listing.media?.forEach((media) => {
    const group = createImageInputGroup(imageCount);
    group.querySelector<HTMLInputElement>('input[name="imageUrl"]')!.value =
      media.url;
    group.querySelector<HTMLInputElement>('input[name="imageAlt"]')!.value =
      media.alt;
    imageContainer.appendChild(group);
    imageCount++;
  });

  if (imageCount === 0) {
    imageContainer.appendChild(createImageInputGroup(imageCount));
    imageCount++;
  }

  const addImageButton = AddImageButton();
  addImageButton.addEventListener("click", () => {
    imageContainer.appendChild(createImageInputGroup(imageCount));
    imageCount++;
  });

  const dateInput = dateTimeInput({
    type: "datetime-local",
    name: "dateTime",
    label: "Expiration Date and Time",
    id: "dateTime",
    required: true,
    value: listing.endsAt
      ? new Date(listing.endsAt).toISOString().slice(0, 16)
      : "",
  });

  const dateInputEl = dateInput.querySelector("input") as HTMLInputElement;
  dateInputEl.disabled = true;

  const dateNote = document.createElement("p");
  dateNote.textContent =
    "Note: Expiration date cannot be changed after listing.";
  dateNote.className = "text-sm italic pt-2";

  dateInput.appendChild(dateNote);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className =
    "flex flex-col gap-4 sm:justify-between sm:flex-row";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn_delete sm:w-fit";
  deleteBtn.textContent = "Delete Listing";
  deleteBtn.addEventListener("click", () => {
    confirmDeleteModal(listing.id);
    modal.close();
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.id = "edit-listing-btn";
  submitBtn.className = "btn btn_primary sm:w-fit";
  submitBtn.innerHTML = `<span class="button-text">Save Changes</span><span class="spinner hidden">${loadingSpinner()}</span>`;

  buttonsContainer.append(deleteBtn, submitBtn);

  fieldset.append(
    header,
    titleInput,
    descriptionInput,
    tagsInput,
    imageContainer,
    addImageButton,
    dateInput,
    buttonsContainer
  );
  form.appendChild(fieldset);

  document.body.appendChild(modal);
  modal.showModal();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tagsRaw = formData.get("tags") as string;
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const endsAtLocal = formData.get("dateTime") as string;
    const endsAt = endsAtLocal
      ? new Date(endsAtLocal).toISOString()
      : undefined;

    const media: { url: string; alt: string }[] = [];
    const urlFields = form.querySelectorAll<HTMLInputElement>(
      'input[name="imageUrl"]'
    );
    const altFields = form.querySelectorAll<HTMLInputElement>(
      'input[name="imageAlt"]'
    );

    urlFields.forEach((urlInput, i) => {
      const url = urlInput.value.trim();
      const alt = altFields[i].value.trim();
      if (url) media.push({ url, alt });
    });

    const body: UpdateListingRequest = { title, description, tags, media };
    if (endsAt) body.endsAt = endsAt;

    try {
      fieldset.disabled = true;
      toggleButtonLoading(submitBtn, true);
      await updateListing(body, listing.id);
      showToast(successToastUpdate());
      modal.close();

      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error instanceof ApiError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      await showErrorModal(message);
      console.error("Error updating listing:", error);
    } finally {
      toggleButtonLoading(submitBtn, false);
      fieldset.disabled = false;
    }
  });

  modal.addEventListener("close", () => modal.remove());
}
