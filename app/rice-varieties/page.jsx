import Link from "next/link";
import OptimizedImage from "../../components/OptimizedImage";
import SeoPageShell from "../../components/SeoPageShell";
import { riceVarieties } from "../../data/rice-varieties";
import { createPageMetadata } from "../../data/seo-metadata";

const title = "Rice Varieties";
const description = "Explore the rice varieties listed by A. Mustafa Traders in Nawabshah, including 1121 steam and sella basmati, PK 386 full grain, white basmati, and broken basmati rice.";

export const metadata = createPageMetadata({ title: "Rice Varieties in Nawabshah | A. Mustafa Traders", description, path: "/rice-varieties" });

export default function RiceVarietiesPage() {
  return (
    <SeoPageShell
      title={title}
      path="/rice-varieties"
      intro="Looking for rice varieties from a Nawabshah rice trader? A. Mustafa Traders offers a selection that includes 1121 basmati, PK 386 full grain, white basmati, and broken basmati rice. Contact us to discuss current availability and pricing."
    >
      <section aria-labelledby="varieties-heading">
        <h2 id="varieties-heading" className="text-2xl font-semibold text-[#34532b] sm:text-3xl">Rice types in our selection</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {riceVarieties.map((variety) => (
            <article key={variety.name} className="rounded-xl border border-[#e3ded6] bg-white p-5 shadow-sm">
              <div className="relative mx-auto aspect-[4/3] max-w-[300px]">
                <OptimizedImage src={`/media/${variety.image}`} alt={variety.name} fill sizes="(max-width: 639px) 80vw, (max-width: 1023px) 40vw, 28vw" className="object-contain" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#9e2424]">{variety.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4c4c4c]">{variety.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-10 rounded-xl bg-[#e9e5dc] p-6 sm:p-8" aria-labelledby="rice-choice-heading">
        <h2 id="rice-choice-heading" className="text-xl font-semibold text-[#34532b]">Ask about rice for your business or kitchen</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#414141] sm:text-base">
          Our Nawabshah range includes basmati, steam, sella, white, broken, and full grain rice options. For help comparing the listed varieties, pack-size information, or current prices, contact A. Mustafa Traders directly.
        </p>
        <Link href="/rice-products" className="mt-4 inline-block font-semibold text-[#9e2424] underline underline-offset-4">Browse rice brands and products</Link>
      </section>
    </SeoPageShell>
  );
}
