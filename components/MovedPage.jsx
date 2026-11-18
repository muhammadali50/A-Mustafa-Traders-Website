import Link from "next/link";

// Static hosting has no server redirects, so former URLs forward with a meta refresh
// (React hoists it into <head>) and still offer a plain link.
export default function MovedPage({ to, label }) {
  return (
    <main id="main-content" className="page-hero min-h-[60svh]">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <div className="page-container">
        <h1 className="heading-display text-[var(--brand-cream)]">This page has moved</h1>
        <p className="text-lead mt-4">Continue to <Link href={to} className="font-bold underline underline-offset-4">{label}</Link>.</p>
      </div>
    </main>
  );
}
