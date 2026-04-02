import type { Metadata } from 'next';
import './globals.css';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: {
    default: 'Laravel Seed-Gen — Free Laravel Seeder & Factory Generator',
    template: '%s — Laravel Seed-Gen',
  },
  description:
    'Instantly convert Laravel Eloquent Models into production-ready Seeders, Factories and Migrations. Zero server, 100% client-side. Free forever.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
