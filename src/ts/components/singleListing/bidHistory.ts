import { Bid } from "../../types/listings.js";

function BidHistory(bid: Bid, index: number) {
  const container = document.createElement("div");
  container.className = "gap:4 flex flex-col sm:gap-8 max-w-[520px]";

  container.innerHTML = `
    <div class="flex items-center justify-between pb-4 row-span-2">
      <div class="flex gap-4">
        <div class="bg-primary-normal flex h-8 w-8 items-center justify-center rounded-full shrink-0">
          <p class="font-medium title"></p>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <p class="text-gray-dark text-sm created"></p>
          <p class="font-medium user"></p>
        </div>
      </div>
      <p class="font-medium amount"></p>
    </div>
  `;

  container.querySelector(".title")!.textContent = String(index);
  container.querySelector(".created")!.textContent = new Date(
    bid.created
  ).toLocaleString();
  container.querySelector(".user")!.textContent = bid.bidder.name;
  container.querySelector(".amount")!.textContent = `${bid.amount} Credits`;

  return container;
}

export function renderBidHistory(listingBids: Bid[] = []) {
  const section = document.getElementById("bid-history-section");
  if (!section) return;

  if (listingBids.length === 0) {
    section.innerHTML = `  
      <h3 class="text-2xl mb-4">Bid History</h3>
      <p class="pb-4 sm:b-8 font-semibold">No bids yet.</p>
    `;
    return;
  }

  section.innerHTML = `
    <h3 class="text-2xl mb-4">Bid History</h3>
  `;

  const sorted = [...listingBids].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  sorted.forEach((bid, index) => {
    const displayNumber = sorted.length - index;
    section.appendChild(BidHistory(bid, displayNumber));
  });
}
