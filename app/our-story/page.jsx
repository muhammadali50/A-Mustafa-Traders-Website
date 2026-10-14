import SeoPageShell from "../../components/SeoPageShell";
import { createPageMetadata } from "../../data/seo-metadata";

const title = "Our Story";
const description = "Learn about A. Mustafa Traders, a Nawabshah rice business founded in 1948 and built around carefully selected rice, honesty, and customer trust.";

export const metadata = createPageMetadata({ title: "Our Story | A. Mustafa Traders Since 1948", description, path: "/our-story" });

export default function OurStoryPage() {
  return (
    <SeoPageShell
      title={title}
      path="/our-story"
      intro="A. Mustafa Traders is a rice business serving Nawabshah, Sindh. Its story began in 1948 with a commitment to quality rice, honest dealing, and customer trust."
    >
      <article className="max-w-4xl rounded-xl border border-[#e3ded6] bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-2xl font-semibold text-[#34532b] sm:text-3xl">A rice trading history rooted in 1948</h2>
        <p className="mt-5 text-base leading-relaxed text-[#414141]">
          A. Mustafa Traders was founded in 1948 by Late Haji Muhammad Siddique. The business grew through honesty, hard work, and a commitment to providing quality rice sourced from Punjab and other cities.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[#414141]">
          In 1968, his son, Haji Noor Mustafa Mustafai, joined the business and continued that legacy. Today, the next generation carries those values forward while serving customers in Nawabshah with a selection of carefully chosen rice varieties.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-[#34532b]">What guides our work</h2>
        <p className="mt-3 text-base leading-relaxed text-[#414141]">
          Quality, fair dealing, reliability, and personal service remain central to the business. Explore our <a href="/rice-varieties" className="font-semibold text-[#9e2424] underline underline-offset-4">rice varieties</a> or view the <a href="/rice-products" className="font-semibold text-[#9e2424] underline underline-offset-4">published rice catalogue</a>.
        </p>
      </article>
    </SeoPageShell>
  );
}
