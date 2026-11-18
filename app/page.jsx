import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import RiceTypesSection from "../components/RiceTypesSection";
import HistorySection from "../components/HistorySection";
import LeadershipSection from "../components/LeadershipSection";
import AboutSection from "../components/AboutSection";

const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A. Mustafa Traders",
  url: "https://www.amustafatraders.com",
  logo: "https://www.amustafatraders.com/media/AMT%20logo.png",
  description: "A rice trading business serving Nawabshah with carefully selected basmati and other rice varieties since 1948.",
  foundingDate: "1948",
  email: "amustafatraders786@gmail.com",
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+923337023270", contactType: "sales" },
    { "@type": "ContactPoint", telephone: "+923124462201", contactType: "sales" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nawabshah",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  areaServed: "Nawabshah, Sindh, Pakistan",
  knowsAbout: [
    "1121 Steam Basmati Rice",
    "1121 Sella Basmati Rice",
    "PK 386 Full Grain Rice",
    "Basmati White Rice",
    "Basmati Broken Rice",
    "Rice trading and distribution",
  ],
  sameAs: [
    "https://www.instagram.com/amustafatraders786/",
    "https://www.facebook.com/profile.php?id=61594646041435",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessStructuredData).replace(/</g, "\\u003c") }}
      />
      <main id="main-content" className="relative isolate overflow-clip">
        <Hero />
        <ProductsSection />
        <RiceTypesSection />
        <HistorySection />
        <LeadershipSection />
        <AboutSection />
      </main>
    </>
  );
}
