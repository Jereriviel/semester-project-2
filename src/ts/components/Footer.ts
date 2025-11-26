export function Footer() {
  const footers = document.querySelectorAll("footer");

  footers.forEach((footer) => {
    footer.innerHTML = `
      <div class="mx-auto flex max-w-7xl flex-col gap-4">
        <img 
          src="/assets/logos/logo-secondary-96.png" 
          alt="Trove logo"
          class="w-[109px] sm:w-[145px]" 
        />
        <p>Copyright © 2025 Trove</p>
      </div>
    `;
  });
}
