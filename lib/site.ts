export const SITE_NAME = 'Laravel Seed-Gen';

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  try {
    return new URL(raw);
  } catch {
    return new URL('http://localhost:3000');
  }
}
