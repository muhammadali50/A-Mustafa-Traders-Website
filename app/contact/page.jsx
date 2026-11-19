import PageHero from "../../components/PageHero";
import { T } from "../../components/LanguageProvider";
import { createPageMetadata } from "../../data/seo-metadata";
import en from "../../locales/en.json";

export const metadata = createPageMetadata("/contact");

// Informational only: the phone numbers and social links live in the shared footer below.
const topics = en.pages.contact.topics.map((_, index) => `pages.contact.topics.${index}`);

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero page="contact" path="/contact">
        <ul className="m-0 mt-[clamp(28px,4vw,48px)] grid list-none gap-[clamp(16px,2.5vw,32px)] p-0 min-[768px]:grid-cols-3">
          {topics.map((key) => (
            <li key={key} className="border-s-2 border-[var(--brand-gold)] ps-5">
              <h2 className="m-0 text-[var(--fs-lead)] font-bold text-[var(--brand-cream)]"><T k={`${key}.title`} /></h2>
              <p className="text-body m-0 mt-2 text-white/90"><T k={`${key}.text`} /></p>
            </li>
          ))}
        </ul>
        <p className="text-body m-0 mt-[clamp(24px,3.5vw,40px)] text-white/90"><T k="pages.contact.closing" /></p>
      </PageHero>
    </main>
  );
}
