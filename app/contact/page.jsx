import PageHero from "../../components/PageHero";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata({
  title: "Contact a Rice Supplier in Nawabshah | A. Mustafa Traders",
  description: "Contact A. Mustafa Traders in Nawabshah for rice orders, product information, availability, and pricing. Call our team, email us, or message us on WhatsApp.",
  path: "/contact",
});

// Informational only: the phone numbers and social links live in the shared footer below.
const topics = [
  { title: "Product Inquiries", text: "Learn more about our available rice varieties, product selections, and packaging information." },
  { title: "Orders & Pricing", text: "Talk to our team about current product availability, order quantities, and pricing." },
  { title: "General Assistance", text: "Reach out with business-related questions or for additional product information." },
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero title="Contact Us" path="/contact"
        intro="A. Mustafa Traders welcomes your inquiries about our rice products, varieties, availability, pricing, and orders. Whether you are buying for your home or your business, our team in Nawabshah is ready to help.">
        <ul className="m-0 mt-[clamp(28px,4vw,48px)] grid list-none gap-[clamp(16px,2.5vw,32px)] p-0 min-[768px]:grid-cols-3">
          {topics.map(({ title, text }) => (
            <li key={title} className="border-l-2 border-[var(--brand-gold)] pl-5">
              <h2 className="m-0 text-[var(--fs-lead)] font-bold text-[var(--brand-cream)]">{title}</h2>
              <p className="text-body m-0 mt-2 text-white/90">{text}</p>
            </li>
          ))}
        </ul>
        <p className="text-body m-0 mt-[clamp(24px,3.5vw,40px)] text-white/90">Call, message, or email our team using the contact details below.</p>
      </PageHero>
    </main>
  );
}
