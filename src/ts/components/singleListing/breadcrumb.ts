function Breadcrumb(title: string) {
  const container = document.createElement("div");
  container.className = "flex flex-wrap items-center";
  container.innerHTML = `
    <a
    href="/index.html"
    class="font-medium transition-all duration-200 hover:underline"
    >Listings</a
    ><span class="material-symbols-outlined"> keyboard_arrow_right </span>
    <p class="capitalize">${title}</p>
`;

  return container;
}

export function renderBreadcrumb(title: string) {
  const breadcrumb = document.getElementById("breadcrumb-section");
  if (!breadcrumb) return;

  const breadcrumbContent = Breadcrumb(title);
  breadcrumb.innerHTML = "";
  breadcrumb.appendChild(breadcrumbContent);
}
