import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import SeedGenTool from '@/components/SeedGenTool';

export const metadata: Metadata = {
  title: 'Laravel Seed-Gen — Free Laravel Seeder & Factory Generator (Laravel 9, 10, 11, 12)',
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Free forever · No signup · Open source</div>
        <h1>
          The Fastest <em>Laravel</em>
          <br />
          Seeder Generator
        </h1>
        <p className="hero-sub">
          Paste your Eloquent Model, get a production-ready Seeder, Factory and Migration in under 100ms. Zero server — your
          code never leaves your browser.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-val">&lt;100ms</div>
            <div className="stat-lbl">Generation time</div>
          </div>
          <div className="stat">
            <div className="stat-val">0€</div>
            <div className="stat-lbl">Cost forever</div>
          </div>
          <div className="stat">
            <div className="stat-val">50+</div>
            <div className="stat-lbl">Faker types mapped</div>
          </div>
          <div className="stat">
            <div className="stat-val">100%</div>
            <div className="stat-lbl">Client-side</div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 2rem' }}>
        <AdSlot label="Top leaderboard" note="AdSense / Carbon placeholder" />
      </div>

      <SeedGenTool />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ margin: '2rem 0' }}>
          <AdSlot label="Mid leaderboard" note="AdSense / Carbon placeholder" />
        </div>
      </div>

      <section className="content-section" id="how-it-works">
        <div className="section-eyebrow">How it works</div>
        <h2>Static parsing, zero latency</h2>
        <p>
          Laravel Seed-Gen parses your Eloquent Model entirely in the browser using a custom parser written in JavaScript. No
          file is ever sent to a server.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon orange">⚡</div>
            <div className="feature-title">Instant generation</div>
            <div className="feature-desc">The parser runs in under 100ms even for large Models with dozens of fields.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon green">🔒</div>
            <div className="feature-title">100% private</div>
            <div className="feature-desc">Your Model code never leaves your browser. Zero telemetry, zero uploads.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon blue">🧠</div>
            <div className="feature-title">Smart Faker mapping</div>
            <div className="feature-desc">Column names like email/phone/bio map automatically to Faker methods.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon amber">🔗</div>
            <div className="feature-title">Relation-aware</div>
            <div className="feature-desc">Detects common relations and generates sensible seeding defaults.</div>
          </div>
        </div>
      </section>
    </>
  );
}
