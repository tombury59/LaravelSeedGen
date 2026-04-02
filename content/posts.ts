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
    title: 'The Complete Guide to Laravel Database Seeding in 2026',
    description:
      'Everything you need to know about Seeders, Factories, Faker, and best practices for Laravel 10, 11 and 12. Updated for 2026.',
    tag: '🌱 Seeding',
    date: 'Mar 28, 2026',
    read: '12 min',
    version: 'Laravel 11, 12',
  },
];
