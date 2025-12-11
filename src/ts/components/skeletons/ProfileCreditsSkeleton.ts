export function profileCreditsSkeleton() {
  const div = document.createElement("div");
  div.role = "status";
  div.className = "animate-pulse w-full flex justify-end";
  div.innerHTML = `
    <div class="h-8 w-full sm:h-11 sm:w-60 bg-gray-200 rounded-xl"></div>
  `;

  return div;
}
