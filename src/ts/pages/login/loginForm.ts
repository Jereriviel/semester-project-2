import { redirectIfAuth } from "../../utils/authGuard.js";
import { input } from "../../components/Inputs.js";
import { loadingSpinner } from "../../components/LoadingSpinner.js";

export function LoginForm() {
  redirectIfAuth();

  return `
        <form id="loginForm" class="w-full sm:w-fit">
          <fieldset id="loginFieldset" class="flex flex-col gap-8 p-8 rounded-xl shadow-card">
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
                class="btn btn_primary sm:w-fit text-white py-3"
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
