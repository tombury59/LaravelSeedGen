import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Changelog',
};

const items = [
  {
    date: 'Mar 28, 2026',
    version: 'v1.2.0',
    title: 'Laravel 12 support + Faker reference',
    desc:
      "Added full support for Laravel 12's updated Factory and Seeder syntax. Added the interactive Faker Reference table on the Tools page.",
    tags: [
      { t: 'New: Laravel 12', k: 'new' },
      { t: 'New: Faker Reference', k: 'new' },
      { t: 'Improvement: Tinker', k: 'improvement' },
    ] as const,
  },
  {
    date: 'Feb 14, 2026',
    version: 'v1.1.2',
    title: 'Migration generator improvements',
    desc:
      'Fixed foreign key constraint generation for tables with non-standard naming. Added support for decimal cast type mapping.',
    tags: [
      { t: 'Fix: FK constraints', k: 'fix' },
      { t: 'Fix: decimal cast', k: 'fix' },
      { t: 'Improvement: dates', k: 'improvement' },
    ] as const,
  },
];

export default function ChangelogPage() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span>Changelog</span>
        </div>
        <h1>Changelog</h1>
        <p>
          Every release, every fix, every improvement. Laravel Seed-Gen follows{' '}
          <a href="https://semver.org/" target="_blank" rel="noopener noreferrer">
            Semantic Versioning
          </a>
          .
        </p>
      </div>

      <div className="sidebar-layout">
        <div>
          <AdSlot label="Top leaderboard" />
          <div style={{ marginTop: '1.25rem' }} className="changelog">
            {items.map((it) => (
              <div key={it.version} className="changelog-item">
                <div className="changelog-date">{it.date}</div>
                <div>
                  <span className="changelog-version">{it.version}</span>
                  <div className="changelog-title">{it.title}</div>
                  <div className="changelog-desc">{it.desc}</div>
                  <div className="changelog-tags">
                    {it.tags.map((t) => (
                      <span key={t.t} className={`cl-tag ${t.k}`}>
                        {t.t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <AdSlot label="In-article" note="Placeholder" />
          </div>
        </div>

        <div className="sidebar">
          <div className="toc">
            <div className="toc-title">Versions</div>
            <ul>
              {items.map((it) => (
                <li key={it.version}>
                  <a href="#">{it.version + ' — ' + it.date}</a>
                </li>
              ))}
            </ul>
          </div>
          <AdSlot label="Sidebar rectangle" />
        </div>
      </div>
    </>
  );
}
