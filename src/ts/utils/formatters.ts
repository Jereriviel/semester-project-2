export function formatEndsIn(endsAt: string): string {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  let result = "";

  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;

  return result.trim();
}
