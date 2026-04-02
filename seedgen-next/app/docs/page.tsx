import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import CodeBlock from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Laravel Seeder & Factory Documentation',
};

export default function DocsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">/</span>
          <span>Documentation</span>
        </div>
        <h1>Documentation</h1>
        <p>Everything you need to know about Laravel database seeding, Factories, and the Seed-Gen tool.</p>
      </div>

      <div className="sidebar-layout">
        <div>
          <section id="getting-started" style={{ scrollMarginTop: 80, paddingBottom: '3rem', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">01</div>
            <h2>Getting Started</h2>
            <p>
              Laravel Seed-Gen turns your Eloquent Model into a complete set of database seeding files in under 100ms — all inside
              your browser.
            </p>
            <h3>Basic workflow</h3>
            <ol style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
              <li>Paste your App\Models\YourModel.php content into the input panel</li>
              <li>Select your Laravel version (9, 10, 11 or 12)</li>
              <li>Choose how many records to seed</li>
              <li>Click ⚡ Generate (or press Ctrl+Enter)</li>
              <li>Copy each output tab (Seeder / Factory / Migration) separately</li>
            </ol>
            <CodeBlock
              title="Terminal — Scaffold a Model with all files"
              code={`php artisan make:model Product -mfs\n# -m = migration, -f = factory, -s = seeder`}
            />
          </section>

          <div style={{ margin: '1.5rem 0' }}>
            <AdSlot label="In-article" note="Placeholder" />
          </div>

          <section id="seeding" style={{ scrollMarginTop: 80, padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">02</div>
            <h2>Database Seeders</h2>
            <p>
              A Seeder is a PHP class that populates your database with test or demo data. Laravel&apos;s DatabaseSeeder class calls
              individual seeders.
            </p>
            <h3>Generated Seeder structure</h3>
            <CodeBlock
              title="database/seeders/ProductSeeder.php"
              code={`<?php\n\nnamespace Database\\Seeders;\n\nuse App\\Models\\Product;\nuse Illuminate\\Database\\Seeder;\n\nclass ProductSeeder extends Seeder\n{\n    public function run(): void\n    {\n        Product::factory()->count(50)->create();\n    }\n}`}
            />
          </section>
        </div>

        <div className="sidebar">
          <div className="toc">
            <div className="toc-title">On this page</div>
            <ul>
              <li>
                <a href="#getting-started">Getting started</a>
              </li>
              <li>
                <a href="#seeding">Seeders</a>
              </li>
            </ul>
          </div>
          <AdSlot label="Sidebar rectangle" note="Placeholder" />
        </div>
      </div>
    </>
  );
}
