import { redirectIfAuth } from "../../utils/authGuard.js";
import { input } from "../../components/Inputs.js";
import { loadingSpinner } from "../../components/LoadingSpinner.js";

export function RegisterForm(): HTMLFormElement {
  redirectIfAuth();

  const form = document.createElement("form");
  form.id = "registerForm";
  form.className = "w-full sm:w-[500px]";

  const fieldset = document.createElement("fieldset");
  fieldset.id = "registerFieldset";
  fieldset.className = "flex flex-col gap-8 p-8 rounded-xl shadow-card";

  const heading = document.createElement("h4");
  heading.className = "text-2xl font-semibold flex self-start";
  heading.textContent = "Register your account";

  const inputsWrapper = document.createElement("div");
  inputsWrapper.className = "flex flex-col gap-8";

  inputsWrapper.append(
    input({
      type: "text",
      name: "name",
      label: "Username",
      placeholder: "Enter username",
      id: "name",
      required: true,
      autocomplete: "name",
    }),
    input({
      type: "email",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email (@stud.noroff.no)",
      id: "email",
      required: true,
      autocomplete: "email",
    }),
    input({
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      id: "password",
      required: true,
    }),
    input({
      type: "password",
      name: "confirmPassword",
      label: "Confirm password",
      placeholder: "Re-enter your password",
      id: "confirmPassword",
      required: true,
    })
  );

  const error = document.createElement("p");
  error.id = "registerError";
  error.className =
    "error-message text-red-500 text-sm mt-2 text-center hidden";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.id = "registerBtn";
  submitBtn.className = "btn btn_primary sm:w-fit text-white py-3";
  submitBtn.innerHTML = `<span class="button-text">Register</span><span class="spinner hidden">${loadingSpinner()}</span>`;

  const loginWrapper = document.createElement("div");
  loginWrapper.className = "flex flex-col sm:flex-row gap-2 text-lg";
  loginWrapper.innerHTML = `
    <p>Already have an account?</p>
    <a href="/login/index.html">
      <p class="font-medium hover:underline transition-all duration-200">Log in Here</p>
    </a>
  `;

  fieldset.append(heading, inputsWrapper, error, submitBtn, loginWrapper);

  form.appendChild(fieldset);

  return form;
}
