export function ImageGallerySkeleton() {
  const div = document.createElement("div");
  div.role = "status";
  div.className = "animate-pulse w-full";
  div.innerHTML = `
    <div class="w-full max-w-[520px] aspect-4/3 bg-gray-200 rounded-xl"></div>
  `;

  return div;
}
