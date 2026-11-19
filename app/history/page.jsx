import PageHero from "../../components/PageHero";
import HistorySection from "../../components/HistorySection";
import { T } from "../../components/LanguageProvider";
import { createPageMetadata } from "../../data/seo-metadata";
import en from "../../locales/en.json";

export const metadata = createPageMetadata("/history");

// Every entry restates facts already published on the site (text in locales/*.json).
const milestones = en.pages.history.milestones.map((_, index) => `pages.history.milestones.${index}`);
const principles = en.pages.history.principles.map((_, index) => `pages.history.principles.${index}`);

export default function HistoryPage() {
  return (
    <main id="main-content">
      <PageHero page="history" path="/history" />

      <HistorySection titleKey="pages.history.heritageTitle" showLink={false} />

      <section aria-labelledby="timeline-title" className="section-pad bg-[var(--brand-stone)] text-[var(--brand-red-text)]">
        <div className="page-container">
          <h2 id="timeline-title" className="heading-display"><T k="pages.history.journeyTitle" /></h2>
          <ol className="m-0 mt-[clamp(24px,3vw,40px)] grid list-none gap-[clamp(16px,2.2vw,32px)] p-0 min-[900px]:grid-cols-3">
            {milestones.map((key) => (
              <li key={key} className="card relative p-[clamp(20px,2.4vw,32px)] pt-[clamp(24px,2.8vw,36px)]">
                <p className="milestone-year m-0 font-display text-[clamp(2.5rem,2rem+1.6vw,3.5rem)] leading-none text-[var(--brand-red)]"><T k={`${key}.year`} /></p>
                <h3 className="heading-title mt-3 text-[#2a2a2a]"><T k={`${key}.title`} /></h3>
                <p className="text-body m-0 mt-2 text-[#4a4a4a]"><T k={`${key}.text`} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-pad bg-white text-[var(--brand-red-text)]">
        <div className="page-container">
          <h2 id="principles-title" className="heading-display"><T k="pages.history.principlesTitle" /></h2>
          <ul className="m-0 mt-[clamp(24px,3vw,40px)] grid list-none gap-[clamp(16px,2.2vw,32px)] p-0 min-[760px]:grid-cols-3">
            {principles.map((key) => (
              <li key={key} className="border-s-4 border-[var(--brand-red)] ps-5">
                <h3 className="heading-title text-[#2a2a2a]"><T k={`${key}.title`} /></h3>
                <p className="text-body m-0 mt-2 text-[#4a4a4a]"><T k={`${key}.text`} /></p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
