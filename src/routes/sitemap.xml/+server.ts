import { publications, projects } from '$lib/data';

const BASE = 'https://glockyco.com';

const staticRoutes = ['/', '/research/', '/projects/', '/cv/'];

export const prerender = true;

export function GET() {
  const urls = [
    ...staticRoutes,
    ...publications.map((p) => `/research/${p.slug}/`),
    ...projects.map((p) => `/projects/${p.slug}/`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${BASE}${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
