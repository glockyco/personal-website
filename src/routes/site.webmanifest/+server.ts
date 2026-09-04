import { DEFAULT_DESCRIPTION, SITE_NAME } from '$lib/seo/site';

export const prerender = true;

export function GET() {
  return Response.json(
    {
      name: SITE_NAME,
      short_name: 'J. Glock',
      description: DEFAULT_DESCRIPTION,
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#5B21B6',
      background_color: '#ffffff',
      display: 'standalone'
    },
    {
      headers: { 'Content-Type': 'application/manifest+json' }
    }
  );
}
