import "./globals.css";
import { displayFont, scriptFont } from "./fonts";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import VisitorTracking from "../components/VisitorTracking";
import MicrosoftClarity from "../components/MicrosoftClarity";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { SITE_URL } from "../data/seo-metadata";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "A. Mustafa Traders | Rice Supplier in Nawabshah, Pakistan",
  description: "Explore A. Mustafa Traders’ rice selection, including 1121 basmati, PK-386, sella, steam, white, and broken rice. Serving Nawabshah with quality and trust since 1948.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "A. Mustafa Traders",
    title: "A. Mustafa Traders | Rice Supplier in Nawabshah, Pakistan",
    description: "Explore quality basmati and other rice varieties from A. Mustafa Traders, serving Nawabshah since 1948.",
    locale: "en_PK",
    images: [{ url: "/media/AMT%20logo.png", width: 1254, height: 1254, alt: "A. Mustafa Traders logo" }],
  },
  twitter: {
    card: "summary",
    title: "A. Mustafa Traders | Rice Supplier in Nawabshah, Pakistan",
    description: "Explore quality basmati and other rice varieties from A. Mustafa Traders, serving Nawabshah since 1948.",
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#9e2424" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${scriptFont.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        {children}
        {/* Every page ends with the shared "Contact Us" footer. */}
        <SiteFooter />
        <VisitorTracking />
        <MicrosoftClarity />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
