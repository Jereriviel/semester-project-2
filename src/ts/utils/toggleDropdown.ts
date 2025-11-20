const dropdown = document.getElementById("dropdown");

export function toggleDropdown() {
  if (!dropdown) return;

  dropdown.classList.toggle("open_dropdown");
}
