import PageHero from "../../components/PageHero";
import HistorySection from "../../components/HistorySection";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata({
  title: "Our History | A. Mustafa Traders Since 1948",
  description: "The history of A. Mustafa Traders, a Nawabshah rice business founded in 1948 by Late Haji Muhammad Siddique and built on honesty, quality, and customer trust.",
  path: "/history",
});

// Every entry below restates facts already published on the site.
const milestones = [
  { year: "1948", title: "The business is founded", text: "Late Haji Muhammad Siddique founds the business, building it through honesty, hard work, and a commitment to providing quality rice sourced from Punjab and other cities." },
  { year: "1968", title: "The second generation joins", text: "His son, Haji Noor Mustafa Mustafai, joins the business, continuing his father’s legacy and carrying forward the same values of quality, trust, and customer satisfaction." },
  { year: "Today", title: "The next generation leads", text: "The business continues to grow under the leadership of the next generation, preserving the legacy while moving the business forward." },
];

const principles = [
  { title: "Honesty and fair dealing", text: "The values of honesty, fair dealing, and reliability, maintained for generations." },
  { title: "Quality rice", text: "Carefully selected rice varieties that deliver excellent taste and dependable quality." },
  { title: "Customer trust", text: "Personal service and reliability that have shaped our name for decades." },
];

export default function HistoryPage() {
  return (
    <main id="main-content">
      <PageHero title="History" path="/history"
        intro="A. Mustafa Traders is a rice business serving Nawabshah, Sindh. Its story began in 1948 with a commitment to quality rice, honest dealing, and customer trust." />

      <HistorySection title="Our heritage" showLink={false} />

      <section aria-labelledby="timeline-title" className="section-pad bg-[var(--brand-stone)] text-[var(--brand-red-text)]">
        <div className="page-container">
          <h2 id="timeline-title" className="heading-display">Our journey</h2>
          <ol className="m-0 mt-[clamp(24px,3vw,40px)] grid list-none gap-[clamp(16px,2.2vw,32px)] p-0 min-[900px]:grid-cols-3">
            {milestones.map(({ year, title, text }) => (
              <li key={year} className="card relative p-[clamp(20px,2.4vw,32px)] pt-[clamp(24px,2.8vw,36px)]">
                <p className="m-0 font-display text-[clamp(2.5rem,2rem+1.6vw,3.5rem)] leading-none text-[var(--brand-red)]">{year}</p>
                <h3 className="heading-title mt-3 text-[#2a2a2a]">{title}</h3>
                <p className="text-body m-0 mt-2 text-[#4a4a4a]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-pad bg-white text-[var(--brand-red-text)]">
        <div className="page-container">
          <h2 id="principles-title" className="heading-display">What guides our work</h2>
          <ul className="m-0 mt-[clamp(24px,3vw,40px)] grid list-none gap-[clamp(16px,2.2vw,32px)] p-0 min-[760px]:grid-cols-3">
            {principles.map(({ title, text }) => (
              <li key={title} className="border-l-4 border-[var(--brand-red)] pl-5">
                <h3 className="heading-title text-[#2a2a2a]">{title}</h3>
                <p className="text-body m-0 mt-2 text-[#4a4a4a]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
