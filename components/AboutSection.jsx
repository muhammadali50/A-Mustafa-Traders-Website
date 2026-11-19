"use client";

import ButtonLink from "./ButtonLink";
import { useI18n } from "./LanguageProvider";
import OptimizedImage from "./OptimizedImage";

// `standalone`: on the About page the banner carries the introduction, so the section starts at the mission.
export default function AboutSection({ standalone = false }) {
  const { t } = useI18n();
  const MissionHeading = standalone ? "h2" : "h3";
  return (
    <section id="about" aria-labelledby={standalone ? "about-mission" : "about-title"} className="relative isolate overflow-hidden bg-white text-[#ac3033]">
      <div className="relative mx-auto max-w-[1280px] px-[8%] pt-10 pb-16 min-[640px]:px-[6.3%] min-[640px]:pt-[5.7%] min-[640px]:pb-[9.4%]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[5%] top-[18%] -z-10 h-[65%] opacity-[0.36] min-[640px]:inset-x-[28%] min-[640px]:top-[14%] min-[640px]:h-[68%]">
          <OptimizedImage src="/media/background image of history and about us.webp" alt="" fill className="object-contain" sizes="(max-width: 639px) 90vw, 44vw" />
        </div>
        {!standalone && <>
          <h2 id="about-title" className="heading-display text-center min-[640px]:ps-[2.5%] min-[640px]:text-start">{t("aboutSection.title")}</h2>
          <p className="mt-5 text-pretty text-center text-[15px] leading-[1.55] min-[640px]:mt-[2.3%] min-[640px]:text-start min-[640px]:text-[clamp(16px,1.9vw,24px)] min-[640px]:leading-[1.4]">
            {t("aboutSection.intro")}
          </p>
        </>}
        <MissionHeading id="about-mission" className="font-script my-5 text-center text-[clamp(44px,11vw,52px)] leading-none font-normal min-[640px]:my-[2%] min-[640px]:text-[clamp(44px,5.8vw,74px)]">{t("aboutSection.missionTitle")}</MissionHeading>
        <div className="text-pretty text-center text-[15px] leading-[1.55] min-[640px]:text-start min-[640px]:text-[clamp(16px,1.9vw,24px)] min-[640px]:leading-[1.4]">
          {t("aboutSection.mission").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {!standalone && (
          <p className="section-actions mt-6">
            <ButtonLink href="/about" arrow>{t("aboutSection.more")}</ButtonLink>
          </p>
        )}
      </div>
    </section>
  );
}
