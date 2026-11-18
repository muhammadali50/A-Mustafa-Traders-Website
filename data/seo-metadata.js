export const SITE_NAME = "A. Mustafa Traders";
export const SITE_URL = "https://www.amustafatraders.com";
const OG_IMAGE = { url: "/media/AMT%20logo.png", width: 1254, height: 1254, alt: "A. Mustafa Traders logo" };

export function createPageMetadata({ title, description, path }) {
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
