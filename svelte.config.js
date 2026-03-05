import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    prerender: {
      handleHttpError: ({ path, message }) => {
        // johann-glock-cv-web.pdf is generated locally by pnpm pdf, not during build — ignore during prerender
        if (path === '/johann-glock-cv-web.pdf') return;
        throw new Error(message);
      },
      handleMissingId: 'fail'
    }
  }
};

export default config;
