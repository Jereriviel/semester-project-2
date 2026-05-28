export type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function renderValidationErrors(
  errors: FormErrors,
  fields: Record<string, HTMLInputElement>,
  errorEls: Record<string, HTMLElement>
) {
  Object.entries(fields).forEach(([, input]) => {
    input.classList.remove("border-red-500", "border-2");
  });

  Object.entries(errorEls).forEach(([, el]) => {
    el.classList.add("hidden");
  });

  const keys = Object.keys(errors) as (keyof FormErrors)[];

  keys.forEach((key) => {
    const message = errors[key];
    if (!message) return;

    const input = fields[`${key}Input`];
    const errorEl = errorEls[`${key}Error`];

    if (input) input.classList.add("border-red-500", "border-2");

    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
    }
  });
}
