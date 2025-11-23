import { redirectIfAuth } from "../utils/authGuard.js";
import { input } from "../components/Inputs.js";
import { validateForm } from "../utils/validators.js";
import { loadingSpinner } from "../components/LoadingSpinner.js";
import { toggleButtonLoading } from "../utils/toggleButtonLoading.js";
import { loginUser } from "../services/auth.js";
import { ApiError } from "../errors.ts/ApiError.js";

export function Login() {
  redirectIfAuth();

  return `
        <form id="loginForm">
          <fieldset id="loginFieldset" class="flex flex-col gap-8 w-fit p-8 rounded-xl shadow-card">
            <h4 class="text-2xl font-semibold flex self-start">Log in to your account</h4>
            <div class="flex flex-col gap-8">
              ${input({
                type: "email",
                name: "email",
                placeholder: "Enter your email address",
                required: true,
                label: "Email address",
                id: "email",
                autocomplete: "email",
              })}
              ${input({
                type: "password",
                name: "password",
                placeholder: "Enter your password",
                required: true,
                label: "Password",
                id: "password",
              })}
            </div>
            <p id="loginError" class="error-message text-red-500 text-sm mt-2 text-center hidden"></p>
              <button
                type="submit"
                id="loginBtn"
                class="btn btn_primary sm:w-fit text-white py-3 w-[300px]"
              >
                <span class="button-text">Sign in</span>
                <span class="spinner hidden">${loadingSpinner()}</span>
              </button>
              <div class="flex flex-col sm:flex-row gap-2 text-lg">
                <p>Don't have an account?</p>
                <a href="/register/index.html"><p class="font-medium hover:underline transition-all duration-200">Register Here</p></a>
              </div>
          </fieldset>
        </form>
  `;
}

function renderLogin() {
  const login = document.getElementById("login-section");
  if (!login) return;

  login.innerHTML = Login();

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
