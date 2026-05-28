import type { LoginResponseData } from "../types/auth.js";
import { showErrorModal } from "../components/modals/errorModal.js";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export type User = Omit<LoginResponseData, "accessToken">;

export function setUser(token: string, user: User): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
  const userData = localStorage.getItem(USER_KEY);

  if (!userData) return null;

  try {
    return JSON.parse(userData) as User;
  } catch {
    showErrorModal("Your saved user data was corrupted and has been reset.");

    clearUser();
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function clearUser(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
