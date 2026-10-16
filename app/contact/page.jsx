import { contacts } from "../../data/contact";
import SeoPageShell from "../../components/SeoPageShell";
import { createPageMetadata } from "../../data/seo-metadata";

const title = "Contact A. Mustafa Traders";
const description = "Contact A. Mustafa Traders in Nawabshah for rice orders, product information, availability, and pricing. Call our team or email us.";

export const metadata = createPageMetadata({ title: "Contact a Rice Supplier in Nawabshah | A. Mustafa Traders", description, path: "/contact" });

export default function ContactPage() {
  return (
    <SeoPageShell
      title={title}
      path="/contact"
      intro="Get in touch with A. Mustafa Traders in Nawabshah, Pakistan, for rice orders, product information, current availability, or pricing."
    >
      <section aria-labelledby="contact-options-heading" className="max-w-4xl">
        <h2 id="contact-options-heading" className="text-2xl font-semibold text-[#34532b] sm:text-3xl">Talk with our team</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#4c4c4c] sm:text-base">Call one of our listed contacts or email us with your rice inquiry. We can discuss the products shown in our catalogue and confirm current details.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {contacts.map((contact) => (
            <article key={contact.phone} className="rounded-xl border border-[#e3ded6] bg-white p-6 shadow-sm" data-clarity-mask="true">
              <h3 className="text-lg font-bold text-[#9e2424]">{contact.name}</h3>
              <p className="mt-1 text-sm text-[#555]">{contact.role}</p>
              <a href={contact.href} className="mt-4 inline-block text-lg font-semibold text-[#34532b] underline underline-offset-4">{contact.phone}</a>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-xl bg-[#e9e5dc] p-6">
          <h3 className="font-semibold text-[#34532b]">Email and WhatsApp</h3>
          <p className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:gap-6">
            <a href="mailto:amustafatraders786@gmail.com" className="font-semibold text-[#9e2424] underline underline-offset-4" data-clarity-mask="true">amustafatraders786@gmail.com</a>
            <a href="https://wa.me/923717423270" className="font-semibold text-[#9e2424] underline underline-offset-4">Message us on WhatsApp</a>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#4c4c4c]">A. Mustafa Traders serves rice customers in Nawabshah, Sindh. Please contact us to confirm business address details and current product availability.</p>
        </div>
      </section>
    </SeoPageShell>
  );
}
