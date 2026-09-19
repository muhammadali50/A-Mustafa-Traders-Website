import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import RiceTypesSection from "../components/RiceTypesSection";
import HistorySection from "../components/HistorySection";
import LeadershipSection from "../components/LeadershipSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main id="main-content" className="relative isolate min-h-svh overflow-clip bg-[#34532b]">
      <Navbar />
      <Hero />
      <ProductsSection />
      <RiceTypesSection />
      <HistorySection />
      <LeadershipSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
