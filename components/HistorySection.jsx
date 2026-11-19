"use client";

import ButtonLink from "./ButtonLink";
import { useI18n } from "./LanguageProvider";
import OptimizedImage from "./OptimizedImage";

const founders = [
  {
    name: "Haji Muhammad Saddique",
    roleKey: "historySection.founderRole",
    image: "Late Haji Muhammad Siddque.webp",
    width: 224, height: 299,
    position: "min-[640px]:left-[1.5%] min-[640px]:top-0",
  },
  {
    name: "Haji Noor Mustafa Mustafai",
    roleKey: "historySection.chairmanRole",
    image: "Late Haji Noor Mustafa Mustafai.webp",
    width: 225, height: 297,
    position: "min-[640px]:-right-[4%] min-[640px]:top-[39%]",
  },
];

// Names are kept as officially written (Latin script) in both languages; "Late" is translated.
export default function HistorySection({ titleKey = "historySection.title", showLink = true }) {
  const { t, dir } = useI18n();
  const name = (value) => <strong data-clarity-mask="true"><bdi>{value}</bdi></strong>;
  return (
    <section id="history" aria-labelledby="history-title" className="relative isolate overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[1280px] px-[6.3%] pt-[clamp(28px,8vw,44px)] pb-[7%] min-[640px]:px-[5.7%] min-[640px]:pt-[4.8%] min-[640px]:pb-[4.5%]">
        <div aria-hidden="true" className="pointer-events-none absolute top-[44%] -right-[15%] h-[45%] w-[130%] opacity-[0.36] min-[640px]:top-[12%] min-[640px]:right-[2%] min-[640px]:h-[73%] min-[640px]:w-[55%]">
          <OptimizedImage src="/media/background image of history and about us.webp" alt="" fill className="object-contain" sizes="(max-width: 639px) 130vw, 55vw" />
        </div>
        {/* Text column | portraits: one physical composition in both languages; the text follows the reading direction. */}
        <div className="relative grid grid-cols-1 min-[640px]:grid-cols-[53%_47%]" dir="ltr">
          <div dir={dir}>
            <h2 id="history-title" className="heading-display text-center text-[var(--brand-red-text)] min-[640px]:ps-[2%] min-[640px]:text-start">{t(titleKey)}</h2>
            <div className="mt-[6%] bg-[#9e2424] px-[9%] py-[7%] text-center text-[clamp(15px,4.1vw,18px)] leading-[1.4] text-white min-[640px]:mt-[6.3%] min-[640px]:px-[5.3%] min-[640px]:py-[8.2%] min-[640px]:text-start min-[640px]:text-[clamp(16px,2.1vw,26px)]">
              <p className="m-0">{t("historySection.body", { founder: name(t("common.late", { name: "Haji Muhammad Siddique" })), son: name("Haji Noor Mustafa Mustafai") })}</p>
            </div>
          </div>
          <div className="relative mt-[13%] flex flex-col items-center gap-[8vw] min-[640px]:mt-0 min-[640px]:block min-[640px]:min-h-[46vw] min-[1280px]:min-h-[589px]">
            {founders.map((founder) => (
              <figure key={founder.name} className={`relative m-0 w-[88%] min-[640px]:absolute min-[640px]:w-[49%] ${founder.position}`} data-clarity-mask="true">
                <OptimizedImage src={`/media/${founder.image}`} alt={t("common.late", { name: founder.name })} width={founder.width} height={founder.height} className="mx-auto h-auto w-[76%] object-contain" sizes="(max-width: 639px) 59vw, 16vw" style={{ maxWidth: founder.width }} />
                <figcaption dir={dir} className="mt-[3%] bg-[#9e2424] px-1 py-[2%] text-center text-[clamp(13px,3.7vw,17px)] leading-[1.2] font-bold text-white min-[640px]:text-[clamp(11px,1.23vw,15px)]">
                  <span className="block"><bdi>{t("common.late", { name: founder.name })}</bdi></span>
                  <span className="block">{t(founder.roleKey)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        {showLink && (
          <p className="section-actions relative mt-8 min-[640px]:mt-4">
            <ButtonLink href="/history" arrow>{t("historySection.readMore")}</ButtonLink>
          </p>
        )}
      </div>
    </section>
  );
}
