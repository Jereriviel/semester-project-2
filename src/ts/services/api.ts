import { API_BASE, API_KEY } from "../utils/constants.js";
import { ApiError } from "../errors.ts/ApiError.js";
import { getToken } from "../store/userStore.js";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = API_BASE + endpoint;

  const headers: Record<string, string> = {
    "X-Noroff-API-Key": API_KEY,
    ...(options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : (options.headers as Record<string, string> | undefined)),
  };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw await ApiError.fromResponse(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data: T = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("An unexpected error occurred during API request", 500);
  }
}

export async function get<T>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint);
}

export async function post<T>(endpoint: string, body: object): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function put<T>(endpoint: string, body?: object): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function del(endpoint: string): Promise<void> {
  return apiFetch<void>(endpoint, {
    method: "DELETE",
  });
}
