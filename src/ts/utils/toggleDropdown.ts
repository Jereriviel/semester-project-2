export function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  if (!dropdown) return;

  dropdown.classList.toggle("open_dropdown");
}
