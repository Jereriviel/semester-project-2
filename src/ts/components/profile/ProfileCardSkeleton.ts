export function profileCardSkeleton() {
  const div = document.createElement("div");
  div.role = "status";
  div.className = "animate-pulse w-full";

  div.innerHTML = `
<div class="flex gap-4 py-4 sm:gap-8">
            <div
              class="h-[60px] w-[60px] rounded-full bg-gray-200 sm:h-[90px] sm:w-[90px]"
            ></div>
            <div class="flex flex-1 flex-col gap-2">
              <div class="flex flex-col gap-1">
                <div
                  class="mt-2 mb-2 h-4 max-w-[150px] rounded-full bg-gray-200"
                ></div>
                <div
                  class="mb-2.5 h-2 max-w-[180px] rounded-full bg-gray-200"
                ></div>
              </div>
              <div
                class="mb-4 h-3 max-w-[250px] rounded-full bg-gray-200"
              ></div>
            </div>
          </div>
  `;

  return div;
}
