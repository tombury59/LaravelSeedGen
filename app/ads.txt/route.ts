export const runtime = 'nodejs';

export function GET() {
  const lines = (process.env.ADS_TXT_LINES || '').trim();
  const body =
    lines.length > 0
      ? lines + '\n'
      : '# Configure ADS_TXT_LINES in your environment\n# Example:\n# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n';

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
