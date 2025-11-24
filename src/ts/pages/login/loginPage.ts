import { LoginForm } from "./loginForm.js";
import { toggleButtonLoading } from "../../utils/toggleButtonLoading.js";
import { loginUser } from "../../services/auth.js";
import { ApiError } from "../../errors.ts/ApiError.js";
import { validateForm } from "../../utils/validators.js";

function renderLogin() {
  const login = document.getElementById("login-section");
  if (!login) return;

  login.innerHTML = LoginForm();

  const form = document.getElementById("loginForm") as HTMLFormElement;
  const fieldset = document.getElementById(
    "loginFieldset"
  ) as HTMLFieldSetElement;
  const errorEl = document.getElementById("loginError") as HTMLElement;
  const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const emailError = document.getElementById("emailError") as HTMLElement;
  const passwordError = document.getElementById("passwordError") as HTMLElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    emailInput.classList.remove("border-red-500");
    passwordInput.classList.remove("border-red-500");
    emailError.classList.add("hidden");
    passwordError.classList.add("hidden");
    errorEl.classList.add("hidden");

    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { isValid, errors } = validateForm(email, password);

    if (!isValid) {
      if (errors.email) {
        emailInput.classList.add("border-red-500");
        emailError.textContent = errors.email;
        emailError.classList.remove("hidden");
      }

      if (errors.password) {
        passwordInput.classList.add("border-red-500");
        passwordError.textContent = errors.password;
        passwordError.classList.remove("hidden");
      }

      return;
    }

    try {
      fieldset.disabled = true;
      toggleButtonLoading(loginBtn, true);
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
      toggleButtonLoading(loginBtn, false);
      fieldset.disabled = false;
    }
  });
}

renderLogin();
