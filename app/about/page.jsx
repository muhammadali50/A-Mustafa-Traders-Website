import PageHero from "../../components/PageHero";
import AboutSection from "../../components/AboutSection";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata({
  title: "About Us | A. Mustafa Traders, Nawabshah",
  description: "A. Mustafa Traders is a trusted rice business serving Nawabshah since 1948, focused on quality, taste, fair prices, and customer satisfaction.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero title="About Us" path="/about"
        intro="A. Mustafa Traders is a trusted rice business serving Nawabshah since 1948, with a strong focus on quality, taste, and customer satisfaction. For generations, we have carefully selected and supplied premium rice varieties while maintaining the values of honesty, fair dealing, and reliability, and today we continue to serve our customers with the same commitment that has shaped our name for decades." />

      <AboutSection standalone />
    </main>
  );
}
