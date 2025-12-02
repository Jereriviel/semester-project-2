export function formatEndsIn(endsAt: string): string {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result.trim();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function startCountdown(
  endsAt: string,
  element: HTMLElement
): () => void {
  element.textContent = formatEndsIn(endsAt);

  const interval = setInterval(() => {
    const formatted = formatEndsIn(endsAt);
    element.textContent = formatted;

    if (formatted === "Ended") {
      clearInterval(interval);
    }
  }, 1000);

  return () => clearInterval(interval);
}
