import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link
        href="https://digitalocean.com"
        target="_blank"
        rel="noopener noreferrer"
        className="affil-banner"
        style={{ justifyContent: 'center' }}
      >
        <span style={{ fontSize: 18 }}>☁️</span>
        <span style={{ fontSize: 12.5, color: 'var(--text2)' }}>
          <strong style={{ color: 'var(--text)', display: 'block', fontSize: 13 }}>Sponsored</strong>
          Deploy Laravel apps on DigitalOcean
        </span>
      </Link>

      <Link
        href="https://buymeacoffee.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--bg2)',
          border: '1px solid var(--border2)',
          borderRadius: 999,
          padding: '6px 14px',
          fontSize: 12,
          color: 'var(--text2)',
          textDecoration: 'none',
          margin: '0.5rem 0',
        }}
      >
        ☕ Buy me a coffee
      </Link>

      <div className="footer-links">
        <Link href="/">Home</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/privacy">Privacy</Link>
      </div>

      <div>Laravel Seed-Gen — Free, open source, client-side. Not affiliated with Laravel.</div>
      <div style={{ marginTop: 6, opacity: 0.4, fontFamily: 'var(--font-mono)', fontSize: 10 }}>
        vNext · Built client-side
      </div>
    </footer>
  );
}
