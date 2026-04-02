export type RelationType =
  | 'belongsTo'
  | 'hasMany'
  | 'hasOne'
  | 'belongsToMany'
  | 'morphTo'
  | 'morphMany'
  | 'hasManyThrough';

export type ParsedRelation = {
  method: string;
  type: RelationType;
  relatedModel: string | null;
};

export type ParsedModel = {
  namespace: string;
  className: string;
  fillable: string[];
  casts: Record<string, string>;
  dates: string[];
  relations: ParsedRelation[];
  table: string;
  uses: string[];
  errors: string[];
};

type FakerRule = {
  patterns: string[];
  faker: string;
};

const FAKER_MAP: FakerRule[] = [
  // Identity
  { patterns: ['first_name', 'firstname', 'prenom'], faker: 'fake()->firstName()' },
  { patterns: ['last_name', 'lastname', 'nom_famille', 'surname'], faker: 'fake()->lastName()' },
  { patterns: ['full_name', 'fullname', 'name', 'nom'], faker: 'fake()->name()' },
  { patterns: ['username', 'user_name', 'login', 'pseudo'], faker: 'fake()->userName()' },
  { patterns: ['title', 'titre'], faker: 'fake()->title()' },
  // Contact
  { patterns: ['email', 'mail', 'courriel', 'email_address'], faker: 'fake()->safeEmail()' },
  { patterns: ['phone', 'phone_number', 'telephone', 'tel', 'mobile', 'cellphone'], faker: 'fake()->phoneNumber()' },
  // Address
  { patterns: ['address', 'adresse', 'street', 'rue'], faker: 'fake()->streetAddress()' },
  { patterns: ['city', 'ville'], faker: 'fake()->city()' },
  { patterns: ['country', 'pays'], faker: 'fake()->country()' },
  { patterns: ['country_code'], faker: 'fake()->countryCode()' },
  { patterns: ['zip', 'zipcode', 'zip_code', 'postal_code', 'postcode'], faker: 'fake()->postcode()' },
  { patterns: ['state', 'province', 'region'], faker: 'fake()->state()' },
  { patterns: ['lat', 'latitude'], faker: 'fake()->latitude()' },
  { patterns: ['lng', 'lon', 'longitude'], faker: 'fake()->longitude()' },
  // Content
  { patterns: ['bio', 'description', 'about', 'summary', 'resume', 'excerpt'], faker: 'fake()->paragraph()' },
  { patterns: ['body', 'content', 'contenu', 'text', 'texte'], faker: 'fake()->paragraphs(3, true)' },
  { patterns: ['slug'], faker: 'fake()->slug()' },
  { patterns: ['url', 'website', 'site', 'homepage', 'link'], faker: 'fake()->url()' },
  { patterns: ['domain'], faker: 'fake()->domainName()' },
  { patterns: ['ip', 'ip_address', 'ipv4'], faker: 'fake()->ipv4()' },
  { patterns: ['uuid', 'guid'], faker: 'fake()->uuid()' },
  { patterns: ['color', 'colour', 'hex_color'], faker: 'fake()->hexColor()' },
  // Dates
  { patterns: ['birthday', 'birth_date', 'born_at', 'date_of_birth', 'dob'], faker: 'fake()->date()' },
  { patterns: ['published_at', 'release_date', 'start_date'], faker: "fake()->dateTimeBetween('-2 years', 'now')" },
  { patterns: ['expired_at', 'expires_at', 'end_date'], faker: "fake()->dateTimeBetween('now', '+2 years')" },
  // Numeric
  { patterns: ['age'], faker: 'fake()->numberBetween(18, 80)' },
  { patterns: ['price', 'amount', 'cost', 'total', 'subtotal'], faker: 'fake()->randomFloat(2, 5, 999)' },
  { patterns: ['quantity', 'qty', 'stock'], faker: 'fake()->numberBetween(1, 100)' },
  { patterns: ['rating', 'score', 'rank'], faker: 'fake()->numberBetween(1, 5)' },
  { patterns: ['weight', 'poids'], faker: 'fake()->randomFloat(1, 40, 150)' },
  { patterns: ['height', 'taille'], faker: 'fake()->numberBetween(140, 210)' },
  { patterns: ['views', 'view_count', 'visits'], faker: 'fake()->numberBetween(0, 100000)' },
  { patterns: ['likes', 'love_count', 'vote'], faker: 'fake()->numberBetween(0, 10000)' },
  // Media
  { patterns: ['avatar', 'photo', 'image', 'picture', 'thumbnail', 'cover'], faker: 'fake()->imageUrl(200, 200)' },
  { patterns: ['filename', 'file_name', 'file'], faker: 'fake()->fileName()' },
  // Text short
  { patterns: ['label', 'tag', 'badge', 'category'], faker: 'fake()->word()' },
  { patterns: ['note', 'comment', 'remark', 'message'], faker: 'fake()->sentence()' },
  { patterns: ['token', 'api_key', 'secret', 'key'], faker: 'fake()->sha256()' },
  // Status
  { patterns: ['status'], faker: "fake()->randomElement(['active', 'inactive', 'pending'])" },
  { patterns: ['role', 'type', 'kind'], faker: "fake()->randomElement(['admin', 'user', 'editor'])" },
  { patterns: ['locale', 'lang', 'language'], faker: 'fake()->locale()' },
  { patterns: ['currency'], faker: 'fake()->currencyCode()' },
  { patterns: ['iban'], faker: 'fake()->iban()' },
  { patterns: ['company', 'entreprise', 'organization', 'organisation'], faker: 'fake()->company()' },
  { patterns: ['job_title', 'position', 'poste'], faker: 'fake()->jobTitle()' },
  { patterns: ['department', 'dept'], faker: 'fake()->word()' },
];

const CAST_FAKER: Record<string, string> = {
  boolean: 'fake()->boolean()',
  bool: 'fake()->boolean()',
  integer: 'fake()->numberBetween(1, 1000)',
  int: 'fake()->numberBetween(1, 1000)',
  float: 'fake()->randomFloat(2, 0, 1000)',
  double: 'fake()->randomFloat(2, 0, 1000)',
  decimal: 'fake()->randomFloat(2, 0, 1000)',
  string: 'fake()->sentence()',
  array: '[]',
  json: '[]',
  datetime: 'fake()->dateTime()',
  date: 'fake()->date()',
  timestamp: 'fake()->unixTime()',
};

export function toPascalCase(str: string) {
  return str
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function getFaker(col: string, casts: Record<string, string> = {}) {
  const c = col.toLowerCase();
  // FK detection
  if (c.endsWith('_id') || c === 'id') {
    const model = toPascalCase(c.replace(/_id$/, ''));
    return model !== '' ? `${model}::factory()` : 'fake()->randomNumber()';
  }
  // Cast override
  if (casts[col]) {
    const castType = casts[col].toLowerCase().split(':')[0];
    if (CAST_FAKER[castType]) return CAST_FAKER[castType];
  }
  // Name matching
  for (const rule of FAKER_MAP) {
    if (rule.patterns.some((p) => c === p || c.includes(p))) {
      return rule.faker;
    }
  }
  // Suffix heuristics
  if (c.endsWith('_at') || c.endsWith('_date')) return 'fake()->dateTime()';
  if (c.endsWith('_count') || c.endsWith('_num') || c.endsWith('_number')) return 'fake()->numberBetween(1, 100)';
  if (c.endsWith('_url') || c.endsWith('_link')) return 'fake()->url()';
  if (c.endsWith('_email')) return 'fake()->safeEmail()';
  if (c.endsWith('_phone')) return 'fake()->phoneNumber()';
  if (c.endsWith('_code')) return 'fake()->word()';
  if (c.endsWith('_name')) return 'fake()->name()';
  if (c.endsWith('_title')) return 'fake()->sentence(3)';
  if (c.startsWith('is_') || c.startsWith('has_') || c.startsWith('can_')) return 'fake()->boolean()';
  // Default
  return 'fake()->word()';
}

export function parseModel(code: string): ParsedModel {
  const result: ParsedModel = {
    namespace: '',
    className: '',
    fillable: [],
    casts: {},
    dates: [],
    relations: [],
    table: '',
    uses: [],
    errors: [],
  };

  const nsMatch = code.match(/namespace\s+([\w\\]+)\s*;/);
  if (nsMatch) result.namespace = nsMatch[1];

  const classMatch = code.match(/class\s+(\w+)\s+extends\s+\w+/);
  if (classMatch) result.className = classMatch[1];
  else {
    const classOnly = code.match(/class\s+(\w+)/);
    if (classOnly) result.className = classOnly[1];
    else result.errors.push('No class definition found');
  }

  const tableMatch = code.match(/protected\s+\$table\s*=\s*['"](\w+)['"]/);
  if (tableMatch) result.table = tableMatch[1];

  const fillableMatch = code.match(/protected\s+\$fillable\s*=\s*\[([\s\S]*?)\]/);
  if (fillableMatch) {
    result.fillable =
      fillableMatch[1]
        .match(/['"](\w+)['"]/g)
        ?.map((s) => s.replace(/['"]/g, '')) || [];
  }

  if (result.fillable.length === 0) {
    const guardedMatch = code.match(/protected\s+\$guarded\s*=\s*\[([^\]]*)\]/);
    if (guardedMatch) {
      const guardedContent = guardedMatch[1].trim();
      if (!(guardedContent === '' || guardedContent === "'*'" || guardedContent === '"*"')) {
        result.errors.push('$guarded detected — fillable inferred from $casts');
      }
    }
  }

  // $casts array form
  const castsMatch = code.match(/protected\s+\$casts\s*=\s*\[([\s\S]*?)\]/);
  if (castsMatch) {
    const castPairs = castsMatch[1].matchAll(/['"](\w+)['"]\s*=>\s*['"]([^'"]+)['"]/g);
    for (const m of castPairs) result.casts[m[1]] = m[2];
  }

  // Laravel 11 casts() method
  const castsMethodMatch = code.match(/protected\s+function\s+casts\(\)\s*(?::\s*array\s*)?\{([\s\S]*?)\}/);
  if (castsMethodMatch) {
    const castPairs = castsMethodMatch[1].matchAll(/['"](\w+)['"]\s*=>\s*['"]([^'"]+)['"]/g);
    for (const m of castPairs) result.casts[m[1]] = m[2];
  }

  const datesMatch = code.match(/protected\s+\$dates\s*=\s*\[([\s\S]*?)\]/);
  if (datesMatch) {
    result.dates =
      datesMatch[1]
        .match(/['"](\w+)['"]/g)
        ?.map((s) => s.replace(/['"]/g, '')) || [];
  }

  const relPatterns: Array<{ type: RelationType; regex: RegExp }> = [
    {
      type: 'belongsTo',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->belongsTo\(\s*(\w+)(?:::class)?\s*/g,
    },
    {
      type: 'hasMany',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->hasMany\(\s*(\w+)(?:::class)?\s*/g,
    },
    {
      type: 'hasOne',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->hasOne\(\s*(\w+)(?:::class)?\s*/g,
    },
    {
      type: 'belongsToMany',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->belongsToMany\(\s*(\w+)(?:::class)?\s*/g,
    },
    {
      type: 'morphTo',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->morphTo\(/g,
    },
    {
      type: 'morphMany',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->morphMany\(\s*(\w+)(?:::class)?\s*/g,
    },
    {
      type: 'hasManyThrough',
      regex: /function\s+(\w+)\s*\([^)]*\)[^{]*\{[^}]*return\s+\$this->hasManyThrough\(\s*(\w+)(?:::class)?\s*/g,
    },
  ];

  for (const { type, regex } of relPatterns) {
    let match: RegExpExecArray | null;
    const rx = new RegExp(regex.source, 'gs');
    while ((match = rx.exec(code)) !== null) {
      result.relations.push({
        method: match[1],
        type,
        relatedModel: (match[2] ?? null) as string | null,
      });
    }
  }

  if (result.fillable.length === 0 && Object.keys(result.casts).length > 0) {
    result.fillable = Object.keys(result.casts).filter(
      (k) => !['id', 'created_at', 'updated_at', 'deleted_at'].includes(k),
    );
  }

  return result;
}

export function hl(code: string) {
  // Escape HTML first
  let s = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const spans: string[] = [];
  function protect(html: string) {
    const tok = `\x01S${spans.length}E\x01`;
    spans.push(html);
    return tok;
  }

  // comments → strings → keywords → numbers → fns → vars
  s = s.replace(/(\/\/[^\n]*)/g, (m) => protect(`<span class="cm">${m}</span>`));
  s = s.replace(/'([^'\\]|\\.)*'/g, (m) => protect(`<span class="str">${m}</span>`));
  s = s.replace(
    /\b(namespace|use|class|extends|public|protected|private|function|return|new|static|abstract|readonly|array|string|int|bool|float|null|void)\b/g,
    (m) => protect(`<span class="kw">${m}</span>`),
  );
  s = s.replace(/\b(\d+)\b/g, (m) => protect(`<span class="num">${m}</span>`));
  s = s.replace(/\b(fake|DB|Schema|Seeder|Factory|Builder)\b/g, (m) => protect(`<span class="fn">${m}</span>`));
  s = s.replace(/\$\w+/g, (m) => protect(`<span class="var">${m}</span>`));

  return s.replace(/\x01S(\d+)E\x01/g, (_, i: string) => spans[Number(i)]);
}

export function generateSeeder(
  parsed: ParsedModel,
  version: '9' | '10' | '11' | '12',
  count: number,
  withRelations: boolean,
): string {
  const cls = parsed.className;
  const seederClass = `${cls}Seeder`;
  const ns = parsed.namespace || 'App\\Models';
  const useModel = `use ${ns}\\${cls};`;

  const hasBelongsTo = parsed.relations.filter((r) => r.type === 'belongsTo');
  const hasBelongsToMany = parsed.relations.filter((r) => r.type === 'belongsToMany');

  const useLines: string[] = [useModel, 'use Illuminate\\Database\\Seeder;'];
  if (hasBelongsTo.length && withRelations) {
    hasBelongsTo.forEach((r) => {
      if (r.relatedModel) useLines.push(`// use ${ns}\\${r.relatedModel}; // ensure seeded first`);
    });
  }

  const header = `<?php\n\nnamespace Database\\Seeders;\n\n${useLines.join('\n')}\n\nclass ${seederClass} extends Seeder\n{\n    public function run(): void\n    {`;

  let body = `\n        ${cls}::factory()->count(${count})->create();`;

  if (withRelations && hasBelongsToMany.length) {
    hasBelongsToMany.forEach((r) => {
      body += `\n\n        // Attach ${r.method} (many-to-many)\n        ${cls}::all()->each(function ($record) {\n            // $record->${r.method}()->attach(\n            //     ${r.relatedModel ? r.relatedModel : 'Related'}::inRandomOrder()->take(rand(1, 3))->pluck('id')\n            // );\n        });`;
    });
  }

  const footer = `\n    }\n}\n`;

  return header + body + footer;
}

export function generateFactory(
  parsed: ParsedModel,
  version: '9' | '10' | '11' | '12',
  withTimestamps: boolean,
): string {
  const cls = parsed.className;
  const ns = parsed.namespace || 'App\\Models';
  const factoryClass = `${cls}Factory`;

  const allFields = [...new Set([...parsed.fillable, ...Object.keys(parsed.casts), ...parsed.dates])];
  const skipped = ['id', 'created_at', 'updated_at', 'deleted_at', 'remember_token'];
  const fields = allFields.filter((f) => !skipped.includes(f));

  const defLines: string[] = fields.map((f) => `            '${f}' => ${getFaker(f, parsed.casts)},`);
  if (withTimestamps && !allFields.includes('created_at')) {
    defLines.push("            // 'created_at' => fake()->dateTimeBetween('-1 year', 'now'),");
  }

  const hasBelongsTo = parsed.relations.filter((r) => r.type === 'belongsTo' && r.relatedModel);

  const v11import = version === '11' || version === '12'
    ? 'use Illuminate\\Database\\Eloquent\\Factories\\Factory;\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;'
    : 'use Illuminate\\Database\\Eloquent\\Factories\\Factory;';

  let states = '';
  if (hasBelongsTo.length) {
    hasBelongsTo.forEach((r) => {
      if (!r.relatedModel) return;
      const snake = r.method.replace(/([A-Z])/g, '_$1').toLowerCase();
      states += `\n    /**\n     * Indicate the ${r.relatedModel} this ${cls} belongs to.\n     */\n    public function for${r.relatedModel}(${r.relatedModel} $model): static\n    {\n        return $this->state(fn (array $attributes) => [\n            '${snake}_id' => $model->id,\n        ]);\n    }\n`;
    });
  }

  return `<?php\n\nnamespace Database\\Factories;\n\n${v11import}\nuse ${ns}\\${cls};\n\nclass ${factoryClass} extends Factory\n{\n    protected $model = ${cls}::class;\n\n    public function definition(): array\n    {\n        return [\n${defLines.join('\n')}\n        ];\n    }\n${states}}\n`;
}

export function generateMigration(parsed: ParsedModel): string {
  const cls = parsed.className;
  const table =
    parsed.table ||
    cls
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '') + 's';

  const allFields = [...new Set([...parsed.fillable, ...Object.keys(parsed.casts)])];
  const skipped = ['id', 'created_at', 'updated_at', 'deleted_at', 'remember_token'];
  const fields = allFields.filter((f) => !skipped.includes(f));

  function getColumnType(col: string, casts: Record<string, string>) {
    const cast = (casts[col] || '').toLowerCase().split(':')[0];
    if (cast === 'boolean' || cast === 'bool') return 'boolean';
    if (cast === 'integer' || cast === 'int') return 'integer';
    if (cast === 'float' || cast === 'double' || cast === 'decimal') return 'decimal';
    if (cast === 'datetime') return 'timestamp';
    if (cast === 'date') return 'date';
    if (cast === 'array' || cast === 'json') return 'json';
    const c = col.toLowerCase();
    if (c.endsWith('_id')) return 'foreignId';
    if (c.startsWith('is_') || c.startsWith('has_') || c.startsWith('can_')) return 'boolean';
    if (c.endsWith('_at') || c.endsWith('_date')) return 'timestamp';
    if (c === 'email' || c.endsWith('_email')) return 'string';
    if (['bio', 'description', 'body', 'content'].includes(c)) return 'text';
    if (['price', 'amount', 'cost', 'total'].includes(c)) return 'decimal';
    if (['age', 'quantity', 'views', 'likes'].includes(c)) return 'integer';
    if (['url', 'website', 'avatar', 'photo'].includes(c)) return 'string';
    return 'string';
  }

  const cols = fields.map((f) => {
    const type = getColumnType(f, parsed.casts);
    if (type === 'foreignId') {
      const ref = toPascalCase(f.replace(/_id$/, ''));
      const refTable = ref.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '') + 's';
      return `            $table->foreignId('${f}')->constrained('${refTable}')->cascadeOnDelete();`;
    }
    if (type === 'decimal') return `            $table->decimal('${f}', 10, 2)->default(0);`;
    if (type === 'boolean') return `            $table->boolean('${f}')->default(false);`;
    if (type === 'timestamp') return `            $table->timestamp('${f}')->nullable();`;
    if (type === 'date') return `            $table->date('${f}')->nullable();`;
    if (type === 'integer') return `            $table->integer('${f}')->default(0);`;
    if (type === 'json') return `            $table->json('${f}')->nullable();`;
    if (type === 'text') return `            $table->text('${f}')->nullable();`;
    return `            $table->string('${f}')->nullable();`;
  });

  const date = new Date();
  const ts = `${date.getFullYear()}_${String(date.getMonth() + 1).padStart(2, '0')}_${String(date.getDate()).padStart(2, '0')}_${String(
    date.getHours(),
  ).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;

  return `<?php\n\nuse Illuminate\\Database\\Migrations\\Migration;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Support\\Facades\\Schema;\n\nreturn new class extends Migration\n{\n    public function up(): void\n    {\n        Schema::create('${table}', function (Blueprint $table) {\n            $table->id();\n${cols.join('\n')}\n            $table->timestamps();\n        });\n    }\n\n    public function down(): void\n    {\n        Schema::dropIfExists('${table}');\n    }\n};\n// Filename: ${ts}_create_${table}_table.php\n`;
}
