export function getLoginFormElements() {
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

  return {
    form,
    fieldset,
    errorEl,
    loginBtn,
    inputs: {
      emailInput,
      passwordInput,
    },
    errors: {
      emailError,
      passwordError,
    },
  };
}
