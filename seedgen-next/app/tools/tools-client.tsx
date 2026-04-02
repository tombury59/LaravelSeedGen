'use client';

import { useMemo, useState } from 'react';
import AdSlot from '@/components/AdSlot';

type FakerRow = { cat: string; method: string; example: string; desc: string };

const fakerData: FakerRow[] = [
  { cat: 'Person', method: 'name()', example: 'Dr. John Smith', desc: 'Full name with optional title' },
  { cat: 'Person', method: 'firstName()', example: 'John', desc: 'First name' },
  { cat: 'Person', method: 'lastName()', example: 'Smith', desc: 'Last name' },
  { cat: 'Contact', method: 'safeEmail()', example: 'john@example.com', desc: 'Safe email (example.com domain)' },
  { cat: 'Contact', method: 'phoneNumber()', example: '+1-555-234-5678', desc: 'Phone number' },
  { cat: 'Address', method: 'streetAddress()', example: '123 Main St', desc: 'Street address' },
  { cat: 'Internet', method: 'url()', example: 'https://example.com/path', desc: 'Random URL' },
  { cat: 'Date', method: 'dateTimeBetween("-1 year", "now")', example: '2024-03-01 10:00:00', desc: 'DateTime in a range' },
  { cat: 'Number', method: 'randomFloat(2, 0, 999)', example: '49.99', desc: 'Float with 2 decimal places' },
  { cat: 'Business', method: 'company()', example: 'Acme Corp', desc: 'Company name' },
];

function fakerSample(method: string) {
  const now = new Date();
  switch (true) {
    case method.startsWith('name'):
      return ['Jane Doe', 'Alex Martin', 'Dr. John Smith'][Math.floor(Math.random() * 3)];
    case method.startsWith('safeEmail'):
      return ['alex@example.com', 'jane@example.com', 'dev@example.com'][Math.floor(Math.random() * 3)];
    case method.startsWith('paragraph'):
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    case method.startsWith('numberBetween'):
      return String(1 + Math.floor(Math.random() * 100));
    case method.startsWith('randomFloat'):
      return (Math.random() * 999).toFixed(2);
    case method.startsWith('dateTimeBetween'):
      return now.toISOString();
    default:
      return 'Unsupported method (demo)';
  }
}

export default function ToolsClient() {
  const [q, setQ] = useState('');
  const [expr, setExpr] = useState('name()');
  const [out, setOut] = useState('// Click Run to see output');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return fakerData;
    return fakerData.filter((r) => (r.cat + r.method + r.example + r.desc).toLowerCase().includes(s));
  }, [q]);

  return (
    <>
      <div style={{ marginTop: '1.5rem' }}>
        <div className="tools-grid">
          <a href="/" className="tool-card">
            <span className="tool-card-badge">Live</span>
            <div className="tool-card-icon">🌱</div>
            <div className="tool-card-title">Seeder Generator</div>
            <div className="tool-card-desc">Paste any Eloquent Model and get a production-ready Seeder class.</div>
          </a>
          <a href="/#factory" className="tool-card">
            <span className="tool-card-badge">Live</span>
            <div className="tool-card-icon">🏭</div>
            <div className="tool-card-title">Factory Generator</div>
            <div className="tool-card-desc">Generates a complete definition() method with smart Faker mappings.</div>
          </a>
          <a href="/#migration" className="tool-card">
            <span className="tool-card-badge">Live</span>
            <div className="tool-card-icon">📋</div>
            <div className="tool-card-title">Migration Generator</div>
            <div className="tool-card-desc">Produces a migration stub based on fillable fields and cast types.</div>
          </a>
          <a href="#faker-ref" className="tool-card">
            <span className="tool-card-badge">Live</span>
            <div className="tool-card-icon">🎲</div>
            <div className="tool-card-title">Faker Reference</div>
            <div className="tool-card-desc">Searchable reference of common Faker methods with examples.</div>
          </a>
          <a href="#tinker" className="tool-card">
            <span className="tool-card-badge soon">Coming soon</span>
            <div className="tool-card-icon">🔧</div>
            <div className="tool-card-title">Tinker Playground</div>
            <div className="tool-card-desc">Preview a subset of fake()-&gt; methods directly in the browser.</div>
          </a>
          <a href="#batch" className="tool-card">
            <span className="tool-card-badge soon">Coming soon</span>
            <div className="tool-card-icon">📦</div>
            <div className="tool-card-title">Batch Generator</div>
            <div className="tool-card-desc">Upload a folder of Models and generate all outputs as a ZIP.</div>
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <AdSlot label="Rectangle (sidebar)" note="Placeholder" />
        </div>

        <div id="faker-ref" style={{ scrollMarginTop: 80 }}>
          <hr className="divider" />
          <div className="section-eyebrow">Faker Reference</div>
          <h2>PHP Faker Methods for Laravel</h2>
          <p>
            Laravel uses FakerPHP via the fake() helper. Here&apos;s a small searchable reference of commonly used methods.
          </p>

          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search methods… e.g. email, date, number"
            style={{
              width: '100%',
              background: 'var(--bg2)',
              color: 'var(--text)',
              border: '1px solid var(--border2)',
              borderRadius: 'var(--radius)',
              padding: '10px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              outline: 'none',
              margin: '1.5rem 0',
              boxSizing: 'border-box',
            }}
          />

          <div className="panel" style={{ overflow: 'hidden' }}>
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-dot" />
                Methods
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
                {filtered.length} rows
              </div>
            </div>
            <div style={{ padding: 12, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
                    <th style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>Category</th>
                    <th style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>Method</th>
                    <th style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>Example</th>
                    <th style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.cat + r.method}>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>{r.cat}</td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>
                        {r.method}
                      </td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--border)', color: 'var(--green)' }}>{r.example}</td>
                      <td style={{ padding: 8, borderBottom: '1px solid var(--border)', color: 'var(--text2)' }}>{r.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="tinker" style={{ scrollMarginTop: 80, marginTop: '4rem' }}>
          <hr className="divider" />
          <div className="section-eyebrow">Tinker Playground</div>
          <h2>Preview Faker output</h2>
          <p>Type any fake()-&gt; expression and see a sample output. This is a client-side demo (limited subset).</p>

          <div className="panel" style={{ maxWidth: 700 }}>
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-dot" />
                Expression
              </div>
              <button className="copy-btn" type="button" onClick={() => setOut(fakerSample(expr))}>
                ▶ Run
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--text3)',
                  padding: '0 0 0 1rem',
                  whiteSpace: 'nowrap',
                }}
              >
                fake()-&gt;
              </span>
              <input
                type="text"
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                placeholder="name()"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  padding: '12px 8px',
                  outline: 'none',
                }}
              />
            </div>
            <div
              style={{
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--green)',
                minHeight: 80,
                background: 'var(--bg2)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {out}
            </div>
            <div style={{ padding: '8px 16px', background: 'var(--bg3)', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['safeEmail()', 'paragraph()', 'dateTimeBetween("-1 year","now")', 'randomFloat(2,5,999)', 'numberBetween(1,100)'].map(
                  (m) => (
                    <button key={m} className="btn-ghost" type="button" onClick={() => setExpr(m)}>
                      {m}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
