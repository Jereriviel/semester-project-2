export interface InputProps {
  type?: "text" | "email" | "password" | "url" | "number" | "datetime-local";
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  minlength?: number;
  id?: string;
  autocomplete?: string;
  value?: string;
}
