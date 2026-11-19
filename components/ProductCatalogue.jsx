"use client";

import OptimizedImage from "./OptimizedImage";
import { useI18n } from "./LanguageProvider";
import { products } from "../data/products";

// Products page grid. Text areas grow with their content, so longer Urdu names never clip.
export default function ProductCatalogue() {
  const { t, localize } = useI18n();
  return (
    <section aria-label={t("pages.products.listLabel")} className="section-pad bg-white">
      <ul className="page-container grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-[clamp(16px,2vw,28px)]">
        {products.map((source) => {
          const product = localize("products", source);
          return (
            <li key={product.id} className="card flex flex-col overflow-hidden">
              {/*
                The whole bag is always shown (object-fit: contain), centred by flexbox. Single-column
                phone layout: a bounded image area so a bag never fills the screen.
              */}
              <div className="flex aspect-[4/5] items-center justify-center bg-[var(--brand-red)] p-[10%] max-[559px]:aspect-auto max-[559px]:h-[clamp(300px,96vw,400px)] max-[559px]:p-6">
                <OptimizedImage src={`/media/${product.image}`} alt={t("pages.products.packagingAlt", { name: product.name })} width={product.source[0]} height={product.source[1]}
                  sizes="(max-width: 559px) 70vw, (max-width: 1023px) 40vw, 300px" className="block h-full w-full object-contain max-[559px]:max-w-[80%]" />
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
  );
}
