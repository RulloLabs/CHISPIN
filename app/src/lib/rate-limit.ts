const hits = new Map<string, { count: number; ts: number }>();

const WINDOW = 60 * 1000;
const LIMIT = 10;

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = hits.get(ip);

  if (!record || now - record.ts > WINDOW) {
    hits.set(ip, { count: 1, ts: now });
    return true;
  }

  if (record.count >= LIMIT) return false;

  record.count++;
  return true;
}
