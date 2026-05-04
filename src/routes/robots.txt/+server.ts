import { SITE_URL } from '$lib/seo/site';

export const prerender = true;

export function GET() {
  const body = `# allow crawling everything by default
User-agent: *
Disallow:

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
