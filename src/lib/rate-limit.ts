const requests = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 1_000;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (requests.size > MAX_KEYS) {
    for (const [key, timestamps] of requests.entries()) {
      if (timestamps.every((t) => now - t >= WINDOW_MS)) {
        requests.delete(key);
      }
    }
  }

  const timestamps = requests.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    requests.set(ip, recent);
    return true;
  }

  recent.push(now);
  requests.set(ip, recent);
  return false;
}
