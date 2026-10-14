import Link from "next/link";
import Navbar from "./Navbar";

export default function SeoPageShell({ title, intro, path, children }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.amustafatraders.com" },
      { "@type": "ListItem", position: 2, name: title, item: `https://www.amustafatraders.com${path}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8f7f3] text-[#27321f]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-6xl px-5 pt-[100px] pb-6 sm:px-8 sm:pt-[calc(7.8svh+84px)] sm:pb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-[#555]">
          <Link href="/" className="underline underline-offset-4 hover:text-[#a12222]">A. Mustafa Traders</Link>
          <span aria-hidden="true" className="px-2">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <header className="mt-6 rounded-2xl bg-[#9e2424] px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="m-0 text-xs font-bold uppercase tracking-[.16em] text-[#f4d8c7]">A. Mustafa Traders · Nawabshah, Pakistan</p>
          <h1 className="mt-3 text-3xl leading-tight font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/95 sm:text-lg">{intro}</p>
          <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-white px-5 py-2 text-sm font-bold text-[#9e2424] transition-colors hover:bg-[#fff2e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Contact us about rice
          </Link>
        </header>
        <div className="py-8 sm:py-12">{children}</div>
        <footer className="border-t border-[#d9d4cc] pt-6">
          <p className="mt-4 text-xs text-[#555]">Serving Nawabshah with carefully selected rice since 1948.</p>
        </footer>
      </div>
    </main>
  );
}
