import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import RiceTypesSection from "../components/RiceTypesSection";
import HistorySection from "../components/HistorySection";

export default function Home() {
  return (
    <main id="main-content" className="relative isolate min-h-svh overflow-hidden bg-[#34532b]">
      <Navbar />
      <Hero />
      <ProductsSection />
      <RiceTypesSection />
      <HistorySection />
    </main>
  );
}
