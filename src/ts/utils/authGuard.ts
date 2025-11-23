import { getToken } from "../store/userStore.js";

export function requireAuth() {
  if (!getToken()) {
    window.location.href = "/login/index.html";
  }
}

export function redirectIfAuth() {
  if (getToken()) {
    window.location.href = "/index.html";
  }
}
