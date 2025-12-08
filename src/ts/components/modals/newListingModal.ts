import { createModal } from "../../utils/createModal.js";
import { input, textArea, dateTimeInput } from "../../components/Inputs.js";
import { AddImageButton } from "../buttons/AddImageButton.js";
import { createImageInputGroup } from "../../utils/createImageInputGroup.js";
import { createListing } from "../../services/listings.js";

export function openNewListingModal() {
  const form = document.createElement("form");
  const modal = createModal(form);
  form.id = "add-listing-form";
  form.className = "new-listing-modal flex flex-col gap-8 sm:w-[500px]";
  form.method = "dialog";

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

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.id = "add-listing-btn";
  submitBtn.className = "btn btn_primary sm:self-end";
  submitBtn.textContent = "Add Listing";

  form.append(
    header,
    titleInput,
    descriptionInput,
    tagsInput,
    imageContainer,
    addImageButton,
    dateInput,
    submitBtn
  );

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
      await createListing(body);
      modal.close();
      if (window.location.pathname.includes("listings"))
        window.location.reload();
    } catch (err) {
      console.error("Error creating listing:", err);
    }
  });

  modal.addEventListener("close", () => modal.remove());
}
