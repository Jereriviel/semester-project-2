import { bidInput } from "../Inputs.js";
import {
  CreateBidRequest,
  CreateBidResponse,
  UserProfile,
  ListingBase,
} from "../../types/listings";
import { bidOnListing } from "../../services/listings.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { isLoggedIn, getUser } from "../../store/userStore.js";
import { editListingButton } from "../editListingButton.js";

export function PlaceBid(
  id: string,
  profile: UserProfile,
  listing: ListingBase,
  onBidSuccess?: (data: CreateBidResponse) => void
) {
  const loggedIn = isLoggedIn();
  if (loggedIn) {
    const form = document.createElement("form");
    form.id = "bid-form";
    form.className = "w-full sm:w-fit";

    const loggedInUser = getUser();

    form.innerHTML = `
    <fieldset id="bid-fieldset" class="flex flex-col gap-4">
              <div id="bid-content">
                ${bidInput({
                  type: "number",
                  name: "bid",
                  placeholder: "Enter Amount",
                  label: "Place your bid!",
                  id: "bid",
                })}
              </div>
              <div class="text-success-normal items-center gap-4 hidden" id="bid-success">
                <div
                  class="bg-success-light flex h-8 w-8 items-center justify-center rounded-full"
                >
                  <span class="material-symbols-outlined"> check </span>
                </div>
                <p class="font-medium">Your bid was placed successfully!</p>
              </div>
      </fieldset>
    `;

    const input = form.querySelector("#bid") as HTMLFormElement;
    const fieldset = form.querySelector("#bid-fieldset") as HTMLFieldSetElement;
    const button = form.querySelector("button") as HTMLButtonElement;
    const bidLabel = form.querySelector(`label[for="bid"]`);
    const editBtn = editListingButton() as HTMLButtonElement;
    const bidContent = form.querySelector("#bid-content");

    const isOwnListing = loggedInUser?.name === profile.name;

    if (isOwnListing) {
      if (bidLabel) bidLabel.classList.add("hidden");
      if (bidContent) bidContent.innerHTML = "";
      bidContent?.appendChild(editBtn);
    }

    const endsAtDate = new Date(listing.endsAt);
    const listingEnded = Date.now() > endsAtDate.getTime();

    if (listingEnded) {
      if (fieldset) fieldset.disabled = true;
      if (bidLabel) bidLabel.classList.add("hidden");
      if (button) {
        button.classList.remove("btn_search");
        button.classList.add("btn_search_disabled");
      }
    }

    const bidError = form.querySelector("#bidError")!;

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
        const successMessage = form.querySelector(
          "#bid-success"
        ) as HTMLDivElement;
        input.value = "";
        if (successMessage) {
          successMessage.classList.remove("hidden");
          successMessage.classList.add("flex");
        }
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
  } else {
    const button = document.createElement("a");

    button.className =
      "btn btn_primary w-full sm:w-fit flex items-center gap-2 justify-center";
    button.href = "/login/index.html";
    button.innerHTML = `Log in to place your bid now! <span class="material-symbols-outlined">
arrow_right_alt</span>`;

    return button;
  }
}
