import PageHero from "../../components/PageHero";
import AboutSection from "../../components/AboutSection";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata("/about");

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero page="about" path="/about" />

      <AboutSection standalone />
    </main>
  );
}
