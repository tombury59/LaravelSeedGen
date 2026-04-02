import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().toString().replace(/\/$/, '');
  const now = new Date();

  const routes = ['/', '/tools', '/docs', '/blog', '/changelog', '/privacy'];
  return routes.map((path) => ({
    url: base + path,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
