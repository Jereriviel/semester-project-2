export function listingCardSkeleton() {
  return `
        <div data-skeleton role="status" class="shadow-card animate-pulse rounded-xl overflow-hidden flex flex-col">
          <div class="bg-gray-medium h-60"></div>
          <div class="bg-secondary-light flex h-[364px] flex-col gap-4 p-6 w-full">
            <div class="bg-gray-medium mb-2 h-2.5 max-w-40 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-20 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-60 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-60 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-30 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-30 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-30 rounded-full"></div>
            <div class="bg-gray-medium mb-2.5 h-2 max-w-30 rounded-full"></div>
          </div>
        </div>
`;
}
