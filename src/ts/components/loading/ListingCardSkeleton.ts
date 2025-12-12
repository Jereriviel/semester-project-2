export function ListingCardSkeleton() {
  const container = document.createElement("div");
  container.role = "status";
  container.className =
    "shadow-card animate-pulse rounded-xl overflow-hidden flex flex-col";
  container.innerHTML = `
          <div class="bg-gray-light h-60"></div>
          <div class="bg-secondary-light flex h-[364px] flex-col gap-4 p-6 w-full">
            <div class="bg-gray-200 mb-2 h-4 max-w-40 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2 max-w-20 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2.5 max-w-60 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2.5 max-w-60 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2 max-w-20 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2.5 max-w-30 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2 max-w-20 rounded-full"></div>
            <div class="bg-gray-200 mb-2.5 h-2.5 max-w-30 rounded-full"></div>
          </div>
`;

  return container;
}
