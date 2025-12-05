import { requireAuth } from "../../utils/authGuard.js";
import { renderNewListingButton } from "../../components/profile/NewListingButton.js";
import { renderEditListingButton } from "../../components/editListingButton.js";

requireAuth();
renderNewListingButton();

//Test:
renderEditListingButton();
