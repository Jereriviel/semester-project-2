import { redirectIfAuth } from "../utils/authGuard.js";
import { input } from "../components/Inputs.js";
import { validateForm } from "../utils/validators.js";
import { loadingSpinner } from "../components/LoadingSpinner.js";
import { toggleButtonLoading } from "../utils/toggleButtonLoading.js";
import { registerUser, loginUser } from "../services/auth.js";
import { ApiError } from "../errors.ts/ApiError.js";

export function Register() {
  redirectIfAuth();

  return `
        <form id="registerForm">
          <fieldset id="registerFieldset" class="flex flex-col gap-8 w-fit p-8 rounded-xl shadow-card">
            <h4 class="text-2xl font-semibold flex self-start">Register your account</h4>
            <div class="flex flex-col gap-8">
                ${input({
                  type: "text",
                  name: "name",
                  placeholder: "Enter username",
                  required: true,
                  label: "Username",
                  id: "name",
                  autocomplete: "name",
                })}
              ${input({
                type: "email",
                name: "email",
                placeholder: "Enter your email (@stud.noroff.no)",
                required: true,
                label: "Email Address",
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
             ${input({
               type: "password",
               name: "confirmPassword",
               placeholder: "Re-enter your password",
               required: true,
               label: "Confirm password",
               id: "confirmPassword",
             })}
            </div>
            <p id="registerError" class="error-message text-red-500 text-sm mt-2 text-center hidden"></p>
              <button
                type="submit"
                id="registerBtn"
                class="btn btn_primary sm:w-fit text-white py-3 w-[300px]"
              >
                <span class="button-text">Register</span>
                <span class="spinner hidden">${loadingSpinner()}</span>
              </button>
              <div class="flex flex-col sm:flex-row gap-2 text-lg">
                <p>Already have an account?</p>
                <a href="/login/index.html"><p class="font-medium hover:underline transition-all duration-200">Log in Here</p></a>
              </div>
          </fieldset>
        </form>
  `;
}

function renderRegister() {
  const register = document.getElementById("register-section");
  if (!register) return;

  register.innerHTML = Register();

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
      name,
      email,
      password,
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
