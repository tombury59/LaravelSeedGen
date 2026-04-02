'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ParsedModel } from '@/lib/seedgen';
import { generateFactory, generateMigration, generateSeeder, hl, parseModel } from '@/lib/seedgen';
import Toast, { type ToastState } from '@/components/Toast';

type Tab = 'seeder' | 'factory' | 'migration';

const PLACEHOLDER = `<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass User extends Model\n{\n    protected $fillable = [\n        'name', 'email', 'bio', 'avatar',\n        'phone', 'age', 'website', 'role_id',\n        'is_active', 'born_at',\n    ];\n\n    protected $casts = [\n        'is_active' => 'boolean',\n        'born_at'   => 'datetime',\n    ];\n\n    public function role(): BelongsTo\n    {\n        return $this->belongsTo(Role::class);\n    }\n\n    public function posts(): HasMany\n    {\n        return $this->hasMany(Post::class);\n    }\n}`;

function emptyHtml() {
  return '<div class="empty-icon">⟨/⟩</div><div>Paste a Model and click Generate</div>';
}

export default function SeedGenTool() {
  const [currentOutputTab, setCurrentOutputTab] = useState<Tab>('seeder');

  const [code, setCode] = useState<string>(PLACEHOLDER);
  const [version, setVersion] = useState<'9' | '10' | '11' | '12'>('12');
  const [seedCount, setSeedCount] = useState<'10' | '20' | '50' | '100' | 'custom'>('50');
  const [withRelations, setWithRelations] = useState(true);
  const [withTimestamps, setWithTimestamps] = useState(true);

  const [parsed, setParsed] = useState<ParsedModel | null>(null);
  const [generatedSeeder, setGeneratedSeeder] = useState('');
  const [generatedFactory, setGeneratedFactory] = useState('');
  const [generatedMigration, setGeneratedMigration] = useState('');

  const [genTimeMs, setGenTimeMs] = useState<number | null>(null);
  const [genLines, setGenLines] = useState<number | null>(null);
  const [genStatus, setGenStatus] = useState<string>('');

  const [toast, setToast] = useState<ToastState>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const outputHtml = useMemo(() => {
    const text =
      currentOutputTab === 'seeder'
        ? generatedSeeder
        : currentOutputTab === 'factory'
          ? generatedFactory
          : generatedMigration;
    return text ? hl(text) : emptyHtml();
  }, [currentOutputTab, generatedFactory, generatedMigration, generatedSeeder]);

  const outputIsEmpty =
    currentOutputTab === 'seeder'
      ? !generatedSeeder
      : currentOutputTab === 'factory'
        ? !generatedFactory
        : !generatedMigration;

  const showToast = useCallback((message: string, type: 'ok' | 'err') => setToast({ message, type }), []);

  useEffect(() => {
    if (!code.trim()) {
      setParsed(null);
      return;
    }
    try {
      const p = parseModel(code);
      setParsed(p);
    } catch {
      setParsed(null);
    }
  }, [code]);

  const triggerFileInput = useCallback(() => fileInputRef.current?.click(), []);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files);
      const phpFiles = arr.filter((f) => f.name.toLowerCase().endsWith('.php'));
      if (!phpFiles.length) {
        showToast('Drop .php files only', 'err');
        return;
      }
      const text = await phpFiles[0].text();
      setCode(text);
      showToast(`Loaded ${phpFiles[0].name}`, 'ok');
    },
    [showToast],
  );

  const doCopy = useCallback(async () => {
    const text =
      currentOutputTab === 'seeder'
        ? generatedSeeder
        : currentOutputTab === 'factory'
          ? generatedFactory
          : generatedMigration;

    if (!text) {
      showToast('Generate first!', 'err');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard', 'ok');
    } catch {
      showToast('Copy failed (browser blocked)', 'err');
    }
  }, [currentOutputTab, generatedFactory, generatedMigration, generatedSeeder, showToast]);

  const clearAll = useCallback(() => {
    setCode('');
    setParsed(null);
    setGeneratedSeeder('');
    setGeneratedFactory('');
    setGeneratedMigration('');
    setGenTimeMs(null);
    setGenLines(null);
    setGenStatus('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const generate = useCallback(() => {
    if (!code.trim()) {
      showToast('Paste a Laravel Model first', 'err');
      return;
    }

    const t0 = performance.now();
    try {
      let count: number;
      if (seedCount === 'custom') {
        const val = Number.parseInt(window.prompt('How many records to seed?', '50') || '50', 10);
        count = Number.isFinite(val) && val > 0 ? val : 50;
      } else {
        count = Number.parseInt(seedCount, 10);
      }

      const p = parseModel(code);
      if (!p.className) throw new Error('Could not detect class name');
      if (p.fillable.length === 0 && Object.keys(p.casts).length === 0) {
        showToast('No $fillable or $casts found. Add them to your Model.', 'err');
      }

      const s = generateSeeder(p, version, count, withRelations);
      const f = generateFactory(p, version, withTimestamps);
      const m = generateMigration(p);

      const ms = Math.round(performance.now() - t0);
      setParsed(p);
      setGeneratedSeeder(s);
      setGeneratedFactory(f);
      setGeneratedMigration(m);
      setGenTimeMs(ms);
      setGenLines(s.split('\n').length + f.split('\n').length + m.split('\n').length);
      setGenStatus('✓ Generated successfully');
      showToast(`✓ ${p.className} generated in ${ms}ms`, 'ok');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setGenStatus(`✗ ${msg}`);
      showToast('Parse error: ' + msg, 'err');
    }
  }, [code, seedCount, showToast, version, withRelations, withTimestamps]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generate();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        void doCopy();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [doCopy, generate]);

  return (
    <>
      <div className="tool-full" style={{ marginTop: '1.5rem' }}>
        <div className="tool-grid">
          <div className="panel" id="input-panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-dot" />
                Input — Paste or drop your Model
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <div className="tabs">
                  <button className="tab active" type="button" onClick={() => undefined}>
                    Paste
                  </button>
                  <button className="tab" type="button" onClick={triggerFileInput}>
                    Upload
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".php"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    void handleFiles(e.target.files);
                  }}
                />
              </div>
            </div>

            <div className={code ? 'file-chips hidden' : 'file-chips hidden'} id="file-chips" />

            <div className="config-row">
              <span className="config-label">Laravel:</span>
              <select
                className="config-select"
                value={version}
                onChange={(e) => setVersion(e.target.value as typeof version)}
              >
                <option value="12">12 (latest)</option>
                <option value="11">11</option>
                <option value="10">10</option>
                <option value="9">9</option>
              </select>

              <span className="config-label">Records:</span>
              <select className="config-select" value={seedCount} onChange={(e) => setSeedCount(e.target.value as any)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="custom">Custom…</option>
              </select>

              <label className="config-checkbox-wrap">
                <input type="checkbox" checked={withRelations} onChange={(e) => setWithRelations(e.target.checked)} />
                <span>Relations</span>
              </label>
              <label className="config-checkbox-wrap">
                <input type="checkbox" checked={withTimestamps} onChange={(e) => setWithTimestamps(e.target.checked)} />
                <span>Timestamps</span>
              </label>
            </div>

            <div
              className="editor-wrap"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDropActive(true);
              }}
              onDragLeave={() => setIsDropActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDropActive(false);
                void handleFiles(e.dataTransfer.files);
              }}
            >
              <div className={isDropActive ? 'dropzone-overlay active' : 'dropzone-overlay'}>
                <div className="dropzone-msg">Drop your .php Model here</div>
              </div>
              <textarea
                className="code-input"
                spellCheck={false}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={PLACEHOLDER}
              />
            </div>

            <div className="ad-inline" style={{ margin: 0, borderRadius: 0, borderLeft: 'none', borderRight: 'none' }}>
              <div className="ad-label">Advertisement</div>
              <div style={{ opacity: 0.5, fontSize: 11 }}>Carbon Ads · Ethical, developer-focused ads</div>
            </div>

            <div className="generate-wrap">
              <button className="btn-primary" type="button" onClick={generate} style={{ flex: 1 }}>
                <span className="spinner" aria-hidden />
                <span>⚡ Generate</span>
              </button>
              <button className="btn-secondary" type="button" onClick={clearAll}>
                Clear
              </button>
            </div>

            <div className="status-bar">
              <span className="status-item">
                Status:{' '}
                <span className={parsed ? 'status-val status-ok' : 'status-val'}>{parsed ? 'Model detected' : 'Ready'}</span>
              </span>
              <span className="status-item">
                Class: <span className="status-val">{parsed?.className || '—'}</span>
              </span>
              <span className="status-item">
                Fields: <span className="status-val">{parsed ? parsed.fillable.length : '—'}</span>
              </span>
              <span className="status-item">
                Relations: <span className="status-val">{parsed ? parsed.relations.length : '—'}</span>
              </span>
              <span className="status-item" style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5 }}>
                Ctrl+Enter to generate
              </span>
            </div>
          </div>

          <div className="panel" id="output-panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-dot green" />
                Output
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="tabs">
                  <button
                    className={currentOutputTab === 'seeder' ? 'tab active' : 'tab'}
                    type="button"
                    onClick={() => setCurrentOutputTab('seeder')}
                  >
                    Seeder
                  </button>
                  <button
                    className={currentOutputTab === 'factory' ? 'tab active' : 'tab'}
                    type="button"
                    onClick={() => setCurrentOutputTab('factory')}
                  >
                    Factory
                  </button>
                  <button
                    className={currentOutputTab === 'migration' ? 'tab active' : 'tab'}
                    type="button"
                    onClick={() => setCurrentOutputTab('migration')}
                  >
                    Migration
                  </button>
                </div>
                <button className="copy-btn" type="button" onClick={() => void doCopy()}>
                  ⎘ Copy
                </button>
              </div>
            </div>

            <div className={parsed ? 'info-cards' : 'info-cards hidden'}>
              <div className="info-card">
                <div className="info-card-lbl">Class</div>
                <div className="info-card-val">{parsed?.className || '—'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-lbl">Namespace</div>
                <div className="info-card-val" style={{ fontSize: 11 }}>
                  {parsed?.namespace || 'App\\Models'}
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-lbl">Fields</div>
                <div className="info-card-val">{parsed?.fillable.length ?? '—'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-lbl">Relations</div>
                <div className="info-card-val" style={{ fontSize: 11 }}>
                  {parsed?.relations.map((r) => r.type).join(', ') || '0'}
                </div>
              </div>
            </div>

            <div className="output-content">
              <div className="output-tab-content active">
                <div
                  className={outputIsEmpty ? 'output-code empty' : 'output-code'}
                  dangerouslySetInnerHTML={{ __html: outputHtml }}
                />
              </div>
            </div>

            <div className="status-bar" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="status-item">
                  Time: <span className="status-val">{genTimeMs != null ? `${genTimeMs}ms` : '—'}</span>
                </span>
                <span className="status-item">
                  Lines: <span className="status-val">{genLines != null ? `${genLines} lines` : '—'}</span>
                </span>
              </div>
              <span className={genStatus.startsWith('✓') ? 'status-item status-ok' : 'status-item status-err'}>{genStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <Toast toast={toast} onClear={() => setToast(null)} />
    </>
  );
}
