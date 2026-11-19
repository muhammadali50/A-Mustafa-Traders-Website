import PageHero from "../../components/PageHero";
import VarietyCatalogue from "../../components/VarietyCatalogue";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata("/rice-varieties");

export default function RiceVarietiesPage() {
  return (
    <main id="main-content">
      <PageHero page="riceVarieties" path="/rice-varieties" />
      <VarietyCatalogue />
    </main>
  );
}
