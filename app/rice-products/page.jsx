import OptimizedImage from "../../components/OptimizedImage";
import SeoPageShell from "../../components/SeoPageShell";
import { products } from "../../data/products";
import { createPageMetadata } from "../../data/seo-metadata";

const title = "Rice Products and Brands";
const description = "Browse the published A. Mustafa Traders rice catalogue, with basmati, steam, sella, white, and long-grain selections available through our Nawabshah business.";

export const metadata = createPageMetadata({ title: "Rice Products and Brands | A. Mustafa Traders", description, path: "/rice-products" });

export default function RiceProductsPage() {
  return (
    <SeoPageShell
      title={title}
      path="/rice-products"
      intro="Explore the branded rice products published by A. Mustafa Traders. The catalogue includes 1121 and 1222 rice selections, basmati, steam, sella, white, and long-grain options. Contact us for current availability and pricing."
    >
      <section aria-labelledby="catalogue-heading">
        <h2 id="catalogue-heading" className="text-2xl font-semibold text-[#34532b] sm:text-3xl">Published rice catalogue</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4c4c4c] sm:text-base">
          A. Mustafa Traders serves rice customers in Nawabshah. Browse the current website catalogue below; product availability and pack sizes may vary, so please contact us before placing an order.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="rounded-xl border border-[#e3ded6] bg-white p-5 shadow-sm">
              <div className="relative mx-auto aspect-[3/4] max-w-[230px]">
                <OptimizedImage src={`/media/${product.image}`} alt={`${product.name} rice packaging`} fill sizes="(max-width: 639px) 65vw, (max-width: 1023px) 32vw, 22vw" className="object-contain" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#9e2424]">{product.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[#34532b]">{product.type}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#4c4c4c]">{product.description}</p>
            </article>
          ))}
        </div>
      </section>
    </SeoPageShell>
  );
}
