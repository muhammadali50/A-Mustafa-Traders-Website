import "./globals.css";
import VisitorTracking from "../components/VisitorTracking";
import MicrosoftClarity from "../components/MicrosoftClarity";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  metadataBase: new URL("https://www.amustafatraders.com"),
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
  },
  twitter: {
    card: "summary",
    title: "A. Mustafa Traders | Rice Supplier in Nawabshah, Pakistan",
    description: "Explore quality basmati and other rice varieties from A. Mustafa Traders, serving Nawabshah since 1948.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}<VisitorTracking /><MicrosoftClarity /><GoogleAnalytics gaId="G-W8T0242VZ8" />
  </body></html>;
}



