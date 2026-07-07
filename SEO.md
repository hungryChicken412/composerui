SEO & LLM Guide

What I changed:

- Global `metadata` in `app/layout.tsx` (OpenGraph, Twitter, icons, canonical, robots)
- JSON-LD for `WebSite` and `Organization` (SearchAction) in `app/layout.tsx`
- Added `public/og-image.svg` and `public/favicon.svg`
- Added `scripts/generate-sitemap.js` and `npm run generate:sitemap` to produce `public/sitemap.xml`
- Added `public/robots.txt` (already present)
- Rendered `Navbar`/`Footer` in `app/layout.tsx` for consistent navigation

Recommended next steps (to make SEO "perfect"):

1. Page-level metadata

- For each page route, export a `metadata` object (Next.js app router) with `title`, `description`, `openGraph`, `twitter`, and `alternates.canonical`.
- Example in a page file:

    export const metadata = {
    title: 'Page title — ComposerUI',
    description: 'Page description here',
    openGraph: { images: ['/og-image.svg'] }
    }

2. Canonical URLs

- Set canonical per page to the full absolute URL, e.g. `${process.env.NEXT_PUBLIC_SITE_URL}/path`.

3. Social images

- Add page-specific `og:image` and `twitter:image` assets under `/public` or generate them dynamically.
- Recommended size: 1200x630 (PNG/JPEG). SVG is okay but raster is more compatible.

4. Sitemap & robots

- Run `npm run generate:sitemap` to regenerate `public/sitemap.xml` after adding routes.
- Keep `public/robots.txt` up to date.

5. Structured data

- Add `BreadcrumbList` JSON-LD on pages with deep hierarchy.
- Add `Article`/`SoftwareSourceCode` schema on blog or code pages if present.

6. Validation & CI

- Use Google Rich Results Test and the Structured Data Testing Tool.
- Add Lighthouse CI job to check SEO scores on PRs.

7. Testing locally

- Run `npm run generate:sitemap` then start the dev server:

```bash
npm run generate:sitemap
npm run dev
```

- Inspect source (View Page Source) to verify meta tags and JSON-LD are server-rendered.

If you want, I can now:

- Add example page-level `metadata` to one representative page.
- Add a Lighthouse CI workflow.
- Generate raster `og-image.png` assets.
  Tell me which of these I should do next.

How to run the CI and local checks:

1. Locally generate sitemap and run LHCI quick check:

```bash
npm run generate:sitemap
npm run build
npm run start &
npx wait-on http://localhost:3000
npm run check:seo
```

2. On GitHub Actions the `lighthouse-ci.yml` workflow runs automatically on pushes/PRs to `main` and uploads results to temporary-public-storage. Use the LHCI upload link from the action logs to inspect results.

3. Structured data validation: paste the rendered page URL into the Google Rich Results Test and the Schema Markup Validator.

If you want I can also:

- Add an example `BreadcrumbList` JSON-LD to deep pages.
- Add a GitHub Action that fails PRs if Lighthouse SEO score < 90.
