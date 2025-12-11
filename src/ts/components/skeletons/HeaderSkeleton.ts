export function HeaderSkeleton() {
  const div = document.createElement("div");
  div.role = "status";
  div.className = "mx-auto flex max-w-7xl items-center justify-end";
  div.innerHTML = `
            <div class="animate-pulse flex items-center gap-3 sm:gap-4 justify-center">
                <div
                  class="h-7 w-26  sm:h-9 sm:w-28 rounded-xl bg-gray-200"
                ></div>
                <div
                  class="h-12 w-12 rounded-full bg-gray-200"
                ></div>
            </div>
  `;

  return div;
}
