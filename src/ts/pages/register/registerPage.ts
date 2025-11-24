import { RegisterForm } from "./registerForm.js";
import { toggleButtonLoading } from "../../utils/toggleButtonLoading.js";
import { registerUser, loginUser } from "../../services/auth.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { validateForm } from "../../utils/validators.js";

function renderRegister() {
  const register = document.getElementById("register-section");
  if (!register) return;

  register.innerHTML = RegisterForm();

  const form = document.getElementById("registerForm") as HTMLFormElement;
  const fieldset = document.getElementById(
    "registerFieldset"
  ) as HTMLFieldSetElement;
  const errorEl = document.getElementById("registerError") as HTMLElement;
  const registerBtn = document.getElementById(
    "registerBtn"
  ) as HTMLButtonElement;

  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const confirmInput = document.getElementById(
    "confirmPassword"
  ) as HTMLInputElement;

  const nameError = document.getElementById("nameError") as HTMLElement;
  const emailError = document.getElementById("emailError") as HTMLElement;
  const passwordError = document.getElementById("passwordError") as HTMLElement;
  const confirmError = document.getElementById(
    "confirmPasswordError"
  ) as HTMLElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    emailInput.classList.remove("border-red-500");
    passwordInput.classList.remove("border-red-500");
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");
    errorEl.classList.add("hidden");

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    [nameInput, emailInput, passwordInput, confirmInput].forEach((input) =>
      input.classList.remove("border-red-500")
    );
    [nameError, emailError, passwordError, confirmError].forEach((el) =>
      el.classList.add("hidden")
    );
    errorEl.classList.add("hidden");

    const { isValid, errors } = validateForm(
      email,
      password,
      name,
      confirmPassword
    );

    if (!isValid) {
      if (errors.name) {
        nameInput.classList.add("border-red-500", "border-2");
        nameError.textContent = errors.name;
        nameError.classList.remove("hidden");
      }
      if (errors.email) {
        emailInput.classList.add("border-red-500", "border-2");
        emailError.textContent = errors.email;
        emailError.classList.remove("hidden");
      }
      if (errors.password) {
        passwordInput.classList.add("border-red-500", "border-2");
        passwordError.textContent = errors.password;
        passwordError.classList.remove("hidden");
      }
      if (errors.confirmPassword) {
        confirmInput.classList.add("border-red-500", "border-2");
        confirmError.textContent = errors.confirmPassword;
        confirmError.classList.remove("hidden");
      }
      return;
    }

    try {
      fieldset.disabled = true;
      toggleButtonLoading(registerBtn, true);
      await registerUser(name, email, password);
      await loginUser(email, password);
      window.location.href = "../index.html";
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        errorEl.textContent = error.message;
      } else {
        errorEl.textContent = "An unexpected error occurred.";
      }
      errorEl.classList.remove("hidden");
    } finally {
      toggleButtonLoading(registerBtn, false);
      fieldset.disabled = false;
    }
  });
}

renderRegister();
