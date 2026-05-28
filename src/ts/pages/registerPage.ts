import { RegisterForm } from "../components/forms/registerForm.js";
import { toggleButtonLoading } from "../utils/toggleButtonLoading.js";
import { registerUser, loginUser } from "../services/auth.js";
import { ApiError } from "../errors.ts/ApiError.js";
import { validateForm } from "../utils/validators.js";
import { getRegisterFormElements } from "../utils/getRegisterFormElements.js";
import { renderValidationErrors } from "../utils/renderValidationErrors.js";

function renderRegister() {
  const section = document.getElementById("register-section");
  section?.appendChild(RegisterForm());

  const { form, fieldset, errorEl, registerBtn, inputs, errors } =
    getRegisterFormElements();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const validation = validateForm(email, password, name, confirmPassword);

    if (!validation.isValid) {
      renderValidationErrors(
        validation.errors,
        {
          nameInput: inputs.nameInput,
          emailInput: inputs.emailInput,
          passwordInput: inputs.passwordInput,
          confirmInput: inputs.confirmInput,
        },
        errors
      );

      return;
    }

    try {
      fieldset.disabled = true;
      toggleButtonLoading(registerBtn, true);

      await registerUser(name, email, password);
      await loginUser(email, password);

      window.location.href = "../index.html";
    } catch (error) {
      errorEl.textContent =
        error instanceof ApiError
          ? error.message
          : "An unexpected error occurred.";

      errorEl.classList.remove("hidden");
    } finally {
      toggleButtonLoading(registerBtn, false);
      fieldset.disabled = false;
    }
  });
}

renderRegister();
