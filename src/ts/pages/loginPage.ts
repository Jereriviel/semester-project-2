import { LoginForm } from "../components/forms/loginForm.js";
import { toggleButtonLoading } from "../utils/toggleButtonLoading.js";
import { loginUser } from "../services/auth.js";
import { ApiError } from "../errors.ts/ApiError.js";
import { validateForm } from "../utils/validators.js";
import { getLoginFormElements } from "../utils/getLoginFormElements.js";
import { renderValidationErrors } from "../utils/renderValidationErrors.js";

function renderLogin() {
  const section = document.getElementById("login-section");
  section?.appendChild(LoginForm());

  const { form, fieldset, errorEl, loginBtn, inputs, errors } =
    getLoginFormElements();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = validateForm(email, password);

    if (!validation.isValid) {
      renderValidationErrors(
        validation.errors,
        {
          emailInput: inputs.emailInput,
          passwordInput: inputs.passwordInput,
        },
        errors
      );

      return;
    }

    try {
      fieldset.disabled = true;
      toggleButtonLoading(loginBtn, true);

      await loginUser(email, password);

      window.location.href = "../index.html";
    } catch (error) {
      errorEl.textContent =
        error instanceof ApiError
          ? error.message
          : "An unexpected error occurred.";

      errorEl.classList.remove("hidden");
    } finally {
      toggleButtonLoading(loginBtn, false);
      fieldset.disabled = false;
    }
  });
}

renderLogin();
