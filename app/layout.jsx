import "./globals.css";
import VisitorTracking from "../components/VisitorTracking";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: "A. Mustafa Traders | Premium Rice, Trusted Quality",
  description: "Delivering carefully selected rice with quality, purity and trust from Nawabshah.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}<VisitorTracking /><GoogleAnalytics gaId="G-W8T0242VZ8" />
  </body></html>;
}



