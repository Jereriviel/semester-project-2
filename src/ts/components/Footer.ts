export function Footer() {
  return `
      <div class="mx-auto flex max-w-7xl flex-col gap-4">
        <picture>
          <source
            media="(min-width: 640px)"
            srcset="assets/images/logo-secondary-48.png"
            type="image/webp"
          />
          <img src="assets/images/logo-secondary-36.png" alt="Trove logo" />
        </picture>
        <p>Copyright © 2025 Trove</p>
      </div>
    `;
}

export function renderFooter() {
  const footers = document.querySelectorAll("footer");

  footers.forEach((footer) => {
    footer.innerHTML = Footer();
  });
}
