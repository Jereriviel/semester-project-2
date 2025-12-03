import { bidInput } from "../Inputs.js";
import { CreateBidRequest, CreateBidResponse } from "../../types/listings";
import { bidOnListing } from "../../services/listings.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { isLoggedIn } from "../../store/userStore.js";

export function PlaceBid(
  id: string,
  onBidSuccess?: (data: CreateBidResponse) => void
) {
  const loggedIn = isLoggedIn();
  if (loggedIn) {
    const form = document.createElement("form");

    form.id = "bid-form";
    form.className = "w-full sm:w-fit";

    form.innerHTML = `
    <div>
              ${bidInput({
                type: "number",
                name: "bid",
                placeholder: "Enter Amount",
                label: "Place your bid!",
                id: "bid",
              })}
      </div>
    `;

    const input = form.querySelector<HTMLInputElement>("#bid")!;
    const bidError = form.querySelector<HTMLElement>("#bidError")!;

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

        console.log("Bid placed successfully", response);
        if (onBidSuccess) onBidSuccess(response);
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
