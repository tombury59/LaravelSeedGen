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
              <p>
                Database seeding is one of those Laravel features that feels simple on the surface but has a lot of depth once you
                dig in.
              </p>

              <h2>What are Seeders and Factories?</h2>
              <ul>
                <li>
                  <strong>Factories</strong> — define how to generate a single model instance using Faker
                </li>
                <li>
                  <strong>Seeders</strong> — define how many instances to create and in what order
                </li>
              </ul>

              <div style={{ margin: '1.25rem 0' }}>
                <AdSlot label="In-article" note="Placeholder" />
              </div>

              <h2>Setting Up a Factory</h2>
              <CodeBlock title="Terminal" code={'php artisan make:factory ProductFactory --model=Product'} />

              <CodeBlock
                title="database/factories/ProductFactory.php"
                code={`<?php\n\nnamespace Database\\Factories;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\nuse App\\Models\\Product;\nuse App\\Models\\Category;\n\nclass ProductFactory extends Factory\n{\n    protected $model = Product::class;\n\n    public function definition(): array\n    {\n        return [\n            'name'        => fake()->words(3, true),\n            'slug'        => fake()->slug(3),\n            'description' => fake()->paragraph(),\n            'price'       => fake()->randomFloat(2, 9.99, 999.99),\n            'stock'       => fake()->numberBetween(0, 500),\n            'is_active'   => fake()->boolean(80),\n            'category_id' => Category::factory(),\n        ];\n    }\n}`}
              />
            </div>
          </article>

          <div className="sidebar" style={{ position: 'sticky', top: 'calc(var(--header-h) + 1rem)' }}>
            <div className="toc">
              <div className="toc-title">In this article</div>
              <ul>
                <li>
                  <a href="#">Seeders & Factories</a>
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
