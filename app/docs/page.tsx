import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import CodeBlock from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Documentation — Laravel Seed-Gen',
  description:
    'Complete documentation for Laravel Seed-Gen: how the parser works, supported Model syntax, Faker mapping rules, relations support, and how to use generated Seeders/Factories/Migrations.',
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
        <p>
          A complete guide to how Laravel Seed-Gen works: what it detects in your Models, how Faker mapping is decided, and how
          to install generated files in a real Laravel project.
        </p>
      </div>

      <div className="sidebar-layout">
        <div>
          <section
            id="getting-started"
            style={{ scrollMarginTop: 80, paddingBottom: '3rem', borderBottom: '1px solid var(--border)' }}
          >
            <div className="section-eyebrow">01</div>
            <h2>Getting Started</h2>
            <p>
              Laravel Seed-Gen is a <strong>client-side generator</strong>. You paste an Eloquent Model (PHP) and it generates:
              <strong> a Seeder</strong>, <strong>a Factory</strong>, and <strong>a Migration stub</strong>.
            </p>
            <h3>Basic workflow</h3>
            <ol style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
              <li>Paste your App\Models\YourModel.php content into the input panel</li>
              <li>Select your Laravel version (9, 10, 11 or 12)</li>
              <li>Choose how many records to seed</li>
              <li>Click ⚡ Generate (or press Ctrl+Enter)</li>
              <li>Copy each output tab (Seeder / Factory / Migration) separately</li>
            </ol>

            <h3>What you need in your Model</h3>
            <ul style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
              <li>
                A <code>class</code> name (Seed-Gen detects <code>class X extends Model</code>)
              </li>
              <li>
                Preferably <code>protected $fillable = [...];</code> (best signal for columns)
              </li>
              <li>
                Optionally <code>$casts</code> (or Laravel 11+ <code>protected function casts(): array</code>) to improve type mapping
              </li>
              <li>
                Optionally relations (methods returning <code>$this-&gt;belongsTo(...)</code>, etc.)
              </li>
            </ul>

            <CodeBlock
              title="Terminal — Scaffold a Model with all files"
              code={`php artisan make:model Product -mfs\n# -m = migration, -f = factory, -s = seeder`}
            />

            <CodeBlock
              title="Model example (input)"
              code={`<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass Product extends Model\n{\n    protected $fillable = [\n        'name',\n        'slug',\n        'description',\n        'price',\n        'stock',\n        'is_active',\n        'category_id',\n    ];\n\n    protected $casts = [\n        'price' => 'decimal:2',\n        'is_active' => 'boolean',\n    ];\n\n    public function category()\n    {\n        return $this->belongsTo(Category::class);\n    }\n}`}
            />
          </section>

          <div style={{ margin: '1.5rem 0' }}>
            <AdSlot label="In-article" note="Placeholder" />
          </div>

          <section id="outputs" style={{ scrollMarginTop: 80, padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">02</div>
            <h2>Outputs (Seeder / Factory / Migration)</h2>
            <p>
              Seed-Gen generates three outputs. You can use any of them independently, but the best workflow is to paste all
              three into the standard Laravel folders.
            </p>

            <h3>Seeder</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              A Seeder populates the database. The generated seeder uses your Factory (recommended) and can optionally include
              relationship hints.
            </p>
            <CodeBlock
              title="database/seeders/ProductSeeder.php"
              code={`<?php\n\nnamespace Database\\Seeders;\n\nuse App\\Models\\Product;\nuse Illuminate\\Database\\Seeder;\n\nclass ProductSeeder extends Seeder\n{\n    public function run(): void\n    {\n        Product::factory()->count(50)->create();\n    }\n}`}
            />

            <h3>Factory</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              A Factory defines how to generate a single model instance. Seed-Gen infers Faker calls from column names and
              improves mapping using cast types.
            </p>
            <CodeBlock
              title="database/factories/ProductFactory.php"
              code={`<?php\n\nnamespace Database\\Factories;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\nuse App\\Models\\Product;\n\nclass ProductFactory extends Factory\n{\n    protected $model = Product::class;\n\n    public function definition(): array\n    {\n        return [\n            'name' => fake()->words(3, true),\n            'slug' => fake()->slug(3),\n            'description' => fake()->paragraph(),\n            'price' => fake()->randomFloat(2, 9.99, 999.99),\n            'stock' => fake()->numberBetween(0, 500),\n            'is_active' => fake()->boolean(),\n            'category_id' => Category::factory(),\n        ];\n    }\n}`}
            />

            <h3>Migration stub</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              The Migration output is a <strong>helper stub</strong>. It is not meant to replace schema design, but it gives you
              a fast starting point based on fillable/casts naming heuristics.
            </p>
            <CodeBlock
              title="database/migrations/xxxx_xx_xx_create_products_table.php"
              code={`Schema::create('products', function (Blueprint $table) {\n    $table->id();\n    $table->string('name')->nullable();\n    $table->string('slug')->nullable();\n    $table->text('description')->nullable();\n    $table->decimal('price', 10, 2)->default(0);\n    $table->integer('stock')->default(0);\n    $table->boolean('is_active')->default(false);\n    $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();\n    $table->timestamps();\n});`}
            />

            <h3>Install in Laravel</h3>
            <CodeBlock
              title="Terminal — run seeding"
              code={`php artisan migrate\nphp artisan db:seed --class=ProductSeeder\n# or call it from DatabaseSeeder.php`}
            />
          </section>

          <section id="parser" style={{ scrollMarginTop: 80, padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">03</div>
            <h2>How the parser works</h2>
            <p>
              Seed-Gen uses a fast, pragmatic parser (regex-based) that scans your pasted PHP for common Eloquent patterns. It is
              intentionally strict enough to avoid hallucinating columns, but flexible enough to handle real-world Models.
            </p>

            <h3>Supported signals</h3>
            <ul style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
              <li>
                <code>namespace ...;</code> and <code>class X extends ...</code>
              </li>
              <li>
                <code>protected $fillable = [...]</code>
              </li>
              <li>
                <code>protected $casts = [...]</code> or Laravel 11+ <code>casts()</code> method
              </li>
              <li>
                <code>protected $dates = [...]</code> (legacy; still supported)
              </li>
              <li>
                Common relations: <code>belongsTo</code>, <code>hasMany</code>, <code>hasOne</code>, <code>belongsToMany</code>,
                <code> morphTo</code>, <code>morphMany</code>, <code>hasManyThrough</code>
              </li>
            </ul>

            <h3>Known limitations</h3>
            <ul style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
              <li>
                If your Model builds <code>$fillable</code> dynamically (config, traits, reflection), Seed-Gen can’t infer it.
              </li>
              <li>
                Complex custom key names / polymorphic conventions may need manual tweaks after generation.
              </li>
              <li>
                The migration is heuristic — always review and adjust constraints, nullable/defaults, and indexes.
              </li>
            </ul>
          </section>

          <section id="faker" style={{ scrollMarginTop: 80, padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">04</div>
            <h2>Faker mapping rules</h2>
            <p>
              The factory generator picks Faker methods using two inputs: <strong>column names</strong> and <strong>cast types</strong>.
              Casts always win when present.
            </p>

            <h3>Examples</h3>
            <CodeBlock
              title="Mapping examples"
              code={`// Column name → Faker\nemail           → fake()->safeEmail()\nphone           → fake()->phoneNumber()\nprice (cast: decimal:2) → fake()->randomFloat(2, 0, 1000)\nis_active (cast: boolean) → fake()->boolean()\ncreated_at      → (skipped by default)\ncategory_id     → Category::factory()`}
            />

            <h3>How to override</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              After generation, it’s totally normal to tweak the factory for business logic. For example, enforce unique values,
              add states, or model-specific constraints.
            </p>
            <CodeBlock
              title="Factory override (state)"
              code={`public function inactive(): static\n{\n    return $this->state(fn () => [\n        'is_active' => false,\n    ]);\n}`}
            />
          </section>

          <section id="relations" style={{ scrollMarginTop: 80, padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">05</div>
            <h2>Relations support</h2>
            <p>
              Seed-Gen detects relation methods and uses them mainly for two things: (1) informational UI, and (2) sensible
              defaults when a field looks like a foreign key (ends with <code>_id</code>).
            </p>

            <h3>belongsTo (foreign keys)</h3>
            <CodeBlock
              title="Factory pattern"
              code={`// in definition()\n'category_id' => Category::factory(),`}
            />

            <h3>belongsToMany (pivot)</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              Pivot seeding is intentionally left as a commented block because the “right” logic is project-specific (how many to
              attach, constraints, extra pivot columns).
            </p>
            <CodeBlock
              title="Seeder pattern"
              code={`Product::all()->each(function ($product) {\n    // $product->tags()->attach(\n    //     Tag::inRandomOrder()->take(rand(1, 3))->pluck('id')\n    // );\n});`}
            />
          </section>

          <section id="privacy" style={{ scrollMarginTop: 80, padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
            <div className="section-eyebrow">06</div>
            <h2>Privacy & security</h2>
            <ul style={{ color: 'var(--text2)', lineHeight: 2, paddingLeft: '1.5rem', fontSize: 14 }}>
              <li>Your Model code stays in your browser (no upload endpoint).</li>
              <li>Generated code is plain text you copy/paste.</li>
              <li>
                Ads (if enabled) are loaded only after consent (configurable via <code>NEXT_PUBLIC_REQUIRE_CONSENT</code>).
              </li>
            </ul>
          </section>

          <section id="troubleshooting" style={{ scrollMarginTop: 80, padding: '3rem 0' }}>
            <div className="section-eyebrow">07</div>
            <h2>Troubleshooting</h2>
            <h3>“No class definition found”</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              Ensure you pasted the whole class including the <code>class ...</code> line.
            </p>

            <h3>No $fillable detected</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              Seed-Gen prioritizes <code>$fillable</code>. If you use <code>$guarded</code> or dynamic fillable, add casts or paste
              an explicit fillable list.
            </p>

            <h3>Foreign keys look wrong in migration</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.9 }}>
              The migration is heuristic. Review the inferred table names, and replace <code>constrained()</code> targets when your
              naming differs (e.g. <code>people</code> instead of <code>persons</code>).
            </p>
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
                <a href="#outputs">Outputs</a>
              </li>
              <li>
                <a href="#parser">Parser</a>
              </li>
              <li>
                <a href="#faker">Faker mapping</a>
              </li>
              <li>
                <a href="#relations">Relations</a>
              </li>
              <li>
                <a href="#privacy">Privacy</a>
              </li>
              <li>
                <a href="#troubleshooting">Troubleshooting</a>
              </li>
            </ul>
          </div>
          <AdSlot label="Sidebar rectangle" note="Placeholder" />
        </div>
      </div>
    </>
  );
}
