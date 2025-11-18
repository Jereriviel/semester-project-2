export function requireAuth() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    window.location.href = "/login.html";
  }
}

export function redirectIfAuth() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    window.location.href = "/profile.html";
  }
}
