export function profileAddListingSkeleton() {
  const div = document.createElement("div");
  div.role = "status";
  div.className = "animate-pulse w-full";
  div.innerHTML = `
     <div class="h-11 w-full sm:w-60 bg-gray-200 rounded-xl"></div>
  `;

  return div;
}
