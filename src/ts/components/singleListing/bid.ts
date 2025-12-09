import { bidInput } from "../Inputs.js";
import {
  CreateBidRequest,
  CreateBidResponse,
  UserProfile,
  ListingBase,
} from "../../types/listings.js";
import { bidOnListing } from "../../services/listings.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { isLoggedIn, getUser } from "../../store/userStore.js";
import { editListingButton } from "../buttons/editListingButton.js";

export function PlaceBid(
  id: string,
  profile: UserProfile,
  listing: ListingBase,
  onBidSuccess?: (data: CreateBidResponse) => void
) {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    const link = document.createElement("a");
    link.href = "/login/index.html";
    link.className =
      "btn btn_primary w-full sm:w-fit flex items-center gap-2 justify-center";

    link.append("Log in to place your bid now!");

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";
    icon.textContent = "arrow_right_alt";

    link.appendChild(icon);

    return link;
  }

  const form = document.createElement("form");
  form.id = "bid-form";
  form.className = "w-full sm:w-fit";

  const fieldset = document.createElement("fieldset");
  fieldset.id = "bid-fieldset";
  fieldset.className = "flex flex-col gap-4";
  form.appendChild(fieldset);

  const bidContent = document.createElement("div");
  bidContent.id = "bid-content";

  const bidInputElement = bidInput({
    type: "number",
    name: "bid",
    placeholder: "Enter Amount",
    label: "Place your bid!",
    id: "bid",
  });

  bidContent.appendChild(bidInputElement);
  fieldset.appendChild(bidContent);

  const successMessage = document.createElement("div");
  successMessage.id = "bid-success";
  successMessage.className = "text-success-normal items-center gap-4 hidden";

  const successIconContainer = document.createElement("div");
  successIconContainer.className =
    "bg-success-light flex h-8 w-8 items-center justify-center rounded-full";

  const successIcon = document.createElement("span");
  successIcon.className = "material-symbols-outlined";
  successIcon.textContent = "check";

  successIconContainer.appendChild(successIcon);

  const successMsgText = document.createElement("p");
  successMsgText.className = "font-medium";
  successMsgText.textContent = "Your bid was placed successfully!";

  successMessage.appendChild(successIconContainer);
  successMessage.appendChild(successMsgText);
  fieldset.appendChild(successMessage);

  const input = bidInputElement.querySelector("#bid") as HTMLInputElement;
  const button = bidInputElement.querySelector("button") as HTMLButtonElement;
  const bidLabel = bidInputElement.querySelector(`label[for="bid"]`);
  const bidError = bidInputElement.querySelector(
    "#bidError"
  ) as HTMLParagraphElement;

  const loggedInUser = getUser();
  const isOwnListing = loggedInUser?.name === profile.name;

  if (isOwnListing) {
    if (bidLabel) bidLabel.classList.add("hidden");

    const editBtn = editListingButton(listing) as HTMLButtonElement;

    bidContent.innerHTML = "";
    bidContent.appendChild(editBtn);
  }

  const endsAt = new Date(listing.endsAt).getTime();
  const listingEnded = Date.now() > endsAt;

  if (listingEnded) {
    fieldset.disabled = true;

    if (bidLabel) bidLabel.classList.add("hidden");

    if (button) {
      button.classList.remove("btn_search");
      button.classList.add("btn_search_disabled");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    bidError.classList.add("hidden");

    const amount = Number(input.value);

    if (!amount || amount <= 0) {
      bidError.textContent = "Please enter a valid bid amount.";
      bidError.classList.remove("hidden");
      return;
    }

    try {
      const body: CreateBidRequest = { amount };
      const response = await bidOnListing(body, id);

      input.value = "";
      successMessage.classList.remove("hidden");
      successMessage.classList.add("flex");

      setTimeout(() => {
        if (onBidSuccess) onBidSuccess(response);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        bidError.textContent = error.message;
      } else {
        bidError.textContent = "An unexpected error occurred.";
      }
      bidError.classList.remove("hidden");
    }
  });

  return form;
}
