import { API_BASE } from "../utils/constants.js";
import { setUser } from "../store/userStore.js";
import type {
  RegisterResponseData,
  RegisterResponse,
  LoginResponseData,
  LoginResponse,
} from "../types/auth.js";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponseData | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        (errorData && errorData.message) || "Registration failed"
      );
    }

    const json: RegisterResponse = await res.json();
    return json.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while registering");
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponseData | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error((errorData && errorData.message) || "Login failed");
    }

    const json: LoginResponse = await res.json();

    setUser(json.data.accessToken, {
      name: json.data.name,
      email: json.data.email,
    });

    return json.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while logging in");
  }
}
