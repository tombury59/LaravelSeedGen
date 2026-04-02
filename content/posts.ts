export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  read: string;
  version: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'laravel-database-seeding-guide-2026',
    title: 'A Simple Guide to Laravel Database Seeding in 2026',
    description:
      'A practical, updated guide to Seeders, Factories, Faker, relationships, performance, and testing for Laravel 10, 11 and 12 (2026 edition).',
    tag: '🌱 Seeding',
    date: 'Mar 28, 2026',
    read: '12 min',
    version: 'Laravel 11, 12',
  },
];
