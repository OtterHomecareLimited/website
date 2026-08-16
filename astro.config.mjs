// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // /thank-you is a post-submission confirmation page — it is noindex'd, so it
  // must not be advertised in the sitemap either (the two signals would clash).
  integrations: [
    sitemap({
      filter: (page) => !page.replace(/\/$/, '').endsWith('/thank-you'),
    }),
  ],
  // Canonical domain — drives <link rel="canonical"> and og:url in BaseLayout,
  // and the generated sitemap. Set to the live domain we'd cut over to.
  site: 'https://www.otterhomecare.co.uk',

  // One trailing-slash policy site-wide (the live Wix site was inconsistent).
  trailingSlash: 'never',

  // The Alongside A5 booklets print "otterhomecare.co.uk/downloads" on the MCA
  // card — a printed URL lives forever, so the bare path must resolve.
  redirects: {
    '/downloads': '/downloads/otter-mental-capacity-act-guide.pdf',
    // The link the office emails to families instead of the old PDF guide —
    // short enough to dictate over the phone. Keep it working forever.
    '/app': '/family/care-app',
  },

  build: {
    // Emit /contact.html rather than /contact/index.html so URLs have no trailing slash.
    format: 'file',
  },
});
