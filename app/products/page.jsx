import OptimizedImage from "../../components/OptimizedImage";
import PageHero from "../../components/PageHero";
import { products } from "../../data/products";
import { createPageMetadata } from "../../data/seo-metadata";

export const metadata = createPageMetadata({
  title: "Rice Products and Brands | A. Mustafa Traders",
  description: "Browse the A. Mustafa Traders rice catalogue: basmati, steam, sella, white, and long-grain rice brands available through our Nawabshah business.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main id="main-content">
      <PageHero title="Our Rice Catalogue" crumb="Products" path="/products"
        intro="Branded rice from A. Mustafa Traders, including 1121 and 1222 selections of basmati, steam, sella, white, and long-grain rice. Availability and pack sizes may vary, so please contact us before placing an order." />

      <section aria-label="Rice products" className="section-pad bg-white">
        <ul className="page-container grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-[clamp(16px,2vw,28px)]">
          {products.map((product) => {
            const [left, top, width, height] = product.crop;
            return (
              <li key={product.id} className="card flex flex-col overflow-hidden">
                <div className="flex aspect-[4/5] items-center justify-center bg-[var(--brand-red)] p-[10%]">
                  {/* Trim transparent margins exactly as the homepage carousel does. */}
                  <span className="relative block h-full max-w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
                    <OptimizedImage src={`/media/${product.image}`} alt={`${product.name} rice packaging`} width={product.source[0]} height={product.source[1]}
                      sizes="(max-width: 559px) 80vw, (max-width: 1023px) 40vw, 300px" className="absolute max-w-none object-contain"
                      style={{ width: `${product.source[0] / width * 100}%`, height: `${product.source[1] / height * 100}%`, left: `${-left / width * 100}%`, top: `${-top / height * 100}%` }} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="m-0 text-[1.125rem] leading-tight font-bold text-[var(--brand-red-text)]">{product.name}</h2>
                  <p className="m-0 mt-1 text-[var(--fs-small)] font-bold text-[#3b3b3b]">{product.type}</p>
                  <p className="m-0 mt-2 text-[var(--fs-small)] leading-relaxed text-[#4a4a4a]">{product.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
