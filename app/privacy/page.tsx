import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span>Privacy Policy</span>
        </div>
        <h1>Privacy Policy</h1>
        <p>Last updated: March 28, 2026</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div className="content-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <h2>The short version</h2>
          <p>
            Laravel Seed-Gen processes your code <strong>entirely in your browser</strong>. We do not collect, store, or transmit
            your Model code anywhere.
          </p>

          <h3>What we do collect (via third parties)</h3>
          <ul style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
            <li>
              <strong style={{ color: 'var(--text)' }}>Google Analytics / Plausible</strong> — anonymous page view statistics.
            </li>
            <li>
              <strong style={{ color: 'var(--text)' }}>Google AdSense / Carbon Ads</strong> — ads may use cookies for
              personalisation.
            </li>
            <li>
              <strong style={{ color: 'var(--text)' }}>Cloudflare</strong> — CDN and DDoS protection; may process request metadata.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
