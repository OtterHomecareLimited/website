// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Canonical domain — drives <link rel="canonical"> and og:url in BaseLayout,
  // and the generated sitemap. Set to the live domain we'd cut over to.
  site: 'https://www.otterhomecare.co.uk',

  // One trailing-slash policy site-wide (the live Wix site was inconsistent).
  trailingSlash: 'never',

  build: {
    // Emit /contact.html rather than /contact/index.html so URLs have no trailing slash.
    format: 'file',
  },
});
