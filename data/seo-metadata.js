import en from "../locales/en.json";

export const SITE_NAME = "A. Mustafa Traders";
export const SITE_URL = "https://www.amustafatraders.com";
const OG_IMAGE = { url: "/media/AMT%20logo.png", width: 1254, height: 1254, alt: "A. Mustafa Traders logo" };

// English titles and descriptions come from locales/en.json (meta[path]); Urdu ones are applied
// on the client by LanguageProvider, since the static pages are exported in English.
export function createPageMetadata(path) {
  const { title, description } = en.meta[path];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_PK",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary", title, description },
  };
}
