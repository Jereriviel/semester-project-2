import { createModal } from "../../utils/createModal.js";
import { input, textArea, dateTimeInput } from "../inputs/Inputs.js";
import { AddImageButton } from "../buttons/AddImageButton.js";
import { createImageInputGroup } from "../../utils/createInputs/createImageInputGroup.js";
import { createListing } from "../../services/listings.js";
import { showToast } from "../../utils/showToast.js";
import { successToastCreate } from "../toasts/SuccessCreate.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { showErrorModal } from "./errorModal.js";
import { loadingSpinner } from "../loading/LoadingSpinner.js";
import { toggleButtonLoading } from "../../utils/toggleButtonLoading.js";

export function openNewListingModal() {
  const form = document.createElement("form");
  const modal = createModal(form);
  form.id = "add-listing-form";
  form.className = "new-listing-modal sm:w-[600px]";
  form.method = "dialog";

  const fieldset = document.createElement("fieldset");
  fieldset.id = "edit-listing-fieldset";
  fieldset.className = "flex flex-col gap-8";

  const header = document.createElement("div");
  header.className = "flex items-start justify-between";

  const title = document.createElement("h4");
  title.textContent = "Create New Listing";
  title.className = "text-2xl";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.id = "close-new-listing-btn";
  closeBtn.className = "btn_close";
  closeBtn.innerHTML = `<span class="material-symbols-outlined"> close </span>`;
  closeBtn.addEventListener("click", () => modal.close());

  header.append(title, closeBtn);

  const titleInput = input({
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Enter a title for your item",
    id: "title",
    required: true,
  });

  const descriptionInput = textArea({
    name: "description",
    label: "Description",
    placeholder: "Enter a description for your item",
    id: "description",
    required: true,
  });

  const tagsInput = input({
    type: "text",
    name: "tags",
    label: "Category Tags",
    placeholder: "Enter category tags, comma separated if more than one",
    id: "tags",
    required: false,
  });

  const imageContainer = document.createElement("div");
  imageContainer.id = "image-inputs";
  imageContainer.className = "flex flex-col gap-4";

  let imageCount = 0;
  imageContainer.appendChild(createImageInputGroup(imageCount));
  imageCount++;

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
  });

  const dateNote = document.createElement("p");
  dateNote.textContent =
    "Note: Expiration date cannot be changed after listing.";
  dateNote.className = "text-sm italic pt-2";

  dateInput.appendChild(dateNote);

  const buttons = document.createElement("div");
  buttons.className = "flex flex-col gap-4 sm:flex-row sm:justify-between";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.id = "cancel-btn";
  cancelBtn.className = "btn btn_secondary sm:w-fit";
  cancelBtn.innerText = "cancel";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.id = "add-listing-btn";
  submitBtn.className = "btn btn_primary sm:self-end";
  submitBtn.innerHTML = `<span class="button-text">Add Listing</span><span class="spinner hidden">${loadingSpinner()}</span>`;

  buttons.append(cancelBtn, submitBtn);

  fieldset.append(
    header,
    titleInput,
    descriptionInput,
    tagsInput,
    imageContainer,
    addImageButton,
    dateInput,
    buttons
  );
  form.appendChild(fieldset);

  document.body.appendChild(modal);
  modal.showModal();

  cancelBtn.addEventListener("click", () => modal.close());

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
    const endsAt = new Date(endsAtLocal).toISOString();

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

    const body = { title, description, tags, media, endsAt };

    try {
      fieldset.disabled = true;
      toggleButtonLoading(submitBtn, true);
      await createListing(body);
      showToast(successToastCreate());
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
    } finally {
      toggleButtonLoading(submitBtn, false);
      fieldset.disabled = false;
    }
  });

  modal.addEventListener("close", () => modal.remove());
}
