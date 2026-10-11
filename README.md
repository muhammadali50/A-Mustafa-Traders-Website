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

## Pages and assets

Only Home is implemented. The shared navigation preserves the planned page order; unfinished destinations are disabled until their pages are approved and built. Enable each entry in `components/Navbar.jsx` when its route is ready.

The four Home images are copied unchanged into `public/media/`. Original assets remain in `media/`; unrelated files are not published. The background gradient is CSS only.
