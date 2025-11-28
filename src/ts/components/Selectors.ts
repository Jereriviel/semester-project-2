interface SelectorProps {
  name: string;
  label?: string;
  id?: string;
  defaultValue?: string;
}

export function sortFilterSelector(props: SelectorProps) {
  const defaultValue = props.defaultValue ?? "desc";

  return `
    <div class="flex flex-col gap-1">
      <label for="${props.id}" class="text-lg font-medium">
        ${props.label || ""}
      </label>
      <div class="relative flex items-center text-lg px-4 py-3 w-full sm:w-fit rounded-xl border border-gray-medium transition-colors duration-200">
        <select
          id="${props.id}"
          name="${props.name}"
          class="appearance-none w-full pr-6 bg-transparent outline-none"
        >
          <option value="desc" ${defaultValue === "desc" ? "selected" : ""}>
            Newest first
          </option>
          <option value="asc" ${defaultValue === "asc" ? "selected" : ""}>
            Oldest first
          </option>
        </select>
        <span
          class="material-symbols-outlined pointer-events-none absolute right-3"
          aria-hidden="true"
        >
          keyboard_arrow_down
        </span>
      </div>
    </div>
  `;
}
