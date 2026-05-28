import { setUser } from "../store/userStore.js";
import type { RegisterResponseData, LoginResponseData } from "../types/auth.js";
import { post } from "./api.js";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponseData> {
  const res = await post<{ data: RegisterResponseData }>("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponseData> {
  const res = await post<{ data: LoginResponseData }>("/auth/login", {
    email,
    password,
  });

  setUser(res.data.accessToken, {
    name: res.data.name,
    email: res.data.email,
  });

  return res.data;
}
