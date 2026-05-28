import { ApiError } from "../errors.ts/ApiError.js";
import { showErrorModal } from "../components/modals/errorModal.js";

export async function handleApiError(error: unknown): Promise<void> {
  let message = "Something went wrong. Please try again.";

  if (error instanceof ApiError) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  await showErrorModal(message);
}
