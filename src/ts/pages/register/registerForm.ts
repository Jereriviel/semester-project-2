import { redirectIfAuth } from "../../utils/authGuard.js";
import { input } from "../../components/Inputs.js";
import { loadingSpinner } from "../../components/LoadingSpinner.js";

export function RegisterForm() {
  redirectIfAuth();

  return `
        <form id="registerForm" class="w-full sm:w-[500px]">
          <fieldset id="registerFieldset" class=" flex flex-col gap-8 p-8 rounded-xl shadow-card">
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
                class="btn btn_primary sm:w-fit text-white py-3"
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
