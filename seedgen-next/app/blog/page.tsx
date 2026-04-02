import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import BlogClient from './blog-client';

export const metadata: Metadata = {
  title: 'Laravel Tips & Tutorials Blog',
};

export default function BlogIndexPage() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span>Blog</span>
        </div>
        <h1>
          Laravel <em>Tips</em> &amp; Tutorials
        </h1>
        <p>Database seeding, Eloquent patterns, and Laravel best practices. Written for developers, by developers.</p>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <AdSlot label="Top leaderboard" />
        <div style={{ marginBottom: '2rem' }} />
        <BlogClient />
      </div>
    </>
  );
}
