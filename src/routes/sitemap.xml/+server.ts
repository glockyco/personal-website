import { publications, projects, talks, talkPath } from '$lib/data';
import { SITE_URL } from '$lib/seo/site';

const staticRoutes = ['/', '/research/', '/talks/', '/projects/', '/cv/'];

export const prerender = true;

export function GET() {
  const urls = [
    ...staticRoutes,
    ...publications.map((p) => `/research/${p.slug}/`),
    ...talks.flatMap((t) => talkPath(t) ?? []),
    ...projects.map((p) => `/projects/${p.slug}/`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
