const SITE_NAME = "A. Mustafa Traders";
const SITE_URL = "https://www.amustafatraders.com";

export function createPageMetadata({ title, description, path }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_PK",
    },
    twitter: { card: "summary", title, description },
  };
}
