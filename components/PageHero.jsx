"use client";

import Link from "next/link";
import { useI18n } from "./LanguageProvider";
import { SITE_URL } from "../data/seo-metadata";
import en from "../locales/en.json";

// Shared top banner for dedicated pages: breadcrumb, the page's single <h1>, and an intro.
// `page` selects pages.<page>.{title, crumb?, intro} in the locale files.
export default function PageHero({ page, path, children }) {
  const { t } = useI18n();
  const key = `pages.${page}`;
  const title = t(`${key}.title`);
  const crumb = en.pages[page].crumb ? t(`${key}.crumb`) : title;
  // Structured data stays in English, matching the exported HTML.
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: en.pages[page].crumb ?? en.pages[page].title, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <header className="page-hero">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <div className="page-container">
        <nav aria-label={t("common.breadcrumb")}>
          <ol className="breadcrumb">
            <li><Link href="/">{t("common.home")}</Link></li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
        <h1 className="heading-display text-[var(--brand-cream)]">{title}</h1>
        <p className="text-lead text-pretty mt-4 max-w-[60ch] text-white/95">{t(`${key}.intro`)}</p>
        {children}
      </div>
    </header>
  );
}
