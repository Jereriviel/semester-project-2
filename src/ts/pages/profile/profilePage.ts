import { requireAuth } from "../../utils/authGuard.js";
import { renderNewListingButton } from "../../components/profile/NewListingButton.js";

requireAuth();
renderNewListingButton();
