import PageHero from "../../components/PageHero";
import LeadershipSection from "../../components/LeadershipSection";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata("/leadership");

export default function LeadershipPage() {
  return (
    <main id="main-content">
      <PageHero page="leadership" path="/leadership" />

      <LeadershipSection standalone />
    </main>
  );
}
