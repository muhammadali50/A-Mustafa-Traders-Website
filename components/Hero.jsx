"use client";

import ButtonLink from "./ButtonLink";
import { useI18n } from "./LanguageProvider";
import OptimizedImage from "./OptimizedImage";

export default function Hero() {
  const { t } = useI18n();
  const [line1, line2] = t("hero.description");
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero">
      {/* object-fit: cover — on screens taller than the image ratio, its width follows the height. */}
      <OptimizedImage src="/media/Home page Background Image.webp" alt="" fill loading="eager" fetchPriority="high"
        sizes="(max-aspect-ratio: 1199/672) 179vh, 100vw" className="hero-background -z-20 object-cover" />
      <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-copy text-white">
        <h1 id="hero-heading" className="font-serif font-normal">
          <span className="block">{t("hero.titleLine1")}</span>{" "}
          <span className="block text-[var(--brand-gold)]">{t("hero.titleLine2")}</span>
        </h1>
        <p className="hero-description font-medium">{line1}<br /> {line2}</p>
        <div className="hero-actions">
          <ButtonLink href="/products">{t("hero.viewProducts")}</ButtonLink>
          {/* Phones show a single CTA; Contact remains in the navigation and footer. */}
          <ButtonLink href="/contact" variant="outline" className="max-[767px]:hidden">{t("hero.contact")}</ButtonLink>
        </div>
      </div>
      <div className="product-composition" role="img" aria-label={t("hero.compositionLabel")}>
        <div className="rice-bag absolute aspect-[433/577]">
          {/* Preserve the previous asset's visible footprint inside its unchanged container. */}
          <div className="absolute" style={{ left: "18.7067%", top: "20.2773%", width: "54.9654%", height: "62.565%" }}>
            <OptimizedImage src="/media/punj sher 5 kg home.webp" alt="" fill loading="eager" sizes="(max-width: 767px) 120px, (max-width: 1023px) 23vw, 17vw" className="object-contain" />
          </div>
        </div>
        <OptimizedImage src="/media/Rice bowl in Home page.webp" alt="" width={377} height={661} loading="eager" fetchPriority="high" sizes="(max-width: 767px) 210px, (max-width: 1023px) 34vw, 25vw" className="rice-bowl absolute h-auto" />
      </div>
    </section>
  );
}
