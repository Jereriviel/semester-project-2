export function profileBannerSkeleton() {
  const div = document.createElement("div");
  div.role = "status";
  div.className = "animate-pulse w-full";

  div.innerHTML = `
    <div class="h-[150px] w-full bg-gray-200 rounded-xl"></div>
  `;

  return div;
}
