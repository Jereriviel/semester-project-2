import { InputProps } from "../../types/inputs.js";
import { createLabeledInput } from "../../utils/createInputs/createLabeledInput";
import { createInputWithButton } from "../../utils/createInputs/createInputWithButton";

export function input({ value, ...props }: InputProps & { value?: string }) {
  return createLabeledInput(() => {
    const element = document.createElement("input");
    if (value !== undefined) element.value = value;
    return element;
  }, props);
}

export function textArea({ value, ...props }: InputProps & { value?: string }) {
  return createLabeledInput(() => {
    const element = document.createElement("textarea");
    if (value !== undefined) element.value = value;
    return element;
  }, props);
}

export function searchInput(props: InputProps): HTMLDivElement {
  return createInputWithButton(
    props,
    `<span class="material-symbols-outlined">search</span>`
  );
}

export function tagFilterInput(props: InputProps): HTMLDivElement {
  return createInputWithButton(
    props,
    `<span class="material-symbols-outlined">filter_alt</span>`
  );
}

export function bidInput(props: InputProps): HTMLDivElement {
  return createInputWithButton(
    props,
    "Place bid",
    "flex flex-col gap-4",
    "text-lg px-4 py-3 w-full sm:w-[200px] rounded-s-xl border border-gray-medium focus:outline-none focus:border-2 focus:border-primary-dark transition-colors duration-200"
  ) as HTMLDivElement;
}

export function dateTimeInput({
  value,
  ...props
}: InputProps & { value?: string; disabled?: boolean }) {
  return createLabeledInput(
    () => {
      const inputEl = document.createElement("input");
      inputEl.type = "datetime-local";
      if (value) inputEl.value = value;
      if (props.disabled) inputEl.disabled = true;
      return inputEl;
    },
    props,
    {
      inputClass:
        "text-lg px-4 py-3 rounded-xl border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-0 transition-colors duration-200",
    }
  );
}
