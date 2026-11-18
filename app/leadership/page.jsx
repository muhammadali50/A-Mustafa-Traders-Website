import PageHero from "../../components/PageHero";
import LeadershipSection from "../../components/LeadershipSection";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata({
  title: "Our Leadership | A. Mustafa Traders",
  description: "Meet the leadership team of A. Mustafa Traders in Nawabshah, carrying forward the values of honesty, quality, and customer trust since 1948.",
  path: "/leadership",
});

export default function LeadershipPage() {
  return (
    <main id="main-content">
      <PageHero title="Our Leadership" path="/leadership"
        intro="A. Mustafa Traders continues to grow under the leadership of the next generation, carrying forward the values of honesty, quality, and customer trust. With experience, dedication, and a commitment to excellence, our leadership team works together to preserve the legacy while moving the business forward." />

      <LeadershipSection standalone />
    </main>
  );
}
