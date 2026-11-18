# A. Mustafa Traders

Frontend-only business website built with Next.js App Router, React, and Tailwind CSS.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```sh
npm run build
```

The static website is exported to `out/`, ready for static hosting. Next.js Image serves the original local assets without a runtime image optimization service.

## Visitor tracking

Set `NEXT_PUBLIC_VISITOR_TRACKING_API_URL` to the dashboard API URL before building. The value is embedded in the static site at build time. If it is unset, tracking requests are skipped and the site continues normally. See `.env.example` for the variable name.

The API receives `page_view` requests with a browser-generated `visitor_key`, a `page_visit_key`, the page URL, referrer, and UTM fields. It receives `page_duration` updates with the same `page_visit_key` and `duration_seconds`, so the API should update the existing page visit instead of creating another one. Identity submission uses `{ action: "identify", visitor_key, name, email }`; only a JSON response with `success: true` is treated as saved.

The dashboard API must allow browser requests from `https://www.amustafatraders.com` and support JSON `POST` requests, including CORS preflight. The website does not connect to Supabase directly.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home (hero, product carousel, previews of every section) |
| `/products` | Full rice catalogue and distributors |
| `/rice-varieties` | Rice varieties |
| `/history` | History, founders, and milestones |
| `/leadership` | Leadership team |
| `/about` | About us and mission |
| `/contact` | Contact options |

The primary navigation lives in `data/navigation.js` and feeds the header and the sitemap. Every page ends with the shared "Contact Us" footer (`components/SiteFooter.jsx`). `/rice-products` and `/our-story` are former URLs that forward to `/products` and `/history`.

## Images and fonts

Published images live in `public/media/` as WebP + AVIF; original sources remain in `media/`. After adding or replacing a WebP, run:

```sh
node scripts/optimize-images.cjs
```

It writes 320/640/960 px WebP/AVIF variants and `data/image-manifest.json`, which `components/OptimizedImage.jsx` uses to build `srcset`. Brand fonts are Latin-only WOFF2 subsets in `app/fonts/` (see the OFL notes there), defined once in `app/fonts.js`.
