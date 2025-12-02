import { bidInput } from "../Inputs.js";
import { CreateBidRequest, CreateBidResponse } from "../../types/listings";
import { bidOnListing } from "../../services/listings.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { showErrorModal } from "../modals/errorModal.js";

export function PlaceBid(
  id: string,
  onBidSuccess?: (data: CreateBidResponse) => void
) {
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
    } catch (error) {
      let message = "Failed to place bid. Please try again.";

      if (error instanceof ApiError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      await showErrorModal(message);
      console.error("Failed to place bid:", error);
    }
  });

  return form;
}
