import Link from "next/link";
import { SITE_URL } from "../data/seo-metadata";

// Shared top banner for dedicated pages: breadcrumb, the page's single <h1>, and an intro.
export default function PageHero({ title, crumb = title, intro, path, children }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: crumb, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <header className="page-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <div className="page-container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <h1 className="heading-display text-[var(--brand-cream)]">{title}</h1>
        {intro && <p className="text-lead text-pretty mt-4 max-w-[60ch] text-white/95">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
