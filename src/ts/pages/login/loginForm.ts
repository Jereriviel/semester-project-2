import { redirectIfAuth } from "../../utils/authGuard.js";
import { input } from "../../components/inputs/Inputs.js";
import { loadingSpinner } from "../../components/loading/LoadingSpinner.js";

export function LoginForm(): HTMLFormElement {
  redirectIfAuth();

  const form = document.createElement("form");
  form.id = "loginForm";
  form.className = "w-full sm:w-[500px]";

  const fieldset = document.createElement("fieldset");
  fieldset.id = "loginFieldset";
  fieldset.className = "flex flex-col gap-8 p-8 rounded-xl shadow-card";

  const heading = document.createElement("h4");
  heading.className = "text-2xl font-semibold flex self-start";
  heading.textContent = "Log in to your account";

  const inputsWrapper = document.createElement("div");
  inputsWrapper.className = "flex flex-col gap-8";

  inputsWrapper.append(
    input({
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      required: true,
      label: "Email address",
      id: "email",
      autocomplete: "email",
    }),
    input({
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
      label: "Password",
      id: "password",
    })
  );

  const error = document.createElement("p");
  error.id = "loginError";
  error.className =
    "error-message text-red-500 text-sm mt-2 text-center hidden";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.id = "loginBtn";
  submitBtn.className = "btn btn_primary sm:w-fit text-white py-3";
  submitBtn.innerHTML = `<span class="button-text">Log in</span><span class="spinner hidden">${loadingSpinner()}</span>`;

  const registerWrapper = document.createElement("div");
  registerWrapper.className = "flex flex-col sm:flex-row gap-2 text-lg";
  registerWrapper.innerHTML = `
    <p>Don't have an account?</p>
    <a href="/register/index.html">
      <p class="font-medium hover:underline transition-all duration-200">Register Here</p>
    </a>
  `;

  fieldset.append(heading, inputsWrapper, error, submitBtn, registerWrapper);
  form.appendChild(fieldset);

  return form;
}
