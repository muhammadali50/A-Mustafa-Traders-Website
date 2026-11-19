"use client";

import OptimizedImage from "./OptimizedImage";
import { useI18n } from "./LanguageProvider";
import { riceVarieties } from "../data/rice-varieties";

export default function VarietyCatalogue() {
  const { t, localize } = useI18n();
  return (
    <section aria-label={t("pages.riceVarieties.listLabel")} className="section-pad bg-white">
      <div className="page-container">
        {/* Flex-wrap keeps an incomplete last row centred (5 items). */}
        <ul className="m-0 flex list-none flex-wrap justify-center gap-[clamp(16px,2.2vw,32px)] p-0">
          {riceVarieties.map((source) => {
            const { id, name, image, bowl, description } = localize("varieties", source);
            const [x, y, width, height] = bowl;
            return (
              <li key={id} className="card flex w-full flex-col items-center overflow-hidden text-center min-[560px]:w-[calc((100%-clamp(16px,2.2vw,32px))/2)] min-[960px]:w-[calc((100%-2*clamp(16px,2.2vw,32px))/3)]">
                <div className="flex w-full justify-center bg-[var(--brand-red)] px-6 pt-8 pb-6">
                  <div className="relative w-[min(70%,240px)]" style={{ aspectRatio: `${width}/${height}` }}>
                    <OptimizedImage src={`/media/${image}`} alt={t("varietiesSection.bowlAlt", { name })} width={source.source[0]} height={source.source[1]}
                      sizes="(max-width: 559px) 70vw, 260px" className="absolute max-w-none object-contain"
                      style={{ width: `${source.source[0] / width * 100}%`, height: `${source.source[1] / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="heading-title m-0 text-[var(--brand-red-text)]">{name}</h2>
                  <p className="text-body m-0 mt-2 text-[#4a4a4a]">{description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
