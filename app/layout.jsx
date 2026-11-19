import "./globals.css";
import { displayFont, scriptFont, urduFont } from "./fonts";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import VisitorTracking from "../components/VisitorTracking";
import MicrosoftClarity from "../components/MicrosoftClarity";
import GoogleAnalytics from "../components/GoogleAnalytics";
import LanguageProvider, { T } from "../components/LanguageProvider";
import { SITE_URL } from "../data/seo-metadata";
import { languageBootScript } from "../data/language";
import en from "../locales/en.json";

const home = en.meta["/"];

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: home.title,
  description: home.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "A. Mustafa Traders",
    title: home.title,
    description: "Explore quality basmati and other rice varieties from A. Mustafa Traders, serving Nawabshah since 1948.",
    locale: "en_PK",
    images: [{ url: "/media/AMT%20logo.png", width: 1254, height: 1254, alt: "A. Mustafa Traders logo" }],
  },
  twitter: {
    card: "summary",
    title: home.title,
    description: "Explore quality basmati and other rice varieties from A. Mustafa Traders, serving Nawabshah since 1948.",
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#9e2424" };

export default function RootLayout({ children }) {
  return (
    // The boot script may set lang/dir (saved Urdu) before React hydrates.
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${displayFont.variable} ${scriptFont.variable} ${urduFont.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
      </head>
      <body>
        <LanguageProvider urduFontFamily={urduFont.style.fontFamily}>
          <a href="#main-content" className="skip-link"><T k="common.skipToContent" /></a>
          <Navbar />
          {children}
          {/* Every page ends with the shared "Contact Us" footer. */}
          <SiteFooter />
          <VisitorTracking />
        </LanguageProvider>
        <MicrosoftClarity />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
