import type { Metadata } from 'next';
import './globals.css';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import AdsProvider from '@/components/AdsProvider';
import CookieConsent from '@/components/CookieConsent';
import { getSiteUrl, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: 'Laravel Seed-Gen — Free Laravel Seeder & Factory Generator',
    template: '%s — Laravel Seed-Gen',
  },
  description:
    'Instantly convert Laravel Eloquent Models into production-ready Seeders, Factories and Migrations. Zero server, 100% client-side. Free forever.',
  metadataBase: getSiteUrl(),
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Laravel Seed-Gen — Free Laravel Seeder & Factory Generator',
    description:
      'Instantly convert Laravel Eloquent Models into production-ready Seeders, Factories and Migrations. Zero server, 100% client-side. Free forever.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laravel Seed-Gen — Free Laravel Seeder & Factory Generator',
    description:
      'Instantly convert Laravel Eloquent Models into production-ready Seeders, Factories and Migrations. Zero server, 100% client-side. Free forever.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdsProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <CookieConsent />
        </AdsProvider>
      </body>
    </html>
  );
}

