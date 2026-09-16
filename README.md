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

The static website is exported to `out/`, ready for static hosting. No backend or environment variables are required. Next.js Image serves the original local assets without a runtime image optimization service.

## Pages and assets

Only Home is implemented. The shared navigation preserves the planned page order; unfinished destinations are disabled until their pages are approved and built. Enable each entry in `components/Navbar.jsx` when its route is ready.

The four Home images are copied unchanged into `public/media/`. Original assets remain in `media/`; unrelated files are not published. The background gradient is CSS only.
