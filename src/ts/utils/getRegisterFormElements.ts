export function getRegisterFormElements() {
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

  return {
    form,
    fieldset,
    errorEl,
    registerBtn,
    inputs: { nameInput, emailInput, passwordInput, confirmInput },
    errors: { nameError, emailError, passwordError, confirmError },
  };
}
