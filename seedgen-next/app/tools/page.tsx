import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import ToolsClient from './tools-client';

export const metadata: Metadata = {
  title: 'Laravel Developer Tools — Seeder, Factory, Migration, Faker Reference',
  description:
    'Free Laravel developer tools: Seeder Generator, Factory Generator, Migration Generator, Faker Method Reference, Tinker Playground. All client-side.',
};

export default function ToolsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span>Tools</span>
        </div>
        <div className="hero-badge" style={{ marginBottom: '1rem' }}>
          6 free developer tools
        </div>
        <h1>
          Laravel <em>Developer</em> Tools
        </h1>
        <p className="hero-sub" style={{ maxWidth: '100%' }}>
          Everything you need to scaffold and seed a Laravel application. All tools run 100% in your browser — no accounts, no
          uploads.
        </p>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <AdSlot label="Top leaderboard" />
        <ToolsClient />
      </div>
    </>
  );
}
