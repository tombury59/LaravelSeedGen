'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <Link href={href} className={isActive ? 'active' : undefined}>
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Laravel Seed-Gen home">
        <div className="logo-icon">SG</div>
        <span className="logo-text">
          Laravel<span>Seed</span>Gen
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary">
        <NavLink href="/tools" label="Tools" />
        <NavLink href="/docs" label="Docs" />
        <NavLink href="/blog" label="Blog" />
        <NavLink href="/changelog" label="Changelog" />
        <Link className="btn-nav" href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer">
          ☕ Support
        </Link>
      </nav>
    </header>
  );
}
