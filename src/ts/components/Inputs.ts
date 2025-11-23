interface InputProps {
  type?: "text" | "email" | "password" | "url";
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  minlength?: number;
  id?: string;
  autocomplete?: string;
}

export function input(props: InputProps) {
  return `
    <div class="flex flex-col gap-2">
      <label for="${props.id}" class=" text-lg font-semibold">
        ${props.label || ""}
      </label>
      <input
        id="${props.id}"
        type="${props.type || "text"}"
        name="${props.name}"
        ${props.required ? "required" : ""}
        ${props.minlength ? `minlength="${props.minlength}"` : ""}
        placeholder="${props.placeholder || ""}"
        autocomplete="${props.autocomplete || ""}"
        class="px-4 py-3 w-full sm:w-[300px] rounded-xl border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-0 transition-colors duration-200"
      />
      <p id="${props.id}Error" class="text-red-500 text-sm hidden"></p>
    </div>
  `;
}

export function textArea(props: InputProps) {
  return `
    <div class="flex flex-col gap-2">
      <label for="${props.id}" class="text-lg font-semibold">
        ${props.label || ""}
      </label>
      <textarea
        id="${props.id}"
        name="${props.name}"
        ${props.required ? "required" : ""}
        ${props.minlength ? `minlength="${props.minlength}"` : ""}
        placeholder="${props.placeholder || ""}"
        class="min-h-25 border border-gray-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:border-0 focus:ring-primary-dark transition-colors duration-200"
      ></textarea>
      <p id="${props.id}Error" class="text-red-500 text-sm hidden"></p>
    </div>
  `;
}
