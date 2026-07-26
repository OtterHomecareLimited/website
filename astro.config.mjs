// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  // Canonical domain — drives <link rel="canonical"> and og:url in BaseLayout,
  // and the generated sitemap. Set to the live domain we'd cut over to.
  site: 'https://www.otterhomecare.co.uk',

  // One trailing-slash policy site-wide (the live Wix site was inconsistent).
  trailingSlash: 'never',

  // The Alongside A5 booklets print "otterhomecare.co.uk/downloads" on the MCA
  // card — a printed URL lives forever, so the bare path must resolve.
  redirects: {
    '/downloads': '/downloads/otter-mental-capacity-act-guide.pdf',
  },

  build: {
    // Emit /contact.html rather than /contact/index.html so URLs have no trailing slash.
    format: 'file',
  },
});
