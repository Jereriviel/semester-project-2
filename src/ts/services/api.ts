import { API_BASE, API_KEY } from "../utils/constants.js";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = API_BASE + endpoint;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...(options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : (options.headers as Record<string, string> | undefined)),
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message =
        (errorData && (errorData.message || errorData.errors?.[0]?.message)) ||
        `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    const data: T = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred during API request");
  }
}

export async function get<T>(endpoint: string): Promise<T | null> {
  return apiFetch<T>(endpoint);
}

export async function post<T>(
  endpoint: string,
  body: object
): Promise<T | null> {
  return apiFetch<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function put<T>(
  endpoint: string,
  body?: object
): Promise<T | null> {
  return apiFetch<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function del<T>(endpoint: string): Promise<T | null> {
  return apiFetch<T>(endpoint, {
    method: "DELETE",
  });
}
