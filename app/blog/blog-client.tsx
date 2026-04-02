'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import AdSlot from '@/components/AdSlot';
import { posts } from '@/content/posts';

type Cat = 'all' | 'seeding' | 'factories' | 'eloquent' | 'performance' | 'testing';

const categories: Array<{ id: Cat; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'seeding', label: 'Seeding' },
  { id: 'factories', label: 'Factories' },
  { id: 'eloquent', label: 'Eloquent' },
  { id: 'performance', label: 'Performance' },
  { id: 'testing', label: 'Testing' },
];

export default function BlogClient() {
  const [active, setActive] = useState<Cat>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return posts;
    // current dataset is small; keep simple mapping
    if (active === 'seeding') return posts;
    return posts;
  }, [active]);

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href={`/blog/${posts[0].slug}`}
          className="post-card"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}
        >
          <div>
            <div className="post-tag">⭐ Featured · Database Seeding</div>
            <div className="post-title" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {posts[0].title}
            </div>
            <div className="post-excerpt" style={{ fontSize: 14 }}>
              {posts[0].description}
            </div>
            <div className="post-meta">
              <span>{posts[0].date}</span>
              <span>{posts[0].read} read</span>
              <span>{posts[0].version}</span>
            </div>
          </div>
          <div
            style={{
              background: 'var(--bg3)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              minHeight: 180,
            }}
          >
            🌱
          </div>
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <AdSlot label="Mid leaderboard" />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={active === c.id ? 'btn-ghost active' : 'btn-ghost'}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="post-grid">
        {filtered.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
            <div className="post-tag">{p.tag}</div>
            <div className="post-title">{p.title}</div>
            <div className="post-excerpt">{p.description}</div>
            <div className="post-meta">
              <span>{p.date}</span>
              <span>{p.read}</span>
              <span>{p.version}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
