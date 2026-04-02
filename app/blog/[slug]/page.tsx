import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import CodeBlock from '@/components/CodeBlock';
import { posts } from '@/content/posts';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Blog Post' };
  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return (
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2rem' }}>
        <h1>Post not found</h1>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const canonical = `${baseUrl.replace(/\/$/, '')}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'Laravel Seed-Gen Team' },
    publisher: { '@type': 'Organization', name: 'Laravel Seed-Gen' },
    datePublished: '2026-03-28',
    dateModified: '2026-04-02',
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 2rem' }}>
        <AdSlot label="Top leaderboard" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem', alignItems: 'start', marginTop: '2rem' }}>
          <article>
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb-sep">/</span>
              <a href="/blog">Blog</a>
              <span className="breadcrumb-sep">/</span>
              <span>Database Seeding Guide</span>
            </div>

            <div style={{ margin: '1.5rem 0 2rem' }}>
              <div className="post-tag" style={{ marginBottom: '0.75rem' }}>
                🌱 Database Seeding · {post.read} read
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginBottom: '1rem', letterSpacing: '-0.5px' }}>{post.title}</h1>
              <p style={{ color: 'var(--text2)', fontSize: '1.05rem', maxWidth: 620, lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {post.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                    }}
                  >
                    👤
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>Laravel Seed-Gen Team</span>
                </div>
                <span style={{ color: 'var(--text3)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{post.date}</span>
              </div>
            </div>

            <hr className="divider" />

            <div className="article-body" style={{ padding: '1.5rem 0' }}>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

              <p>
                Laravel database seeding is one of those features that feels easy at first (&quot;create 10 users&quot;) but becomes
                extremely powerful once you start seeding <strong>relationships</strong>, generating realistic data, and keeping
                your seeders <strong>fast</strong> and <strong>deterministic</strong>.
              </p>

              <p>
                This guide is written for Laravel 10/11/12, but the principles apply broadly. You’ll get real patterns you can
                paste into production-grade apps.
              </p>

              <h2 id="toc" style={{ scrollMarginTop: 80 }}>
                Table of contents
              </h2>
              <ol>
                <li>
                  <a href="#concepts">Seeder vs Factory: what does what?</a>
                </li>
                <li>
                  <a href="#workflow">Recommended workflow (Model → Factory → Seeder)</a>
                </li>
                <li>
                  <a href="#relationships">Seeding relationships (belongsTo / hasMany / many-to-many)</a>
                </li>
                <li>
                  <a href="#performance">Performance (10k+ rows without pain)</a>
                </li>
                <li>
                  <a href="#testing">Seeding in tests</a>
                </li>
                <li>
                  <a href="#pitfalls">Common pitfalls</a>
                </li>
              </ol>

              <div style={{ margin: '1.25rem 0' }}>
                <AdSlot label="In-article" note="Placeholder" />
              </div>

              <h2 id="concepts" style={{ scrollMarginTop: 80 }}>
                Seeder vs Factory: what does what?
              </h2>
              <ul>
                <li>
                  <strong>Factories</strong> generate a <em>single model instance</em> (attributes) using Faker.
                </li>
                <li>
                  <strong>Seeders</strong> define <em>how many</em> instances and <em>in which order</em> you create them.
                </li>
              </ul>

              <p>
                Best practice: keep factories focused on attribute generation, and keep seeders focused on orchestration (counts,
                dependencies, pivot attach, etc.).
              </p>

              <h2 id="workflow" style={{ scrollMarginTop: 80 }}>
                Recommended workflow (Model → Factory → Seeder)
              </h2>

              <p>
                Start by creating your model with all scaffolding flags. This gives you the right folders and a clean baseline.
              </p>

              <CodeBlock title="Terminal" code={`php artisan make:model Product -mfs`} />

              <h3>Factory (definition)</h3>
              <CodeBlock
                title="database/factories/ProductFactory.php"
                code={`<?php\n\nnamespace Database\\Factories;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\nuse App\\Models\\Product;\nuse App\\Models\\Category;\n\nclass ProductFactory extends Factory\n{\n    protected $model = Product::class;\n\n    public function definition(): array\n    {\n        return [\n            'name'        => fake()->words(3, true),\n            'slug'        => fake()->slug(3),\n            'description' => fake()->paragraph(),\n            'price'       => fake()->randomFloat(2, 9.99, 999.99),\n            'stock'       => fake()->numberBetween(0, 500),\n            'is_active'   => fake()->boolean(),\n            'category_id' => Category::factory(),\n        ];\n    }\n\n    public function inactive(): static\n    {\n        return $this->state(fn () => ['is_active' => false]);\n    }\n}`}
              />

              <h3>Seeder (orchestration)</h3>
              <CodeBlock
                title="database/seeders/ProductSeeder.php"
                code={`<?php\n\nnamespace Database\\Seeders;\n\nuse Illuminate\\Database\\Seeder;\nuse App\\Models\\Product;\n\nclass ProductSeeder extends Seeder\n{\n    public function run(): void\n    {\n        // Create products\n        Product::factory()->count(200)->create();\n\n        // Create inactive ones\n        Product::factory()->inactive()->count(20)->create();\n    }\n}`}
              />

              <h2 id="relationships" style={{ scrollMarginTop: 80 }}>
                Seeding relationships
              </h2>

              <p>
                Relationships are where most seeders become messy. The trick is to decide what belongs in the factory (easy,
                repeatable, per-record behavior) and what belongs in the seeder (project-specific orchestration).
              </p>

              <h3>belongsTo (foreign key)</h3>
              <p>
                The simplest: the factory sets <code>category_id</code> to a related factory.
              </p>
              <CodeBlock title="Factory" code={`'category_id' => Category::factory(),`} />

              <h3>hasMany</h3>
              <p>
                For <code>Product</code> → many <code>Review</code>, use <code>has()</code> from the parent factory.
              </p>
              <CodeBlock
                title="Seeder"
                code={`Product::factory()\n    ->count(50)\n    ->has(Review::factory()->count(fake()->numberBetween(1, 8)))\n    ->create();`}
              />

              <h3>many-to-many (pivot)</h3>
              <p>
                For pivots, most teams prefer attaching after creation because pivot logic can be unique (extra pivot columns,
                rules, uniqueness).
              </p>
              <CodeBlock
                title="Seeder (pivot attach)"
                code={`$tags = Tag::factory()->count(30)->create();\n\nProduct::factory()->count(120)->create()->each(function ($product) use ($tags) {\n    $product->tags()->attach(\n        $tags->random(rand(1, 4))->pluck('id')->all()\n    );\n});`}
              />

              <div style={{ margin: '1.25rem 0' }}>
                <AdSlot label="In-article" note="Placeholder" />
              </div>

              <h2 id="performance" style={{ scrollMarginTop: 80 }}>
                Performance (10k+ rows without pain)
              </h2>

              <p>
                For large seeders, the biggest performance killers are: too many queries, too many model events, and excessive
                uniqueness constraints.
              </p>

              <h3>Use fewer queries</h3>
              <ul>
                <li>Prefer creating related data via factories (has/for) instead of manual loops.</li>
                <li>For pivot attach, attach IDs in bulk per model (one attach call instead of many).</li>
              </ul>

              <h3>Be careful with Faker unique()</h3>
              <p>
                <code>fake()-&gt;unique()</code> can slow down a lot and may throw when the pool is exhausted. Use it only when
                needed (emails, slugs), and reset it when seeding huge volumes.
              </p>
              <CodeBlock
                title="Unique (safe pattern)"
                code={`'email' => fake()->unique()->safeEmail(),\n// for massive runs: fake()->unique(false, 100000) or reset unique()`}
              />

              <h3>Disable events if you have heavy observers</h3>
              <p>
                If your app has expensive model observers, consider disabling them for seeding.
              </p>
              <CodeBlock
                title="Seeder"
                code={`use Illuminate\\Support\\Facades\\Event;\n\nEvent::fake();\n// run your seeding\nEvent::flushFake();`}
              />

              <h2 id="testing" style={{ scrollMarginTop: 80 }}>
                Seeding in tests
              </h2>
              <p>
                In tests, the best practice is: keep tests focused, seed only what you need, and use factories for the rest.
              </p>
              <CodeBlock
                title="PHPUnit (example)"
                code={`use Illuminate\\Foundation\\Testing\\RefreshDatabase;\n\npublic function test_checkout_flow(): void\n{\n    $this->seed(ProductSeeder::class);\n\n    $user = User::factory()->create();\n    $product = Product::query()->inRandomOrder()->first();\n\n    $this->actingAs($user)\n        ->post('/checkout', ['product_id' => $product->id])\n        ->assertOk();\n}`}
              />

              <h2 id="pitfalls" style={{ scrollMarginTop: 80 }}>
                Common pitfalls
              </h2>
              <ul>
                <li>
                  <strong>Seeding order</strong>: seed lookup tables first (roles, categories), then dependent tables.
                </li>
                <li>
                  <strong>Foreign keys</strong>: if you constrain FKs, don’t create children before parents.
                </li>
                <li>
                  <strong>Memory</strong>: avoid <code>-&gt;get()</code> on massive tables; use chunking.
                </li>
              </ul>

              <p>
                If you want to generate seeders/factories from your real Models instantly, try the Seed-Gen tool on the homepage
                — it’s fully client-side.
              </p>
            </div>
          </article>

          <div className="sidebar" style={{ position: 'sticky', top: 'calc(var(--header-h) + 1rem)' }}>
            <div className="toc">
              <div className="toc-title">In this article</div>
              <ul>
                <li>
                  <a href="#concepts">Seeder vs Factory</a>
                </li>
                <li>
                  <a href="#workflow">Workflow</a>
                </li>
                <li>
                  <a href="#relationships">Relationships</a>
                </li>
                <li>
                  <a href="#performance">Performance</a>
                </li>
                <li>
                  <a href="#testing">Testing</a>
                </li>
                <li>
                  <a href="#pitfalls">Pitfalls</a>
                </li>
              </ul>
            </div>
            <AdSlot label="Sidebar rectangle" note="Placeholder" />
          </div>
        </div>
      </div>

      <style>{`
        .article-body h2 { font-family: var(--font-serif); font-size: 1.7rem; letter-spacing: -0.3px; margin: 2.5rem 0 0.75rem; }
        .article-body h3 { font-size: 1rem; font-weight: 600; margin: 2rem 0 0.5rem; color: var(--text); }
        .article-body p { font-size: 15px; line-height: 1.8; color: var(--text2); margin-bottom: 1rem; }
        .article-body ul, .article-body ol { color: var(--text2); line-height: 2; padding-left: 1.5rem; font-size: 14.5px; margin-bottom: 1rem; }
        .article-body li { margin-bottom: 4px; }
        .article-body strong { color: var(--text); }
      `}</style>
    </>
  );
}
