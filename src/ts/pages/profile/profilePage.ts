import { requireAuth } from "../../utils/authGuard.js";
import { renderNewListingButton } from "../../components/buttons/NewListingButton.js";

requireAuth();
renderNewListingButton();
